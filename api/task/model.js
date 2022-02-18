// build your `Task` model here
const db = require('./../../data/dbConfig');

async function get() {
    const tasks = await db('tasks as t')
        .leftJoin('projects as p', 'p.project_id', 't.project_id');
    const result = [];
    tasks.forEach(task => {
        result.push({
            ...task,
            task_completed: task.task_completed ? true : false
        })
    });
    return result;
}

async function getById(id) {
    const task = await db('tasks')
        .where('task_id', id);
    if(task.length < 1) {
        return null;
    }
    const result = {
        ...task[0],
        task_completed: task[0].task_completed ? true: false
    }
    return result;
}

function add(resource) {
    return db('tasks')
        .insert(resource)
        .then(([id]) => {
            return getById(id);
        })
}

module.exports = {
    get,
    add
};