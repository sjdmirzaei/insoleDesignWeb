'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Priceplan Schema
 */
var PriceplanSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Priceplan name',
        trim: true
    },
    desc: {
        type: String,
        default: '',
        trim: true
    },
    purePrice: {
        type: Number,
        default: 0,
        required: 'Please fill PurePriceplan name',
        trim: true
    },
    price: {
        type: Number,
        default: 0,
        required: 'Please fill Priceplan name',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Priceplan', PriceplanSchema);
