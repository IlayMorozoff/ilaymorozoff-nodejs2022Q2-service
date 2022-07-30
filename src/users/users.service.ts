import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { ErrorMessages } from 'src/common/errorsMgs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';

export const enum SECRETS {
  JWT_SECRET_ACCESS = 'JWT_SECRET_ACCESS',
  JWT_SECRET_REFRESH = 'JWT_SECRET_REFRESH',
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly config: ConfigService,
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

  async login(loginUserDto: CreateAuthDto) {
    const user = await this.usersRepository.findOneBy({
      login: loginUserDto.login,
    });

    if (!user) {
      throw new ForbiddenException('Credentials are not valid');
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Credentials are not valid');
    }

    user.refreshToken = await this.generateJwt(
      user,
      SECRETS.JWT_SECRET_REFRESH,
    );

    user.accessToken = await this.generateJwt(user, SECRETS.JWT_SECRET_ACCESS);

    return this.usersRepository.save(user);
  }

  async generateJwt(user: UserEntity, config: SECRETS): Promise<string> {
    return sign(
      {
        id: user.id,
        login: user.login,
      },
      this.config.get<string>(config),
      {
        expiresIn: config === SECRETS.JWT_SECRET_ACCESS ? '15m' : '30d',
      },
    );
  }
}
