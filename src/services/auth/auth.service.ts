import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { BaseUser } from '../../dtos/base-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneBy(email);
    if (!user) throw new UnauthorizedException('User not found');

    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid password');

    const payload = { sub: user.id, email: user.email };
    const { password, ...userWithoutPassword } = user;

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword,
    };
  }

  async signUp(payload: BaseUser) {
    const { email } = payload;
    const user = await this.usersService.findOneBy(email);
    if (user)
      throw new UnauthorizedException(`User with ${email} already exists`);

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const userWithHashedPassword = {
      ...payload,
      password: hashedPassword,
    };

    let createdUser = await this.usersService.create(userWithHashedPassword);

    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }

  async checkAvailability(email?: string, username?: string) {
    const result: { emailTaken?: boolean; usernameTaken?: boolean } = {};

    if (email) {
      const userByEmail = await this.usersService.findOneBy(email);
      result.emailTaken = !!userByEmail;
    }

    if (username) {
      const userByUsername =
        await this.usersService.findOneByUsername(username);
      result.usernameTaken = !!userByUsername;
    }

    return result;
  }
}
