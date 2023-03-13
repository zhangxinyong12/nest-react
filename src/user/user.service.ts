import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async find() {
    const list: User[] = await this.userRepository.find();
    return list;
  }

  async add(data: User) {
    // 检验用户名是否重复
    const { name } = data;
    if (!name) {
      throw new BusinessException('用户名必填');
    }
    const isHasUser = await this.userRepository.findOne({
      where: {
        name,
      },
    });
    console.log('addData', data);
    console.log('findData', isHasUser);
    if (isHasUser) {
      throw new BusinessException(`用户名:${name} 已存在`);
    }
    const user = new User(data);
    return this.userRepository.save(user);
  }

  // 删除
  async deleteHandle(name: string) {
    const list = await this.userRepository.delete({ name });
    return list;
  }
}
