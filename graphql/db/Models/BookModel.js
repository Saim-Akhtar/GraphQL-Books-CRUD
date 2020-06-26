const { Schema, model } = require('mongoose')

const BookSchema = Schema({
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    genre: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
})

module.exports = model('Book',BookSchema)