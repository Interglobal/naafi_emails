Template.release_embed.rendered = function() {
	$('html').addClass('no-bg');
};

Template.release_embed.created = function() {
	$('html').addClass('no-bg');
};

Template.release_embed.created = function() {
	$('html').removeClass('no-bg');
};

Template.release_embed.events({
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