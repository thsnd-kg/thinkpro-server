import { ConfigType } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { MongoConfig } from './mongo.config';

export const mongooseConfig: MongooseModuleAsyncOptions = {
  inject: [MongoConfig.KEY],
  useFactory: async (mongoConfig: ConfigType<typeof MongoConfig>): Promise<MongooseModuleFactoryOptions> => {
    const { host, port, database } = mongoConfig;
    return {
      uri: `mongodb://${host}:${port}/${database}`,
    };
  },
};
