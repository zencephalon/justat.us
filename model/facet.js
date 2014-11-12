Facets = new Meteor.Collection("facets");

Facet = function(o) {
  for (p in o) {
    this[p] = o[p];
  }
}

Facet.findOne = function(id) {
  return new Facet(Facets.findOne(id));
}

Facet.create = function(o) {
  if (o['friends'] === undefined) {
    o['friends'] = [];
  }
  id = Facets.insert(o);
  o['_id'] = id;

  return new Facet(o);
}

Facet.prototype.addFriend = function(facet) {
  this.friends.push(facet._id);
  this.update({"$set": {friends: _(this.friends).uniq()}});
}

Facet.prototype.update = function(update) {
  if (update === undefined) {
    o = {};
    for (p in this) {
      if (p != '_id') {
        o[p] = this[p];
      }
    }
    Facets.update(this._id, {"$set": o});
  } else {
    Facets.update(this._id, update);
  }
}