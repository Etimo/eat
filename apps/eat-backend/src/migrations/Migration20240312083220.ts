import { Migration } from '@mikro-orm/migrations';

export class Migration20240312083220 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `teams_users` (`team_id` varchar(36) not null, `user_id` varchar(36) not null, primary key (`team_id`, `user_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `teams_users` add index `teams_users_team_id_index`(`team_id`);');
    this.addSql('alter table `teams_users` add index `teams_users_user_id_index`(`user_id`);');

    this.addSql('alter table `teams_users` add constraint `teams_users_team_id_foreign` foreign key (`team_id`) references `teams` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `teams_users` add constraint `teams_users_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `teams_users`;');
  }

}
