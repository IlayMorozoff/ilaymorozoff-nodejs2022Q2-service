import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(createAuthDto: CreateAuthDto): Promise<UserEntity> {
    const registeredUser = await this.usersService.create(createAuthDto);
    return registeredUser;
  }

  async login(createAuthDto: CreateAuthDto) {
    const loginedUser = await this.usersService.login(createAuthDto);
    delete loginedUser.password;
    return loginedUser;
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    // const loginedUser = await this.usersService.login(refreshTokenDto);
  }
}
