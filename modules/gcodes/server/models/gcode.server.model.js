'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Gcode Schema
 */
var GcodeSchema = new Schema({
    desc: {
        type: String,
    },
    status: {
        type: String,
        default: 'NOTPAYED'
    },
    PatientFirstName: {
        type: String,
        default: ''
    },
    PatientLastName: {
        type: String,
        default: ''
    },
    InsoleTitle: {
        type: String,
        default: ''
    },
    InsoleMemo: {
        type: String,
        default: ''
    },
    orderPrice: {
        type: Number,
        default: 0,
        required: 'Please fill Gcode Price',
        trim: true
    },
    data:{type: String},
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Gcode', GcodeSchema);
