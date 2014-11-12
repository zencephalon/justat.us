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
    acceptInvite: function(invite_id) {
      invite = Invites.findOne(invite_id);
      user = Meteor.users.findOne(invite.to);
      from_facet = Facets.findOne(invite.from_facet);
      //to_facet = 
      console.log(invite);
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
    //dropData();
    //seedData();
    Meteor.publish("facets", function() {
      return Facets.find({});
    });
    Meteor.publish("invites", function() {
      return Invites.find({to: this.userId});
    });
  })
}
