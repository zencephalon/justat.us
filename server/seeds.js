function dropData() {
  Meteor.users.remove({});
}

function seedData() {
  var daria = User.createSeedUser("daria@daria.com");
  var matt = User.createSeedUser("mkbunday@gmail.com");
  var mike = User.createSeedUser("mike@mike.com");
  var john = User.createSeedUser("john@john.com");
  var joe = User.createSeedUser("joe@joe.com");
  var andrew = User.createSeedUser("andrew@andrew.com");

  matt.addFriend(daria.current_facet())
  matt.addFriend(mike.current_facet())
  matt.addFriend(john.current_facet())
  matt.addFriend(joe.current_facet())
  matt.addFriend(andrew.current_facet())
  daria.addFriend(matt.current_facet())
}

if (Meteor.isServer) {
  Meteor.methods({
    acceptInvite: function(invite_id) {
      invite = Invites.findOne(invite_id);
      user = User.findOne(invite.to);
      from_facet = Facet.findOne(invite.from_facet);
      to_facet = user.current_facet();

      to_facet.addFriend(from_facet);
      from_facet.addFriend(to_facet);
      
      Invites.remove(invite_id);
      return "Added!";
    },
    declineInvite: function(invite_id) {
      Invites.remove(invite_id);
      return "Declined!";
    },
    addInvite: function(email) {
      check(email, String);

      if (! this.userId) {
        throw new Meteor.Error("not-logged-in",
        "Must be logged in to add a friend.");
      }

      user = Meteor.users.findOne({'profile.email': email});
      from_user = Meteor.user();

      if (user) {
        Invite.create({from_facet: from_user['profile']['current_facet'], to: user._id, from_email: from_user['profile']['email']});
        return "Invite sent!"
      } else {
        return "No such user found."
      }
    }
  })

  Accounts.onCreateUser(function(options, user) {
    console.log(options);
    console.log(user);
    facet = Facet.create({name: options.email, uid: user._id});
    user['profile'] = {email: options.email, current_facet: facet._id, facets: [facet._id]};
    return user;
  });

  Meteor.startup(function () {
    dropData();
    seedData();
    Meteor.publish("facets", function() {
      user = User.findOne(this.userId);
      if (user) {
        if (user.facet_ids()) {
          return Facets.find({"_id": {"$in": user.facet_ids()}})
        }
      }
    });
    Meteor.publish("friends", function() {
      user = User.findOne(this.userId);
      if (user) {
        friends = _.union.apply(this, _(user.facet_ids()).map(function(id) {f = Facet.findOne(id); return f.friends}));
        return Facets.find({"_id": {"$in": friends}});
      }
    });
    Meteor.publish("invites", function() {
      if (this.userId) {
        return Invites.find({to: this.userId});
      }
    });
  })
}
