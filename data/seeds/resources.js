const resources = [
  { resource_name: 'keyboard' },
  { resource_name: 'computer', resource_description: 'Windows PC' }
];

exports.resources = resources;

exports.seed = function (knex) {
  return knex('resources').insert(resources)
}