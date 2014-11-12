Template.root.helpers({
  invites: function() {
    return Invites.find({});
  },
  facets: function() {
    return User.current().current_facet().friend_facets();
  },
  user: function() {
    return User.current();
  }
})