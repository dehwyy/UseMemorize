import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginRequest } from '@src/auth/models/auth.dto'
import { InjectModel } from '@nestjs/mongoose'
import AuthTokenDB from '@src/auth/models/auth.schema'
import { Model } from 'mongoose'
import { UserService } from '@src/user/user.service'
import { CreateUserDTO } from '@src/user/models/user.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    @InjectModel(AuthTokenDB.name) private AuthToken: Model<AuthTokenDB>,
  ) {}
  async login(loginRequest: LoginRequest) {
    const { email } = loginRequest
    const user = await this.userService.getUserByEmail(email)
    if (!user) throw new NotFoundException('no user with such email')
    const token = this.jwt.sign({ email })
    await this.AuthToken.findByIdAndUpdate(user._id, {
      $set: { token },
    })
    return {
      user,
      token,
    }
  }
  async register(registerRequest: CreateUserDTO) {
    const { email } = registerRequest
    const user = await this.userService.create(registerRequest)
    const token = this.jwt.sign({ email })
    await this.AuthToken.create({ userId: user._id, token })
    return { user, token }
  }
}
