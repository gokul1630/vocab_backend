const mongoose = require('mongoose')

const vocabSchema = mongoose.Schema({
	vocabName: { type: String },
	vocabData: { type: String },
})
module.exports = mongoose.model('Vocab', vocabSchema)
