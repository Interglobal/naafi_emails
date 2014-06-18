Template.admin_index.releases = function() {
	return Releases.find();
}

Template.admin_index.captures = function() {
	if (Meteor.userId()) {
		return Captures.find();
	}
}

Template.admin_index.events({
	'submit form': function(e, template) {
		e.preventDefault();
		if (Meteor.user()) {
			var title = template.find('#releaseTitle').value;
			var slug = title.replace(/^\s+|\s+$/g, '').toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
			var artist = template.find('#artistName').value;
			var tracklisting = $(template.find('#tracklisting')).val();
			var about = $(template.find('#aboutText')).val();
			var expiry = template.find('#expiryDate').value;
			var purchaselink = template.find('#purchaseLink').value;

			var artwork = template.find('#artwork').value;
			var zip = template.find('#zip').value;

			Releases.insert({
			    title: title,
			    slug: slug,
			    artist: artist,
			    tracklisting: tracklisting,
			    about: about,
			    expiry: expiry,
			    purchaselink: purchaselink,

			    artwork: artwork,
			    zip: zip,

				timestamp: (new Date()).getTime()
		    }, function(err, result) {
			    if (err) {
				    console.log(err);
			    } else {
				    $('.admin_section').hide();
					$('#list_releases').show();
			    }
		    });
		}
	},
	'click #admin_menu li': function(e, template) {
		var target = $(e.currentTarget).data('target');
		$('.admin_section').hide();
		$('#'+target).show();
	},
	'click .delete_release': function(e, template) {
		e.preventDefault();
		Meteor.call('deleteRelease', this._id, function(err, result) {
			if (err) {
				console.log(err);
			}
		});
	},
	'click .clear_captures': function(e, template) {
		e.preventDefault();
		Meteor.call('clearCaptures', function(err, result) {
			if (err) {
				console.log(err);
			}
		});
	},
	'click .clickselect': function(e) {
		$(e.target).selectText();
	}
});