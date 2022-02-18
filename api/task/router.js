// build your `/api/tasks` router here
const express = require('express');
const Tasks = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
    Tasks.get()
        .then(tasks => {
            res.json(tasks);
        })
        .catch(() => {
            res.status(500).json({message: 'could not get tasks'});
        })
})

router.post('/', (req, res) => {
    const resource = req.body;
    Tasks.add(resource)
        .then(posted => {
            res.status(201).json(posted);
        })
        .catch(() => {
            res.status(500).json({message: 'could not post task'});
        })
})

module.exports = router;