Template.status_buttons.events({
  'click #status-red': function(event) {
    console.log("red");
    u = User.current();
    console.log(u);
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
  }
})