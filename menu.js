// Based on http://tympanus.net/codrops/2013/04/17/slide-and-push-menus/
// which also has a github repo at https://github.com/codrops/Blueprint-SlidePushMenus

;(function(factory) {
  if (typeof module === 'function') {
    module.exports = factory(this.jQuery || require('jquery'));
  } else {
    this.SPMenu = factory(this.jQuery);
  }

}) (function($) {
	var SPMenu = {};

	SPMenu.toggle = function() {
		$('#cbp-spmenu').toggleClass('cbp-spmenu-open');
	};

	SPMenu.open = function() {
		var $node = $('#cbp-spmenu'),
			options = $node.data('spmenu');
		if (options && options.push) {
			var position = options.position || 'left';
			// now reverse
			position = (position=='left') ? 'right' : 'left';
			$(options.container || 'body').removeClass('cbp-spmenu-push-toleft').removeClass('cbp-spmenu-push-toright').addClass('cbp-spmenu-push-to' + position);
		}
		$node.addClass('cbp-spmenu-open');
	};

	SPMenu.close = function() {
		var $node = $('#cbp-spmenu'),
			options = $node.data('spmenu');
		if (options && options.push) {
			$(options.container || 'body').removeClass('cbp-spmenu-push-toleft').removeClass('cbp-spmenu-push-toright');
		}
		$node.removeClass('cbp-spmenu-open').data('spmenu_id', null);
	};

	SPMenu.create = function(title, items, options) {
		options = options || {};		

		var $node = $('#cbp-spmenu');
		if ($node.length>0) {			
			if (options.id && $node.data('spmenu_id')==options.id) {
				SPMenu.close();
				return;
			}
			SPMenu.close();
			$node.empty().removeClass('cbp-spmenu-left').removeClass('cbp-spmenu-right');
		} else {			
			$node = $('<nav/>').attr('id', 'cbp-spmenu').addClass('cbp-spmenu cbp-spmenu-vertical');
			$node.addClass(options.id);
		}

		var position = options.position || 'left';
		$node.addClass('cbp-spmenu-' + position);

		$node.data('spmenu_id', options.id).data('spmenu', options);

		if (options.push) {
			$(options.container || 'body').addClass('cbp-spmenu-push');
		}

		if (title) {
			var $titleNode = $('<h3/>').html(title).appendTo($node);
			if (options.titleCloses) {
				$titleNode.addClass('cbp-title-close').on('click', function(e){
					e.preventDefault();
					SPMenu.close();
				});
			}
		}

		if (items) {
			var abortFn = function(e){ e.preventDefault(); };

			for (var i=0; i<items.length; i++) {
				var item = items[i],
					$item = $(item.section ? '<h3/>' : '<a/>').html(item.text).addClass(item.css);

				$item.appendTo($node);

				if (item.section) {
					continue;
				}

				if (item.href) {
					$item.attr('href', item.href).attr('target', item.target);
				} else {
					$item.attr('href', '#').on('click', abortFn);
				}

				if (item.fn) {
					$item.on('click', item.fn);
				}
				
			}
		}

		if (!options.skipClose) {
			$('<a/>').attr('href', '#').addClass('cbp-close').html('Close').on('click', function(e) {
				e.preventDefault();
				SPMenu.close();
			}).appendTo($node);
		}

		$node.appendTo(options.container || 'body');

		setTimeout(function(){SPMenu.open();}, 50);

		return $node;
	};

	return SPMenu;

});