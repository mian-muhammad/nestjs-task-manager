import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(pass, user.password);
    if (isValid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const { username, _id } = user._doc;
    const payload = { username, sub: _id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
