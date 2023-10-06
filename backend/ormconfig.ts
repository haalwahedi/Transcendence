import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { Ban } from './src/entities/ban.entity';
import { Channel } from './src/entities/channel.entity';
import { Match } from './src/entities/match.entity';
import { Message } from './src/entities/message.entity';
import { Mute } from './src/entities/mute.entity';
import {User} from './src/entities/user.entity'
// import { SessionEnt } from 'src/entities/session.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Friendship } from 'src/entities/friend.entity';

export const config: PostgresConnectionOptions = {
      type: "postgres", //ex: process.env.DATABASE_TYPE
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'pass',
      database: 'test',
      entities: [User, Mute, Ban, Channel, Match, Message, Friendship],
      // migrations: ['dist/database/migrations/*.js'],
      synchronize: true,
      //logging: true, //log queries
    }

    // const dataSource = new DataSource (config);
    // export default dataSource;

