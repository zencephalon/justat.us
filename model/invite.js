Invites = new Meteor.Collection("invites");

Invite = Model(Invites);

// Invite = function(o) {
//   for (p in o) {
//     this[p] = o[p];
//   }
// }

// Invite.create = function(o) {
//   id = Invites.insert(o);
//   o['_id'] = id;

//   return new Invite(o);
// }