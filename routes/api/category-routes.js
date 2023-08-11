const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const catDat = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(catDat);
  }catch (err){
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try{
    const catData = await Category.findByPk(req.params.id,{
      include: [{ model: Product}]
    });

    if (!catData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(catData);
  }
  catch(err){
    res.status(500).json(err);
      }
});

// create a new category
router.post('/', async (req, res) => {
  try{
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  }
  catch (err){
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const catUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(catUpdate);
  }
  catch (err){
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
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
