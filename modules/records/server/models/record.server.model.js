'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Record Schema
 */
var RecordSchema = new Schema({

    name: {
        type: String,
        default: '',
        required: 'Please fill Record name',
        trim: true
    },
    type:{
        type: String,
    },
    main:{
        type: String,
    },
    archive:{
        type: String,
    },
    lastupdate:{
        type: String,
    },
    uploadUrl:{
        type: String,
    },
    path:{
        type: String,
    },
    software:{
        type: String,
        default: 'PT-SCANSUIT',
    },

    ExamProfile: {
        ExamType:{ type: String},
        Date:{ type: String},
        ExamName:{ type: String},
        Memo:{ type: String},
        Pressure:{ type: String},
        DetailType:{ type: String},
    },
    PressureData: {
        type: Schema.Types.Mixed
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    patient: {
        type: Schema.ObjectId,
        ref: 'Patient',
        required: 'Please Select a Patient',
    },

});
mongoose.model('Record', RecordSchema);
