Meteor.headly.config({
	data: function(req) {
		if (req._parsedUrl.pathname === '/') {

			var currentRelease = Releases.findOne({},{timestamp: -1});

			return {
				title: 'N.A.A.F.I DOWNLOADS: ' + currentRelease.title,
				image: currentRelease.artwork
			}
		} else {
			return {
				title: 'N.A.A.F.I DOWNLOADS',
				image: process.env.ROOT_URL + 'naafi-logo-white.png'
			}
		}
	},
	facebook: function(data) {
		return '<meta property="og:type" content="website" /><meta property="og:site_name" content="N.A.A.F.I DOWNLOADS" /><meta property="og:title" content="' + data.title + '" /><meta property="og:image" content="' + data.image + '" />';
	}
});