const Options = {};

Options.set = function(key, value) {
  const options = this.getAll();
  options[key] = value;
  this.setAll(options);
};

Options.get = function(key) {
  return this.getAll()[key];
};

Options.getAll = function() {
  return JSON.parse(localStorage.getItem('options')) || {};
};

Options.setAll = function(options) {
  localStorage.setItem('options', JSON.stringify(options));
};

export default Options;
