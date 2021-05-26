const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
	const categoryData = await Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
  });
  return res.status(200).json(categoryData);
});

router.get("/:id", async (req, res) => {
	const categoryData = await Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
  });
  return res.status(200).json(categoryData);
});

router.post("/", (req, res) => {
	// create a new category
	Category.create();
});

router.put("/:id", (req, res) => {
	// update a category by its `id` value
	Category.update();
});

router.delete("/:id", async (req, res) => {
	// delete a category by its `id` value
	const categoryData = await Category.destroy({
		where: {
			id: req.params.id,
		},
	});
	if (!categoryData) {
		res.status(404).json({ message: "No category found with this id!" });
		return;
	}
	return res.status(200).json(categoryData);
});

module.exports = router;
