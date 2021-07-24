import { IsString, MaxLength, IsEmail, IsNumber, MinLength, Matches, IsOptional, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { RoleEnum } from 'src/lib/constant/role.constant'
import { GenderEnum } from 'src/lib/constant/gender.constant'

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  username: string

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @MaxLength(200)
  email: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string

  @ApiProperty()
  @IsOptional()
  @IsEnum(GenderEnum)
  gender: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  age: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password must contain at least one uppercase, lowercase, number digit, and special character'
  })
  password: string

  @ApiProperty()
  @IsOptional()
  @IsEnum(RoleEnum)
  role: string
}


