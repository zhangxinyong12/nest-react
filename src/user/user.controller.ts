import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  list(@Query() query): Promise<User[]> {
    return this.userService.find();
  }

  @Post('add')
  add(@Body() body: User, @Query() query) {
    console.log(body, query);
    return this.userService.add(body);
  }

  // 接收formData 参数
  @Post('upload')
  @UseInterceptors(FileInterceptor('name'))
  upload(@UploadedFile() name: Express.Multer.File) {
    console.log(name);
    return '上传成功';
  }

  @Post('delete')
  delete(@Body() body: User) {
    return this.userService.deleteHandle(body.name);
  }
}
