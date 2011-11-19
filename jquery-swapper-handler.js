/*!
 * jquery-swapper-handler
 * Version:  1.0.0
 * Source:  https://github.com/CaryLandholt/jquery-swapper-handler
 *
 * Copyright (c) 2011 Cary Landholt
 * https://github.com/CaryLandholt
 * https://twitter.com/CaryLandholt
 *
 * Description
 * Swap DOM content based on matching identifiers
 * Can be used as a convention-based handler to replace DOM content with content returned via an AJAX call, for example.
 * If the identifier(s) in the returned content match any in the DOM, the matching DOM elements will be replaced.
 *
 * Dependencies
 * https://github.com/CaryLandholt/jquery.swap
 * https://github.com/CaryLandholt/jquery-pubsub
 *
 * Registration
 * $.subscribe('/ajax/received/success/html', $.handlers.swapper);
 *
 * Usage
 * http://jsfiddle.net/carylandholt/48Udy/
 */

/*global define*/

define(['jquery', 'handlers', 'pubsub'], function ($, handlers) {
	'use strict';

	handlers.swapper = function (e, jqXHR, ajaxOptions, data, options) {
		var settings = $.extend({}, handlers.swapper.defaults, options),
			events = settings.events;

		$.publish(events.swapper, ajaxOptions);
		$(data).swap(options);
		$.publish(events.swapperComplete, ajaxOptions);
	};

	handlers.swapper.defaults = {
		events: {
			swapper: '/swapper',
			swapperComplete: '/swapper/complete'
		}
	};
});