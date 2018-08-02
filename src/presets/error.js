
module.exports = function(...args){

	[msg, title] =  args.reverse()

	return new Modal({
		effect: 3,
		title: title==null?'':title,
		msg: msg,
		icon: 'cancel',
		btns: 'dismiss',
		theme: 'centered thin ios7 overlay-red'
	})
}