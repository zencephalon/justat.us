Template.status_buttons.events({
  'click #status-red': function(event) {
    u = User.current();
    u.setStatus({color: 'red', text: 'Concentrating, sorry.'})
  },
  'click #status-yellow': function(event) {
    u = User.current();
    u.setStatus({color: 'yellow', text: 'Reading...'})
  },
  'click #status-green': function(event) {
    u = User.current();
    u.setStatus({color: 'green', text: 'Just chilling.'})
  },
  'click #status-blue': function(event) {
    u = User.current();
    u.setStatus({color: 'blue', text: "Let's make plans!"})
  },
  'submit #user_status': function(event) {
    console.log("HELLO");
    event.preventDefault();
    User.current().setStatus({text: $(event.target).children('input').val()});
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