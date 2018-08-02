
module.exports = function(title, msg, opts, callback){

	var defaultOpts = {
		okBtn: 'Ok',
		password: false, // DEPRECATED - use inputType
		inputType: 'text',
		placeholder: 'Enter value...',
		attr: {},
		val: '',
		prefix: '',
		suffix: '',
		msgAfter: '',
		pattern: null, // a regex
		h: null, // add height for textarea
		w: null,
		autoFocus: true,
		submitOnEnter: true
	}

	opts = _.extend(defaultOpts, opts);

	var useTextarea = opts.h > 0;
	var regex = opts.pattern;

	switch(regex){
		case 'required': regex = '.+'; break;
		case 'hexcode': regex = '^#?([A-Za-z0-9]{6}|[A-Za-z0-9]{3})$'; break;
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
	var prompt = ''

	opts.val = opts.val || '';
	
	let attr = _.map(opts.attr, (v,k)=>`${k}="${v}"`).join(' ')

	if( useTextarea )
		prompt += '<textarea placeholder="'+opts.placeholder+'" '+attr+' class="prompt" style="width:'+opts.w+'px;height: '+opts.h+'px">'+opts.val+'</textarea>';
	else
		prompt += '<input value="'+opts.val+'" placeholder="'+opts.placeholder+'" '+attr+' class="prompt" type="'+(opts.password?'password':opts.inputType)+'" style="width:'+opts.w+'px;">';

	if( opts.prefix )
		prompt = '<span class="md-prefix" style="height: '+opts.h+'px">'+opts.prefix+'</span>'+prompt

	if( opts.suffix )
		prompt += '<span class="md-suffix" style="height: '+opts.h+'px">'+opts.suffix+'</span>'

	msg += '<div class="md-prompt">'+prompt+'</div>'+opts.msgAfter

	var modal = new Modal({
		title: title,
		msg: msg,
		headerImg: opts.headerImg||'',
		theme: 'ios7',
		effect: opts.effect||1,
		icon: opts.icon||'',
		onClose: opts.onClose || null,
		btns: [{
			label: opts.okBtn,
			className: 'blue btn-primary icon-'+(opts.okIcon!=undefined?opts.okIcon:'ok'),
			onClick: function(e){

				if( !callback )
					return alert('Please provide a callback');

				var val = modal.$('.prompt').val();

				if( regex && !regex.test(val) ){
					modal.shake();
				}else{

					if( opts.pattern == 'hexcode' && val.charAt(0) !== '#')
						val = '#'+val;

					if( callback(val, e) !== false )
						modal.close();
				}

			},
			eventKey: useTextarea || !opts.submitOnEnter ? null : 'enter'
		}, 'cancel']
	})

	modal.setValue = function(val){
		modal.$('.prompt').val(val)
	}

	modal.getValue = function(){
		var val = modal.$('.prompt').val();
		if( regex && !regex.test(val) )
		val = false
		return val;
	}

	if( opts.autoFocus !== false )
	setTimeout(function(){
		modal.$('.prompt').focus().select();
	},250);

	return modal;
}