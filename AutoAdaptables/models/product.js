'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
	name: String,
	picture: String,
	quantity: { type: Number, default: 0},
	category: { type: String, enum: ['Lamparas', 'Bombillos', 'Sensores', 'Rosetas']},
	description: String
})

module.exports = mongoose.model('Product', ProductSchema)