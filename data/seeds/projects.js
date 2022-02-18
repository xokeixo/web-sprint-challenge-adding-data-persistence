const projects = [
  { project_name: 'Web API', project_description: 'Build APIs' },
  { project_name: 'Databases', project_description: 'Learn SQL', project_completed: 1 },
  { project_name: 'Authentication' }
];

exports.projects = projects;

exports.seed = function (knex) {
  return knex('projects').insert(projects)
}
