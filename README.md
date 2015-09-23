# Backbone Modal

> Create clean modal windows with sleek transitions and a simple API.

[![screenshot](http://i.imgur.com/lu2sHfr.png)](http://kjantzer.github.io/backbone-modal/)

### [Demo & Documentation](https://github.com/kjantzer/backbone-modal)

Native alert views are ugly and very limiting; this plugin was designed to replace native alert() and provide additional features commonly needed in apps.

It has been developed with a simple and extensible API to make using modals easy.

> Modal defaults to using cutting-edge css3 [flexbox](http://caniuse.com/#feat=flexbox) for the layout. This can be turned off if you wish to support older browsers. Flexbox ensures the text is nice and sharp.

***

## General Use

```
var myModal = new Modal({
    title: '',
    msg: '',
    btns: ['ok'],
    theme: 'ios7',
    w: null,
    effect: 1,
})
```