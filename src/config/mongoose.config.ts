import { ConfigType } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { MongoConfig } from './mongo.config';

export const mongooseConfig: MongooseModuleAsyncOptions = {
  inject: [MongoConfig.KEY],
  useFactory: async ({ host, port, database}: ConfigType<typeof MongoConfig>): Promise<MongooseModuleFactoryOptions> => {
    return {
      uri: `mongodb://${ host }:${ port }/${ database }`,
    };
  },
};
