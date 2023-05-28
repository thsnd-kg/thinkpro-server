import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigType } from '@nestjs/config';
import { BcryptConfig } from '../../config/bcrypt.config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @Inject(BcryptConfig.KEY)
    private bcryptConfig: ConfigType<typeof BcryptConfig>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPass = await bcrypt.hash(createUserDto.password, this.bcryptConfig.salt);

    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPass,
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOneByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne(
      {
        username,
      },
      {
        password: true,
      },
    );

    return user;
  }

  async existByUsername(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({
      username,
    });

    return !!user;
  }
}
