import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "secret",
        });
    }

    async validate(payload, done: any) {
        try {
             if(payload.exp >= Date.now()/1000){
                done(null, payload);
            } else {
                throw new UnauthorizedException('Expired Token');
            }
        } catch (err) {
            throw new UnauthorizedException('Unauthorized', err.message);
        }
    }

}
