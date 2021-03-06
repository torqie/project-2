const db = require('../models');

// Get All Tutorials
exports.findAll = async (req, res) => {
  const tutorials = await db.Tutorial.findAll({
    limit: parseInt(req.query.limit) || 10,
    include: db.User,
  });
  if (req.params.categoryId) {
    tutorials = await db.Tutorial.findAll({
      where: {
        CategoryId: req.params.categoryId,
      },
      include: db.User,
    });
  }
  res.json(tutorials);
};

// Get All Tutorials
exports.topTutorialsByViews = async (req, res) => {
  let tutorials = await db.Tutorial.findAll({
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['views', 'DESC'],
    ],
    include: db.User,
  });
  if (req.params.categoryId) {
    tutorials = await db.Tutorial.findAll({
      where: {
        CategoryId: req.params.categoryId,
      },
      include: db.User,
    });
  }
  res.json(tutorials);
};

// Get All Tutorials By Category
exports.findOne = async (req, res) => {
  const tutorial = await db.Tutorial.findOne({
    where: { id: req.params.id },
    include: [db.User, db.Category],
  });
  res.json(tutorial);
};

// Create A Tutorial
exports.create = async (req, res) => {
  const tutorial = new db.Tutorial({
    UserId: req.user.id,
    CategoryId: req.body.categoryId,
    description: req.body.description,
    title: req.body.title,
    content: req.body.content,
  });
  try {
    await tutorial.save();
    res.status(201).json(tutorial);
    tutorial.reload();
  } catch (e) {
    console.log('error: ', e);
  }
};

exports.update = async (req, res) => {
  const tutorial = db.Tutorial.findByPk(req.params.category_id);
  tutorial.UserId = req.user.id;
  tutorial.category_id = req.body.category_id;
  tutorial.title = req.body.title;
  tutorial.content = req.body.content;
  try {
    await tutorial.save();
    res.status(201).json(tutorial);
  } catch (e) {
    console.log('error: ', e);
  }
};

exports.delete = async (req, res) => {
  const tutorial = await db.Tutorial.findByPk(req.params.id);

  try {
    await tutorial.destroy();
    res.status(200).json(tutorial);
  } catch (e) {
    console.log('error: ', e);
  }
};

exports.addView = async (req, res) => {
  const tutorial = await db.Tutorial.findByPk(req.params.id);
  await tutorial.increment({ views: 1 });
  await tutorial.reload();
  res.json(tutorial.views);
};




