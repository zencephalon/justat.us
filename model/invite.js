Invites = new Meteor.Collection("invites");

Invite = Model(Invites);

// Invite = function(o) {
//   for (p in o) {
//     this[p] = o[p];
//   }
// }

Invite.create = function(o) {
  id = Invites.insert(o);
  o['_id'] = id;

  return new Invite(o);
}

Invite.prototype.accept = function() {
  var from_facet = Facet.findOne(this.from_facet);
  var to_facet = User.findOne(this.to).current_facet();

  to_facet.addFriend(from_facet);
  from_facet.addFriend(to_facet);
}