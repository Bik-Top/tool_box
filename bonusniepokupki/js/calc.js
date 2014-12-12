(function ($) {
   var methods = {
      init: function (options) {
         settings = $.extend({
            'trigger': false,
            'class_child_g': 'sprite_img',
            'class_child_act': 'active',
            'box_im_text': 'Praga',
            'box_im_text_class': 'tex',
            'text1_h4': 'Банк оплачивает авиабилеты в сумме, грн:',
            'maxNum': [1, 0, 1, 0, 0, 0],
            'town_activ': ['0 0', '-86px 0', '-172px 0', '-258px 0', '-344px 0', '-430px 0'],
            'town_lock': ['0 -66px', '-86px -66px', '-172px -66px', '-258px -66px', '-344px -66px', '-430px -66px'],
            'ff': function (i) {
               if (this.maxNum[i]) {
                  return this.class_child_act;
               }
               else {
                  return ''
               }
            },
            clasCreat: function (i) {
               var cass;
               cass = this.class_child_g + ' ' + 'box' + i + ' ' + this.ff(i);
               return cass;
            },
            li_li: function () {
               var arr = [], i = 0, cla = [], posLock = [], posAct = [];
               for (; i < this.maxNum.length; i += 1) {
                  cla.push(this.clasCreat(i));
                  posLock.push(this.town_lock[i]);
                  posAct.push(this.town_activ[i]);
                  if (this.ff(i) === 'active') {
                     arr.push($('<li></li>').addClass(cla.shift(1)).css({'background-position': posAct.shift(1)}));
                  } else {
                     arr.push($('<li></li>').addClass(cla.shift(1)).css({'background-position': posLock.shift(1)}));
                  }
               }
               // arr.push(this.child.addClass(cla).css({'background-position': pos}));
               return arr;
            }

         }, options);


            return this.each(function () {
               $(this).prepend('<h4>' + settings.text1_h4 + '</h4>',
                  $('<ul></ul>').prepend(settings.li_li())
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
   $('.face_scale').tooltip();

   //$('.face_scale').tooltip();
};
/*

 // вызывает метод init
 $.fn.tooltip({
 parent : '.face_scale',
 child:'li',
 adActive:'active',
 adText:'text',
 claLiAl:'.sprite_img',
 claLiIntim:'box'
 });*/
