User = Model(Meteor.users);

User.current = function() {
  return new User(Meteor.user());
}

User.prototype.current_facet = function() {
  return Facet.findOne(this['profile']['current_facet']);
}

User.prototype.setStatus = function(status) {
  this.current_facet().setStatus(status);
}

User.prototype.facets = function() {
  return _(this.facet_ids()).map(function(id) { return Facet.findOne(id) });
}

User.prototype.facet_ids = function() {
  if (this['profile']) {
    if (this['profile']['facets']) {
      return this['profile']['facets'];
    }
  }
}