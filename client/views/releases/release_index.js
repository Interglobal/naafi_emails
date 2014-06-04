Template.release_index.release = function() {
	return Releases.findOne();
}

Template.release_index.events({
	'click .delete': function() {
		if (Meteor.user()) {
			Items.remove(this._id);
		}
	}
});