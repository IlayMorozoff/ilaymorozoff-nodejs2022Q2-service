import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { UserEntity } from 'src/users/entities/user.entity';
import { SECRETS, UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}

  async signup(createAuthDto: CreateAuthDto): Promise<UserEntity> {
    const registeredUser = await this.usersService.create(createAuthDto);
    return registeredUser;
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    const user = await this.verifyRefreshToken(refreshTokenDto.refreshToken);

    user.accessToken = await this.generateJwt(user, SECRETS.JWT_SECRET_ACCESS);
    user.refreshToken = await this.generateJwt(
      user,
      SECRETS.JWT_SECRET_REFRESH,
    );

    await this.usersRepository.save(user);

    return {
      refreshToken: user.refreshToken,
      accessToken: user.accessToken,
    };
  }

  async verifyRefreshToken(refreshToken: string): Promise<UserEntity | null> {
    try {
      const decode = verify(
        refreshToken,
        this.config.get<string>('JWT_SECRET_REFRESH'),
      ) as UserEntity;

      const user = await this.usersRepository.findOneBy({
        id: decode.id,
      });

      return user;
    } catch (error) {
      throw new ForbiddenException('token is not valid');
    }
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

    const userLogged = await this.usersRepository.save(user);

    delete userLogged.password;

    return {
      ...userLogged,
      createdAt: +new Date(userLogged.createdAt),
      updatedAt: +new Date(userLogged.updatedAt),
    };
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
