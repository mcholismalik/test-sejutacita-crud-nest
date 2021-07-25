import * as config from 'config'

const getConfig = config.get('mongodb')
const host =  process.env.MONGODB_HOST || getConfig.host
export const mongodbConfig = `mongodb://${getConfig.user}:${getConfig.password}@${host}:${getConfig.port}`