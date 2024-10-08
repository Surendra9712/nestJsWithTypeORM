import { Exclude } from 'class-transformer';

export class BaseEntitySerializer {
  public id: number;

  public createdAt: Date;

  public updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  public deletedAt: Date;

  [key: string]: any;
}
