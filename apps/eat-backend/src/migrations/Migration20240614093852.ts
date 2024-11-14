import { Migration } from '@mikro-orm/migrations';

export class Migration20240614093852 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `users` modify `role` varchar(255) not null default \'member\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table `users` modify `role` varchar(255) not null;');
  }

}
