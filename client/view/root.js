Template.root.helpers({
  invites: function() {
    return Invites.find({});
  },
  facets: function() {
    return Facets.find({});
  }
})