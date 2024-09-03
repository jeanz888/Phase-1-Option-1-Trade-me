const Item = require('../models/Item');

exports.createItem = async (req, res) => {
try {
  const item = await Item.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(item);
} catch (error) {
  res.status(400).json({ message: error.message });
}
};

exports.getAllItems = async (req, res) => {
try {
  const items = await Item.find().populate('createdBy', 'username');
  res.json(items);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

exports.getItemById = async (req, res) => {
try {
  const item = await Item.findById(req.params.id).populate('createdBy', 'username');
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

exports.updateItem = async (req, res) => {
try {
  const item = await Item.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!item) return res.status(404).json({ message: 'Item not found or unauthorized' });
  res.json(item);
} catch (error) {
  res.status(400).json({ message: error.message });
}
};

exports.deleteItem = async (req, res) => {
try {
  const item = await Item.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
  if (!item) return res.status(404).json({ message: 'Item not found or unauthorized' });
  res.json({ message: 'Item deleted successfully' });
} catch (error) {
  res.status(500).json({ message: error.message });
}
};