
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { AppConfigModule } from './common/config/config.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtmoduleModule } from './common/jwtmodule/jwtmodule.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    DatabaseModule, UsersModule, AuthModule, AppConfigModule, JwtmoduleModule, ProductModule
  ],
  providers: [],
})
export class AppModule { }
