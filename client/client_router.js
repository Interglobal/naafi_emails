Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});

Router.map(function() {

	this.route('index', {path: '/', template: 'release_index'});

	this.route('release', {
	  path: '/release/:_slug',
	  template: 'release_page',
	  data: function() { return Releases.findOne({slug: this.params._slug}); }
	});

	this.route('embed', {
	  path: '/embed/:_id',
	  template: 'release_embed',
	  data: function() { return Releases.findOne(this.params._id); }
	});

	this.route('download_claimed', {
		path: '/download_claimed/:_id',
		template: 'download_claimed',
		data: function() { return Releases.findOne(this.params._id); }
	});

	this.route('download_expired', {
		path: '/download_expired/:_id',
		template: 'download_expired',
		data: function() { return Releases.findOne(this.params._id); }
	});

	this.route('invalid_token', {
		path: '/invalid_token',
		template: 'invalid_token'
	});

	//admin stuff

	this.route('login', {
		path: '/login',
		template: 'admin_login',
	});

	this.route('admin', {
		path: '/admin',
		template: 'admin_index',
		waitOn: function () {
			return Meteor.subscribe('captures');
	  	},
		onBeforeAction: function (pause) {
            if (!Meteor.user()) {
         	   this.render('admin_login');
         	   pause();
			}
		}
	});

	this.route('edit', {
	  	path: '/edit/:_id',
	  	template: 'admin_edit',
	  	data: function() { return Releases.findOne(this.params._id); },
	  	onBeforeAction: function (pause) {
            if (!Meteor.user()) {
         	   this.render('admin_login');
         	   pause();
			}
		}
	});

});