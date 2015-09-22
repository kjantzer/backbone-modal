/*
    Modal Backbone.js View
    
    Based on work done by Manoela Ilic (http://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/)
    
    Requires Animate.css for attention getters (http://daneden.github.io/animate.css/)
    
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

	var USE_FLEX = true; // set to false if you want to support IE and/or older versions of modern browsers.

	var ModalController, Modal, modalController, SPINNER = null, SPEED = 300 /* keep in sync with CSS */;
	
	var defaultSettings = {
		effect: 1,
		title: '',
		msg: '',
		btns: ['close'],
		theme: 'ios7',
		w: null, 
		hide: false, 
		hideMessage:'Don’t show again',
		key: '' // will save to User.settings().get('modal') if hide is checked on close. e.g. 
	}
	
	var KEY_CODE_MAP = {
		27: 'esc',
		13: 'enter',
		8: 'delete'
	}
	
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
		
		controller: new ModalController(),
		
		initialize: function(){
		
			this.options = _.extend({}, window.Modal.defaultSettings, this.options||{});
			
			this.$el.html('<div><div class="md-content"><h3></h3>\
							<div class="progress"><div class="progress-bar"></div></div>\
							<div class="clearfix"><div class="content"></div>\
							<div class="buttons"></div>\
							<div class="checkbox hide"></div>\
						  </div></div>');
			
			this.controller.add(this);
			
			if( USE_FLEX )
				this.$el.addClass('flex');
			
			this.$title = this.$('h3');
			this.$progress = this.$('.progress-bar');
			this.$content = this.$('.content');
			this.$btns = this.$('.buttons');
			this.$checkbox = this.$('.checkbox'); 
			
			this.open();
			
			this.on('close', this.saveKey, this);
		},
		
		render: function(){
		
			this.$el.addClass('md-effect-'+this.options.effect+' '+this.options.theme);
			
			if( this.options.w )
				this.width(this.options.w);
				
			this.progress(this.options.progress);
			
			this.renderTitle();
			this.renderContent();
			this.renderBtns();
			this.renderHide(); 
			this.delegateEvents();
			
		},
		
		isActiveModal: function(){
			return this == _.last(this.controller.modals)
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
			
			_.each(this._eventKeyFns, function(fn){
				window.removeEventListener('keyup', fn)
			})
			
			setTimeout(function(){
				self.controller.remove(self);
			}, SPEED)
		},
		
		renderTitle: function(){
		
			if( !this.options.title )
				return this.$title.hide();
			
			else
				this.$title.show();
		
			if( this.options.title === 'spin' || this.options.title === 'spinner'){
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
			
			
			if( this.options.msg instanceof Backbone.View ){
				this.options.msg.modal = this;
				this.$content.html( this.options.msg.render().$el );
			}else{	
				this.$content.html( this.options.msg );
			}
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
		
		renderHide: function(){
			if(this.options.hide)
				 this.$checkbox.append($('<input type="checkbox"/><span class="hide-message">' + this.options.hideMessage + '</span>')); 
		}, 
		
		makeBtn: function(opts){
		
			if( _.isFunction(opts) )
				opts = opts.call(this);
		
			if( opts === 'close' )
				opts = {label: 'Close', className: 'subtle md-close', eventKey:this.options.btns.length==1?['esc','enter']:'esc'};
			else if( opts === 'cancel' )
				opts = {label: 'Cancel', className: 'subtle md-close', eventKey:'esc', onClick: this.triggerCancel.bind(this)};
			else if( opts === 'ok' )
				opts = {label: 'Ok', className: 'subtle md-close', eventKey:['esc','enter']};
		
			opts = _.extend({
				label: 'Button',
				className: 'subtle',
				attr: {}
			}, opts);
			
			$btn = $('<a class="button large flat btn btn-default '+opts.className+'" title="'+(opts.attr.title||'')+'">'+opts.label+'</a>');
			
			if( opts.onClick )
				$btn.bind('click', function(e){ _.defer(function(){ opts.onClick(e) }) });
			
			// if event key is set, then listen for that keyup event
			if( opts.eventKey )
			{
				var eventKeyFn = this._eventKeyFn.bind(this, opts.eventKey, $btn); // custom event function for this btn
				this._eventKeyFns = this._eventKeyFns || [];
				this._eventKeyFns.push(eventKeyFn);				// remember this function so we can unbind it later
				window.addEventListener('keyup', eventKeyFn);	// call this event function on keyup
			}
				
			return $btn;
		},
		
		//_eventKeyFns: [], // holds all event key functions so we can remove them upon close; not initialized here as we want Modals to store their own
		
		_eventKeyFn: function(eventKey, $btn, e){
		
			var keyCodeStr = KEY_CODE_MAP[e.which]; // map the key code to a string
			
			if( !keyCodeStr ) return; // no key code string found? 
			
			if( _.isString(eventKey) )	// convert event key to an array if need be
				eventKey = [eventKey];
		
			// if this modal is the active (on top of the rest) and user hit the proper even key, trigger a click on the button
			if( this.isActiveModal() && _.indexOf(eventKey, keyCodeStr) > -1 ){
				$btn.click();
				
				e.preventDefault();
				return false;
			}
		},
		
		triggerCancel: function(){
			this.trigger('cancel');
		},
		
		spinner: function(){
			var self = this;
			this.$el.addClass('spinner');
			_.defer(function(){		// we defer so the auto centering of the spinner works
				self.$title.spin();
			})
			return this;
		},
		
		// requires Animate.css <http://daneden.github.io/animate.css/>
		attention: function(animation){
			var self = this;
			this.$el.removeClass('animated '+(this.lastAttentionAnimation?this.lastAttentionAnimation:''));
			this.lastAttentionAnimation = animation;
			_.defer(function(){ self.$el.addClass('animated '+animation) })
		},
		
			shake: function(){  this.attention('shake'); },
			wobble: function(){  this.attention('wobble'); },
			pulse: function(){  this.attention('pulse'); },
			bounce: function(){  this.attention('bounce'); },
			flash: function(){  this.attention('flash'); },
			swing: function(){  this.attention('swing'); },
			tada: function(){  this.attention('tada'); },
		
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
			this.$content.css({
				width: val,
				maxWidth: val
			});
			return this;
		}, 
		
		saveKey: function(){
			if(this.options.hide && this.$checkbox.find('input').is(':checked')){
				User.modalKey(this.options.key, true);
			}
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
	window.Modal.close = function(opts){ modalController.closeAll(); SPINNER = null; }
	
	window.Modal.defaultSettings = defaultSettings;
	
/*
	Spinner
*/
	window.Modal.spinner = function(msg){
		if( msg === false || msg === 'close'){
			
			if( SPINNER ) SPINNER.close();
			SPINNER = null;
			
		}else if( !SPINNER ){
				
			return SPINNER = new Modal({
				title: 'spin',
				effect: 1,
				msg:msg?msg:false,
				btns: false,
				theme: 'ios7'
			});
		}
	}

	
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
			theme: 'centered thin ios7'
		})
	}
	
/*
	Alert
*/
	window.Modal.success = function(title, msg){
		
		var args = defaultArgs(arguments, null, null);
	
		if( args ) return window.Modal.success.apply(this, args);
	
		return new Modal({
			effect: 3,
			title: title==null?'Success':title,
			msg: msg,
			btns: 'ok',
			theme: 'centered thin ios7'
		})
	}
	
/*
	Alert
*/
	window.Modal.error = function(title, msg){
		
		var args = defaultArgs(arguments, null, null);
	
		if( args ) return window.Modal.error.apply(this, args);
		
		return new Modal({
			effect: 3,
			title: title==null?'Error':title,
			msg: msg,
			btns: 'ok',
			theme: 'centered thin ios7'
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
			msg: msg==null?'Are you sure you want to continue?':msg,
			theme: 'ios7',
			btns: [{
				label: 'Ok',
				className: 'green btn-primary icon-ok md-close',
				onClick: callback||function(){alert('Please provide a callback')},
				eventKey: 'enter'
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
			theme: 'ios7',
			btns: [{
				label: 'Delete',
				className: 'red btn-danger icon-trash md-close',
				onClick: callback||function(){alert('Please provide a callback')},
				eventKey: 'enter'
			}, 'cancel']
		})
	}
	
	
/*
	Prompt
*/
	window.Modal.prompt = function(title, msg, opts, callback){
		
		var defaultOpts = {
			okBtn: 'Ok',
			password: false,
			placeholder: 'Enter value...',
			val: '',
			pattern: null, // a regex
			h: null // add height for textarea
		}

		var args = defaultArgs(arguments, null, null, defaultOpts, null);
	
		if( args ) return window.Modal.prompt.apply(this, args);

		opts = _.extend(defaultOpts, opts);

		var useTextarea = opts.h > 0;
		var regex = opts.pattern;

		switch(regex){
			case 'hexcode': regex = '^#?[A-Za-z0-9]{6}$'; break;
			case 'string': regex = '^.+'; break;
			case 'int':
			case 'integer': regex = '^[0-9]+$'; break;
			case 'num':
			case 'number':
			case 'decimal': regex = '^[0-9]*\.?[0-9]+$'; break;
            case 'year': regex = '^$|^[1-2]{1}[0-9]{3}$'; break;
		}

		regex = regex ? RegExp(regex) : null;

		msg = msg || '';

		opts.val = opts.val || '';
		
		if( useTextarea )
			msg += '<textarea placeholder="'+opts.placeholder+'" class="prompt" style="height: '+opts.h+'px">'+opts.val+'</textarea>';
		else
			msg += '<input value="'+opts.val+'" placeholder="'+opts.placeholder+'" class="prompt" type="'+(opts.password?'password':'text')+'">';

		var modal = new Modal({
			title: title,
			msg: msg,
			theme: 'ios7',
			btns: [{
				label: opts.okBtn,
				className: 'green btn-primary icon-ok',
				onClick: function(e){

					if( !callback )
						return alert('Please provide a callback');
					
					var val = modal.$('.prompt').val();

					if( regex && !regex.test(val) ){
						modal.shake();
					}else{

						if( opts.pattern == 'hexcode' && val.charAt(0) !== '#')
							val = '#'+val;

						callback(val, e)
						modal.close();
					}
						
				},
				eventKey: useTextarea ? null : 'enter'
			}, 'cancel']
		})

		setTimeout(function(){
			modal.$('.prompt').focus().select();
		},250);

		return modal;
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
		
		$container.length > 0 ? modalController.$el.insertBefore($container) : modalController.$el.appendTo('body');
	});
	

})(jQuery);


