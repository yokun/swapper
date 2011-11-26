/*!
 * jquery-swapper-handler
 * Version:  1.1.0
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
 * https://github.com/jquery/jquery
 * https://github.com/CaryLandholt/publish
 * https://github.com/CaryLandholt/jquery.swap
 *
 * Registration
 * subscribe('/ajax/received/success/html', swapper);
 *
 * Usage
 * http://jsfiddle.net/carylandholt/48Udy/
 */

/*global define*/

define(['jquery', 'publish', 'swap'], function ($, publish) {
	'use strict';

	var module = {};

	module = function (e, jqXHR, ajaxOptions, data, options) {
		var settings = $.extend({}, module.defaults, options),
			events = settings.events;

		publish(events.swapperStarted, ajaxOptions);
		$(data).swap(options);
		publish(events.swapperComplete, ajaxOptions);
	};

	module.defaults = {
		events: {
			swapperStarted: '/swapper/started',
			swapperComplete: '/swapper/complete'
		}
	};

	return module;
});