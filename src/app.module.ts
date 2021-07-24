import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongodbConfig } from './config/mongodb.config'
import { AuthModule } from './modules/auth/auth.module';
import { SeedModule } from './lib/seed/seed.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [MongooseModule.forRoot(mongodbConfig, { useCreateIndex: true }), CommandModule, AuthModule, UserModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
