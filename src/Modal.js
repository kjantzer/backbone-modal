
let Spinner = require('spin.js')

const SPEED = 300 /* keep in sync with CSS */
const KEY_CODE_MAP = {
	27: 'esc',
	13: 'enter',
	8: 'delete'
}

let defaultSettings = require('./settings');

module.exports = Backbone.View.extend({

	className: 'md-modal flex',

	events: {
		'click .md-close': 'close'
	},

	initialize: function(opts){

		this.options = _.extend({}, defaultSettings, opts||{});

		this.$el.html('<div><div class="md-content">\
						<div class="progress"><div class="progress-bar"></div></div>\
						<div class="md-header-img"></div>\
						<h1></h1>\
						<h3></h3>\
						<div class="clearfix"><div class="content"></div>\
						<div class="buttons"></div>\
						<div class="checkbox hide"></div>\
					  </div></div>');

		this.controller.add(this);

		this.$headerImg = this.$('.md-header-img')
		this.$icon = this.$('h1')
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

		this.progress(this.options.progress);

		if( this.options.headerImg ){
			this.$headerImg.html('<img src="'+this.options.headerImg+'">')
			
			if( this.options.icon == 'headerImg' )
				this.$headerImg.addClass('icon')
			else if( this.options.icon )
				this.$headerImg.addClass('bgd')
		}
		
		if( this.options.w ){
			this.width(this.options.w);
			this.$headerImg.width(this.options.w)
		}

		if( this.options.icon && this.options.icon != 'headerImg' )
			this.$icon.addClass('icon-'+this.options.icon)

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

		this.options.onOpen && this.options.onOpen(this)

		this.render();

		// delay showing so animation works
		setTimeout(_.bind(function(){
			this.$el.addClass('md-show');

			if( this.options.icon )
				this.$icon.addClass('animated speed-2 flipInY')

			this.options.onOpened && this.options.onOpened(this)
		},this), 100)
	},

	close: function(){

		this.options.onClose && this.options.onClose(this)
		
		delete (this.options.view || this.options.msg || '').modal

		this.$el.removeClass('md-show');
		var self = this;

		this.trigger('close');

		_.each(this._eventKeyFns, function(fn){
			window.removeEventListener('keyup', fn)
		})

		setTimeout(function(){
			self.controller.remove(self);

			self.onClosed && self.onClosed(self.controller)
		}, SPEED)
	},

	renderTitle: function(){

		if( !this.options.title )
			return this.$title.hide();

		else
			this.$title.show();

		if( this.options.title === 'spin' || this.options.title === 'spinner'){
			this.$title.empty();
			this.spinner();

		}else{
			this.$title.spin && this.$title.spin(false);
			this.$title.html(this.options.title)
		}
	},

	renderContent: function(){

		if( !this.options.msg && !this.options.view )
			return this.$content.hide()
		else
			this.$content.show();

		let view = this.options.view || this.options.msg

		if( view instanceof Backbone.View ){
			if( view.modal ) view.modal.close() // already presented in a modal, so close old one
			view.modal = this;
			this.el.classList.add('backbone-view')
			this.$content.html( view.render().$el );
		}else{
			this.$content.html( this.options.msg );
		}
	},

	renderBtns: function(){

		this.$btns.empty();

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
			opts = {label: 'Close', className: 'md-close', eventKey:this.options.btns.length==1?['esc','enter']:'esc'};
		else if( opts === 'cancel' )
			opts = {label: 'Cancel', className: 'md-close', eventKey:'esc', onClick: this.triggerCancel.bind(this)};
		else if( opts === 'ok' )
			opts = {label: 'Ok', className: 'md-close', eventKey:['esc','enter']};
		else if( opts === 'done' )
			opts = {label: 'Done', className: 'md-close', eventKey:['esc','enter']};
		else if( opts === 'dismiss' )
			opts = {label: 'Dismiss', className: 'black md-close', eventKey:['esc','enter']};

		opts = _.extend({
			label: 'Button',
			className: '',
			attr: {}
		}, opts);

		var $btn = $('<a class="button large flat btn btn-default '+opts.className+'" title="'+(opts.attr.title||'')+'">'+opts.label+'</a>');

		if( opts.onClick ){
			let onClick = opts.onClick.bind(opts)
			let backboneView = this.options.view||this.options.msg
			
			if( _.isString(opts.onClick)
			&& backboneView instanceof Backbone.View
			&& _.isFunction( backboneView[opts.onClick] ) ){
				onClick = backboneView[opts.onClick].bind(backboneView)
			}
			
			$btn.bind('click', function(e){
			_.defer(function(){ onClick(e) })        
			});
		}

		// if event key is set, then listen for that keyup event
		if( opts.eventKey )
		{
			var eventKeyFn = this._eventKeyFn.bind(this, opts.eventKey, $btn); // custom event function for this btn
			this._eventKeyFns = this._eventKeyFns || [];
			this._eventKeyFns.push(eventKeyFn);		// remember this function so we can unbind it later
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
		// if( !self.$title.spin ) return;
		this.$el.addClass('spinner');
		_.defer(function(){	// we defer so the auto centering of the spinner works
			let s = new Spinner().spin(self.$title[0])
			console.log(s);
			// self.$title.spin();
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
			maxWidth: val,
			boxSizing: 'border-box'
		});
		return this;
	},

	saveKey: function(){
		if(this.options.hide && this.$checkbox.find('input').is(':checked')){
			User.modalKey(this.options.key, true);
		}
	}

})