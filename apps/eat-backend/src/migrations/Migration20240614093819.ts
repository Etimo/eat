import { Migration } from '@mikro-orm/migrations';

export class Migration20240614093819 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `users` add `role` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `users` drop column `role`;');
  }

}
