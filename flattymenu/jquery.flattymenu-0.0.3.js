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
			fixedHeaderElm:	null
		}
		
		this.options = $.extend( {}, defaults, options) ;
		
		this.element = elem;
		
		var _self = this;
		
		// body wrap
		$("body").wrapInner('<div id="flattyBodyWrapper"></div>');
		
		// add menu element
		$("body").append('<div id="flattyMenuWrapper"><div class="wrap"></div></div>');
		$("#flattyMenuWrapper").css({
			display:	"none",
			opacity:	0,
			position:	"absolute",
			width:		"100%",
			height:		window.innerHeight,
			"z-index":	99999
		});
		
		// copy menu
		if (this.element != null){
			var menu = $(this.element).clone();
			$(this.element).remove();
			$("#flattyMenuWrapper .wrap").append(menu);
			menu.show(0);
		}
		
		
		$("#flattyMenuWrapper .wrap").on("scroll", function(e){
			if ($(this).scrollTop()==0){
				$(this).scrollTop(1);
			}
			var maxScrollHeight = $(this)[0].scrollHeight - $(this).innerHeight();
			if ($(this).scrollTop()>=maxScrollHeight){
				$(this).scrollTop(maxScrollHeight-1);
			}
		});
		
		// header fixed
		if (_self.options.fixedHeaderElm){
			$(_self.options.fixedHeaderElm).css({
				position:	"absolute",
				width:		"100%",
				top:		0,
				left:		0
			});
			$("#flattyBodyWrapper").css({
				"margin-top":	$(_self.options.fixedHeaderElm).outerHeight()
			});
			$(window).on("scroll", function(){
				$(_self.options.fixedHeaderElm).css({
					"margin-top":	$(this).scrollTop()>0 ? $(this).scrollTop() : 0
				});
			});
		}
		
		// window resize
		$(window).on("resize", function(){
			if ($("#flattyMenuWrapper:visible").length){
				$("#flattyMenuWrapper")
					.css({
						height:		window.innerHeight,
						left:		0,
						top:		$(window).scrollTop()
					})
			}
		});
		
		// open / close
		if (_self.options.btnOpen){
			$(_self.options.btnOpen).on("touchend", function(e){
				if ($("#flattyMenuWrapper:visible").length>0){
					_self.menuOff();
				} else {
					_self.menuOn();
				}
				e.preventDefault();
			});
		}
		if (_self.options.btnClose){
			$(_self.options.btnClose).on("touchend", function(e){
				if ($("#flattyMenuWrapper:visible").length>0){
					_self.menuOff();
				}
				e.preventDefault();
			});
		}
	}
	
	$.extend( $.flattymenu.prototype , {
		menuOn : function(){
			
			var sTop = $(window).scrollTop();
			
			$("#flattyMenuWrapper")
				.css({
					height:		window.innerHeight
				});
			$("#flattyMenuWrapper .wrap")
				.css({
					position:		"absolute",
					top:			0,
					left:			0,
					width:			"100%",
					height:			"100%",
					"overflow-y":	"scroll",
					"-webkit-overflow-scrolling": "touch"
				});
			
			$("#flattyMenuWrapper")
				.css({
					display:	"block",
					left:		0,
					top:		sTop + window.innerHeight
				})
				.stop(true)
				.animate(
					{
						top:		sTop,
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
										height:		window.innerHeight,
										overflow:	"hidden",
										"filter": "blur(10px)",
										"-webkit-filter": "blur(10px)",
										top:		sTop
									})
									.scrollTop(sTop);
							}, 0);
						}
					});
			
		},
		menuOff : function(){
			
			$("#flattyBodyWrapper")
				.css({
					position:	"static",
					height:		"auto",
					overflow:	"",
					"filter": "",
					"-webkit-filter": "",
					top:		0
				});
			
			$("#flattyMenuWrapper")
				.stop(true)
				.animate(
					{
						top:		window.innerHeight,
						opacity:	0
					},
					{
						duration:	250,
						easing:		"swing",
						complete:	function(){
							$("#flattyMenuWrapper").css({ display: "none" });
						}
					});
		}
	});
	
	
	$.fn.flattymenu = function ( options ) {
		return this.each(function () {
			new $.flattymenu( this , options);
		});
	};

}(jQuery, window));
