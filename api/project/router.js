// build your `/api/projects` router here
const express = require('express');
const Projects = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(() => {
            res.status(500).json({message: 'could not get projects'});
        })
})

router.get('/:id', (req, res) => {
    Projects.getById(req.params.id)
        .then(project => {
            res.json(project);
        })
})

router.post('/', (req, res) => {
    const project = req.body;
    Projects.add(project)
        .then(posted => {
            res.status(201).json(posted);
        })
        .catch(() => {
            res.status(500).json({message: 'could not post project'});
        })
})

module.exports = router;