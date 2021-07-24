import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { promisify } from 'util'
import * as redis from 'redis'
import * as config from 'config'
import { RedisConfig } from './redis.interface'

@Injectable()
export class RedisService implements OnModuleInit {
  private redisClient: redis.RedisClient
  private redisConfig: RedisConfig = config.get('redis')
  private redisLogger: Logger = new Logger('Redis')

  onModuleInit(): void {
    this.init()
  }

  init(): void {
    this.redisClient = redis.createClient({
      host: this.redisConfig.host,
      port: this.redisConfig.port,
      password: this.redisConfig.password
    })
    this.redisClient.on('connect', () => {
      this.redisLogger.log(`Redis connected on ${this.redisConfig.host}:${this.redisConfig.port}`)
    })

    this.flushAll().then(() => this.redisLogger.log(`redis flush all successfully`))
  }

  async get(key: any, isParseToJson = true) {
    const get = promisify(this.redisClient.get).bind(this.redisClient)
    const value = await get(key)
    const result = isParseToJson ? this.parseToJson(value) : value
    return result
  }

  async set(key: any, value: any) {
    const set = promisify(this.redisClient.set).bind(this.redisClient)
    return await set(key, value, 'EX', this.redisConfig.expire)
  }

  async del(key: any) {
    const del = promisify(this.redisClient.del).bind(this.redisClient)
    return await del(key)
  }

  async flushAll() {
    const flushAll = promisify(this.redisClient.flushall).bind(this.redisClient)
    return await flushAll()
  }

  parseToJson(value: any) {
    return JSON.parse(value)
  }

}
