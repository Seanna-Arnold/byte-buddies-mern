const Pet = require('../../models/pet');

module.exports = {
  index,
  show
};

async function index(req, res) {
  const pets = await Pet.find({});
  try {
  // re-sort based upon the sortOrder of the populated categories
  res.json(pets);
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
}  

async function show(req, res) {
  const pet = await Pet.findById(req.params.id);
  res.json(pet);
}