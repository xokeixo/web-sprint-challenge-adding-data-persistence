const router = require('express').Router();
const Projects = require('./model');

router.get('/', (req, res) => {
	Projects.getProject()
		.then((projects) => {
			res.json(projects)
		})
		.catch(() => {
			res.status(500).json({ message: 'could not get projects'})
		});
});

router.get('/:id', (req, res) => {
    Projects.getById(req.params.id)
        .then(project => {
            res.json(project);
        })
})

router.post('/', (req, res) => {
	Projects.postProject(req.body)
		.then(newProject => {
				res.status(201).json(newProject)
		})
		.catch(() => {
			res.status(500).json({ message: 'could not post project'})
		});
});

module.exports = router;

router.use((err, req, res, next) => { //eslint-disable-line
	res.status(500).json({
		customMessage: 'Something broke in the projects router',
		message: err.message,
		stack: err.stack,
	});
});

module.exports = router;