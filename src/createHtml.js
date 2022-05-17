const openTag = function (tag, attributes = '') {
  return '<' + tag + ' ' + attributes + '>';
};

const closeTag = function (tag) {
  return '</' + tag + '>';
};

const element = function (tag, content, attributes) {
  return openTag(tag, attributes) + content + closeTag(tag);
};

const attribute = (name, value) => name + '="' + value + '"';

exports.element = element;
exports.attribute = attribute;
