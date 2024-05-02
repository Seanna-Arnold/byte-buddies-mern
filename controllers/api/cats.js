const { Cat } = require('../../models/cat');

module.exports = {
  index,
  show,
  create,
  update,
  remove
};

async function index(req, res) {
  try {
    console.log(Cat)
  const cats = await Cat.find({});
  // re-sort based upon the sortOrder of the populated categories
  res.json(cats);
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
}  

async function show(req, res) {
  const cat = await Cat.findById(req.params.id);
  res.json(cat);
}

async function create(req, res) {
  try {
    console.log(Cat)
    // req.body.user = req.user;
    console.log(req.body)
    const cat = await Cat.create(req.body);
    res.json(cat);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const cat = await Cat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cat) {
      return res.status(404).json({ message: "Cat not found" });
    }
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    const cat = await Cat.findByIdAndRemove(req.params.id);
    if (!cat) {
      return res.status(404).json({ message: "Cat not found" });
    }
    res.json({ message: "Cat removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
