/**
The MIT License (MIT)

Copyright (c) 2014 Knox Modern Media

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 
* */


 
jQuery.fn.bityslider = function(time,type){
        if(!time){
            var time = 5000;
        }
        if(!type){
            var type = "fade";
        }
       
        var parent = $(this);
        var count = ($(this).children().length)-1;
        var index = 0;
        var next = 1;
        var c_height;
        var c_width;       
        var go_on = true;
        var timer;
        var defined_height;
        var defined_width;
        
        $(parent).children().hide();
        
        $(parent).children().wrapAll("<div/>");
        
        var container = $(parent).find('div').eq(0);
        
        var first =  $(container).children().eq(0);
   
        set_baseline();
        
        define_dims(first);
        
        $(container).css({width:c_width, height:c_height});
        $(first).show();
      
        /*check if the first slide is loaded & rendered, if so fire (non-image test is here)*/   
        if(first.complete || $(first).height() > 0){
            bity_action();        
        }
    
        /*if it hasn't rendered yet it is probably an image. Use load to fire once it has rendered*/
        else{
           $(first).load(function(){
               bity_action();
           });
        }
        
        /**
         * check the current size of the parent div relative to the document.
         */
        function set_baseline(){
            defined_height = $(parent).height();
            defined_width = $(parent).width();
            
        }
        
        
        /*if the container size is defined use that dimension.
         * If not use the visible slide dimension.
         * If just one is defined, determine the ratio and define it that way.
         *
         */
        function define_dims(elem){
            var ratio = $(elem).width()/$(elem).height();
            
            if(defined_width != 0 && defined_height !=0){
               c_height = defined_height;
               c_width = defined_width;
            }
            
            else if(defined_width == 0 && defined_height == 0){
               c_height = $(elem).height();
               c_width = $(elem).width();
            }
            else if(defined_width != 0 && defined_height == 0){
               c_height = defined_width/ratio;
               c_width = defined_width;
            }
            else{
               c_height = defined_height;
               c_width = defined_height*ratio;
            }           
        }

        function bity_action(){
         if(go_on){
         timer = setTimeout(function(){
                    bity_fire();
                    bity_action();
            },time);
         }
        }    
               
            function bity_fire(){   
                next = index + 1;
                if(next > count){
                    next = 0;
                }
                var target = $(container).children().eq(index);
                var follow = $(container).children().eq(next);
            
            /*start absolute positioning*/   
                $(follow).css("position","absolute");
            /*set target as top element*/
                $(target).css('z-index','100');
                $(follow).css('z-index','99');
            
                define_dims(follow);    
            
            /*set slide dims to match the container*/     
                $(follow).css({height:c_height, width:c_width});
                
            /*position the slide under (in case it moved)*/          
                pos = $(container).offset(); 
      
            
            if(type == "shrink"){
                $(target).animate({"height": "toggle"},1000);
                $(container).css({ height:c_height, width:c_width});
                $(follow).css({"top":pos.top, "left":pos.left}).fadeIn();
            }
            else if(type == "wipe"){
                $(target).animate({width: 0},2000,function(){
                  $(target).hide();  
                });
                $(container).css({ height:c_height, width:c_width});
                $(follow).css({"top":pos.top, "left":pos.left}).show();
            }
            
            /*default to fade*/
            else{    
                $(target).fadeOut();
                $(container).css({ height:c_height, width:c_width});
                $(follow).css({"top":pos.top, "left":pos.left}).fadeIn();    
            }
               if(index < count){
                    index++;
                }
                else{
                    index=0;
                }
               
            }
                
            function reset(){
                
                index = 0;
                next = 1;
                    
                go_on = false;
                clearTimeout(timer);
                $(container).children().hide();
                $(container).css({height:"auto", width:"auto"});
                $(container).children().each(function(){
                    $(this).css('position','static');
                });
                
                set_baseline();
                define_dims(first);
                
                $(first).show();
                
                  bity_fire();  
                  go_on = true;
                  bity_action();  
            }
    
        $(window).resize(function(){
                reset();  
            });
    
    
        
};


$(document).ready(function(){
    $('.bityslider').each(function(){
        $(this).bityslider(3000,"fade");    
    });
});
