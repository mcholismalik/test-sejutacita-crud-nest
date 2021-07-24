import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'
import { ResponsePayload } from 'src/lib/response/response.payload'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiBody({ type: SignUpDto })
  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  async signUp(@Body() signUpDto: SignUpDto): Promise<ResponsePayload> {
    const data = await this.authService.signUp(signUpDto)
    return new ResponsePayload(`sign up success`, data)
  }

  @ApiBody({ type: SignInDto })
  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  async signip(@Body() signInDto: SignInDto): Promise<ResponsePayload> {
    const data = await this.authService.signIn(signInDto)
    return new ResponsePayload(`sign in success`, data)
  }
}
