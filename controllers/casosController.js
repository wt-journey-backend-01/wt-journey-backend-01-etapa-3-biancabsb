const casosRepository = require('../repositories/casosRepository');
class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const getAllCasos = async (req, res, next) => {
    try {
        const casos = await casosRepository.readAll();
        res.status(200).json(casos);
    } catch (error) {
        next(error);
    }
};
const getCasoById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const caso = await casosRepository.read(id);
        if (!caso) {
            next(new APIError("Caso não encontrado", 404));
            return;
        }
        res.status(200).json(caso);
    } catch (error) {
        next(error);
    }
};
const createCaso = async (req, res, next) => {
    try {
        const { titulo, descricao, status, agentes_id } = req.body;
        const agente = await agentesRepository.read(agentes_id);
        if (!agente) {
            next(new APIError("Agente não encontrado para o caso", 404));
            return;
        }
        if (!titulo || !descricao || !status || !agentes_id) {
            next(new APIError("Todos os campos são obrigatórios", 400));
            return;
        }
        if (!["aberto", "solucionado"].includes(status)) {
            next(new APIError("Status inválido", 400));
            return;
        }
        const novoCaso = await casosRepository.create(titulo, descricao, status, agentes_id);
        res.status(201).json(novoCaso);
    } catch (error) {
        next(error);
    }
};
const updateCaso = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, status, agentes_id } = req.body;
        if (!agente) {
            next(new APIError("Agente não encontrado para o caso", 404));
            return;
        }
        if (!titulo || !descricao || !status || !agentes_id) {
            next(new APIError("Todos os campos são obrigatórios", 400));
            return;
        }
        if (!["aberto", "solucionado"].includes(status)) {
            next(new APIError("Status inválido", 400));
            return;
        }
        const casoAtualizado = await casosRepository.update(id, titulo, descricao, status, agentes_id);
        if (!casoAtualizado) {
            next(new APIError("Caso não encontrado", 404));
            return;
        }
        res.status(200).json(casoAtualizado);
    } catch (error) {
        next(error);
    }
};
const updateCasoPartial = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, status, agentes_id } = req.body;
        const casoAtualizado = await casosRepository.update(id, titulo, descricao, status, agentes_id);
        if (!casoAtualizado) {
            next(new APIError("Caso não encontrado", 404));
            return;
        }
        res.status(200).json(casoAtualizado);
    } catch (error) {
        next(error);
    }
};

const deleteCaso = async (req, res, next) => {
    const { id } = req.params;
    try {
        const resultado = await casosRepository.remove(id);
        if (!resultado) {
            next(new APIError("Caso não encontrado", 404));
            return;
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
module.exports = {
    getAllCasos,
    getCasoById,
    createCaso,
    updateCaso,
    updateCasoPartial,
    deleteCaso
};