Template.invite.helpers({

});

Template.invite.events({
  'click .accept_invite': function(event) {
    console.log(this);
    event.preventDefault();
    Meteor.call('acceptInvite', this._id, function(error, result) {
      console.log("Success");
    });
  },
  'click .decline_invite': function(event) {
    Meteor.call('declineInvite', this._id, function(error, result) {
      console.log("Success");
    });
  }
})