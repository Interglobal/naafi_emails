Meteor.startup(function() {

});

Meteor.methods({
	captureEmail: function(email) {

		check(email, String);

/* 		var promise = new Promise(function(resolve, reject) { */
			return Captures.insert({
				email: email
			}, function(err, result) {
				if (err) {
					console.log(err);
/* 					reject('error'); */
					return 'error';
				} else {
					var text = 'Your download from Naafi is ready. Follow this link to claim your file: ' + process.env.ROOT_URL + 'download/' + result;
					Email.send({
						to: email,
						from: 'naafi@naafi.mx',
						subject: 'Your Naafi download',
						text: text
					});
/* 					resolve('email'); */
					return 'email';
				}
			});

/* 		}); */

/*
		promise.then(function(result) {
			console.log(result);
			return result;
		}, function(err) {
			console.log(err);
			return err;
		});
*/

	},
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
});