const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
	// find all categories
	Category.findAll().then(() => {});
	// be sure to include its associated Products
});

router.get("/:id", (req, res) => {
	// find one category by its `id` value
	Category.findByPk().then(() => {});
	// be sure to include its associated Products
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
