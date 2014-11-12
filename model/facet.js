Facets = new Meteor.Collection("facets");

Facets.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.uid === userId);
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.uid === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.uid === userId;
  },
  fetch: ['uid']
});

Facet = Model(Facets);

Facet.findOne = function(id) {
  return new Facet(Facets.findOne(id));
}

Facet.create = function(o) {
  if (o['friends'] === undefined) {
    o['friends'] = [];
  }
  id = Facets.insert(o);
  o['_id'] = id;
  o['status'] = {color: "blue", text: "Let's make plans!"};

  return new Facet(o);
}

Facet.prototype.addFriend = function(facet) {
  this.friends.push(facet._id);
  this.update({"$set": {friends: _(this.friends).uniq()}});
}

Facet.prototype.friend_facets = function() {
  return _(this.friends).map(function(id) { return Facet.findOne(id) });
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