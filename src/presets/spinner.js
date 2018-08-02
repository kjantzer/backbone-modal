
module.exports = function(msg){
	
	if( msg === false || msg === 'close'){

		if( Modal.SPINNER ) Modal.SPINNER.close();
		Modal.SPINNER = null;

	}else if( !Modal.SPINNER ){

		return Modal.SPINNER = new Modal({
			title: 'spin',
			effect: 1,
			msg:msg?msg:false,
			btns: false,
			theme: 'ios7'
		});
	}
}