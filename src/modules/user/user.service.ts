import { Injectable, ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { RedisService } from 'src/lib/redis/redis.service'
import { User, UserConfig } from 'src/schemas/user.schema'
import { RoleEnum } from 'src/lib/constant/role.constant'

@Injectable()
export class UserService {
  constructor(@InjectModel(UserConfig.modelName) private userModel: Model<User>, private redisService: RedisService) { }

  checkRoleCondition(auth: User) {
    const condition = {
      db: {},
      redis: ''
    }
    switch (auth.role) {
      case RoleEnum.MEMBER: {
        condition.redis = auth.id
        condition.db = { _id: auth.id }
      }
    }

    return condition
  }

  async getUsers(auth: User): Promise<User[]> {
    // check role
    let cond = {}
    switch (auth.role) {
      case RoleEnum.MEMBER: {
        cond = { _id: auth.id }
      }
    }

    return await this.userModel.find(cond)
  }

  async getUserByID(auth: User, id: string): Promise<User> {
    // check role
    if (auth.role === RoleEnum.MEMBER && auth.id !== id) {
      throw new UnauthorizedException('not allowed to request this id')
    }

    // check redis
    const userCache = await this.redisService.get(id)
    if (userCache) return userCache

    const user = await this.userModel.findById(id)
    if (!user) throw new NotFoundException(`user not found`)

    return user
  }

  async createUser(auth: User, createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel(createUserDto)
      user.salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(createUserDto.password, user.salt)
      await user.save()

      // save cache
      const userCache = JSON.stringify(user.toObject())
      this.redisService.set(user.id, userCache)

      return user
    } catch (err) {
      if (err.code === 11000) throw new ConflictException('username or email already exists')
      throw new InternalServerErrorException()
    }
  }

  async updateUser(auth: User, id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const { name, username, email, address, gender, age, password, role } = updateUserDto
      const user = await this.userModel.findById(id)
      if (!user) throw new NotFoundException(`user not found`)

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

  async deleteUser(auth: User, id: string): Promise<void> {
    const user = await this.userModel.findById(id)
    if (!user) throw new NotFoundException(`user not found`)

    // delete cache
    this.redisService.del(id)

    const result = await this.userModel.deleteOne({ _id: id })
    if (result.n === 0) throw new InternalServerErrorException(`something bad happened`)
  }
}
