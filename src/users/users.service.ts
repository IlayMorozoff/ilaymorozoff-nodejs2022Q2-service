import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessages } from 'src/common/errorsMgs';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();

    newUser.id = uuidv4();
    newUser.password = createUserDto.password;
    newUser.login = createUserDto.login;
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();
    newUser.version = 1;

    return this.usersRepository.create(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }
    return this.usersRepository.findOne(id);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new BadRequestException(ErrorMessages.OLD_PASSWORD_IS_NOT_VALID);
    }

    user.password = updatePasswordDto.newPassword;
    user.version = user.version + 1;

    return this.usersRepository.update(id, user);
  }

  async remove(id: string) {
    const user = this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }
    this.usersRepository.remove(id);
    return id;
  }
}
