'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Transaction Schema
 */
var TransactionSchema = new Schema({
    detail: {
        type: String,
        default: '',
        trim: true
    },
    withdraw:{ type:Number,
        default:0},
    deposit:{ type:Number,
        default:0},
    creditPlan:{
      type:Schema.Types.Mixed
    },
    orderPrice:{
        type:Number,
        default:0
    },
    order: {
        type: Schema.ObjectId,
        ref: 'Order'
    },
    authority:{
        type: String,
        trim: true
    },
    RefID:{
        type: String,
        trim: true
    },
    status:{
        type: String,
    },
    type:{
        type: String,
        default: 'ORDER',
        trim: true
    },
    gcode: {
        type: Schema.ObjectId,
        ref: 'Gcode'
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

mongoose.model('Transaction', TransactionSchema);
