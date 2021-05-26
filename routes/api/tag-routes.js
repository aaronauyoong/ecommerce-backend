const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
	// find all tags
	Tag.findAll.then(() => {});
	// be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
	// find a single tag by its `id`
	Tag.findByPk().then(() => {});
	// be sure to include its associated Product data
});

router.post("/", (req, res) => {
	// create a new tag
	Tag.create().then(() => {});
});

router.put("/:id", (req, res) => {
	// update a tag's name by its `id` value
	Tag.update(
		{
			tag_name: req.body.tag_name,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	) //then statement
		.then(() => {})
		.catch((err) => {
			// console.log(err);
			res.status(400).json(err);
		});
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
