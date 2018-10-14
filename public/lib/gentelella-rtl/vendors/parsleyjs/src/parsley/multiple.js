import $ from 'jquery';

<<<<<<< HEAD
var Multiple = function () {
  this.__class__ = 'FieldMultiple';
};

Multiple.prototype = {
=======
var ParsleyMultiple = function () {
  this.__class__ = 'ParsleyFieldMultiple';
};

ParsleyMultiple.prototype = {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
  // Add new `$element` sibling for multiple field
  addElement: function ($element) {
    this.$elements.push($element);

    return this;
  },

<<<<<<< HEAD
  // See `Field.refreshConstraints()`
=======
  // See `ParsleyField.refreshConstraints()`
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
  refreshConstraints: function () {
    var fieldConstraints;

    this.constraints = [];

    // Select multiple special treatment
<<<<<<< HEAD
    if (this.element.nodeName === 'SELECT') {
=======
    if (this.$element.is('select')) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
      this.actualizeOptions()._bindConstraints();

      return this;
    }

    // Gather all constraints for each input in the multiple group
    for (var i = 0; i < this.$elements.length; i++) {

      // Check if element have not been dynamically removed since last binding
      if (!$('html').has(this.$elements[i]).length) {
        this.$elements.splice(i, 1);
        continue;
      }

<<<<<<< HEAD
      fieldConstraints = this.$elements[i].data('FieldMultiple').refreshConstraints().constraints;
=======
      fieldConstraints = this.$elements[i].data('ParsleyFieldMultiple').refreshConstraints().constraints;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

      for (var j = 0; j < fieldConstraints.length; j++)
        this.addConstraint(fieldConstraints[j].name, fieldConstraints[j].requirements, fieldConstraints[j].priority, fieldConstraints[j].isDomConstraint);
    }

    return this;
  },

<<<<<<< HEAD
  // See `Field.getValue()`
=======
  // See `ParsleyField.getValue()`
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
  getValue: function () {
    // Value could be overriden in DOM
    if ('function' === typeof this.options.value)
      return this.options.value(this);
    else if ('undefined' !== typeof this.options.value)
      return this.options.value;

    // Radio input case
<<<<<<< HEAD
    if (this.element.nodeName === 'INPUT') {
      if (this.element.type === 'radio')
        return this._findRelated().filter(':checked').val() || '';

      // checkbox input case
      if (this.element.type === 'checkbox') {
        var values = [];

        this._findRelated().filter(':checked').each(function () {
          values.push($(this).val());
        });

        return values;
      }
    }

    // Select multiple case
    if (this.element.nodeName === 'SELECT' && null === this.$element.val())
=======
    if (this.$element.is('input[type=radio]'))
      return this._findRelated().filter(':checked').val() || '';

    // checkbox input case
    if (this.$element.is('input[type=checkbox]')) {
      var values = [];

      this._findRelated().filter(':checked').each(function () {
        values.push($(this).val());
      });

      return values;
    }

    // Select multiple case
    if (this.$element.is('select') && null === this.$element.val())
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
      return [];

    // Default case that should never happen
    return this.$element.val();
  },

  _init: function () {
    this.$elements = [this.$element];

    return this;
  }
};

<<<<<<< HEAD
export default Multiple;
=======
export default ParsleyMultiple;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
