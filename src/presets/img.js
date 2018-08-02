
module.exports = function(...args){
	
	[imgSrc, title] =  args.reverse()

	Modal.spinner();

	var img = document.createElement('img');
	img.src = imgSrc;
	
	img.onload = function(){
		Modal.spinner(false)
		return new Modal({
			title: title==null?'':title,
			msg: img,
			btns: 'close',
			theme: 'ios7 image'
		})
	}
	
	img.onerror = function(){
		Modal.spinner(false)
		Modal.alert('Error Loading Image', '');
	}

}