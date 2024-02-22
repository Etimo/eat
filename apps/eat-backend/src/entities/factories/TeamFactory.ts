import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Team } from '../Team';

export class TeamFactory extends Factory<Team> {
  model = Team;

  definition(): Partial<Team> {
    return {
      name: faker.animal.dog(),
    };
  }
}
