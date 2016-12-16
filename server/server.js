Meteor.startup(function() {
// 	console.log(process.env);
	console.log(process.env.PORT);
	console.log(process.env.ROOT_URL);
	console.log(process.env.MONGO_URL);
	console.log(process.env.MAIL_URL);
});

const Future = Npm.require('fibers/future');
const fs = Future.wrap(Npm.require('fs'));

Meteor.methods({

	captureEmail: function(data) {
		check(data.email, String);
		check(data.release, String);


		var fut = new Future();

			Captures.insert({
				email: data.email,
				release_id: data.release,
				claimed: 0
			}, function(err, result) {

				if (err) {
					console.log(err);
					throw new Meteor.Error(500, 'Capture failed');
				} else {
					var text = 'Your download from N.A.A.F.I is ready. Go to this link to claim your file: ' + process.env.ROOT_URL + 'download/' + result;
					Email.send({
						to: data.email,
						from: 'N.A.A.F.I <downloads@naafi.mx>',
						subject: 'Your Naafi download',
						text: text
					});
					fut.return('email');
				}
			});

		return fut.wait();
	},
	deleteRelease: function(id) {
		check(id, String);

		user = Meteor.users.findOne({_id:this.userId});
		if (user) {
			var fut = new Future();

			Releases.remove(id, function(err, result) {
				if (err) {
					console.log(err);
					throw new Meteor.Error(500);
				} else {
					fut.return('removed');
				}
			});

			return fut.wait();

		} else {
			throw new Meteor.Error(500, 'Permission denied');
		}
	},
	clearCaptures: function() {
		user = Meteor.users.findOne({_id:this.userId});
		if (user) {
			var fut = new Future();
			Captures.remove({}, function(err, result) {
				if (err) {
					console.log(err);
					throw new Meteor.Error(500);
				} else {
					fut.return('cleared');
				}
			});
			return fut.wait();
		} else {
			throw new Meteor.Error(500, 'Permission denied');
		}
	}
});