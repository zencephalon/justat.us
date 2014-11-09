Facets = new Meteor.Collection("facets");

Facet = function(o) {
  for (p in o) {
    this[p] = o[p];
  }
}

Facet.create = function(o) {
  if (o['friends'] === undefined) {
    o['friends'] = [];
  }
  id = Facets.insert(o);
  o['_id'] = id;

  return new Facet(o);
}