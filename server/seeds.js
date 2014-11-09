function dropData() {
  Meteor.users.remove({});
}

function seedData() {
  uid = Accounts.createUser({email: "mkbunday@gmail.com", password: "zen"});
  uid = Accounts.createUser({email: "djjcu2115@gmail.com", password: "zen"});
  uid = Accounts.createUser({email: "matt@matt.com", password: "zen"});
  uid = Accounts.createUser({email: "daria@daria.com", password: "zen"});
  uid = Accounts.createUser({email: "mike@mike.com", password: "zen"});
}

if (Meteor.isServer) {
  Meteor.methods({
    addInvite: function(email) {
      check(email, String);

      if (! this.userId) {
        throw new Meteor.Error("not-logged-in",
        "Must be logged in to add a friend.");
      }

      user = Meteor.users.findOne({'profile.email': email});

      if (user) {
        console.log(user);
        Invite.create({from: this.userId, to: user._id});
        return "Invite sent!"
      } else {
        return "No such user found."
      }
    }
  })

  Accounts.onCreateUser(function(options, user) {
    console.log(options);
    console.log(user);
    Facet.create({name: options.email, uid: user._id});
    user['profile'] = {email: options.email};
    return user;
  });

  Meteor.startup(function () {
    //dropData();
    //seedData();
    Meteor.publish("facets", function() {
      return Facets.find({});
    });
    Meteor.publish("invites", function() {
      return Facets.find({to: this.userId});
    });
    // Meteor.publish("user_trees", function() {
    //   return Trees.find({uid: this.userId});
    // });
    // Meteor.publish("tree", function(_id) {
    //   return Trees.find({_id: _id});
    // });
  })
}
