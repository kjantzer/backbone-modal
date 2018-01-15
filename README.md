# Backbone Modal

![Version 1.0.0](https://img.shields.io/badge/Version-1.0.0-blue.svg)

> Create clean modal windows with sleek transitions and a simple API.

[![screenshot](http://i.imgur.com/lu2sHfr.png)](http://kjantzer.github.io/backbone-modal/)

### [Demo & Documentation](https://github.com/kjantzer/backbone-modal)

Native alert views are ugly and very limiting; this plugin was designed to replace native alert() and provide additional features commonly needed in apps.

It has been developed with a simple and extensible API to make using modals easy.

> Modal defaults to using cutting-edge css3 [flexbox](http://caniuse.com/#feat=flexbox) for the layout. This can be turned off if you wish to support older browsers. Flexbox ensures the text is nice and sharp.

***

## General Use

```js
var myModal = new Modal({
    title: '',
    msg: '',
    btns: ['ok'],
    theme: 'ios7',
    w: null,
    effect: 1,
})
```

## Modal Presets

There are several baked in modal types for common actions. [Check out the demo](http://kjantzer.github.io/backbone-modal/)

### Alert

```js
Modal.alert('Title', 'Message')
```

### Confirm

```js
Modal.confirm('Confirm', 'Are you sure?', confirmed=>{})
```

### Confirm Delete

Similar to confirm above but will have a red button with a trash icon

```js
Modal.confirmDelete('Delete?', 'Are you sure?', confirmed=>{})
```

### Prompt

```js
Modal.prompt('Title', 'Message', {
    placeholder: 'Enter value',
    val: 'Prefilled value'
}, val=>{
    console.log('you entered: ', val)
})
```

### Spinner

```js
Modal.spinner()
Modal.spinner('With a message')
Modal.spinner(false) // closes spinner
```

### Progress

All modals have a `progress` method for displaying a progress bar. Here's an example

```js
let md = Modal.progress('Uploading', '');

// later...
md.progress(10) // 10%
md.progress(23) // 23%
md.progress(84) // 84%

md.close();
```

## Custom Backbone View

Modal also supports rendering a custom backbone view for the content.

```js
var MyView = Backbone.View.extend({
    className: 'padded', // optional
    render: function(){
        this.$el.html('<p>My modal content here</p>')
    }
})

var myView = new MyView();

new Modal({view: myView})
new Modal({view: myView, title: 'Custom Modal'}) // you can still use other settings

// your view will have a reference to the modal (only while the modal is open)
myView.modal.close()
```

## Options


### `btns` - an array of buttons for the modal

In addition to defining your own buttons, there are a few presets that can be used by string name: `close`, `cancel`, `dismiss`, `ok`, `done`.

```js
btns: [
    'close',
    {
        label: 'Custom button',
        className: 'blue md-close',
        onClick: function(){
            
        }
    }
]
```

>**Note:** the `md-close` class will make that button close the button in addition to calling the `onClick` method



## Changelog

#### v1.0.0
- better handling of custom backbone views as content
- btns `onClick` can be a string of method name on the custom backbone.view

## License

MIT © [Kevin Jantzer](https://twitter.com/kjantzer) – Blackstone Publishing
