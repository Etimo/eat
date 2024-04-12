import { Migration } from '@mikro-orm/migrations';

export class Migration20240311124138 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `competitions` (`id` varchar(36) not null, `created_at` varchar(255) not null, `updated_at` varchar(255) not null, `start_date` varchar(255) not null, `end_date` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('alter table `teams` add `competition_id` varchar(36) null;');
    this.addSql('alter table `teams` add constraint `teams_competition_id_foreign` foreign key (`competition_id`) references `competitions` (`id`) on update cascade on delete set null;');
    this.addSql('alter table `teams` add index `teams_competition_id_index`(`competition_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `teams` drop foreign key `teams_competition_id_foreign`;');

    this.addSql('drop table if exists `competitions`;');

    this.addSql('alter table `teams` drop index `teams_competition_id_index`;');
    this.addSql('alter table `teams` drop column `competition_id`;');
  }

}
