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

/**
 * Transaction Schema
 */
var OnlinePaymentSchema = new Schema({
  authority: {
    type: String,
    default: ''
  },
  amount: {
    type: Number, default: 0
  },
  expire: {
    type: Number, default: 0
  },
  software: {
    type: String,
    default: ''
  },
  host: {
    type: Number, default: 0
  },
  totalorder: {
    type: Number, default: 0
  },
  price: {
    type: Number, default: 0
  },
  plantype: {
    type: String,
    default: ''
  },
  user_id: {
    type: String,
    default: ''
}
});

mongoose.model('OnlinePayment', OnlinePaymentSchema);

/**
 * OnlinePaymentRecordsSchema Schema
 */
var OnlinePaymentRecordsSchema = new Schema({
  /// Zarinpal Data
  authority: {
    type: String,
    default: ''
  },
  ///Payment data
  price: {
    type: Number, default: 0
  },
  created: {
    type: Date,
    default: Date.now
  },
  state:{
    type:String, default:'Clicked on pay button!'
  },
  ///User Data
  software: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
});
mongoose.model('OnlinePaymentRecords', OnlinePaymentRecordsSchema);
