import { Migration } from '@mikro-orm/migrations';

export class Migration20240613124016 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `users` add `email` varchar(255) not null, add `picture` varchar(255) not null;');
    this.addSql('alter table `users` add unique `users_email_unique`(`email`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `users` drop index `users_email_unique`;');
    this.addSql('alter table `users` drop column `email`;');
    this.addSql('alter table `users` drop column `picture`;');
  }

}
