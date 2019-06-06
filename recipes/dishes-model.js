const knex = require('knex');
const knexConfig = require('../knexfile')

db = knex(knexConfig.development)

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    getRecipes
};


function find() {
    return db('dishes');
}

function findById(id) {
    return db('dishes')
        .where({ id })
        .first();
}

function getRecipes() {
    return db("dishes as d")
      .join("recipes as r", "d.id", "r.dish_id")
      .select("r.id", "r.name as recipe", "d.name as dish");
  }
  


function add(dish) {
    return db('dishes')
        .insert(dish, 'id')
        .then(([id]) => {
            return findById(id);
        });
}

function update(id, changes) {
    return db('dishes')
        .where({ id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                return findById(id);
            } else {
                return null;
            }
        });
}

function remove(id) {
    return db('dishes')
        .where({ id })
        .del();
}