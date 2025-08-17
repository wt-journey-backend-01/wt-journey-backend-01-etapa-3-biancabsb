const db = require('../db/db'); 
async function create(object) {
    try {
        const created = await db("casos").insert(object, ["*"]);
        return  created[0];
    } catch (error) {
        return null;
    }
}

async function read(id) {
    try {
        const caso = await db("casos").select("*").where({ id });
        return caso[0] || null;
    } catch (error) {
        return null;
    }
}
async function readAll() {
    try {
        const casos = await db("casos").select("*");
        return casos;
    } catch (error) {
        return null;
    }
}

async function update(id, fieldsToUpdate) {
    try {
        const updated = await db("casos").where({ id: id }).update(fieldsToUpdate, ["*"])
        if (!updated) {
            return false
        }
        return updated[0]
    } catch (error) {
        console.log(error)
        return false
    }
}

async function remove(id) {
    try {
        const deleted = await db("casos").where({ id: id }).del()
        if (!deleted) {
            return false
        }
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    create,
    read,
    readAll,
    update,
    remove
}
