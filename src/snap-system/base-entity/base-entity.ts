import { EditorLog } from './editor-log';
import { IBaseEntity } from '@snapSystem/base-entity/base-entity.interface';
import { ObjectLiteral } from 'typeorm';

export abstract class BaseEntity
  extends EditorLog
  implements IBaseEntity, ObjectLiteral
{
  public id: number;

  [key: string]: any;
}
