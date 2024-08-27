import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('measures', (table) => {
    table.uuid('measure_uuid').primary();
    table.datetime('measure_datetime').notNullable();
    table.string('measure_type').notNullable();
    table.boolean('has_confirmed').notNullable().defaultTo(false);
    table.string('image_url').notNullable();
    table.string('measure_value').notNullable();

    table.string('fk_customer_code', 100).notNullable();
    table.foreign('fk_customer_code')
      .references('customers.customer_code')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}



export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('measures');
}

