Template.status_buttons.events({
  'click #status-red': function(event) {
    u = User.current();
    u.setStatus({color: 'red'})
    $('input[name=status_text]').focus();
  },
  'click #status-yellow': function(event) {
    u = User.current();
    u.setStatus({color: 'yellow'})
    $('input[name=status_text]').focus();
  },
  'click #status-green': function(event) {
    u = User.current();
    u.setStatus({color: 'green'})
    $('input[name=status_text]').focus();
  },
  'click #status-blue': function(event) {
    u = User.current();
    u.setStatus({color: 'blue'})
    $('input[name=status_text]').focus();
  },
  'submit #user_status': function(event) {
    event.preventDefault();
    User.current().setStatus({text: $(event.target).children('input').val()});
  },
  'focus input[name=status_text]': function(event) {
    event.target.setSelectionRange(0, 9999);
  },
  'blur input[name=status_text]': function(event) {
    User.current().setStatus({text: $(event.target).val()});
  }
});

Template.status_buttons.helpers({
  'user_status': function() {
    u = User.current();
    return u.current_facet().status.text;
  }
})