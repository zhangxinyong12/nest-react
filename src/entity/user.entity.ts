/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class User {


    // 会以类名来创建表,如果是驼峰命名的,生成的表名是下划线区分
    @PrimaryGeneratedColumn({ comment: '主键id' })
    id: number;

    @Column({ type: 'varchar', length: 20, comment: '名字' })
    name: string

    @Column({ type: 'varchar', length: 20, comment: "密码", })
    password: string;

    // 数字类型 支持 width
    @Column({ type: 'int', width: 2, comment: "类别", default: 3 })
    type: number;

    @Column({ type: 'varchar', comment: "备注信息", nullable: true })
    msg: string;


    constructor(data) {
        const { name, password, type, msg } = data ?? {}
        this.name = name
        this.password = password
        this.type = type
        this.msg = msg
    }
}
