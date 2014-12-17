(function ($) {
   var methods = {
      init: function (options) {
         settings = $.extend({
            'trigger': false,
            'class_child_g': 'sprite_img',
            'travel': 'air_travel',
            'bonuses': 'bonuses',
            'fill': {'width':'1%'},
            'clasName': '',
            'restoran': 'restoran',
            'scale_I': [3000, 10000, 50000],
            'scale_II': [4500, 15000, 75000],
            'text_travel': 'Банк оплачивает авиабилеты в сумме, грн:',
            'text_bonuses': 'БАЛАНС БАЛЛОВ:',
            'text_restoran': 'БАНК ОПЛАЧИВАЕТ ПОСЕЩЕНИЕ В РЕСТОРАНЫ В СУММЕ, ГРН:',
            'maxNum': [1, 0, 0, 0, 0, 0],
            'town_activ': ['0 0', '-86px 0', '-172px 0', '-258px 0', '-344px 0', '-430px 0'],
            'town_lock':  ['0 -66px', '-86px -66px', '-172px -66px', '-258px -66px', '-344px -66px', '-430px -66px'],
            'txt':  ['praga', 'polsha', 'london', 'pari', 'greec', 'dubai', 'barselona'],
            noda:function(a){
               //$(a).css({'width':'83px'})
               //console.log($('li').css({'background':'#f0f'}) );
               //console.log(a.css({'background':'#f0f'}) );
                      as = $(a).parent()
              // a.style.width='20px'
              // console.log( a);
               this.width()
            },
            width:function(){
                var a=529;
               var b= this.maxNum.length;
                var margin=((a/b)-83)+'px';
                console.log(margin);
            },
            clasCreat: function (i) {
               var cass, act;
               (this.maxNum[i]) ? act = 'active' : act = ''; 
               cass = this.class_child_g + ' ' + 'box' + (i + 1) + ' ' + act;

               return cass;
            },

            li_li: function () {
               var arr = [], i = 0,
                  cla = [],
                  posLock = [],
                  posAct = [];


               for (; i < this.maxNum.length; i += 1) {

                  if(this.maxNum[i] === 1){
                     cla.push(this.clasCreat(i));
                     arr.push( this.createEl('li', cla.shift(), {'background-position': this.town_activ[i],
                           //'margin': Math.float( ( ($(this).parent().width()-83)*6)/6)+'px'
                           } ).
                        prepend(
                           this.createEl('div','tex').text(this.txt[i])
                        )
                     ) ;  
                  }
                  else if (this.maxNum[i] === 0) {
                     cla.push(this.clasCreat(i));
                     arr.push(
                        this.createEl('li', cla.shift()).
                           css(
                              {'background-position': this.town_lock[i]}
                        ).prepend(
                           this.createEl('div','tex').text(this.txt[i])
                        )
                     );
                  }
                  else if(this.maxNum[i] === -1){
                     arr.push( this.createEl('li', '', {'background-position': 'none'}).prepend(
                        this.createEl('div','tex').text()
                     ) )

                  }
                  posLock.push(this.town_lock[i]);
                  posAct.push(this.town_activ[i]);
               }

               return arr;
            },

            scale:function(options){

               var arr =[];
               if(options!== 'bonuses'){
                  arr.push( this.createEl('div', 'scale').
                        prepend(this.createEl('div', options).
                           append(this.grid ).
                           prepend( this.createEl('div', 'fill', this.fill))
                        )
                  );
               }
               else{
                  arr.push( this.createEl('div', options).
                        prepend( this.createEl('div', 'fill', this.fill))
                  );
               }

               return arr;
            },

            createEl:function(el, clasName, param){
               var e, noda;
               (param) ? e = $('<' + el + '></' + el + '>').addClass(clasName).css(param) : e = $('<' + el + '></' + el + '>').addClass(clasName);
               if(el==='li'){
                  noda=e[0];
                  this.noda( noda )
               }
                return e;
            },

            grid: function () {
               var arr = [], i = 0;

               for (; i < settings.maxNum.length; i += 1) {   //console.log(num[i]);
                  arr.push( settings.createEl('div', 'grid').append(settings.spans) )
               }
               return arr;
            },
            spans:function(){
               var ar=[];
               for (var i = 0; i < 5; i += 1) {
                  var t=i;
                  if(i==0){
                     ar.push(settings.createEl('div', 'output').text(settings.forin(settings.scale_I[0])));
                  }
                  ar.push(settings.createEl('span'));
               }
               //ar[0].css({'background':'#f0f'})
               //console.log( ar[0].parent() );
               return ar;
            },
            forin:function(ell){
                    var i=0;
               function a(ell){
                 // console.log(ell);
                   i+=1;
                  //console.log(i);
                  return (ell/5) ;
               }
               a(ell);
            }


         }, options);

         return this.each(function () {
            $(this).prepend('<h4>' + settings.text_travel + '</h4>',
               $('<ul></ul>').prepend(settings.li_li()).append( settings.scale(settings.travel), '<h4>' + settings.text_bonuses + '</h4>').append( settings.scale(settings.bonuses), '<h4>' + settings.text_restoran + '</h4>').append( settings.scale(settings.restoran))
            );
         });

      },
      remowe: function () {
         $(this).remove();
      }
   };



   $.fn.tooltip = function (method) {
      if (methods[method]) {
         return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
         return methods.init.apply(this, arguments);
      } else {
         $.error('Метод с именем ' + method + ' не существует для jQuery.tooltip');
      }
   };
})(jQuery);
window.onload = function () {
   $('.face_scale>h4').tooltip('remowe');
   $('.face_scale>ul').tooltip('remowe');
   $('.face_scale').tooltip( { 'maxNum': [1,1, 0, 0, 0, 1],
      'travel': 'air_travel',
      'fill': {'width':'0%'},
      'bonuses': 'bonuses',
      'restoran': 'restoran'
   } );

};

