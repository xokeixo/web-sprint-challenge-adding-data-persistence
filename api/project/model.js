// build your `Project` model here
const db = require('./../../data/dbConfig');

async function get() {
    const projects = await db('projects');
    const result = [];
    projects.forEach(project => {
        result.push({
            ...project,
            project_completed: project.project_completed ? true : false
        })
    });
    return result;
}

async function getById(id) {
    const project = await db('projects')
        .where('project_id', id);
    if(project.length < 1) {
        return null;
    }
    const result = {
        ...project[0],
        project_completed: project[0].project_completed ? true: false
    };
    return result;
}

function add(project) {
    return db('projects')
        .insert(project)
        .then(([id]) => {
            return getById(id);
        })
}

module.exports = {
    get,
    getById,
    add
};