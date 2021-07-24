import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { SignUpDto } from './dto/sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'
import { UserConfig, User } from 'src/schemas/user.schema'
import { RedisService } from 'src/lib/redis/redis.service'

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserConfig.modelName) private userModel: Model<User>, private jwtService: JwtService, private redisService: RedisService) { }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    try {
      const user = new this.userModel(signUpDto)
      user.salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(signUpDto.password, user.salt)
      await user.save()

      // save cache
      const userCache = JSON.stringify(user)
      this.redisService.set(user.id, userCache)

      return user
    } catch (err) {
      if (err.code === 11000) throw new ConflictException('username or email already exists')
      throw new InternalServerErrorException()
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken }> {
    const user = await this.validateUser(signInDto)
    if (!user) throw new UnauthorizedException('Invalid username or password')

    const jwtPayload = { username: user.username }
    const accessToken = await this.jwtService.signAsync(jwtPayload)
    return { accessToken }
  }

  async validateUser(signInDto: SignInDto): Promise<User | null> {
    const { username, password } = signInDto
    const user = await this.userModel
      .findOne({ username })
      .select('+password')
      .select('+salt')
    return user && (await this.validatePassword(password, user.password, user.salt)) ? user : null
  }

  async validatePassword(password: string, userPassword: string, salt: string): Promise<boolean> {
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword === userPassword
  }
}
