Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.map(function() {

    this.route('index', {
        path: '/',
        template: 'release_index',
        waitOn: function() {
            return Meteor.subscribe('releases');
        },
        fastRender: true
    });

    this.route('release', {
        path: '/release/:_slug',
        template: 'release_page',
        waitOn: function() {
            return Meteor.subscribe('releases');
        },
        fastRender: true,
        data: function() {
            return Releases.findOne({
                slug: this.params._slug
            });
        }
    });

    this.route('embed', {
        path: '/embed/:_id',
        template: 'release_embed',
        waitOn: function() {
            return Meteor.subscribe('releases');
        },
        fastRender: true,
        data: function() {
            return Releases.findOne(this.params._id);
        }
    });

    this.route('download_claimed', {
        path: '/download_claimed/:_id',
        template: 'download_claimed',
        waitOn: function() {
            return Meteor.subscribe('releases');
        },
        fastRender: true,
        data: function() {
            return Releases.findOne(this.params._id);
        }
    });

    this.route('download_expired', {
        path: '/download_expired/:_id',
        template: 'download_expired',
        waitOn: function() {
            return Meteor.subscribe('releases');
        },
        fastRender: true,
        data: function() {
            return Releases.findOne(this.params._id);
        }
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
        waitOn: function() {
            return [Meteor.subscribe('releases'), Meteor.subscribe('captures')];
        },
        fastRender: true,
        onBeforeAction: function(pause) {
            if (!Meteor.userId()) {
                this.render('admin_login');
            } else {
                this.next();
            }
        }
    });

    this.route('edit', {
        path: '/edit/:_id',
        template: 'admin_edit',
        waitOn: function() {
            return Meteor.subscribe('releases');
        },
        fastRender: true,
        data: function() {
            return Releases.findOne(this.params._id);
        },
        onBeforeAction: function(pause) {
            if (!Meteor.userId()) {
                this.render('admin_login');
            } else {
                this.next();
            }
        }
    });

});