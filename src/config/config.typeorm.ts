import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configTypeOrm: TypeOrmModuleOptions = {
    //production: false,
    //dbConnections: {
     // mysql: {
        type: 'mysql',
        name: 'default',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '',
        database: 'evaluacion',
        synchronize: true,
        extra:{
          insecureAuth:true
        },
        retryDelay: 40000,
        retryAttempts: 3,
        connectTimeout: 40000,
        keepConnectionAlive: true,
        dropSchema: false,
        charset: 'utf8mb4',
        timezone: 'local',
        ssl: false,
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}'
        ]
    //  },
  //  },
    /*redisConnection: {
      port: 14327,
      pass: 'vqLLxYIBn4AEkx0QyIT0NesJCYX0WehB',
      host: 'redis-14327.c9.us-east-1-4.ec2.cloud.redislabs.com',
      db: 0,
      ttl: 60000 * 24 * 30,
    },*/
   /* expressSession: {
      secret: 'Secreto',
      resave: true,
      cookie: { maxAge: 60000 * 24 * 30 },
      saveUninitialized: true,
    },*/
    //port: 8080,
  };
  