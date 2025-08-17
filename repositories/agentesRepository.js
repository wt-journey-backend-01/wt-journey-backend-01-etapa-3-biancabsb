
const db = require('../db/db'); 
async function create(object) {
    try {
        const created = await db("agentes").insert(object, ["*"]);
        return created;
    } catch (error) {
        return null;
    }
}

async function read(id) {
    try {
        const agente = await db("agentes").select("*").where({ id });
        return agente[0] || null;
    } catch (error) {
        return null;
    }
}
async function readAll() {
    try {
        const agentes = await db("agentes").select("*");
        return agentes;
    } catch (error) {
        return null;
    }
}

async function update(id, fieldsToUpdate) {
    try {
        const updated = await db("agentes").where({ id: id }).update(fieldsToUpdate, ["*"])
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
        const deleted = await db("agentes").where({ id: id }).del()
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
