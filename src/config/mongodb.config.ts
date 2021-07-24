import * as config from 'config'

const getConfig = config.get('mongodb')
export const mongodbConfig = `mongodb://${getConfig.user}:${getConfig.password}@${getConfig.host}:${getConfig.port}`