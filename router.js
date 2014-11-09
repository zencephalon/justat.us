Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  waitOn: function() {
    //return Meteor.subscribe("user_trees");
    return [Meteor.subscribe("facets"), Meteor.subscribe("invites")];
  },
  action: function() {
    this.render("/");
  }
});

Router.route('/add', {
  onBefore: function() {
  },
  action: function() {
    this.render("add");
  }
})

Router.route('/t/:_id/inc', function () {
  var req = this.request;
  var res = this.response;
  tree = Tree.findOne(this.params._id);
  tree.incCount(true);
  res.end('success ' + (tree.total_count+1));
}, {where: 'server'});
