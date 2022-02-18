// build your `/api/resources` router here
const express = require('express');
const Resource = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
	Resource.getResource()
		.then((resources) => {
			res.status(200).json(resources);
		})
		.catch(() => {
			res.status(500).json({ message: 'could not get resources' });
		});
});

router.post('/', (req, res) => {
	Resource.postResource(req.body)
		.then((postedResource) => {
			res.status(201).json(postedResource);
		})
		.catch(() => {
			res.status(500).json({ message: 'could not post resource' });
		});
});

router.use((err, req, res, next) => {//eslint-disable-line
	res.status(500).json({
		customMessage: 'Something broke in the resources router',
		message: err.message,
		stack: err.stack,
	});
});

module.exports = router;