import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('customers', (table) => {
    table.string('customer_code', 100).primary();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('customers');
}

