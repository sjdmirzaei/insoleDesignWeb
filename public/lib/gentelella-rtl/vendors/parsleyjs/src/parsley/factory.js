import $ from 'jquery';
<<<<<<< HEAD
import Utils from './utils';
import Base from './base';
import Form from './form';
import Field from './field';
import Multiple from './multiple';

var Factory = function (element, options, parsleyFormInstance) {
  this.element = element;
=======
import ParsleyUtils from './utils';
import ParsleyAbstract from './abstract';
import ParsleyForm from './form';
import ParsleyField from './field';
import ParsleyMultiple from './multiple';

var ParsleyFactory = function (element, options, parsleyFormInstance) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
  this.$element = $(element);

  // If the element has already been bound, returns its saved Parsley instance
  var savedparsleyFormInstance = this.$element.data('Parsley');
  if (savedparsleyFormInstance) {

<<<<<<< HEAD
    // If the saved instance has been bound without a Form parent and there is one given in this call, add it
=======
    // If the saved instance has been bound without a ParsleyForm parent and there is one given in this call, add it
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    if ('undefined' !== typeof parsleyFormInstance && savedparsleyFormInstance.parent === window.Parsley) {
      savedparsleyFormInstance.parent = parsleyFormInstance;
      savedparsleyFormInstance._resetOptions(savedparsleyFormInstance.options);
    }

<<<<<<< HEAD
    if ('object' === typeof options) {
      Object.assign(savedparsleyFormInstance.options, options);
    }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    return savedparsleyFormInstance;
  }

  // Parsley must be instantiated with a DOM element or jQuery $element
  if (!this.$element.length)
    throw new Error('You must bind Parsley on an existing element.');

<<<<<<< HEAD
  if ('undefined' !== typeof parsleyFormInstance && 'Form' !== parsleyFormInstance.__class__)
    throw new Error('Parent instance must be a Form instance');
=======
  if ('undefined' !== typeof parsleyFormInstance && 'ParsleyForm' !== parsleyFormInstance.__class__)
    throw new Error('Parent instance must be a ParsleyForm instance');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

  this.parent = parsleyFormInstance || window.Parsley;
  return this.init(options);
};

<<<<<<< HEAD
Factory.prototype = {
  init: function (options) {
    this.__class__ = 'Parsley';
    this.__version__ = '@@version';
    this.__id__ = Utils.generateID();
=======
ParsleyFactory.prototype = {
  init: function (options) {
    this.__class__ = 'Parsley';
    this.__version__ = '@@version';
    this.__id__ = ParsleyUtils.generateID();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    // Pre-compute options
    this._resetOptions(options);

<<<<<<< HEAD
    // A Form instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute
    if (this.element.nodeName === 'FORM' || (Utils.checkAttr(this.element, this.options.namespace, 'validate') && !this.$element.is(this.options.inputs)))
      return this.bind('parsleyForm');

    // Every other element is bound as a `Field` or `FieldMultiple`
=======
    // A ParsleyForm instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute
    if (this.$element.is('form') || (ParsleyUtils.checkAttr(this.$element, this.options.namespace, 'validate') && !this.$element.is(this.options.inputs)))
      return this.bind('parsleyForm');

    // Every other element is bound as a `ParsleyField` or `ParsleyFieldMultiple`
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    return this.isMultiple() ? this.handleMultiple() : this.bind('parsleyField');
  },

  isMultiple: function () {
<<<<<<< HEAD
    return ((this.element.type === 'radio' || this.element.type === 'checkbox') ||
      (this.element.nodeName === 'SELECT' && null !== this.element.getAttribute('multiple')));
=======
    return (this.$element.is('input[type=radio], input[type=checkbox]')) || (this.$element.is('select') && 'undefined' !== typeof this.$element.attr('multiple'));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
  },

  // Multiples fields are a real nightmare :(
  // Maybe some refactoring would be appreciated here...
  handleMultiple: function () {
    var name;
    var multiple;
    var parsleyMultipleInstance;

    // Handle multiple name
<<<<<<< HEAD
    this.options.multiple = this.options.multiple ||
      (name = this.element.getAttribute('name')) ||
      this.element.getAttribute('id');

    // Special select multiple input
    if (this.element.nodeName === 'SELECT' && null !== this.element.getAttribute('multiple')) {
=======
    if (this.options.multiple)
      ; // We already have our 'multiple' identifier
    else if ('undefined' !== typeof this.$element.attr('name') && this.$element.attr('name').length)
      this.options.multiple = name = this.$element.attr('name');
    else if ('undefined' !== typeof this.$element.attr('id') && this.$element.attr('id').length)
      this.options.multiple = this.$element.attr('id');

    // Special select multiple input
    if (this.$element.is('select') && 'undefined' !== typeof this.$element.attr('multiple')) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
      this.options.multiple = this.options.multiple || this.__id__;
      return this.bind('parsleyFieldMultiple');

    // Else for radio / checkboxes, we need a `name` or `data-parsley-multiple` to properly bind it
    } else if (!this.options.multiple) {
<<<<<<< HEAD
      Utils.warn('To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.', this.$element);
=======
      ParsleyUtils.warn('To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.', this.$element);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
      return this;
    }

    // Remove special chars
    this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, '');

    // Add proper `data-parsley-multiple` to siblings if we have a valid multiple name
<<<<<<< HEAD
    if (name) {
      $('input[name="' + name + '"]').each((i, input) => {
        if ((input.type === 'radio' || input.type === 'checkbox'))
          input.setAttribute(this.options.namespace + 'multiple', this.options.multiple);
=======
    if ('undefined' !== typeof name) {
      $('input[name="' + name + '"]').each((i, input) => {
        if ($(input).is('input[type=radio], input[type=checkbox]'))
          $(input).attr(this.options.namespace + 'multiple', this.options.multiple);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
      });
    }

    // Check here if we don't already have a related multiple instance saved
    var $previouslyRelated = this._findRelated();
    for (var i = 0; i < $previouslyRelated.length; i++) {
      parsleyMultipleInstance = $($previouslyRelated.get(i)).data('Parsley');
      if ('undefined' !== typeof parsleyMultipleInstance) {

<<<<<<< HEAD
        if (!this.$element.data('FieldMultiple')) {
=======
        if (!this.$element.data('ParsleyFieldMultiple')) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
          parsleyMultipleInstance.addElement(this.$element);
        }

        break;
      }
    }

<<<<<<< HEAD
    // Create a secret Field instance for every multiple field. It will be stored in `data('FieldMultiple')`
    // And will be useful later to access classic `Field` stuff while being in a `FieldMultiple` instance
=======
    // Create a secret ParsleyField instance for every multiple field. It will be stored in `data('ParsleyFieldMultiple')`
    // And will be useful later to access classic `ParsleyField` stuff while being in a `ParsleyFieldMultiple` instance
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    this.bind('parsleyField', true);

    return parsleyMultipleInstance || this.bind('parsleyFieldMultiple');
  },

<<<<<<< HEAD
  // Return proper `Form`, `Field` or `FieldMultiple`
=======
  // Return proper `ParsleyForm`, `ParsleyField` or `ParsleyFieldMultiple`
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
  bind: function (type, doNotStore) {
    var parsleyInstance;

    switch (type) {
      case 'parsleyForm':
        parsleyInstance = $.extend(
<<<<<<< HEAD
          new Form(this.element, this.domOptions, this.options),
          new Base(),
=======
          new ParsleyForm(this.$element, this.domOptions, this.options),
          new ParsleyAbstract(),
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
          window.ParsleyExtend
        )._bindFields();
        break;
      case 'parsleyField':
        parsleyInstance = $.extend(
<<<<<<< HEAD
          new Field(this.element, this.domOptions, this.options, this.parent),
          new Base(),
=======
          new ParsleyField(this.$element, this.domOptions, this.options, this.parent),
          new ParsleyAbstract(),
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
          window.ParsleyExtend
        );
        break;
      case 'parsleyFieldMultiple':
        parsleyInstance = $.extend(
<<<<<<< HEAD
          new Field(this.element, this.domOptions, this.options, this.parent),
          new Multiple(),
          new Base(),
=======
          new ParsleyField(this.$element, this.domOptions, this.options, this.parent),
          new ParsleyMultiple(),
          new ParsleyAbstract(),
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
          window.ParsleyExtend
        )._init();
        break;
      default:
        throw new Error(type + 'is not a supported Parsley type');
    }

    if (this.options.multiple)
<<<<<<< HEAD
      Utils.setAttr(this.element, this.options.namespace, 'multiple', this.options.multiple);

    if ('undefined' !== typeof doNotStore) {
      this.$element.data('FieldMultiple', parsleyInstance);
=======
      ParsleyUtils.setAttr(this.$element, this.options.namespace, 'multiple', this.options.multiple);

    if ('undefined' !== typeof doNotStore) {
      this.$element.data('ParsleyFieldMultiple', parsleyInstance);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

      return parsleyInstance;
    }

    // Store the freshly bound instance in a DOM element for later access using jQuery `data()`
    this.$element.data('Parsley', parsleyInstance);

<<<<<<< HEAD
    // Tell the world we have a new Form or Field instance!
=======
    // Tell the world we have a new ParsleyForm or ParsleyField instance!
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    parsleyInstance._actualizeTriggers();
    parsleyInstance._trigger('init');

    return parsleyInstance;
  }
};

<<<<<<< HEAD
export default Factory;
=======
export default ParsleyFactory;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
