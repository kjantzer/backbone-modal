
module.exports = function(...args){

	[msg, title] = args.reverse()

	return new Modal({
		effect: 3,
		title: title,
		msg: msg,
		icon: 'attention-1',
		btns: 'dismiss',
		theme: 'centered ios7 overlay-orange'
	})
}