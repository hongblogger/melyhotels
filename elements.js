/**
* hero Widget JS file
*
* This file contains functions relating to the hero Widget
 *
 * @package Layers
 * @since Layers 1.0.0
 * heros
 * 1 - Sortable items
 * 2 - Column Removal & Additions
 * 3 - Column Title Update
 *
 * Author: Obox Themes
 * Author URI: http://www.oboxthemes.com/
 * License: GNU General Public License v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

jQuery(document).ready(function($){
    "use strict";

        /* ******************************************************************** */
        /*                        PRELOADER                                     */
        /* ******************************************************************** */
        
           $(window).load(function() {
            if( $('.se-pre-con').length ){
             // Animate loader off screen
                $(".se-pre-con").fadeOut("slow");
            }
        });



        /* ******************************************************************** */
        /*                     Elements                                         */
        /* ******************************************************************** */
        
        $(".xv-acc-block.active").find(".xv-acc-content").slideDown();
        
        $(".xv-acc-header").click(function(e){
            e.preventDefault();
            
            var id = $(this).parents(".xv-acc-block").attr('id');


            if(!$(this).parents('#'+id).hasClass("active")){
                var pp = $(this).parents(".xv-accordion-widget"),
                    p = $(this).parents('.xv-acc-block');
                $('.xv-acc-block').removeClass("active");
                pp.find(".xv-acc-content").slideUp();
                p.addClass("active");
                p.find(".xv-acc-content").slideDown();
            }
        });





        /* ******************************************************************** */
        /*                         GLOBAL VARIABLES                             */
        /* ******************************************************************** */
        
        
        var window_w = $(window).width(); // Window Width
        var window_h = $(window).height(); // Window Height
        var window_s = $(window).scrollTop(); // Window Scroll Top
        
        var $html = $('html'); // HTML
        var $body = $('body'); // Body 
        
        // Get IE version
        var ionic_browser_ie = (function(){
            var undef,
                v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');
            while (
                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]
            );
            return v > 4 ? v : undef;
        }());
        
        // Browser CSS Animation Support
        var ionic_css_animations = false;
        if($html.hasClass('cssanimations'))
            ionic_css_animations = true;
        
        
        // On Load & Resize
        $(window).bind('resize load', function(){
            
            window_w = $(window).width();
            window_h = $(window).height();
            window_s = $(window).scrollTop();
            
        });
        
        // On Scroll
        $(window).scroll(function(){
        
            window_s = $(window).scrollTop();
            
        });

        
        /* Elements */
        
        // enableAccordions(); // Accordion
        
        // enableProgressbars(); // Progress Bars
        
            enableCircularProgressbars();  // Circular Progress Bars
            
            enableCounters(); // Counters
        
            enablePortfolioQuickView(); // Portfolio Quick View
        
        // enableMasonryGrid(); // Masonry Grid

        // enableMixItUp(); // Portfolio Filtering Plugin
        
        if( $('.prettyPhoto').length ){

             enablePrettyPhoto(); // PrettyPhoto Lightbox Plugin
        }

      enablePortfolioLightBox(); // Custom Made Lightbox For Portfolio Items
        
        // enableProjectSlider(); // Project Slider
        
        // enableImageCollapseSlider(); // Image Collapse SLider

    


        /* ================================== */
        /*            ProgressBars            */
        /* ================================== */
        
        // Enable Progressbars
        function enableProgressbars(){
            
            $(window).bind('scroll load resize', function(){
            
                $('.progressbar-container:not(.progressbar-animated)').each(function(){
                    
                    /* Progressbar Elements */
                    var progressbar = $(this);
                    
                    /* Progressbar Variables */
                    var progressbar_y = progressbar.offset().top;
                    
                    /* Viewport Offset */
                    var viewport_offset = 0;
                    
                    // Animate Progressbar If In Viewport
                    if((window_s + window_h - viewport_offset) > progressbar_y){
                        
                        // Get Progress bar Values
                        var progressbar_width = $('.progress-width', progressbar);
                        var progressbar_percent = $('.progress-percent', progressbar);
                        var progressbar_value = progressbar.data('percent');
                        
                        progressbar.addClass('progressbar-animated');
                        progressbar_percent.fadeIn(400);
                        
                        $({startVal:0}).animate({startVal:progressbar_value}, 
                            {
                                duration: 1000,
                                easing:'swing', 
                                step: function() { 
                                    progressbar_width.css('width', Math.ceil(this.startVal)+'%');
                                    progressbar_percent.css('left', Math.ceil(this.startVal)+'%');
                                    progressbar_percent.html(Math.ceil(this.startVal)+'%');
                                }
                            }
                        );
                        
                    }
                
                });
                
            });
            
        }
        
        
        
        
        
        /* ================================== */
        /*       Circular ProgressBars        */
        /* ================================== */
        
        // Enable Circular Progressbars
        function enableCircularProgressbars() {
            
            // Only for IE > 8 (Canvas is not supported in older versions)
            if(ionic_browser_ie > 8 || ionic_browser_ie === undefined){
            
                // Initialize Circular Progressbars
                initCircularProgressbars();
                
                // Check If Knob Is In Viewport
                $(window).bind('scroll load resize', function(){
                
                    $('.circular-progressbar').each(function(){
                        
                        /* Knob Elements */
                        var knob = $(this).find('.circular-progressbar-inner input');
                        var knob_percent = knob.parents('.circular-progressbar-inner').find('span.knob-percent');
                        
                        /* Knob Variables */
                        var value = knob.data('value');
                        var knob_y = $(this).offset().top;
                        var knob_val = knob.data('value');
                        var knob_animated = knob.hasClass('knob-animated');
                        
                        /* Viewport Offset */
                        var viewport_offset = 0;
                        
                        // Animate Knob If In Viewport
                        if((window_s + window_h - viewport_offset) > knob_y && !knob_animated){
                            
                            knob.addClass('knob-animated');
                            $({startVal:0}).animate({startVal:knob_val}, 
                                {
                                    duration: 1000,
                                    easing:'swing', 
                                    step: function() { 
                                        knob.val(Math.ceil(this.startVal)).trigger('change');
                                        knob_percent.html(Math.ceil(this.startVal)+'<span>%</span>');
                                    }
                                }
                            );
                        
                        }
                        
                    });
                    
                });

            }
            
        }
        
        // init Circular ProgressBars
        function initCircularProgressbars(){
            
            // Only for IE > 8 (Canvas is not supported in older versions)
            if(ionic_browser_ie > 8 || ionic_browser_ie === undefined){
                
                $('.circular-progressbar>input').each(function() {
                    
                    var knob = $(this);
                    knob.wrap('<div class="circular-progressbar-inner"></div>');
                    knob.parent().append('<span class="knob-percent"></span>');
                    
                    // Set the value
                    var value = $(this).val();
                    $(this).data('value', value);
                    
                    // Calculate Size
                    var size = 120;
                    if(knob.parents('.circular-progressbar').hasClass('small'))
                        size = 80;
                    
                    // Initialize Knob
                    $(this).knob({
                        min: 0,
                        max: 100,
                        width: size,
                        height: size,
                        thickness: 0.08,
                        readOnly: true,
                        displayInput : false
                    });
                    
                    // Set The Start Value to 0
                    $(this).val(0).trigger('change');

                });
                
            }
            
        }
        
        
        
        
        /* ================================== */
        /*              Counters              */
        /* ================================== */
        
        // Enable Counters
        function enableCounters(){
            
            // Initialize Counters
            initCounters();
            
            // Check If Counter In Viewport
            $(window).bind('load resize scroll', function(){
                
                $('.sc-counter').each(function(){
                    
                    /* Counter Elements */
                    var counter = $(this);
                    
                    /* Counter Variables */
                    var counter_value = counter.data('value');
                    var counter_y = counter.offset().top;
                    var counter_animated = counter.hasClass('counter-animated');
                    
                    /* Animate If In Viewport */
                    if((window_s + window_h) > counter_y && !counter_animated){
                        
                        counter.addClass('counter-animated');
                        $({startVal:0}).animate({startVal:counter_value}, 
                            {
                                duration: 3000,
                                easing:'swing', 
                                step: function() { 
                                    counter.text(getNumberWithCommas(Math.ceil(this.startVal)));
                                }
                            }
                        );
                        
                    }
                    
                });
                
            });
            
        }
        
        function initCounters(){
            // Set Start Value to 0
            $('.sc-counter').each(function(){
                $(this).data('value', $(this).text()).text(0);
            });
        }
                
        // Format Number With Commas
        function getNumberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }



        
        /* ================================== */
        /*       Portfolio Quick View         */
        /* ================================== */
        
        // Enable Portfolio Quick View
        function enablePortfolioQuickView(){
            
            // Initialize Portfolio Quick View
            initPortfolioQuickView();
            
            // Trigger Fix View Box on Resize
            $(window).resize(function(){
                if($.data( document.body, "ionic-portfolio-quickview"))
                    fixPortfolioQuickView();
            });
            
            
        }
        
        // Init Portfolio Quick View
        function initPortfolioQuickView(){
            
            $.data( document.body, "ionic-portfolio-quickview", false );
            
            $('.popular-artwork.style1 .quick-view').click(function(e){
                
                e.preventDefault();
                
                // Variables
                var item = $(this).parents('.portfolio-item');
                var content = item.find('.portfolio-view-content').html();
                
                // Set Quick View Box
                setPortfolioQuickView(item, content);
                
            });
            
        }
        
        // Set View Box
        function setPortfolioQuickView(el, cont){
            
            // Variables
            var item = el;
            var items = item.parent().find('.portfolio-item'); 
            var wrapper = item.parent();
            var content = cont;
            
            if(!$.data( document.body, "ionic-portfolio-quickview")){
                
                // Variables
                var item_y = item.offset().top; // Clicked Item Y
                var lastInlineItem = items.filter(function(index){
                    return $(this).offset().top == item_y;
                }).last(); // Last Inline Item
                
                $.data( document.body, "ionic-portfolio-quickview", true ); // Set PortfolioQuickView to TRUE
                
                // Add Quick View Box After Last Inline Item
                lastInlineItem.after('<div class="quickViewBox"><div class="container">'+content+'</div><div class="quickViewBoxClose"></div></div>');
                wrapper.find('.quickViewBox').slideDown(300);
                
                // Set Active Item
                item.addClass('active-quickview');
                
                
                // Close View Box
                wrapper.find('.quickViewBoxClose').on('click', function(){
                    $(this).parents('.quickViewBox').slideUp(300, function(){
                        $.data( document.body, "ionic-portfolio-quickview", false ); // Set PortfolioQuickView to FALSE
                        $(this).remove();
                        $('.active-quickview', wrapper).removeClass('active-quickview');
                    });
                });
                
            }else{
                
                // Close the Current And Open the Next Quick View Box
                if(!item.hasClass('active-quickview')){
                    wrapper.find('.quickViewBox').slideUp(300, function(){
                        $.data( document.body, "ionic-portfolio-quickview", false );
                        $(this).remove();
                        wrapper.find('.active-quickview').removeClass('active-quickview');
                        setPortfolioQuickView(item, content);
                    });
                }
                
            }
            
        }
        
        /* Fix View Boxes */
        function fixPortfolioQuickView(){
            
            // Variables 
            var item = $('.active-quickview'); // Active Item
            var wrapper = item.parent(); // Items Wrapper
            var quickViewBox = $('.quickViewBox', wrapper); // Quick View Box
            
            quickViewBox.hide();
            
            var item_y = item.offset().top; // Item Y
            var items = item.parent().find('.portfolio-item'); // All Items
            var lastInlineItem = items.filter(function(index){
                return $(this).offset().top == item_y;
            }).last(); // Last Inline Item
            
            // Fix Box Position
            quickViewBox.detach().insertAfter(lastInlineItem).show();
            
        }






        /* ================================== */
        /*       PrettyPhoto - Lightbox       */
        /* ================================== */
        
        // Enable PrettyPhoto
        function enablePrettyPhoto(){
            
            // Initializes PrettyPhoto
            initPrettyPhoto();
            
        }
        
        // Init PrettyPhoto
        function initPrettyPhoto(){
            $('.prettyPhoto').prettyPhoto({
                default_width: 500,
                default_height: 344
            });
        }




        /* ================================== */
        /* solarLightBox - Portfolio Lightbox */
        /* ================================== */
        
        // Enable Portfolio Lightbox
        function enablePortfolioLightBox(){
            
            // Initializes Portfolio Lightbox
            initPortfolioLightBox();
            
        }
        
        // Init Portfolio Lightbox
        function initPortfolioLightBox(){
            
            // Init SolarLightBox Style 1
            solarLightBox1('.solarLightBox');
            
            // Init SolarLightBox Style 2
            solarLightBox2('.solarLightBox2');
            
            // Init SolarLightBox Style 3
            solarLightBox3('.solarLightBox3');
            
        }
        
        // SolarLightBox Style 1
        function solarLightBox1(selector){
            $(selector).each(function(){
                var content = $(this).parents('.portfolio-item').find('.portfolio-lightbox').html();
                var image = $(this).attr('href');
                $(this).solarLightBox({
                    content: content,
                    image: image,
                    gallery: true,
                    directionNav: true
                });
            });
        }
        
        // SolarLightBox Style 2
        function solarLightBox2(selector){
            $(selector).each(function(){
                var content = $(this).parents('.portfolio-item').find('.portfolio-lightbox').html();
                var image = $(this).attr('href');
                $(this).solarLightBox({
                    content: content,
                    image: image,
                    gallery: true,
                    directionNav: true,
                    onItemLoad: function(){

                        // Read Only Star Rating
                        ratyReadOnly('.slb-content .star-rating');

                    }
                });
            });
        }
        
        // SolarLightBox Style 3
        function solarLightBox3(selector){
            $(selector).each(function(){
                var content = $(this).parents('.portfolio-item').find('.portfolio-lightbox').html();
                $(this).solarLightBox({
                    content: content,
                    directionNav: false,
                    onItemLoad: function(){
                        
                        // Read Only Star Rating
                        ratyReadOnly('.slb-content .star-rating');
                        
                        // FlexSlider Image Gallery
                        flexSliderImageGallery('.slb-content .image-gallery');

                    }
                });
            });
        }
        

        
    /*============================
    Owl Slider
    ============================*/
    
    if($(".layers-plus-owl-carousel").length){
        $(".layers-plus-owl-carousel").each(function(num,ele){
             var $this = $(this), 
                centerEle = Math.ceil($this.find(".layers-plus-owl-child").length/2)-1;
            if(!$this.data("center")){
                centerEle = 0;
            }
            $(this).owlCarousel({

                items:$this.data("col"),
                center: $this.data("center"),
                margin:$this.data("gutter"),
                loop:$this.data("loop"),
                startPosition:centerEle,
                dots:$this.data("dots"),
                nav:$this.data("nav"),
                autoplay:$this.data("autoplay"),
                autoplaySpeed:$this.data("speed"),
           
                responsive: {
                  0: {
                    items:  $this.data("res1")
                        
                  },
                  600: {
                    items: $this.data("res2")
                  },
                  1000: {
                    items: $this.data("res3")
                  }
                }
            });
        });
    }
        
    
        
    });



