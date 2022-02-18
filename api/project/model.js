const db = require('../../data/dbConfig');

async function getProject() {
	const projects = await db('projects');
	const result = [];
	projects.forEach((project) => {
		result.push({
			...project,
			project_completed: project.project_completed ? true : false,
		});
	});
	return result;
}

async function getProjectById(id) {
	const project = await db('projects').where('project_id', id);
	if (project.length < 1) {
		return null;
	}
	const result = {
		...project[0],
		project_completed: project[0].project_completed ? true : false,
	};
	return result;
}

function postProject(project) {
	return db('projects')
		.insert(project)
		.then(([id]) => {
			return getProjectById(id);
		});
}

module.exports = {
	getProject,
	postProject,
};