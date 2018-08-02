# Backbone Modal

![Version 1.1.0](https://img.shields.io/badge/Version-1.1.0-blue.svg)

> Create clean modal windows with sleek transitions and a simple API.

![screenshot](https://i.imgur.com/qsbn21c.gif)

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

### Warn

```js
Modal.warn('Heads up', 'You can‘t do that')
```

![screenshot](https://i.imgur.com/WR08tw8.png)

### Error

```js
Modal.error('Sorry', 'You are not allowed to perform that action')
```

![screenshot](https://i.imgur.com/a3B8LPD.png)

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

Prompt has some more options available

```js
{
    okBtn: 'Ok',
    password: false,
    placeholder: 'Enter value...',
    val: '',
    prefix: '',
    suffix: '',
    msgAfter: '',
    pattern: null, // a regex
    h: null, // add height for textarea
    w: null,
    autoFocus: true
}
```

### Image

```js
Modal.img('http://i.imgur.com/lu2sHfr.png')
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
        return this
    },
    
    btnAction: function(){
        console.log('take action on the view')
        
        // your view will have a reference to the modal (only while the modal is open)
        this.modal&&this.modal.close() // close modal if exists
    }
})

var myView = new MyView();

new Modal({
    view: myView,
    btns: [
        'cancel',
        {label: 'View Action', onClick: 'btnAction'}
    ]
})
```

## Options

```js
{
    effect: 1, // open/close animation effect
    title: '',
    msg: '',
    headerImg: '',
    icon: '',
    btns: ['close'],
    theme: 'ios7',
    w: null,
    onOpen: null,
    onOpened: null,
    onClose: null,
    onClosed: null,
}
```

### `btns` - an array of buttons for the modal

In addition to defining your own buttons, there are a few presets that can be used by string name: `close`, `cancel`, `dismiss`, `ok`, `done`.

```js
btns: [
    'close',
    {
        label: 'Custom button',
        className: 'blue md-close',
        onClick: function(){
            console.log('custom button clicked')
        }
    }
]
```

>**Note:** the `md-close` class will make that button close the modal in addition to calling the `onClick` method

### `icon` - adds an animated icon to the top of the modal

Expects [basic buttons](https://github.com/kjantzer/basic-buttons) to be installed or a similar CSS icon font installed prefixed with `icon-`; ex: `icon-trash`.

```js
new Modal({title: 'Modal Title', icon: 'ok'})
new Modal({title: 'Modal Title', icon: 'trash'})
new Modal({title: 'Modal Title', icon: 'pencil'})
```

![screenshot](https://i.imgur.com/8oXxnYN.jpg)

### `headerImg` - creates an image header above your title.

```js
new Modal({
    title: 'Title',
    msg: 'The modal content message',
    headerImg: 'https://images.unsplash.com/photo-1469536526925-9b5547cd5d68?auto=format&fit=crop&w=2852&q=80',
    w: 400
})
```

![screenshot](https://i.imgur.com/100YR2L.png)

## Changelog

#### v1.0.0
- better handling of custom backbone views as content
- btns `onClick` can be a string of method name on the custom backbone.view
- new `warn` and `error` styling
- new `headerImg` option
- new `icon` option

## License

MIT © [Kevin Jantzer](https://twitter.com/kjantzer) – Blackstone Publishing
