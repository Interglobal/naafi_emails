Meteor.publish('releases', function() {
	return Releases.find();
});

Meteor.publish('captures', function () {
	user = Meteor.users.findOne({_id:this.userId});
	if (user) {
  		return Captures.find();
  	}
});