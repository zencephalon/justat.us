function dropData() {
  Meteor.users.remove({});
}

function seedData() {
  //uid = Accounts.createUser({email: "mkbunday@gmail.com", password: "zen"});
}

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    console.log(options);
    console.log(user);
    Facet.create({name: options.email, uid: user._id});
    user['profile'] = {};
    return user;
  });

  Meteor.startup(function () {
    //dropData();
    //seedData();
    Meteor.publish("facets", function() {
      return Facets.find({});
    });
    // Meteor.publish("user_trees", function() {
    //   return Trees.find({uid: this.userId});
    // });
    // Meteor.publish("tree", function(_id) {
    //   return Trees.find({_id: _id});
    // });
  })
}
