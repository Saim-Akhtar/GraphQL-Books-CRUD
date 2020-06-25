const { Schema, model } = require('mongoose')

const AuthorSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true }
})

module.exports = model('Author',AuthorSchema)