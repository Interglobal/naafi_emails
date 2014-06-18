Meteor.headly.config({
	data: function(req) {
		console.log(req.url);
		console.log(req._parsedUrl);

		if (req._parsedUrl.path === '/') {

			var currentRelease = Releases.findOne({},{timestamp: -1});

			return {
				title: 'N.A.A.F.I Downloads - ' + currentRelease.title
			}
		} else {
			return {
				title: 'N.A.A.F.I Downloads'
			}
		}
	},
	facebook: function(data) {
		return '<meta property="og:title" content="' + data.title + '" />';
	}
});