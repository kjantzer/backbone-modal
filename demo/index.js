
window.jQuery = window.$ = require('jquery')
window._ = require('underscore')
window.Backbone = require('backbone')

window.Modal = require('../src')


showImg=function(){
    Modal.img('http://kevinjantzer.com/wp-content/uploads/2013/08/Hamaker-Woods-2013.jpg');
}

showImgWithTitle=function(){
    Modal.img('Hamaker Woods by Kevin Jantzer', 'http://kevinjantzer.com/wp-content/uploads/2013/08/Hamaker-Woods-2013.jpg');
}

imgHeader = function(){
	new Modal({
	    headerImg: 'http://kevinjantzer.com/wp-content/uploads/2013/08/Hamaker-Woods-2013.jpg',
		title: 'A message with a header',
		msg: 'You can display an image in the modal by specifycing a "headerImg"',
		w: 400
	})
}

imgHeaderWithIcon = function(){
	new Modal({
	    headerImg: 'http://kevinjantzer.com/wp-content/uploads/2013/08/Hamaker-Woods-2013.jpg',
		title: 'Delete Image?',
		icon: 'trash'
	})
}