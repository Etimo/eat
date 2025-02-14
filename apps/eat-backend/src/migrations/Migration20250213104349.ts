import { Migration } from '@mikro-orm/migrations';

export class Migration20250213104349 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `team_memberships` drop column `member_from`, drop column `member_to`;');

    this.addSql('alter table `activities` add `competition_id` varchar(36) not null;');
    this.addSql('alter table `activities` add constraint `activities_competition_id_foreign` foreign key (`competition_id`) references `competitions` (`id`) on update cascade;');
    this.addSql('alter table `activities` add index `activities_competition_id_index`(`competition_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `activities` drop foreign key `activities_competition_id_foreign`;');

    this.addSql('alter table `team_memberships` add `member_from` varchar(255) not null, add `member_to` varchar(255) null;');

    this.addSql('alter table `activities` drop index `activities_competition_id_index`;');
    this.addSql('alter table `activities` drop column `competition_id`;');
  }

}
