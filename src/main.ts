import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 启用日志
    logger: ['error', 'warn'],
  });

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter()); // 这里一定要注意引入自定义异常的先后顺序，不然异常捕获逻辑会出现混乱

  // 添加热更新
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }

  const server = await app.listen(3000);
  const host = server.address().address;
  const port = server.address().port;
  console.log(host, port, '应用实例，访问地址为 http://%s:%s', host, port);
}
bootstrap();
