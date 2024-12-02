import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto, LoginUserDto } from '../dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register a new user by delegating to the UsersService
   */
  async register(registerUserDto: RegisterUserDto) {
    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    const newUser = await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    };
  }

  /**
   * Authenticate a user and return a JWT
   */
  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate a JWT
    const token = this.generateJwtToken(user);

    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }

  /**
   * Generate a JWT for a user
   */
  private generateJwtToken(user: any) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  /**
   * Get the profile of the currently authenticated user
   */
  async getProfile(user: any) {
    const userData = await this.usersService.findOne(user.sub);
    if (!userData) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: userData.id,
      email: userData.email,
      username: userData.username,
    };
  }

  async handleGoogleLogin(googleUser: any) {
    let user = await this.usersService.findByEmail(googleUser.email);

    if (!user) {
      // Si el usuario no existe, lo creamos
      user = await this.usersService.create({
        email: googleUser.email,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        // Generamos un username único basado en el email
        username: googleUser.email.split('@')[0],
        // Como el usuario viene de Google, no necesitamos password
        // pero podemos generar uno aleatorio si nuestra BD lo requiere
        password: Math.random().toString(36).slice(-8),
        // Puedes establecer roles específicos para usuarios de Google
        roles: ['user'],
        // Añadimos información adicional de Google
        // TODO: googleId: googleUser.id,
        // TODO: picture: googleUser.picture,
      });
    }

    // Generamos el JWT para el usuario
    return {
      user,
      token: this.generateJwtToken(user),
    };
  }
}
