import { Command } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'

import { User, UserConfig } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  private seedLogger: Logger = new Logger('Seed')

  constructor(
    @InjectModel(UserConfig.modelName) private userModel: Model<User>
  ) { }

  @Command({ command: 'create:user', describe: 'create a user', autoExit: true })
  async create() {
    const users = [
      {
        name: 'Admin',
        username: 'admin',
        email: 'admin@gmail.com',
        address: 'Jl. Raya Bekasi',
        gender: 'L',
        age: 23,
        password: 'Asd123!@#',
        role: 'admin'
      },
      {
        name: 'Member',
        username: 'member',
        email: 'member@gmail.com',
        address: 'Jl. Rawabadung',
        gender: 'P',
        age: 21,
        password: 'Asd123!@#',
        role: 'member'
      }
    ]

    await Promise.all(
      users.map(async v => {
        const user = new this.userModel(v)
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, user.salt)
        await user.save()
      })
    )

    this.seedLogger.log(`seed user success`)
  }
}