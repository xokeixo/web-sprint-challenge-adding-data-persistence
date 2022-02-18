// build your `Resource` model here
const db = require('../../data/dbConfig');

function getResource() {
	return db('resources');
}
async function getResourceById(id) {
    const result = await db('resources')
        .where('resource_id', id);
    if(result.length < 1) {
        return null;
    }
    return result;
}

async function postResource(resource) {
    const id = await db('resources')
        .insert(resource);
    const result = await getResourceById([id]);
    const postedResource = {
        resource_description: result[0].resource_description,
        resource_id: result[0].resource_id,
        resource_name: result[0].resource_name
    };
    return postedResource;
}

module.exports = {
	getResource,
	postResource,
};