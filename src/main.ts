import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ResponseInterceptor } from './lib/response/response.interceptor'
import * as config from 'config'
import { SeedService } from './lib/seed/seed.service';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const serverConfig = config.get('server')

  // db
  mongoose.set('debug', true)

  const app = await NestFactory.create(AppModule)

  // seed
  const seedService = app.get(SeedService)
  seedService.create().catch(err => {
    logger.log(err.message)
  })

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.enableCors()

  // swagger
  const options = new DocumentBuilder()
    .setTitle('API Doc test-sejutacita-crud-nest')
    .setDescription('API Documentation for test-sejutacita-crud-nest service')
    .setContact('Muhammad Cholis Malik', 'https://www.linkedin.com/in/mcholismalik', 'mcholismalik.official@gmail.com')
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