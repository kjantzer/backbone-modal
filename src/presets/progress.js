
module.exports = function(...args){

	[msg, title] = args.reverse()

	return new Modal({
		effect: 3,
		title: title,
		msg: msg,
		btns: false,
		theme: 'centered thin ios7'
	})
}