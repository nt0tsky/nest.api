import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {configService} from "@/config/config.service";
import {UsersJWTDTO} from "@/common/models/users.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJWTConfig().secretKey,
    });
  }

  validate(payload: any): UsersJWTDTO {
    return {id: payload.sub, email: payload.email};
  }
}