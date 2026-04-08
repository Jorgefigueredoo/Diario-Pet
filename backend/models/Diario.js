const moongoose = require('mongoose');

const DiarioSchema = new moongoose.Schema(
    {
        titulo : {type: String},
        descricao : {type: String},
    }
)

module.exports = moongoose.model('Diario', DiarioSchema);