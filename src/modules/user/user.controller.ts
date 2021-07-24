import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { ResponsePayload } from 'src/lib/response/response.payload'
// import { RolesGuard } from 'src/middleware/authorization/roles.guard'

@ApiTags('user')
@ApiBearerAuth('access-token')
@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getUsers(): Promise<ResponsePayload> {
    const data = await this.userService.getUsers()
    return new ResponsePayload(`get users success`, data)
  }

  @Get('/:id')
  async getUserByID(@Param('id') id: string): Promise<ResponsePayload> {
    const data = await this.userService.getUserByID(id)
    return new ResponsePayload(`get user by id (${id}) success`, data)
  }

  @ApiBody({ type: CreateUserDto })
  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponsePayload> {
    const data = await this.userService.createUser(createUserDto)
    return new ResponsePayload(`create user success`, data)
  }

  @ApiBody({ type: UpdateUserDto })
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ResponsePayload> {
    const data = await this.userService.updateUser(id, updateUserDto)
    return new ResponsePayload(`update user by id (${id}) success`, data)
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<ResponsePayload> {
    await this.userService.deleteUser(id)
    return new ResponsePayload(`delete user by id (${id}) success`)
  }
}
