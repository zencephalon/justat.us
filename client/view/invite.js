Template.invite.helpers({

});

Template.invite.events({
  'click .accept_invite': function(event) {
    console.log(this);
    event.preventDefault();
  }
})