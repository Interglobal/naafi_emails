Template.admin_captures.captures = function() {
	if (Meteor.userId()) {
		return Captures.find();
	}
}