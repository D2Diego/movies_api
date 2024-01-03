exports.up = function (knex) {
    return knex.schema.alterTable('movie_tags', function (table) {

        table.dropForeign('note_id');
        table.foreign('note_id').references('id').inTable('movie_notes').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('movie_tags', function (table) {

        table.dropForeign('note_id');
        table.foreign('note_id').references('id').inTable('movie_notes');
    });
};
