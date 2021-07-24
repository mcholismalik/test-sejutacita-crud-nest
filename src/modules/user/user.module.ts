import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema, UserConfig } from 'src/schemas/user.schema'
import { RedisModule } from 'src/lib/redis/redis.module'
import { AuthModule } from '../auth/auth.module'
import { RolesGuard } from 'src/middleware/authorization/roles.guard'

@Module({
  imports: [MongooseModule.forFeature([{ name: UserConfig.modelName, schema: UserSchema }]), AuthModule, RedisModule],
  providers: [UserService, RolesGuard],
  controllers: [UserController]
})
export class UserModule { }
