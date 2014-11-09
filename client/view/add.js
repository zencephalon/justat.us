Template.add.events({
  'submit form': function(event) {
    event.preventDefault();
    var email = $(event.target).children('input').eq(0).val();
})