Handlebars.registerHelper('downloadActive', function(date) {

	var now = moment();
	var expiry = moment(date, 'YYYY-MM-DD');
	if (now < expiry) {
		return true;
	} else {
		return false;
	}

});

Handlebars.registerHelper('timeLeft', function(date) {

	var expiry = moment(date, 'YYYY-MM-DD');
	return 'Free download expires ' + expiry.fromNow();

});

Handlebars.registerHelper('embedUrl', function(id) {

	var root = window.location.origin;
	return url = root + '/embed/' + id;

});

Handlebars.registerHelper('pageTitle', function(title) {
    if(title) {
        document.title = 'N.A.A.F.I DOWNLOADS: ' + title;
    } else {
        document.title = 'N.A.A.F.I DOWNLOADS';
    }
});