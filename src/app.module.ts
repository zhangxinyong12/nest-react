import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '124.71.160.218',
  port: 3306,
  username: 'zhang',
  password: 'ZHang123',
  database: 'nest',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  timezone: 'UTC',
  charset: 'utf8mb4',
  multipleStatements: true,
  dropSchema: false,
  synchronize: true, // 会自动同步创建数据库修改表结构 慎用 /** Invalid use of NULL value */
  logging: true,
  autoLoadEntities: true, // 自动导入实例
};

@Module({
  imports: [TypeOrmModule.forRoot({ ...ormconfig }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
