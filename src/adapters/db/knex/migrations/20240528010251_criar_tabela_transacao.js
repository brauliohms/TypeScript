exports.up = async function (knex) {
  const existe = await knex.schema.hasTable("transacao");
  if (existe) return;

  return knex.schema.createTable("transacao", (table) => {
    table.uuid("id").primary();
    table.string("descricao").notNullable();
    table.decimal("valor").notNullable();
    table.date("vencimento").notNullable();
    table.uuid("usuario_id").references("id").inTable("usuario").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("transacao");
};
