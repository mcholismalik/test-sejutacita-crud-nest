import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { JwtPayload } from './jwt.payload'
import { User, UserConfig } from 'src/schemas/user.schema'
import * as config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(UserConfig.modelName) private userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
    })
  }

  async validate(jwtPayload: JwtPayload): Promise<User> {
    const { username } = jwtPayload
    const user = await this.userModel.findOne({ username })
    if (!user) throw new UnauthorizedException()
    return user
  }
}
