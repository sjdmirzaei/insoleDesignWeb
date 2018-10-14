'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Gcodeplan Schema
 */
var GcodeplanSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Gcodeplan name',
        trim: true
    },
    // expire: {
    //     type: Number, default: 0,
    //     required: 'Please fill Gcodeplan expire'
    // },
    // host: {
    //     type: Number, default: 0,
    //     required: 'Please fill Gcodeplan expire'
    // },
    totalorder: {
        type: Number, default: 0,
        required: 'Please fill Gcodeplan totalorder'
    },
    price: {
        type: Number, default: 0,
        required: 'Please fill Gcodeplan price'
    },
    discount: {
        type: Number, default: 0,
        required: 'Please fill Gcodeplan discount'
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

mongoose.model('Gcodeplan', GcodeplanSchema);
