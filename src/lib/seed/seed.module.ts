import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { UserConfig, UserSchema } from 'src/schemas/user.schema';
import { AuthModule } from '../../modules/auth/auth.module';
import { SeedService } from './seed.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserConfig.modelName, schema: UserSchema }]), CommandModule, AuthModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule { }