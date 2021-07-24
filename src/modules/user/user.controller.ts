import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { ResponsePayload } from 'src/lib/response/response.payload'
import { RolesGuard } from 'src/middleware/authorization/roles.guard'
import { GetAuth } from '../auth/decorator/auth.decorator'
import { User } from 'src/schemas/user.schema'

@ApiTags('user')
@ApiBearerAuth('access-token')
@Controller('user')
@UseGuards(AuthGuard(), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getUsers(@GetAuth() auth: User): Promise<ResponsePayload> {
    const data = await this.userService.getUsers(auth)
    return new ResponsePayload(`get users success`, data)
  }

  @Get('/:id')
  async getUserByID(@GetAuth() auth: User, @Param('id') id: string): Promise<ResponsePayload> {
    const data = await this.userService.getUserByID(auth, id)
    return new ResponsePayload(`get user by id (${id}) success`, data)
  }

  @ApiBody({ type: CreateUserDto })
  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@GetAuth() auth: User, @Body() createUserDto: CreateUserDto): Promise<ResponsePayload> {
    const data = await this.userService.createUser(auth, createUserDto)
    return new ResponsePayload(`create user success`, data)
  }

  @ApiBody({ type: UpdateUserDto })
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateUser(@GetAuth() auth: User, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ResponsePayload> {
    const data = await this.userService.updateUser(auth, id, updateUserDto)
    return new ResponsePayload(`update user by id (${id}) success`, data)
  }

  @Delete('/:id')
  async deleteUser(@GetAuth() auth: User, @Param('id') id: string): Promise<ResponsePayload> {
    await this.userService.deleteUser(auth, id)
    return new ResponsePayload(`delete user by id (${id}) success`)
  }
}
