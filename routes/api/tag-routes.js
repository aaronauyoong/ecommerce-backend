const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
router.get("/", async (req, res) => {
  // search for all tags
	const tagData = await Tag.findAll({
		include: [
			{
				model: Product,
				attributes: ["id", "product_name", "price", "stock", "category_id"],
			},
		],
	});
	return res.status(200).json(tagData);
});

router.get("/:id", async (req, res) => {
  // find a tag by its primary key
	const tagData = await Tag.findByPk(req.params.id, {
		include: [
			{
				model: Product,
				attributes: ["id", "product_name", "price", "stock", "category_id"],
			}
		]
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
  // update a tag by its `id` value
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
  // delete one tag by its `id` value
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
