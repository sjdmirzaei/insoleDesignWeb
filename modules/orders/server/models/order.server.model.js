'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    shortid = require('shortid'),
    Schema = mongoose.Schema;


/**
 * Order Schema
 */

var OrderSchema = new Schema({
    sid: {
        type: String,
        'default': shortid.generate,
        unique:true
    },
    orderer: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Please Select a Orderer',
    },
    cncUser: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Please Select a CncUser',
    },
    records: [{
        type: Schema.ObjectId,
        ref: 'Record'
    }],
    desc:{
        type: String,
    },
    GCODE: {
        type: String,
        default: 'NOTGET'
    },
    status: {
        type: String,
        default: 'NOTPAYED'
    },
    sendTome:{
      type:Boolean,
        default:false
    },
    doDesign:{
        type:Boolean,
        default:false
    },
    pricePlan: {
        type: Schema.ObjectId,
        ref: 'Priceplan',
    },
    orderPrice: {
        type: Number,
        default: 0,
        required: 'Please fill Order Price',
        trim: true
    },
    patient: {
        type: Schema.ObjectId,
        ref: 'Patient',
        required: 'Please Select a Patient'
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

mongoose.model('Order', OrderSchema);
