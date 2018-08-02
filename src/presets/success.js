
module.exports = function(...args){

	[msg, title] = args.reverse()

	return new Modal({
		effect: 3,
		title: title==null?'':title,
		msg: msg,
		icon: 'ok',
		btns: 'dismiss',
		theme: 'centered ios7'
	})
}