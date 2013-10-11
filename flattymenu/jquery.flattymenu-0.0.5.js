/*
 *  Project: flattymenu - jQuery Plugin
 *  Description: for iOS / Android, flat menu
 *  Author: Akihiro Koyanagi | http://i-section.net | http://akihiro.jugem.jp
 *  License: GPL
 */

;(function ( $, window, undefined ) {
	
	$.flattymenu = function( elem , options ){
		
		var defaults = {
			btnOpen:	null,
			btnClose:	null,
			fixedFooterElm:	null
		}
		
		this.options = $.extend( {}, defaults, options) ;
		
		this.element = elem;
		
		var _self = this;
		
		var scrollTimerId = null;
		
		// body wrap
		var clone = null;
		if (_self.options.fixedFooterElm){
			clone = $(_self.options.fixedFooterElm).clone();
			$(_self.options.fixedFooterElm).remove();
		}
		$("body").wrapInner('<div id="flattyBodyWrapper"></div>');
		if (clone) $("body").append(clone);
		
		
		// add menu element
		$("body").append('<div id="flattyMenuWrapper"></div>');
		$("#flattyMenuWrapper").css({
			display:	"none",
			opacity:	0,
			position:	"absolute",
			width:		"100%",
			"z-index":	99999
		});
		
		// copy menu
		if (this.element != null){
			var menu = $(this.element).clone();
			$(this.element).remove();
			$("#flattyMenuWrapper").append(menu);
			menu.show(0);
		}
		
		
		$("#flattyMenuWrapper").on("scroll", function(e){
			if ($(this).scrollTop()==0){
				$(this).scrollTop(1);
			}
			var maxScrollHeight = $(this)[0].scrollHeight - $(this).innerHeight();
			if ($(this).scrollTop()>=maxScrollHeight){
				$(this).scrollTop(maxScrollHeight-1);
			}
		});
		
		// header/footer fixed
		if (_self.options.fixedFooterElm){
			
			var menuY = $(window).scrollTop() + parseInt($(window).innerHeight(),10) - $(_self.options.fixedFooterElm).outerHeight(true);
			
			$(_self.options.fixedFooterElm)
				.css({
					position:	"absolute",
					width:		"100%",
					top:		menuY + "px",
					left:		0
				})
				.attr("data-flattymenuFixedMenu", 1);
			
			$("#flattyBodyWrapper").css({
				"padding-bottom":	$(_self.options.fixedFooterElm).outerHeight(true)
			});
			
			$(window).on("scroll", function(){
				
					
				if (scrollTimerId) clearInterval(scrollTimerId);
				
				scrollTimerId = setInterval(function(){
					if (!$("#flattyMenuWrapper:visible").length){
						var menuY = $(window).scrollTop() + parseInt(window.innerHeight, 10) - $(_self.options.fixedFooterElm).outerHeight(true);
						$(_self.options.fixedFooterElm)
							.css({
								top:      menuY+"px"
							})
							.show(0);
					}
				}, 200);
				
			});
		}
		
		
		$(window)
			.on("resize", function(){
				
				var menuOuterHeight = 0;
				if ($("[data-flattymenuFixedMenu=1]").length){
					menuOuterHeight = $("[data-flattymenuFixedMenu=1]").outerHeight(true);
				}
				
				var windowInnerHeight = parseInt(window.innerHeight, 10);
				var sTop = parseInt($(window).scrollTop(), 10);
				
				if ($("#flattyMenuWrapper:visible").length){
					
					
					if (_self.options.fixedFooterElm){
						$(_self.options.fixedFooterElm)
							.css({
								top:      sTop
							});
					}
					
					$.flattymenu.prototype.reLayout();
					
					$("#flattyMenuWrapper")
						.css({
							top:		(sTop + menuOuterHeight) + "px"
						})
						.show(0);
					
				} else {
					var menuY = sTop + windowInnerHeight - menuOuterHeight;
					$(_self.options.fixedFooterElm)
						.css({
							top:      menuY+"px"
						});
				}
			})
			.on("touchmove", function(){
				if (_self.options.fixedFooterElm && $("#flattyMenuWrapper:visible").length==0){
					$(_self.options.fixedFooterElm).hide(0);
				}
			});
		
		
		// open / close
		if (_self.options.btnOpen){
			$(_self.options.btnOpen).on("touchend mouseup", function(e){
				if ($("#flattyMenuWrapper:visible").length>0){
					_self.menuOff();
				} else {
					_self.menuOn();
				}
				e.preventDefault();
			});
		}
		if (_self.options.btnClose){
			$(_self.options.btnClose).on("touchend mouseup", function(e){
				if ($("#flattyMenuWrapper:visible").length>0){
					_self.menuOff();
				}
				e.preventDefault();
			});
		}
	}
	
	$.extend( $.flattymenu.prototype , {
		menuOn : function(){
			
			var $flattymenuFixedMenu = null;
			var menuOuterHeight = 0;
			if ($("[data-flattymenuFixedMenu=1]").length){
				$flattymenuFixedMenu = $("[data-flattymenuFixedMenu=1]");
				menuOuterHeight = $flattymenuFixedMenu.outerHeight(true);
			}
			
			var sTop = parseInt($(window).scrollTop(), 10);
			var windowInnerHeight = parseInt(window.innerHeight, 10);
			
			if ($flattymenuFixedMenu){
				$flattymenuFixedMenu
					.css({
						left:		0,
						top:		(sTop + windowInnerHeight - menuOuterHeight)+"px"
					})
					.stop(true)
					.animate(
						{
							top:		sTop
						},
						{
							duration:	250,
							easing:		"swing",
							complete:	function(){
							}
						});
			}
			
			$.flattymenu.prototype.reLayout();
			
			$("#flattyMenuWrapper")
				.css({
					top:		(sTop + windowInnerHeight + menuOuterHeight) + "px",
					display:	"block",
					opacity:	0
				})
				.scrollTop(1)
				.stop(true)
				.animate(
					{
						top:		(sTop + menuOuterHeight)+"px",
						opacity:	1
					},
					{
						duration:	250,
						easing:		"swing",
						complete:	function(){
							setTimeout(function(){
								$("#flattyBodyWrapper")
									.css({
										position:	"relative",
										height:		windowInnerHeight+"px",
										overflow:	"hidden",
										"filter": "blur(20px) saturate(150%)",
										"-webkit-filter": "blur(20px) saturate(150%)",
										top:		sTop
									})
									.scrollTop(sTop);
							}, 0);
						}
					});
			
		},
		menuOff : function(){
			
			var $flattymenuFixedMenu = null;
			var menuOuterHeight = 0;
			if ($("[data-flattymenuFixedMenu=1]").length){
				$flattymenuFixedMenu = $("[data-flattymenuFixedMenu=1]");
				menuOuterHeight = $flattymenuFixedMenu.outerHeight(true);
			}
			
			var sTop = parseInt($(window).scrollTop(), 10);
			var windowInnerHeight = parseInt(window.innerHeight, 10);
			
			$("#flattyBodyWrapper")
				.css({
					position:	"static",
					height:		"auto",
					overflow:	"",
					"filter": "",
					"-webkit-filter": "",
					top:		0
				});
			
			if ($flattymenuFixedMenu){
				$flattymenuFixedMenu
					.css({
						left:		0,
						top:		sTop + "px"
					})
					.stop(true)
					.animate(
						{
							top:		(sTop + windowInnerHeight - menuOuterHeight)+"px"
						},
						{
							duration:	250,
							easing:		"swing",
							complete:	function(){
							}
						});
			}
			
			$("#flattyMenuWrapper")
				.stop(true)
				.animate(
					{
						top:		(sTop + windowInnerHeight)+"px",
						opacity:	0
					},
					{
						duration:	250,
						easing:		"swing",
						complete:	function(){
							$("#flattyMenuWrapper").css({ display: "none" });
						}
					});
		},
		reLayout: function(){
			
			var $flattymenuFixedMenu = null;
			var menuOuterHeight = 0;
			if ($("[data-flattymenuFixedMenu=1]").length){
				$flattymenuFixedMenu = $("[data-flattymenuFixedMenu=1]");
				menuOuterHeight = $flattymenuFixedMenu.outerHeight(true);
			}
			
			var sTop = parseInt($(window).scrollTop(), 10);
			var windowInnerHeight = parseInt(window.innerHeight, 10);
			
			$("#flattyMenuWrapper")
				.css({
					left:		0,
					height:		(windowInnerHeight - menuOuterHeight) + "px",
					"overflow-y": "scroll",
					"-webkit-overflow-scrolling": "touch"
				});
			
		}
	});
	
	
	$.fn.flattymenu = function ( options ) {
		return this.each(function () {
			new $.flattymenu( this , options);
		});
	};

}(jQuery, window));
