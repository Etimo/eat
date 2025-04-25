import { Migration } from '@mikro-orm/migrations';

export class Migration20250424132144 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`competitions\` add \`is_active\` tinyint(1) not null default false;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`competitions\` drop column \`is_active\`;`);
  }

}
