'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Softwareupdate Schema
 */
var SoftwareupdateSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Softwareupdate name',
    trim: true
  },
  version: {
      type: String,
      default: '',
      required: 'Please fill version name',
      trim: true
  },
    filePath:{
        type: String,
        default: '',
        required: 'Please fill filePath',
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
},{
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    timestamps: true
});

mongoose.model('Softwareupdate', SoftwareupdateSchema);
