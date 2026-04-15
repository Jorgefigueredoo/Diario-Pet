const Produto = require('../models/Produto');

exports.listarProdutos = async (req, res) => {
    const produtos = await Produto.find();
    res.json(produtos);
};

exports.createProduto = async (req, res) => {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
};

exports.updateProduto = async (req, res) => {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(produto);
};

exports.deleteProduto = async (req, res) => {
    await Produto.findByIdAndDelete(req.params.id);
    res.json({ m: 'Produto deletado com sucesso' });
};

exports.umProduto = async (req, res) => {
    const produto = await Produto.findById(req.params.id);
    res.json(produto);
};
