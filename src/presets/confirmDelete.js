
module.exports = function(...args){

	[callback, msg, title] =  args.reverse()
	
	var opts = {}
	if( _.isObject(msg) ){
		opts = msg;
		msg = opts.msg != undefined ? opts.msg : null;
	}

	return new Modal({
		title: title==null?'':title,
		msg: msg==null?'Are you sure you want to delete this?':msg,
		theme: 'ios7',
		icon: opts.icon||'trash',
		headerImg: opts.headerImg||'',
		btns: [{
			label: (opts.deleteBtn||'Delete'),
			className: 'red btn-danger md-close',
			onClick: callback||function(){alert('Please provide a callback')},
			eventKey: 'enter'
		}, 'cancel']
	})
}