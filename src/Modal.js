/*
    Nify Modal
    
    Based on work done by Manoela Ilic (http://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/)
    
    @author Kevin Jantzer
    @since 2013-09-04
    
    
    Effects:
    1 => Fade in & Scale
	2 => Slide in (right)
	3 => Slide in (bottom)
	4 => Newspaper
	5 => Fall
	6 => Side Fall
	7 => Sticky Up
	8 => 3D Flip (horizontal)
	9 => 3D Flip (vertical)
	10 => 3D Sign
	11 => Super Scaled
	12 => Just Me
	13 => 3D Slit
	14 => 3D Rotate Bottom
	15 => 3D Rotate In Left
	16 => Blur
	17 => Let me in
	18 => Make way!
	19 => Slip from top
    
*/
(function($) {

	var ModalController, Modal, modalController, SPEED = 300 /* keep in sync with CSS */;
	
	
	
	ModalController = Backbone.View.extend({
		
		className: 'md-overlay',
		
		modals: [], // holds open modal views
		
		add: function(modal){
			this.modals.push(modal);
			this.$el.before(modal.$el);
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
	
	
	
	
	Modal = Backbone.View.extend({
	
		className: 'md-modal',
		
		events: {
			'click .md-close': 'close'
		},
		
		opts: {
			effect: 1,
			title: '',
			msg: '',
			btns: ['close'],
			theme: '',
			w: null
		},
		
		controller: new ModalController(),
		
		initialize: function(){
		
			this.options = _.extend({}, this.opts, this.options||{});
			
			this.$el.html('<div class="md-content"><h3></h3>\
							<div class="progress"><div class="progress-bar"></div></div>\
							<div class="clearfix"><div class="content"></div><div class="buttons"></div></div>\
						  </div>');
			
			this.controller.add(this);
			
			this.$title = this.$('h3');
			this.$progress = this.$('.progress-bar');
			this.$content = this.$('.content');
			this.$btns = this.$('.buttons');
			
			this.open();
		},
		
		render: function(){
		
			this.$el.addClass('md-effect-'+this.options.effect+' '+this.options.theme);
			
			if( this.options.w )
				this.width(this.options.w);
				
			this.progress(this.options.progress);
			
			this.renderTitle();
			this.renderContent();
			this.renderBtns();
			
			this.delegateEvents();
			
		},
		
		open: function(opts){

			this.render();
			
			// delay showing so animation works
			setTimeout(_.bind(function(){
				this.$el.addClass('md-show');
			},this), 100)
		},
		
		close: function(){
			
			this.$el.removeClass('md-show');
			var self = this;
			
			this.trigger('close');
			
			setTimeout(function(){
				self.controller.remove(self);
			}, SPEED)
		},
		
		renderTitle: function(){
		
			if( !this.options.title )
				return this.$title.hide();
			
			else
				this.$title.show();
		
			if( this.options.title === 'spin'){
				this.$title.html('');
				this.spinner();
				
			}else{
				this.$title.spin(false);
				this.$title.html(this.options.title)
			}
		},
		
		renderContent: function(){
		
			if( !this.options.msg )
				return this.$content.hide()
			else
				this.$content.show();
			
			
			if( this.options.msg instanceof Backbone.View )
				this.$content.html( this.options.msg.$el );
			else	
				this.$content.html( this.options.msg );
		},
		
		renderBtns: function(){
			
			this.$btns.html('');
			
			if( !this.options.btns )
				return this.$btns.hide()
			else
				this.$btns.show();
			
			if( _.isString(this.options.btns) )
				this.renderBtn(this.options.btns);
			else
				_.each(this.options.btns, this.renderBtn, this);
		},
		
		renderBtn: function(btnOpts){
			var $btn = this.makeBtn(btnOpts);
			
			this.$btns.append( $btn );
		},
		
		makeBtn: function(opts){
		
			if( _.isFunction(opts) )
				opts = opts.call(this);
		
			if( opts === 'close' )
				opts = {label: 'Close', className: 'subtle md-close'};
			else if( opts === 'cancel' )
				opts = {label: 'Cancel', className: 'subtle md-close', onClick: this.triggerCancel.bind(this)};
			else if( opts === 'ok' )
				opts = {label: 'Ok', className: 'subtle md-close'};
		
			opts = _.extend({
				label: 'Button',
				className: 'subtle'
			}, opts);
			
			$btn = $('<a class="button large flat btn btn-default '+opts.className+'">'+opts.label+'</a>');
			
			if( opts.onClick )
				$btn.bind('click', function(){ _.defer(opts.onClick) });
				
			return $btn;
		},
		
		triggerCancel: function(){
			this.trigger('cancel');
		},
		
		spinner: function(){
			this.$title.spin();
			return this;
		},
		
		
		setTitle: function(title){
			this.options.title = title;
			this.renderTitle();
			return this;
		},
		
		setMsg: function(msg){
			this.options.msg = msg;
			this.renderContent();
			return this;
		},
		
		setBtns: function(btns){
			this.options.btns = btns;
			this.renderBtns();
			return this;
		},
		
		progress: function(num){
			if( num >= 0 )
				this.$progress.show().width(num+'%');
			
			return this;
		},
		
		width: function(val){
			this.options.w = val;
			this.$el.css({
				width: val,
				maxWidth: val
			});
			return this;
		}
		
	})
	
	
	// shortcut
	modalController = Modal.prototype.controller;
	

	function defaultArgs(){
		
		var defaultVals = Array.prototype.slice.call(arguments),
			args = Array.prototype.slice.call(defaultVals.shift()),
			missing = defaultVals.length - args.length;
		
		if( missing <= 0 ) return false;
		
		defaultVals.reverse();
		
		_.times(missing, function(n){ args.unshift(defaultVals[n]||null) });
		
		return args;
	}
	
	
/* ========================================================================================================================
	PUBLIC methods
*/
	
	
	window.Modal = function(opts){ return new Modal(opts) }
	window.Modal.close = function(opts){ modalController.closeAll() }
	
	
/*
	Spinner
*/
	window.Modal.spinner = function(){ new Modal({
		title: 'spin',
		effect: 1,
		msg:false,
		btns: false
	})}

	
/*
	Alert
*/
	window.Modal.alert = function(title, msg){
		
		var args = defaultArgs(arguments, null, null);
	
		if( args ) return window.Modal.alert.apply(this, args);
	
		return new Modal({
			effect: 3,
			title: title,
			msg: msg,
			btns: 'ok',
			theme: 'centered thin'
		})
	}
	
	
/*
	Confirm
*/
	window.Modal.confirm = function(title, msg, callback){
		
		var args = defaultArgs(arguments, null, null, null);
	
		if( args ) return window.Modal.confirm.apply(this, args);
	
		return new Modal({
			title: title==null?'Continue?':title,
			msg: msg==null?'Are you sure you want to delete this?':msg,
			btns: [{
				label: 'Ok',
				className: 'green btn-primary icon-ok md-close',
				onClick: callback||function(){alert('Please provide a callback')}
			}, 'cancel']
		})
	}
	

/*
	Confirm Delete
*/
	window.Modal.confirmDelete = function(title, msg, callback){
		
		var args = defaultArgs(arguments, null, null, null);
	
		if( args ) return window.Modal.confirmDelete.apply(this, args);

		return new Modal({
			title: title==null?'Delete?':title,
			msg: msg==null?'Are you sure you want to delete this?':msg,
			btns: [{
				label: 'Delete',
				className: 'red btn-danger icon-trash md-close',
				onClick: callback||function(){alert('Please provide a callback')}
			}, 'cancel']
		})
	}
	
	


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
	
	
	// add Modal to the DOM
	$(function() {
	
		var $container = $('.modal-container');
		
		$container ? modalController.$el.insertBefore($container) : modalController.$el.appendTo('body');
	});
	

})(jQuery);


