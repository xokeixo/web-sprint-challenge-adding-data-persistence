// build your `/api/tasks` router here
const express = require('express');
const Tasks = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
	Tasks.getTasks()
		.then(tasks => {
			res.json(tasks);
		})
		.catch(() => {
			res.status(500).json({ message: 'could not get tasks' });
		})
})


router.post('/', (req, res) => {
	Tasks.postTask(req.body)
		.then((postedTask) => {
			res.status(201).json(postedTask);
		})
		.catch(() => {
			res.status(500).json({ message: 'could not post task' });
		});
});

router.use((err, req, res, next) => {//eslint-disable-line
	res.status(500).json({
		customMessage: 'Something broke in the tasks router',
		message: err.message,
		stack: err.stack,
	});
});

module.exports = router;