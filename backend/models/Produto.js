const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema(
    {
        nome: { type: String },
        preco: { type: Number },
        descricao: { type: String },
    }
)

module.exports = mongoose.model('Produto', ProdutoSchema);
