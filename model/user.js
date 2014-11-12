User = Model(Meteor.users);

User.current = function() {
  return new User(Meteor.user());
}

User.prototype.current_facet = function() {
  return Facet.findOne(this['profile']['current_facet']);
}

User.prototype.facets = function() {
  return this['profile']['facets'];
}