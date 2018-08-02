/*
	Modal Backbone.js View

	Based on work done by Manoela Ilic (http://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/)

	Requires Animate.css for attention getters (http://daneden.github.io/animate.css/)

	@author Kevin Jantzer
	@since 2013-09-04
*/

let ModalController = require('./controller')
let Modal = require('./modal')

// initialize a controller
let modalController = Modal.prototype.controller = new ModalController()

Modal.close = function(opts){ modalController.closeAll(); Modal.SPINNER = null; }
Modal.isOpen = function(opts){ return modalController.modals.length > 0 ; }

// add presets
Modal.spinner = require('./presets/spinner')
Modal.progress = require('./presets/progress')
Modal.alert = require('./presets/alert')
Modal.warn = require('./presets/warn')
Modal.success = require('./presets/success')
Modal.error = require('./presets/error')
Modal.confirm = require('./presets/confirm')
Modal.confirmDelete = require('./presets/confirmDelete')
Modal.select = require('./presets/select')
Modal.prompt = require('./presets/prompt')
Modal.img = require('./presets/img')

window.addEventListener('DOMContentLoaded', function(){
	document.body.append( modalController.el )
})

module.exports = Modal