Template.release_page.events({
	'submit form': function(e, template) {
		e.preventDefault();
		var email = template.find('#email').value;
		Meteor.call('captureEmail', email, function(err, result) {
			if (err) {
				console.log(err);
			} else if (result === 'email') {
				template.find('#email').value = '';
				template.find('.thanks').show();
			} else {
				console.log(result);
			}
		});
	}
});