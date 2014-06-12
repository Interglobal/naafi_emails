Template.release_index.release = function() {
	return Releases.findOne();
}

Template.release_index.events({
	'submit form': function(e, template) {
		e.preventDefault();
		var email = template.find('#email').value;
		var release = template.find('#release').value;
		var data = {email: email, release: release};
		Meteor.call('captureEmail', data, function(err, result) {
			if (err) {
				console.log(err);
			} else if (result === 'email') {
				template.find('#email').value = '';
				$(template.find('.thanks')).show();
				$(template.find('#captureform')).hide();
			}
		});
	}
});