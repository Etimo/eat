import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { User } from '../User';

export class UserFactory extends Factory<User> {
  model = User;

  definition(): Partial<User> {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      name: `${firstName} ${lastName}`,
      email: `${firstName}.${lastName}@etimo.se`.toLowerCase(),
      picture: 'https://i.imgur.com/hE5XaTq.png',
      role: 'member',
    };
  }
}
