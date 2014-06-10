Kadira.connect('5ycT2uwvTZK5Gkumf', '8dbc0f6a-1869-443a-abec-8f45df4a1784');

Meteor.startup(function() {

});

Future = Meteor.require('fibers/future');

Meteor.methods({
	captureEmail: function(email, id) {

		check(email, String);
		check(id, String);

		var fut = new Future();
			Captures.insert({
				email: email,
				release_id: id,
				claimed: 0
			}, function(err, result) {
				if (err) {
					console.log(err);
					throw new Meteor.Error(500, 'Capture failed');
					fut.return(err);
				} else {
					var text = 'Your download from Naafi is ready. Follow this link to claim your file: ' + process.env.ROOT_URL + 'download/' + result;
					Email.send({
						to: email,
						from: 'naafi@naafi.mx',
						subject: 'Your Naafi download',
						text: text
					});
					fut.return('email');
				}
			});
		return fut.wait();
	}
	/*
,
	claimDownload: function(token) {
		check(token, String);
		var capture = Captures.findOne(token);
		if (!capture.claimed) {
			console.log('Download logic');
			Captures.update(capture._id, {
				$set: {
					claimed: true
				}
			});
			return 'thanks';
		} else {
			console.log('Download already claimed.');
			return 'claimed';
		}
	}
*/
});