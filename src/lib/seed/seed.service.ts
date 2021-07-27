import { Command } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import * as faker from 'faker'

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
    const max = 20
    const count = await this.userModel.countDocuments()
    if (count >= max) throw new Error(`Seed error, data is more than or equal ${max}`)

    const users = []
    for (let i = 0; i < max; i++) {
      const name = i == 0 ? 'admin' : faker.name.firstName()
      const user = {
        name,
        username: name.toLowerCase(),
        email: `${name.toLowerCase()}@gmail.com`,
        address: 'Jl. Raya Bekasi',
        gender: i % 2 == 0 ? 'L' : 'P',
        age: 23,
        password: 'Asd123!@#',
        role: i == 0 ? 'admin' : 'member',
        created_by: 'system',
        modified_by: 'system'
      }
      users.push(user)
    }

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