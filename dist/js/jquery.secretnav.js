/*!
 * jquery.secretnav
 * Copyright (c) 2015 Miguel Jiménez - migueljimenezachinte<a>gmail<d>com | https://github.com/jachinte
 * Licensed under the MIT license.
 * https://github.com/jachinte/jquery.secretnav.git
 * @author Miguel Jiménez
 * @version v0.1.8
 */
; (function (factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

	"use strict";

		var pluginName = "SecretNav",
			defaults = {
				navSelector: ".secretnav",
				openSelector: ".open-secretnav",
				position: "left"
			},
			classes = {
				wrapper: "sn-outer-wrapper",
				contentWrapper: "sn-content-wrapper",
				content: "sn-content",
				navWrapper: "sn-nav-wrapper",
				nav: "sn-nav",
				leftNav: "left vertical",
				topNav: "top horizontal",
				moveLeft: "sn-moveleft",
				moveDown: "sn-movedown"
			};

		function Plugin (element, options) {
				this.element = element;
				this.settings = $.extend({}, defaults, options);
				this._defaults = defaults;
				this._name = pluginName;
				this._classes = classes;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
						// DOM element: this.element, Settings: this.settings
						// Functions are called using this, e.g., this.yourOtherFunction(this.element, this.settings)
						
						// Support for CSS transitions
					var support = Modernizr.csstransitions,

						// Transition end event names
						transEndEventNames = {
							"WebkitTransition": "webkitTransitionEnd",
							"MozTransition": "transitionend",
							"OTransition": "oTransitionEnd",
							"msTransition": "MSTransitionEnd",
							"transition": "transitionend"
						},
						transEndEventName = transEndEventNames[ Modernizr.prefixed("transition") ],
						docscroll = 0,

						// Click event (if mobile use touchstart)
						clickevent = this.mobilecheck() ? "touchstart" : "click",

						// Containers
						containers = this.createStructure(),

						nav = $(this.settings.navSelector);

					this.bindEvents(support, docscroll, clickevent, transEndEventName, 
						containers.outerWrapper, containers.wrapper);

					nav.addClass(this._classes.nav);

					if(this.settings.position === "left") {
						nav.addClass(this._classes.leftNav);
						containers.outerWrapper.addClass(this._classes.moveLeft);
					} else if(this.settings.position === "top") {
						nav.addClass(this._classes.topNav);
						containers.outerWrapper.addClass(this._classes.moveDown);
					}

					// Append the content
					containers.wrapper.append(this.element);
					containers.navWrapper.append(nav);
					containers.outerWrapper.append(containers.wrapper);
					containers.outerWrapper.append(containers.navWrapper);

					$("body").append(containers.outerWrapper);
				},

				createStructure: function () {
					var div = "<div></div>",
						outerWrapper = $(div).addClass(this._classes.wrapper),
						wrapper = $(div).addClass(this._classes.contentWrapper),
						navWrapper = $(div).addClass(this._classes.navWrapper);

					return {
						"outerWrapper": outerWrapper,
						"wrapper": wrapper,
						"navWrapper": navWrapper
					};
				},
				
				bindEvents: function (support, docscroll, clickevent, transEndEventName, 
					outerWrapper, wrapper) {

					var self = this;

					$("body").on(clickevent, this.settings.openSelector, function(ev) {
						ev.stopPropagation();
						ev.preventDefault();
						docscroll = self.scrollY();

						wrapper.css("cursor", "pointer");
						outerWrapper.addClass("modalview");

						// Change top of the content
						$(self.element).css("top", docscroll * -1 + "px");
						// Mac chrome issue:
						document.body.scrollTop =
							document.documentElement.scrollTop = 0;

						// Animate
						setTimeout(function() { 
							outerWrapper.addClass("animate"); 
						}, 25);
					});

					$("body").on(clickevent, "." + this._classes.contentWrapper, function() {
						wrapper
							.addClass("transform")
							.css("cursor", "default");

						if(outerWrapper.hasClass("animate")) {
							var onEndTransFn = function(ev) {
								if(support && (
										!$(ev.target).hasClass(self._classes.contentWrapper) ||
										ev.originalEvent.propertyName.indexOf("transform") === -1)) {
									return;
								}

								outerWrapper.removeClass("modalview");
								wrapper.removeClass("transform");

								// Mac chrome issue:
								document.body.scrollTop =
									document.documentElement.scrollTop = docscroll;
								// change top of the content
								$(self.element).css("top", "0px");
								outerWrapper.off(transEndEventName, onEndTransFn);
							};

							if(support) {
								outerWrapper.on(transEndEventName, onEndTransFn);
							} else {
								onEndTransFn.call();
							}

							outerWrapper.removeClass("animate");
						}
					});
				},

				// From: http://stackoverflow.com/a/11381730/989439
				mobilecheck: function () {
					var check = false;
					(function(a) {
						if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
							check = true;
						}
					})(navigator.userAgent||navigator.vendor||window.opera);
					return check;
				},

				scrollY: function () {
					return window.pageYOffset || window.document.documentElement.scrollTop;
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[pluginName] = function (options) {
				return this.each(function() {
						if (!$.data(this, "plugin_" + pluginName)) {
								$.data(this, "plugin_" + pluginName, new Plugin(this, options));
						}
				});
		};

}));
