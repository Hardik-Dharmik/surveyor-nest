import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { MongoRepository, Repository } from 'typeorm';
import { BaseUser, CreateUserDto } from '../../dtos/base-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOneBy(email: string): Promise<UserEntity | undefined | null> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async create(createUserDto: BaseUser) {
    return this.userRepository.save({
      ...createUserDto,
      createdAt: new Date(),
    });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
