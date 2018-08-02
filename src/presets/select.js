
module.exports = function(title, values, callback){

	opts = {};

	// FIXME: es6 now has Object.values – so we can use `values.values`
	if( values.hasOwnProperty('values') ){
		opts = values;
		values = values.values
	}

	_.each(values, function(value, indx){
		
		if( ['ok', 'cancel', 'close', 'dismiss'].includes(value) )
			return;
		
		if( _.isString(value) ){
			value = values[indx] = {label: value, val: value}
		}
		
		value.onClick = function(e){
			callback(this, e)
		}
	})

	var msg = opts.msg || '';

	if( _.isArray(title) ){
		msg = title[1];
		title = title[0];
	}
	
	var typedChars = ''
	var typedTimeout;
	var found = false;
	
	function watchKeyPress(e){
		
		e.stopPropagation()
		e.preventDefault();

		if( found && e.which == 13 )
		return found.click();
		else if( found )
		found.style.backgroundColor = '';
		
		found = null;
		
		// reset typed chars (and scroll to top) when esc key hit
		if( e.which == 27 ){
		modal.$btns[0].scrollTop = 0;
		typedChars = '';
		return;
		}
		
		// reset typed chars after 1 second
		clearTimeout(typedTimeout)
		typedTimeout = setTimeout(function(){
		typedChars = '';
		}, 1000)
		
		// only a-z (http://stackoverflow.com/a/2257084/484780)
		if (e.which >= 65 && e.which <= 90)
		typedChars += String.fromCharCode(e.which);
		
		found = null;
		var pattern = new RegExp('^'+typedChars);
		
		if( typedChars )
		modal.$btns[0].querySelectorAll('a').forEach(function(el){
		if( !found && pattern.test(el.innerText.toUpperCase()) ){
			el.scrollIntoView()
			el.style.setProperty('background','#e0e3e5','important')
			found = el;
		}else{
			el.style.backgroundColor = '';
		}
		})
		
	}

	var modal = new Modal({
		title: title==null?'Select':title,
		msg: msg,
		icon: opts.icon||'',
		theme: 'ios7'+(_.pluck(values,'label').join('').length > 30 || opts.vert ?' btn-select':''),
		btns: values,
		onClose: opts.onClose||null
	}).on('close', function(){
		document.removeEventListener('keydown', watchKeyPress)
	})
	
	// only listen for keypress when the select list can scroll
	if( modal.$btns[0].scrollHeight > modal.$btns[0].clientHeight )
		document.addEventListener('keydown', watchKeyPress)
	
	return modal
}