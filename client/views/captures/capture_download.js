Template.capture_download.rendered = function(template) {
	Meteor.call('claimDownload', this.data._id, function(err, result) {
		template.find('.loading').hide();
		if (err) {
			console.log(err);
			template.find('.error').show();
		} else if (result === 'claimed') {
			template.find('.claimed').show();
		} else if (result === 'thanks') {
			template.find('.thanks').show();
		}
	});
}