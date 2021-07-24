import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ResponseInterceptor } from './lib/response/response.interceptor'
import * as config from 'config'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const serverConfig = config.get('server')

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })
  app.setGlobalPrefix('api/v1')
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.enableCors()

  // swagger
  const options = new DocumentBuilder()
    .setTitle('API Doc test-sejutacita-crud-nest')
    .setDescription('Authored by Muhammad Cholis Malik')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' }, 'access-token')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/doc', app, document)

  const port = serverConfig.port
  await app.listen(port)

  logger.log(`application listening on port ${port}`)
}
bootstrap()