User = function(o) {
  for (p in o) {
    this[p] = o[p];
  }
}

User.findOne = function(id) {
  return new User(Meteor.users.findOne(id));
}

User.current = function() {
  return new User(Meteor.user());
}

User.prototype.current_facet = function() {
  return Facet.findOne(this['profile']['current_facet']);
}