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
*/


 
jQuery.fn.bityslider = function(time,type){
        if(!time){
            var time = 5000;
        }
        if(!type){
            var type = "fade";
        }
        var container = $(this);
        var count = ($(this).children().length)-1;
        var index = 0;
        var next = 1;
        
        
        $(container).children().hide();
        $(container).children().eq(0).show();
        $(container).children().eq(0).load(function(){     
       
        var c_height = $(container).children().eq(0).height();
        var c_width = $(container).children().eq(0).width();
            
        $(container).css({ "height":c_height, "width":c_width});
        
        bity_action();
   
        
        });
        function bity_action(){
            setTimeout(function(){
            
                next = index + 1;
                if(next > count){
                    next = 0;
                }
                var target = $(container).children().eq(index);
                var follow = $(container).children().eq(next);
            
            /*start absolute positioning*/   
                $(target).css("position","absolute");
                $(follow).css("position","absolute");
            /*set target as top element*/
                $(target).css('z-index','100');
                $(follow).css('z-index','99');
            /*reset div dimentions to match the slide*/
                c_height = $(follow).height();
                c_width = $(follow).width();
                
            /*position the slide under (in case it moved)*/          
                pos = $(container).offset(); 
      
            
            if(type == "shrink"){
                $(target).animate({height: "toggle"},1000);
                $(container).css({ height:c_height, width:c_width});
                $(follow).css({"top":pos.top, "left":pos.left}).fadeIn();
            }
            else if(type == "wipe"){
                $(target).animate({width: 0, height:c_height},2000, function(){
                    $(target).hide().css('width','auto');
                });
                $(container).css({ height:c_height, width:c_width});
                $(follow).css({"top":pos.top, "left":pos.left,"z-index":99}).show();
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
                
                bity_action();
            },time);
                
        }
    
    
    
    
        
};


$(document).ready(function(){
    $('.bityslider').kslide(3000,"fade");
    });
