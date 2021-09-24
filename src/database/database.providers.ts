import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './database.constants';
import config from '../config/config';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => {
      try {
        await mongoose.connect(config.connectionString);
        console.log('connect is successful to', config.connectionString);
      } catch (err) {
        console.log('connect is unsucessful!!!!', err);
      }
    },
  },
];
