import { IsString, MaxLength, IsNotEmpty, IsEmail, IsNumber, MinLength, Matches, IsOptional, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { RoleEnum } from 'src/schemas/role.schema'

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name: string

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  username: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(200)
  email: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  age: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password must contain at least one uppercase, lowercase, number digit, and special character'
  })
  password: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: string
}
