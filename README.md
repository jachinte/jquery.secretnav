> Got something to say? let's get in touch: [@jachinte](https://twitter.com/jachinte). Please let me know if you're using SecretNav, it's always nice to see what you're using it for!

# jQuery.SecretNav
[![npm version](https://badge.fury.io/js/jquery.secretnav.svg)](http://badge.fury.io/js/jquery.secretnav)
[![Bower version](https://badge.fury.io/bo/jquery.secretnav.svg)](http://badge.fury.io/bo/jquery.secretnav)

SecretNav is a small jQuery push menu plugin that slides out an off-canvas navigation from the edge of the screen while pushing the main content away with a fancy CSS3 powered 3D perspective effect.

This plugin has been inspired by the amazing work done by the [Codrops](http://tympanus.net/codrops/) team, specifically by the effects presented in [this](http://tympanus.net/codrops/2013/12/18/perspective-page-view-navigation/) article. The code is based in [their](https://github.com/codrops/PerspectivePageViewNavigation) initial implementation.

![Demo](http://zippy.gfycat.com/CluelessDishonestAfricangroundhornbill.gif)

## Install

The plugin requires jQuery 1.7 or higher, and Modernizr. Install via [npm](https://www.npmjs.com/package/jquery.secretnav), [bower](https://github.com/jachinte/jquery.secretnav/blob/master/bower.json) or [download as a zip](https://github.com/jachinte/jquery.secretnav/archive/master.zip):

```
npm install jquery.secretnav
```

```
bower install jquery.secretnav
```

## Demo

Live demonstration:

- [Left menu](http://jachinte.github.io/jquery.secretnav/index.html)
- [Top menu](http://jachinte.github.io/jquery.secretnav/index2.html)

You can find the demo files in [here](demo/).

## Usage

Include jQuery and Modernzr, and then the SecretNav plugin and its CSS styles. These files can be found in the [dist/](dist/) folder. A custom build of Modernizr containing only what SecretNav requires can be found in [demo/js/](demo/js/)
```html
<script src="path/to/jquery.js"></script>
<script src="path/to/modernizr.js"></script>
<script src="path/to/jquery.secretnav.min.js"></script>
<link rel="stylesheet" type="text/css" href="path/to/jquery.secretnav.css" />
```

Then, initialize the plugin:

```javascript
$( document ).ready(function() {
    $( '#container' ).SecretNav({		
    	navSelector: 'nav',			// selector of the nav tag
		openSelector: '.open-menu',	// selector of the menu's opener
		position: 'left'			// left | top
    });
});
```

Your HTML should look similar to this:

```html
<body>
	<div id="container"> The content ... <a class="open-menu">Open menu</a> </div>
	<nav>
		<a href="#">Link 1</a>
		...
		<a href="#">Link n</a>
	</nav>
</body>
```

## AMD

SecretNav can also be used with [require.js](http://requirejs.org/).

## Theming

SecretNav comes with a basic styling. If you want to customize the appearance you can modify the styles in [src/sass/jquery.secretnav.scss](src/sass/jquery.secretnav.scss), and then re-run the grunt command to generate the distribution files again.

## Contributing

You are invited to contribute code and suggestions to this project. The more the merrier.
