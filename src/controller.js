
module.exports = Backbone.View.extend({

	className: 'md-overlay',

	modals: [], // holds open modal views

	add: function(modal){
		if( this.modals.length > 0 )
			this.modals[this.modals.length-1].$el.before(modal.$el)
		else
			this.$el.before(modal.$el);
			
		this.modals.push(modal);
	},

	remove: function(modal){

		var indx = _.indexOf(this.modals, modal);

		if( indx >= 0 )
			this.modals.splice(indx, 1);

		modal.remove();
	},

	closeAll: function(){
		_.each(this.modals, function(modal){
			modal.close();
		}, this);
	},

	closeFirst: function(){
		if( this.modals.length > 0 )
			_.first(this.modals).close();
	},

	closeLast: function(){
		if( this.modals.length > 0 )
			_.last(this.modals).close();
	}

})