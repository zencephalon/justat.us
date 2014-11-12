Template.invite.helpers({

});

Template.invite.events({
  'click .accept_invite': function(event) {
    console.log(this);
    event.preventDefault();
    Meteor.call('acceptInvite', this._id, function(error, result) {
      console.log("Success");
    });
  }
})