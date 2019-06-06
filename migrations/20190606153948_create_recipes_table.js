
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('dishes', tbl => {
            tbl.increments();
            tbl.string('dish', 128).notNullable().unique()
        })
        .createTable('recipes', tbl => {
            tbl.increments();
            tbl.string('recipe', 128).notNullable().unique();
            tbl.string('instructions', 250).notNullable();
            tbl
                .integer('dish_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('dishes')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })
        .createTable('ingredients', tbl => {
            tbl.increments();
            tbl.string('ingredient', 128).notNullable();
            tbl.float('quantity').notNullable();

        })
        .createTable('recipe_ingredients', tbl => {
            tbl.increments();
            tbl
                .integer('recipe_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('recipes')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
            tbl
                .integer('ingredient_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('ingredients')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')

        })
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('recipe_ingredients')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('recipes')
        .dropTableIfExists('dishes');
};
