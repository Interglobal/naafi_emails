Meteor.headly.config({
	data: function(req) {
		console.log(req);
		return {
			title: 'this'
		};
	},
	facebook: function(data) {
		return '<meta property="og:title" content="' + data.title + '" />';
	}
});