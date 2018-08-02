
module.exports = function(title, msg, opts){

	return new Modal({
		effect: 3,
		title: title,
		icon: opts&&opts.icon||'',
		msg: msg,
		btns: 'ok',
		theme: 'centered ios7'
	})
}