
module.exports = function(...args){
	
	[callback, msg, title] =  args.reverse()

	var opts = {}
	if( _.isObject(msg) ){
		opts = msg;
		msg = opts.msg != undefined ? opts.msg : null;
	}

	return new Modal({
		title: title==null?'Continue?':title,
		msg: msg==null?'Are you sure you want to continue?':msg,
		theme: 'ios7',
		icon: opts.icon||'',
		btns: [{
			label: opts.okBtn||'Ok',
			className: 'blue btn-primary md-close icon-'+(opts.okIcon!=undefined?opts.okIcon:'ok'),
			onClick: callback||function(){alert('Please provide a callback')},
			eventKey: 'enter'
		}, 'cancel']
	})
}