const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
	// find all tags
	const tagData = await Tag.findAll({
		include: [
			{
				// be sure to include its associated Product data
				model: Product,
				attributes: ["id", "product_name", "price", "stock", "category_id"],
			},
		],
	});
	return res.status(200).json(tagData);
});

router.get("/:id", async (req, res) => {
	// find a single tag by its `id`
	const tagData = await Tag.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				// be sure to include its associated Product data
				model: Product,
				attributes: ["id", "product_name", "price", "stock", "category_id"],
			},
		],
	});
	return res.status(200).json(tagData);
});

router.post("/", async (req, res) => {
	// create a new tag
	const tagData = await Tag.create({
		tag_name: req.body.tag_name,
	});
	return res.status(200).json(tagData);
});

router.put("/:id", async (req, res) => {
	// update a tag's name by its `id` value
	const tagData = await Tag.update(
		{
			tag_name: req.body.tag_name,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	);
  return res.status(200).json(tagData);
});

router.delete("/:id", async (req, res) => {
	// delete on tag by its `id` value
	const tagData = await Tag.destroy({
		where: {
			id: req.params.id,
		},
	});
	if (!tagData) {
		res.status(404).json({ message: "No tag found with this id!" });
		return;
	}
	return res.status(200).json(tagData);
});

module.exports = router;
