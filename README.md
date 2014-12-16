#Modal Backbone View

Create simple modal windows with sleek transitions. Modal.js is Bootstrap ready.

![preview](http://i.imgur.com/ncOZzqw.png)

### Requires
- LESS
- Elements.less
- [spin.js](http://fgnass.github.io/spin.js/) if you want a spinner

Use
---
#### Normal

    Modal({
		title: 'Modal Title',
    	msg: 'This is the message for the modal.'
    });
    
#### Presets

	Modal.alert('Title', 'The message');
	Modal.alert('Title Only', '');
	Modal.alert('Message Only');
	
	Modal.confirm('Title', 'The message', function(){
		alert('user confirmed');
	});
	
	Modal.confirmDelete(function(){
		alert('user confirmed delete');
	});
	
	Modal.spinner(); // requires spin.js
