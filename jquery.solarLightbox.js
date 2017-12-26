/**
*	solarLightBox v1.0.0
*	Jquery Plugin For Displaying Custom Lightbox Content
*/

;(function($){


	var lightBoxActive = false;

	// Plugin Constructor
	$.fn.solarLightBox = function( options ){

		var settings = $.extend($.fn.solarLightBox.defaults, options );
		initLightBox();

		return this.each(function(){
			// Set init Class
			$(this).addClass('slb-init-item');
			var lightBox = new solarLightBoxObject( $(this), options );
		});

	};

	// Init Lightbox
	function initLightBox(){

		if(!lightBoxActive){

			$('body').append('<div class="solarLightBox-container"><div class="slb-loading"></div><div class="slb-next"></div><div class="slb-prev"></div><div class="slb-close"></div><div class="slb-inner"><div class="slb-inner-inner"><div class="slb-content"></div></div></div></div>');
			lightBoxActive = true;

			$('.slb-close').click(function(){
				closeLightBox();
			});

			$('.slb-next').click(function(){
				var item = $('.slb-init-item.slb-active');
				var gallery = item.data('gallery');
				var gallery_items = $('.slb-init-item').filter(function(){ if($(this).data('gallery') == gallery ) return this });

				var currentItem = gallery_items.index(item);
				var nextItem = ++currentItem;
				if(nextItem == gallery_items.length)
					nextItem = 0;

				gallery_items.eq(nextItem).trigger('click');
			});

			$('.slb-prev').click(function(){
				var item = $('.slb-init-item.slb-active');
				var gallery = item.data('gallery');
				var gallery_items = $('.slb-init-item').filter(function(){ if($(this).data('gallery') == gallery ) return this });

				var currentItem = gallery_items.index(item);
				var prevItem = --currentItem;
				if(prevItem < 0)
					prevItem = gallery_items.length -1;

				gallery_items.eq(prevItem).trigger('click');
			});
			
			$(window).resize(function(){
				var window_h = $(this).height();
				// Fix Main Image Height
				var slbImg = $('.slb-content .slb-image');
				if(slbImg.length){
					var slbimg_h = slbImg.css('height', 'auto').height();
					if((slbimg_h / window_h * 100) > 60){
						slbImg.css('height', (window_h*0.6)+'px').css('width', 'auto');
					}
				}
				// Fix Next Image Position
				var slbNext = $('.slb-next');
				if(slbNext.length){
					slbNext.css('right','').css('right', -(slbNext.width()-85)+'px');
				}
				// Fix Prev Image Position
				var slbPrev = $('.slb-prev');
				if(slbPrev.length){
					slbPrev.css('right','').css('left', -(slbPrev.width()-85)+'px');
				}
			});

		}

	}

	var solarLightBoxObject = function ( item, options ){

		// LightBox Object
		var object = this;

		// Item
		this.item = item;

		// Variables
		this.options = options;
		this.image = this.options.image;
		this.content = this.options.content;
		this.gallery = this.options.gallery;

		// OnClick
		this.item.click(function(e){
			e.preventDefault();
			showLightBox();
			object.loadContent();
		});

	}


	solarLightBoxObject.prototype = {

		loadContent: function(){

			// Active Class
			$('.slb-init-item.slb-active').removeClass('slb-active');
			this.item.addClass('slb-active');

			// Main Variables
			var slb_content = $('.slb-content');
			var slbNext = $('.slb-next');
			var slbPrev = $('.slb-prev');
			var content = this.content
			var main_image = this.image;
			var nextImage, prevImage;
			var callback = this.options.onItemLoad;

			if(!this.options.directionNav){
				$('.solarLightBox-container').addClass('no-direction-nav');
			}else{
				$('.solarLightBox-container').removeClass('no-direction-nav');
			}

			// If Gallery Is Enabled
			if(this.gallery && this.options.directionNav){

				// Get All Gallery Items
				var gallery = this.item.data('gallery');
				this.gallery_items = $('.slb-init-item').filter(function(){ if($(this).data('gallery') == gallery ) return this });
				var currentIndex = this.gallery_items.index(this.item);

				var nextIndex = currentIndex + 1;
				var prevIndex = currentIndex - 1;
				if(nextIndex >= this.gallery_items.length)
					nextIndex = 0;
				if(prevIndex < 0)
					prevIndex = this.gallery_items.length - 1;

				nextImage = this.gallery_items.eq(nextIndex).attr('href');
				prevImage = this.gallery_items.eq(prevIndex).attr('href');

			}

			// Fade Out Content And Arrows
			slbNext.fadeOut(200);
			slbPrev.fadeOut(200);
			slb_content.fadeOut(400, function(){

				// Load Main Image
				if(main_image){
					$('<img class="slb-image" src="' + main_image + '">').load(function(){

						$('.solarLightBox-container .slb-content').html(content);
						$(this).prependTo('.solarLightBox-container .slb-content');
						$('.slb-loading').fadeOut(200);
						// Fade In Loaded Content
						slb_content.fadeIn(400);
						
						var slbimg_h = $('.slb-content .slb-image').height();
						if((slbimg_h / $(window).height() * 100) > 60){
							$('.slb-content .slb-image').css('height', ($(window).height()*0.6)+'px').css('width', 'auto');
						}

						// Callback Function
						if(callback)
							callback();

					});
				}else{

						$('.solarLightBox-container .slb-content').html(content);
						$('.slb-loading').fadeOut(200);
						// Fade In Loaded Content
						slb_content.fadeIn(400);

						// Callback Function
						if(callback)
							callback();

				}

				if(nextImage){
					$('<img class="slb-next-image" src="' + nextImage + '">').load(function(){
						slbNext.html('<img class="slb-image-next" src="' + nextImage + '">');
						slbNext.css('right', -(slbNext.width()-85)+'px');
						slbNext.hide();
						slbNext.show();
						slbNext.addClass('animated');
					});
				}

				if(prevImage){
					$('<img class="slb-prev-image" src="' + prevImage + '">').load(function(){
						slbPrev.html('<img class="slb-image-next" src="' + nextImage + '">');
						slbPrev.css('left', -(slbPrev.width()-85)+'px');
						slbPrev.hide();
						slbPrev.fadeIn(200);
						slbPrev.addClass('animated');
					});
				}

			});

		}

	}

	// Show Lightbox
	function showLightBox(){
		$('.solarLightBox-container').fadeIn(300);
		$('.slb-loading').fadeIn(200);
	}

	// Close Lightbox
	function closeLightBox(){
		$('.solarLightBox-container').fadeOut(300, function(){
			$('.slb-content').children().remove();
			$('.slb-prev').children().remove();
			$('.slb-next').children().remove();
		});
		$('.slb-init-item.slb-active').removeClass('slb-active');
	}

	// Plugin Default Options
	$.fn.solarLightBox.defaults = {
		content: '',
		image: '',
		gallery: false,
		directionNav: false,
		onItemLoad: false
	};

})(jQuery);