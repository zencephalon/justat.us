Model = function(collection) {
  model = function(o) {
    for (p in o) {
      this[p] = o[p];
    }
  }

  model.findOne = function(id) {
    return new this(collection.findOne(id))
  }

  return model;
}