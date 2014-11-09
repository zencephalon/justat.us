Template.add.events({
  'submit form': function(event) {
    event.preventDefault();
    var email = $(event.target).children('input').eq(0).val();
    Meteor.call('addInvite', email, function (error, result) {
      console.log(result);
    });
    event.target.reset();
  }
})