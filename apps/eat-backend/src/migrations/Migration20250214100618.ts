import { Migration } from '@mikro-orm/migrations';

export class Migration20250214100618 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `competitions` add `name` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `competitions` drop column `name`;');
  }

}
