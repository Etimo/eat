import { Migration } from '@mikro-orm/migrations';

export class Migration20240228152250 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `activity_types` (`id` varchar(36) not null, `created_at` varchar(255) not null, `updated_at` varchar(255) not null, `name` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `teams` (`id` varchar(36) not null, `created_at` varchar(255) not null, `updated_at` varchar(255) not null, `name` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `users` (`id` varchar(36) not null, `created_at` varchar(255) not null, `updated_at` varchar(255) not null, `name` varchar(255) not null, `team_id` varchar(36) null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `users` add index `users_team_id_index`(`team_id`);');

    this.addSql('create table `activities` (`id` varchar(36) not null, `created_at` varchar(255) not null, `updated_at` varchar(255) not null, `time` int not null, `date` varchar(255) not null, `activity_type_id` varchar(36) not null, `user_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `activities` add index `activities_activity_type_id_index`(`activity_type_id`);');
    this.addSql('alter table `activities` add index `activities_user_id_index`(`user_id`);');

    this.addSql('alter table `users` add constraint `users_team_id_foreign` foreign key (`team_id`) references `teams` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `activities` add constraint `activities_activity_type_id_foreign` foreign key (`activity_type_id`) references `activity_types` (`id`) on update cascade;');
    this.addSql('alter table `activities` add constraint `activities_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;');
  }

}
