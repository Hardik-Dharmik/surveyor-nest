import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from './form.module';
import { Form } from './entities/form.entity';

import * as dotenv from 'dotenv';
dotenv.config(); 

@Module({
  imports: [
    TypeOrmModule.forRoot({
     type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Form]),
    FormsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
