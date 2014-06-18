Meteor.publish('releases', function() {
	user = Meteor.users.findOne({_id:this.userId});
	if (user) {
		return Releases.find();
	} else {
		return Releases.find({}, {fields: {zip: 0}});
	}
});

Meteor.publish('captures', function () {
	user = Meteor.users.findOne({_id:this.userId});
	if (user) {
  		return Captures.find();
  	}
});

Releases.allow({
	insert: function(userId) {
		if (userId) {
			return true
		}
	},
	update: function(userId) {
		if (userId) {
			return true
		}
	},
	remove: function(userId) {
		if (userId) {
			return true
		}
	}
});