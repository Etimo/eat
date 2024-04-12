import { Filter, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

// Soft delete filter
// @Filter({ name: 'deleted', cond: { deleted: { $eq: 'Y' } } })
export abstract class BaseEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  //   Updated by?

  // Soft delete ?
  // @Property({ default: 'N' })
  // deleted: string;

  @Property({ onCreate: () => new Date().toISOString() })
  createdAt?: string;

  @Property({
    onCreate: () => new Date().toISOString(),
    onUpdate: () => new Date().toISOString(),
  })
  updatedAt?: string;
}
