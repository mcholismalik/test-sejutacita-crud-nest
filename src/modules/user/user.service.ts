import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { plainToClass } from 'class-transformer'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { RedisService } from 'src/lib/redis/redis.service'
import { User, UserView, UserConfig } from 'src/schemas/user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(UserConfig.modelName) private userModel: Model<User>, private redisService: RedisService) { }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find()
  }

  async getUserByID(id: string): Promise<User> {
    const userCache = await this.redisService.get(id)
    if (userCache) return userCache

    const user = await this.userModel.findById(id)
    if (!user) throw new NotFoundException(`user not found`)

    return user
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel(createUserDto)
      user.salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(createUserDto.password, user.salt)
      await user.save()

      const userView = plainToClass(UserView, user.toObject())

      // save cache
      const userCache = JSON.stringify(userView)
      this.redisService.set(user.id, userCache)

      return userView
    } catch (err) {
      if (err.code === 11000) throw new ConflictException('username or email already exists')
      throw new InternalServerErrorException()
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const { name, username, email, address, gender, age, password, role } = updateUserDto
      const user = await this.userModel.findById(id)
      if (name) user.name = name
      if (username) user.username = username
      if (email) user.email = email
      if (address) user.address = address
      if (gender) user.gender = gender
      if (age) user.age = age
      if (role) user.role = role
      if (password) {
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(updateUserDto.password, user.salt)
      }
      await user.save()

      // delete cache
      this.redisService.del(id)

      return user
    } catch (err) {
      if (err.code === 11000) throw new ConflictException('username or email already exists')
      throw new InternalServerErrorException()
    }
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findById(id)
    if (!user) throw new NotFoundException(`user not found`)

    // delete cache
    this.redisService.del(id)

    const result = await this.userModel.deleteOne({ _id: id })
    if (result.n === 0) throw new InternalServerErrorException(`something bad happened`)
  }
}
