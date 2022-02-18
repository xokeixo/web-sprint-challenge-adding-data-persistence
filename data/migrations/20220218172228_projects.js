/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
    .createTable('projects', table => {
        table.increments('project_id')
        table.string('project_name', 128).notNull()
        table.text('project_description', 512)
        table.boolean('project_completed').defaultTo(0)
    })
    .createTable('resources', table => {
        table.increments('resource_id')
        table.string('resource_name', 128).notNull().unique()
        table.text('resource_description', 512)
    })
    .createTable('tasks', table => {
        table.increments('task_id')
        table.text('task_description', 512).notNull()
        table.text('task_notes', 512)
        table.boolean('task_completed').defaultTo(0)
        table
            .integer('project_id')
            .unsigned()
            .notNull()
            .references('project_id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
    .createTable('project_resources', table => {
        table
            .integer('project_id')
            .unsigned()
            .notNull()
            .references('project_id')
            .inTable('projects')
        table
            .integer('resource_id')
            .unsigned()
            .notNull()
            .references('resource_id')
            .inTable('resources')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
