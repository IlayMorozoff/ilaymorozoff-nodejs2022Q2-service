import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMessages } from 'src/common/errorsMgs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    const createdUser = this.usersRepository.create(newUser);
    return this.usersRepository.save(createdUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    await this.checkExistsingUser(id);
    return this.usersRepository.findOneBy({
      id,
    });
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.checkExistsingUser(id);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(ErrorMessages.OLD_PASSWORD_IS_NOT_VALID);
    }

    user.password = updatePasswordDto.newPassword;

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.checkExistsingUser(id);
    await this.usersRepository.remove(user);
  }

  private async checkExistsingUser(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    return user;
  }
}
