Template.release_index.release = function() {
	return Releases.findOne({}, {sort: {timestamp: -1}});
}

Template.release_index.events({
	'submit form': function(e, template) {
		e.preventDefault();

		$(template.find('#captureform')).hide();
		$(template.find('#spinner')).show();

		var email = template.find('#email').value;
		var release = template.find('#release').value;
		var data = {email: email, release: release};
		Meteor.call('captureEmail', data, function(err, result) {
			if (err) {
				console.log(err);
				$(template.find('#captureform')).show();
				$(template.find('#spinner')).hide();
			} else if (result === 'email') {
				template.find('#email').value = '';
				$(template.find('.thanks')).show();
				$(template.find('#spinner')).hide();
			}
		});
	}
});