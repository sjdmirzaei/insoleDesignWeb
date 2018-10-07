'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Usercredit Schema
 */
var UsercreditSchema = new Schema({
    fishNumber: {
        type: String,
        default: '',
        required: 'Please fill Usercredit name',
        trim: true
    },
    desc:{
        type: String,
        default: '',
    },
    planDetail:{type:Schema.Types.Mixed},
    status: {type: Boolean, default: false},
    fishPrice: {
        type: String,
        default: '',
        required: 'Please fill Usercredit name',
        trim: true
    },
    verifyDate: {
        type: Date
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

mongoose.model('Usercredit', UsercreditSchema);
