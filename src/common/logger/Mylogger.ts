import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    // eslint-disable-next-line prefer-rest-params
    super.error.apply(this, arguments);
  }
}
