import { Migration } from '@mikro-orm/migrations';

export class Migration20240220131359 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `activities` (`id` varchar(36) not null, `created_at` varchar(255) not null, `updated_at` varchar(255) not null, `name` varchar(255) not null, `time` int not null, `date` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `activity_types` (`id` varchar(36) not null, `created_at` varchar(255) not null, `updated_at` varchar(255) not null, `name` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `teams` (`id` varchar(36) not null, `created_at` varchar(255) not null, `updated_at` varchar(255) not null, `name` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `users` (`id` varchar(36) not null, `created_at` varchar(255) not null, `updated_at` varchar(255) not null, `name` varchar(255) not null, `team_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `users` add index `users_team_id_index`(`team_id`);');

    this.addSql('alter table `users` add constraint `users_team_id_foreign` foreign key (`team_id`) references `teams` (`id`) on update cascade;');
  }

}
