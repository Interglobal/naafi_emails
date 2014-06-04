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

	this.route('download', {
	  path: '/download/:_id',
	  template: 'capture_download',
	  waitOn: function () {
      	return Meteor.subscribe('captures');
	  },
	  data: function() { return Captures.findOne(this.params._id); }
	});

	this.route('login', {
		path: '/login',
		template: 'admin_login',
	});

	this.route('admin', {
		path: '/admin',
		template: 'admin_index',
		onBeforeAction: function (pause) {
            if (!Meteor.user()) {
         	   this.render('login');
			}
		}
	});

	this.route('edit', {
	  	path: '/edit/:_id',
	  	template: 'admin_edit',
	  	data: function() { return Releases.findOne(this.params._id); },
	  	onBeforeAction: function (pause) {
            if (!Meteor.user()) {
         	   this.render('login');
			}
		}
	});

	this.route('emails', {
		path: '/export',
		template: 'admin_captures',
		onBeforeAction: function (pause) {
            if (!Meteor.user()) {
         	   this.render('login');
			}
		}
	});

});