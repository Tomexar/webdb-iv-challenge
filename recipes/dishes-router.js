const knex = require('knex')
const router = require('express').Router()
const Dishes = require('./dishes-model.js')

router.get('/', (req, res) => {
  Dishes.find()
    .then(dishes => {
      res.status(200).json(dishes);
    })
    .catch(error => {
      res.status(500).json({ message: 'We ran into an error retrieving the dishes' });
    });
});

router.get('/5', (req, res) => {
  Dishes.getRecipes()
    .then(dishes => {
      res.status(200).json(dishes);
    })
    .catch(error => {
      res.status(500).json({ message: 'We ran into an error retrieving the dishes' });
    });
});

router.get('/:id', (req, res) => {
  Dishes.findById(req.params.id)
    .then(dish => {
      if (dish) {
        res.status(200).json(dish);
      } else {
        res.status(404).json({ message: 'Dish not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  Dishes.add(req.body)
    .then(dish => {
      res.status(200).json(dish);
    })
    .catch(error => {
      res.status(500).json({ message: 'We ran into an error adding the dish' });
    });
});

router.put('/:id', (req, res) => {
  Dishes.update(req.params.id, req.body)
    .then(dish => {
      res.status(200).json(dish);
    })
    .catch(error => {
      res.status(500).json({ message: 'We ran into an error updating the dish' });
    });
});

router.delete('/:id', (req, res) => {
  Dishes.remove(req.params.id)
    .then(dish => {
      res.status(200).json(dish);
    })
    .catch(error => {
      res.status(500).json({ message: 'We ran into an error deleting the dish' });
    });
});

module.exports = router;