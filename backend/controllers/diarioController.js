const Diario = require('../models/Diario');

exports.listarDiario = async (req, res) => { 
    const diarios = await Diario.find();
    res.json(diarios); 
};

exports.createDiario = async (req, res) => {
    const diario = await Diario.create(req.body);
    res.json(diario).status(201);
};

exports.updateDiario = async (req, res) => { 
    const diario = await Diario.findByIdAndUpdate(req.params.id, req.body);
    res.json(diario);
};

exports.deleteDiario = async (req, res) => { 
    const diario = await Diario.findByIdAndRemove(req.params.id);
    res.json({m: 'Diário deletado com sucesso'});

};

exports.umDiario = async (req, res) => {
        const diario = await Diario.findById(req.params.id);
        res.json(diario);
};