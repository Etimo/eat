import { Migration } from '@mikro-orm/migrations';

export class Migration20240412095933 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `team_memberships` (`id` varchar(36) not null, `created_at` varchar(255) not null, `updated_at` varchar(255) not null, `team_id` varchar(36) not null, `user_id` varchar(36) not null, `member_from` varchar(255) not null, `member_to` varchar(255) null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `team_memberships` add index `team_memberships_team_id_index`(`team_id`);');
    this.addSql('alter table `team_memberships` add index `team_memberships_user_id_index`(`user_id`);');

    this.addSql('alter table `team_memberships` add constraint `team_memberships_team_id_foreign` foreign key (`team_id`) references `teams` (`id`) on update cascade;');
    this.addSql('alter table `team_memberships` add constraint `team_memberships_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;');

    this.addSql('drop table if exists `teams_users`;');

    this.addSql('alter table `users` drop foreign key `users_team_id_foreign`;');

    this.addSql('alter table `users` drop index `users_team_id_index`;');
    this.addSql('alter table `users` drop column `team_id`;');
  }

  async down(): Promise<void> {
    this.addSql('create table `teams_users` (`team_id` varchar(36) not null, `user_id` varchar(36) not null, primary key (`team_id`, `user_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `teams_users` add index `teams_users_team_id_index`(`team_id`);');
    this.addSql('alter table `teams_users` add index `teams_users_user_id_index`(`user_id`);');

    this.addSql('alter table `teams_users` add constraint `teams_users_team_id_foreign` foreign key (`team_id`) references `teams` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `teams_users` add constraint `teams_users_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;');

    this.addSql('drop table if exists `team_memberships`;');

    this.addSql('alter table `users` add `team_id` varchar(36) null;');
    this.addSql('alter table `users` add constraint `users_team_id_foreign` foreign key (`team_id`) references `teams` (`id`) on update cascade on delete set null;');
    this.addSql('alter table `users` add index `users_team_id_index`(`team_id`);');
  }

}
