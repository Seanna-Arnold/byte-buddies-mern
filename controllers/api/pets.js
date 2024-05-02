const { Pet } = require('../../models/pet');

module.exports = {
  index,
  show,
  create,
  update,
  remove
};

async function index(req, res) {
  try {
    console.log(Pet)
  const pets = await Pet.find({});
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

async function create(req, res) {
  try {
    console.log(Pet)
    // req.body.user = req.user;
    console.log(req.body)
    const pet = await Pet.create(req.body);
    res.json(pet);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    const pet = await Pet.findByIdAndRemove(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json({ message: "Pet removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
