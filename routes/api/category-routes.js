const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const catDat = await Category.findall({
      include: [{model: Product}]
    });
    res.status(200).json(catDat);
  }catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const catDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catDelete) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(catDelete);
  }
  catch (err){
    res.status(400).json(err);
  }
});

module.exports = router;
