import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessages } from 'src/common/errorsMgs';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly inMemoryDbService: InMemoryDbService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();

    newUser.id = uuidv4();
    newUser.password = createUserDto.password;
    newUser.login = createUserDto.login;
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();
    newUser.version = 1;

    return this.inMemoryDbService.user.create(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.inMemoryDbService.user.findAll();
  }

  async findOne(id: string): Promise<UserEntity> {
    this.checkExistsingUser(id);
    return this.inMemoryDbService.user.findOne(id);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.checkExistsingUser(id);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(ErrorMessages.OLD_PASSWORD_IS_NOT_VALID);
    }

    user.password = updatePasswordDto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();

    return this.inMemoryDbService.user.update(id, user);
  }

  async remove(id: string): Promise<void> {
    this.checkExistsingUser(id);
    this.inMemoryDbService.user.remove(id);
  }

  private checkExistsingUser(id: string): UserEntity {
    const user = this.inMemoryDbService.user.findOne(id);

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    return user;
  }
}
