;(function ( $, window, document, undefined) { 
    'use strict';
    
    var defaults = {
           'activeClass': 'success',
           'slideDown': {
               duration: 400,
               easing: 'swing'
           }
        };
    
    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options || {}); 
        this.init();   
    }
        
    Plugin.prototype.init = function () {
       var that = this,
           links = that.element.find('li > a'),
           prev, current;
       
       //$(that.element).addClass(this.options.sidebarClass);
       links.on('click', function(event) {
           event.stopPropagation();
           var sub = $(this).next();
           
           if(sub.length > 0) {
               event.preventDefault();
               that.toggle(sub, sub.is(':hidden'));  
           } 
           
       });
       
       that.element.find('li > ul').hide();
       
       //
       $(that.element).find('li li > a').each(function () {
            var $this = $(this);
            if(this.href.indexOf(document.URL) === 0) {
                $this.addClass(that.options.activeClass);
                $this.parent().parent().show();
            }    
       });
        
    };
        
    Plugin.prototype.toggle = function(sub, open) {
        return open ? sub.slideDown(this.options.slideDown) : sub.slideUp(this.options.slideDown); 
        /*
        if(open) {
          sub.slideDown(this.options.slideDown);
        } else {
          sub.slideUp(this.options.slideDown);  
        }
        */
    };
    
    $.fn.alltelSidebar = function(options) {
       
       return this.each(function() {
           $(this).hide();
           var obj = new Plugin(this, options);
           $(this).show();
       });
    };
    
}( jQuery, window, document ));
