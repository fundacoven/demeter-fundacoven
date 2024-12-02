import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/auth/entities/user.entity';
import { JwtPayload } from '../models/jwt-payload.interface';
import { UsersService } from '../services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET') || 'defaultSecretKey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    this.logger.debug(`JWT Payload received: ${JSON.stringify(payload)}`);
    const { id } = payload;

    const user = await this.usersService.findOne(id);

    if (!user) {
      this.logger.warn(`User not found with ID: ${id}`);
      throw new UnauthorizedException('Token not valid');
    }

    if (!user.isActive) {
      this.logger.warn(`User ${id} is inactive`);
      throw new UnauthorizedException('User is inactive, talk with an admin');
    }

    this.logger.log(`User validated: ${user.id}`);
    return user;
  }
}
