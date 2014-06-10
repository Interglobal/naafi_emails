Router.map(function () {
  this.route('download', {
    where: 'server',
    path: '/download/:_id',
    action: function () {
      var token = this.params._id;
      check(token, String);
		var capture = Captures.findOne(token);
		if (capture.claimed <= 2) {
			var release = Releases.findOne(capture.release_id);
			if (release) {
				var now = moment();
				var expiry = moment(release.expiry, 'YYYY-MM-DD');
				if (now < expiry) {
					Captures.update(capture._id, {
						$set: {
							claimed: capture.claimed+1
						}
					});
					this.response.writeHead(302, {
						'Location': release.zip
					});
					this.response.end();
				} else {
					this.response.writeHead(302, {
						'Location': '/download_expired/'+capture.release_id
					});
					this.response.end();
				}
			} else {
				this.response.writeHead(302, {
					'Location': '/invalid_token'
				});
				this.response.end();
			}
		} else {
			this.response.writeHead(302, {
				'Location': '/download_claimed/'+capture.release_id
			});
			this.response.end();
		}
    }
  });
});