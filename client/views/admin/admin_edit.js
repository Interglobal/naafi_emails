Template.admin_edit.events({
	'submit form': function(e, template) {
		e.preventDefault();
		if (Meteor.user()) {
			var title = template.find('#releaseTitle').value;
			var slug = template.find('#slug').value;
			var artist = template.find('#artistName').value;
			var tracklisting = $(template.find('#tracklisting')).val();
			var about = $(template.find('#aboutText')).val();
			var expiry = template.find('#expiryDate').value;
			var purchaselink = template.find('#purchaseLink').value;

			var artwork = template.find('#artwork').value;
			var zip = template.find('#zip').value;

			Releases.update({_id: this._id}, {
			    title: title,
			    slug: slug,
			    artist: artist,
			    tracklisting: tracklisting,
			    about: about,
			    expiry: expiry,
			    purchaselink: purchaselink,

			    artwork: artwork,
			    zip: zip
		    }, function(err, result) {
			    if (err) {
				    console.log(err);
			    } else {
				    Router.go('admin');
			    }
		    });
		}
	}
});