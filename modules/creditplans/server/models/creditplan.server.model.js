'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Creditplan Schema
 */
var CreditplanSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Creditplan name',
        trim: true
    },
    expire: {
        type: Number, default: 0,
        required: 'Please fill Creditplan expire'
    },
    host: {
        type: Number, default: 0,
        required: 'Please fill Creditplan expire'
    },
    totalorder: {
        type: Number, default: 0,
        required: 'Please fill Creditplan totalorder'
    },
    price: {
        type: Number, default: 0,
        required: 'Please fill Creditplan price'
    },
    discount: {
        type: Number, default: 0,
        required: 'Please fill Creditplan discount'
    },
    featured:{
        default:false,
        type:Boolean
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

mongoose.model('Creditplan', CreditplanSchema);
