import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from '../../controllers/auth/auth.controller';
import { AuthService } from '../../services/auth/auth.service';
import { jwtConstants } from '../../constants/jwt.constant';
import { AuthGuard } from '../../guards/auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
