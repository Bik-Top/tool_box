(function ($) {
   var methods = {
      init: function (options) {
         settings = $.extend({
            'trigger': false,
            'class_child_g': 'sprite_img',
            'travel': 'air_travel',
            'bonuses': 'bonuses',
            'fill': {'width': '1%'},
            'clasName': '',
            'scaleValue': [0, 500, 1000, 1500, 2000, 2500, 0, 1000, 2000, 3000, 4000, 5000],
            'restoran': 'restoran',
            'text_travel': 'Банк оплачивает авиабилеты в сумме, грн:',
            'text_bonuses': 'БАЛАНС БАЛЛОВ:',
            'text_restoran': 'БАНК ОПЛАЧИВАЕТ ПОСЕЩЕНИЕ В РЕСТОРАНЫ В СУММЕ, ГРН:',
            'maxNum': [1, 0, 0, 0, 0, 0],
            'town_activ': ['0 0', '-86px 0', '-172px 0', '-258px 0', '-344px 0', '-430px 0'],
            'town_lock': ['0 -66px', '-86px -66px', '-172px -66px', '-258px -66px', '-344px -66px', '-430px -66px'],
            'txt': ['praga', 'polsha', 'london', 'pari', 'greec', 'dubai', 'barselona'],
            noda: function (a) {
               //console.log($('.face_scale >ul'));
               var margin = ((529 / this.maxNum.length) - 83) + 'px';
               a.style.marginRight = margin;
            },
            clasCreat: function (i) {            //возвращает клас в формате sprite_img box2 если требуется добовляет active
               var cass, act;
               (this.maxNum[i]) ? act = 'active' : act = '';
               cass = this.class_child_g + ' ' + 'box' + (i + 1) + ' ' + act;

               return cass;
            },

            li_li: function () {                //исходя из значения 'maxNum' длина масива- кол-во городов 1- вкл., -1-выкл., 0-hold
               var arr = [], i = 0,
                  cla = [],
                  posLock = [],
                  posAct = [];
               for (; i < this.maxNum.length; i += 1) {

                  if (this.maxNum[i] === 1) {
                     cla.push(this.clasCreat(i));
                     arr.push(this.createEl('li', cla.shift(), {'background-position': this.town_activ[i]}).
                           prepend(
                           this.createEl('div', 'tex').text(this.txt[i])
                        )
                     );
                  }
                  else if (this.maxNum[i] === 0) {
                     cla.push(this.clasCreat(i));
                     arr.push(
                        this.createEl('li', cla.shift()).
                           css(
                           {'background-position': this.town_lock[i]}
                        ).prepend(
                           this.createEl('div', 'tex').text(this.txt[i])
                        )
                     );
                  }
                  else if (this.maxNum[i] === -1) {
                     arr.push(this.createEl('li', '', {'background-position': 'none'}).prepend(
                        this.createEl('div', 'tex').text()
                     ))
                  }

                  posLock.push(this.town_lock[i]);
                  posAct.push(this.town_activ[i]);
               }
               console.log($(arr[0]));
               return arr;
            },

            scale: function (options) {
               var arr = [];
               if (options !== 'bonuses') {
                  arr.push(this.createEl('div', 'scale').
                        prepend(this.createEl('div', options).
                           append(this.grid).
                           prepend(this.createEl('div', 'fill', this.fill))
                     )
                  );
               }
               else {
                  arr.push(this.createEl('div', options).
                        prepend(this.createEl('div', 'fill', this.fill))
                  );
               }
               return arr;
            },
            createEl: function (el, clasName, param) {
               var e;
               (param) ? e = $('<' + el + '></' + el + '>').addClass(clasName).css(param) : e = $('<' + el + '></' + el + '>').addClass(clasName);
               (el === 'li') ? this.noda(e[0]) : '';
               (clasName === 'grid') ? e.css({'width': ((100 / this.maxNum.length) + '%')}) : '';
               return e;
            },
            grid: function () {
               var arr = [],
                  i = 0;
               for (; i < settings.maxNum.length; i += 1) {
                  arr.push(settings.createEl('div', 'grid').append(settings.spans))
               }
               return arr;
            },

            spans: function () {       //5 полосок мм, в output вставим цифры
               var ar = [],as,
                  scaleValue = settings.scaleValue.shift();
               for (var i = 0; i < 5; i += 1) {
                  as='a'+i
                  console.log(as);
                  (i == 0) ? ar.push(settings.createEl('div', 'output').text(scaleValue)) : '';
                  ar.push(settings.createEl('span', as));
               }
               return ar;
            },
         }, options);
         return this.each(function () {
            $(this).prepend('<h4>' + settings.text_travel + '</h4>',
               $('<ul></ul>').prepend(settings.li_li()).append(settings.scale(settings.travel), '<h4>' + settings.text_bonuses + '</h4>').append(settings.scale(settings.bonuses), '<h4>' + settings.text_restoran + '</h4>').append(settings.scale(settings.restoran))
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
   $('.face_scale').tooltip({
      'maxNum': [-1, 1, 0, 0, 0, 0],
      'travel': 'air_travel',
      'fill': {'width': '0%'},
      'bonuses': 'bonuses',
      'restoran': 'restoran',
      'scaleValue': [2002, 501, 1000, 1500, 2000, 2001, 2002, 4002, 1000, 2000, 3000, 4000, 4001, 4002]
   });
};

