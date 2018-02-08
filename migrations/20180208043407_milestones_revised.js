
exports.up = function(knex, Promise) {
    return Promise.all([
     knex.schema.createTable('milestones', function(table){
       table.uuid('id').notNullable().primary();
       table.string('description');
       table.date('date_achieved');
       table.biginteger('famous_people').unsigned().notNullable().references('id').inTable('famous_people').onDelete('CASCADE').index();
       // table.timestamps();
     })
   ]);
 };
 exports.down = function(knex, Promise) {
   return Promise.all([
     knex.schema.dropTable('milestones')
   ]);
 };