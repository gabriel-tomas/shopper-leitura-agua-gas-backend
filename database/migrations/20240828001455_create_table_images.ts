import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('images', (table) => {
    table.uuid('measure_uuid').primary();
    table.text('data').notNullable();
    table.string('image_url').notNullable();

    table.foreign('measure_uuid').references('measures.measure_uuid').onDelete('CASCADE');
  });
}



export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('images');
}

