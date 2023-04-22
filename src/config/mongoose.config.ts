import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { configDb } from './constants';

export const mongooseConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => {
    const config = configService.get<MongooseModuleFactoryOptions>(configDb);
    if (!config) throw new Error('cannot load db without config');

    return config;
  },
};
