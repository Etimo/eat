import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { User } from '../User';

export class UserFactory extends Factory<User> {
  model = User;

  definition(): Partial<User> {
    return {
      name: faker.person.fullName(),
    };
  }
}
