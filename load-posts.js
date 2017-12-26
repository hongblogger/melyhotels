jQuery(window).load(function(){
    jQuery.force_appear();
});


jQuery(document).ready(function($) {

    var pageNum = parseInt(x_loader.startPage) + 1,
        max = parseInt(x_loader.maxPages),
        nextLink = x_loader.nextLink,
        newWay,
        selector_m = x_loader.selector_m.replace(/,\s*$/, ""),
        selector_p = x_loader.selector_p.replace(/,\s*$/, ""),
        selector_n = x_loader.selector_n.replace(/,\s*$/, "");

    $(selector_m).wrapInner("<div class='lploader-Wrapper'></div>");
    $(".lploader-Wrapper").addClass(x_loader.selector_a);
    if (nextLink !== null)
        newWay = nextLink.split("/page/");
    if (pageNum <= max) {
        $(selector_m).append('<div id="lploader-load-posts"><div class="loadingGIf"><img src="'+x_loader.gif+'" alt="loading..."></div><a href="#">' + x_loader.string_load_more + '</a></div>');
        $(selector_n).remove();
    }

    $(selector_p).appear();
    $(document.body).on('appear', selector_p, function(e, $affected){
        $(this).addClass("animate");
    });

    $('#lploader-load-posts a').click(function(e) {
        e.stopImmediatePropagation();
        var $this = $(this);
        if (pageNum <= max) {
            $("#lploader-load-posts").addClass("xv-loading-post");
            $this.text(x_loader.string_loading);
            $.get(nextLink, function(data) {
                var $xWrap = $(".lploader-Wrapper");
                $xWrap.append($(data).find(selector_p));
                $.force_appear();
                pageNum++;
                nextLink = newWay[0] + "/page/" + pageNum + "/";
                if (pageNum <= max) {
                    $("#lploader-load-posts").removeClass("xv-loading-post");
                    $this.text(x_loader.string_load_more);
                    $this.removeClass("locked");
                } else {
                    $("#lploader-load-posts").removeClass("xv-loading-post");
                    $this.addClass("disable").text(x_loader.string_no_more);
                }
                /*
                | ----------------------------------------------------------------------------------
                | Callback
                | ----------------------------------------------------------------------------------
                */
               
                if (typeof  window.lploaderCallback == 'function') { 
                   window.lploaderCallback();
                }
                /*
                | ----------------------------------------------------------------------------------
                | Animation
                | ----------------------------------------------------------------------------------
                */
                
                $(selector_p).appear();
                $(document.body).on('appear', selector_p, function(e, $affected){
                    $(this).addClass("animate");
                });
                

                /*------*/
                
            });
        } else {
            $this.html(x_loader.string_no_more);
        }
        return false;
    });


    var theBtn = $("#lploader-load-posts a"),
        isInfinite = $("body").hasClass("xv-infinite");
    $("#lploader-load-posts").appear();
    $(document.body).on('appear', '#lploader-load-posts', function(e, $affected){
        if(isInfinite){
            if (!theBtn.hasClass("locked")) {
                theBtn.addClass("locked").trigger("click");
            }
        }
    });
    

});