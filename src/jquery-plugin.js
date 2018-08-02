
/*
	jQuery plugin
*/
$.fn.modal = function( opts ) {

	opts = opts || {};

	return this.each(function() {

		opts.msg = this;

		new Modal(opts)

	});

};