import { PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  //   Updated by?

  @Property({ onCreate: () => new Date().toISOString() })
  createdAt?: string;

  @Property({
    onCreate: () => new Date().toISOString(),
    onUpdate: () => new Date().toISOString(),
  })
  updatedAt?: string;
}
