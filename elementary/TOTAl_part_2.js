

/*

Сгенерировать список из массива данных. Пример данных. 
Ссылки, среди тегов которых есть object, сделать на голубом фоне. 
При клике на списке - отсортировать (сортировать описания) по алфавиту (А-Я). 
Если список уже отсортирован по алфавиту - отсортировать в обратном порядке (Я-А). 
JSON нужно мочь менять без труда. Как список может выглядеть.


[{
    url: 'http://javascript.info/tutorial/type-detection',
    description: 'How to detect type of object. typeof, instanceof',
    tags: ['object', 'types']
}, {
    url: 'http://bonsaiden.github.io/JavaScript-Garden/#types',
    description: 'Type detection',
    tags: ['object', 'types']
}, {
    url: 'http://www.jspatterns.com/classical-inheritance/',
    description: 'Classical inheritance example, build on top of prototyping.',
    tags: ['object', 'inheritance', 'prototype']
}, {
    url: 'http://dmitrysoshnikov.com/ecmascript/javascript-the-core/',
    description: 'Very detailed description on how javascript core works. ',
    tags: ['core', 'javascript']
}, {
    url: 'http://thc.org/root/phun/unmaintain.html',
    description: 'How to write unmaintainable code. Examples are not in javascript, never the less, very useful general programming article',
    tags: ['programming', 'code']
}, {
    url: 'http://lostechies.com/jimmybogard/2009/01/20/javascript-decorator-pattern/',
    description: 'Decorating functions. This is the way to change function behavior, not touching its implementation',
    tags: ['inheritance', 'function']
}, {
    url: 'http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/',
    description: 'Functions in details',
    tags: ['function']
}, {
    url: 'http://dmitrysoshnikov.com/ecmascript/chapter-4-scope-chain/',
    description: 'Scope chain',
    tags: ['function', 'variable', 'closure']
}, {
    url: 'http://dmitrysoshnikov.com/ecmascript/chapter-3-this/',
    description: 'What is "this" in functions',
    tags: ['function', 'inheritance']
}]
*/




/**
addClass(node, className)

Не должна добавлять класс, если этот класс уже есть у функции.


 * Adds classes to node element. Does not add class, if it's already presents.
 * @param {DOMNode} node     
 * @param {String} className 
 
function addClass(node, className) {

}
*/
function addClass(node, name) {
    var arr = node.className.split(' ');
    var arr2 = [name];
    var arr3 = arr.concat(arr2);
    var newCl = arr3.join(' ');
    node.className = newCl;
}




/**
hasClass(node, className)

className может быть как строкой так и массивом строк


 * returns true, in case node has all classes from className
 * @param  {DOMNode}  node
 * @param  {String|Array} className
 * @return {Boolean}

function hasClass(node, className) {

} 
 */
function addClass(node, name) {
    var arr = node.className.split(' ');
    var arr2 = [name];
    var arr3 = arr.concat(arr2);
    var newCl = arr3.join(' ');
//проверку подсмотрел с видео сам бы сделал на if-ах
    function unique(arr3) {
        var uniqueArray;
        uniqueArray = arr3.filter(function(el, index) {
            return arr3.indexOf(el) === index;
        });
        return uniqueArray.length === arr3.length;
    }
// проверка на уникальнось массвива 
// вариант мой
    function filt(arr) {
        var tempN;
        var count = 0;
        var cheskArr = [];
        for (var k = 0; k < arr.length; k++) {
            tempN = arr[k];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === tempN) {
                    cheskArr.push(arr[i]);
                }
                count += 1;
            }
        }
        console.log(cheskArr.length === arr.length);
    }



    if (unique(arr3) === true) {
        node.className = newCl;
    } else {
        console.log('Имя класса не должно повторяться');
    }
}


//вариант с http://javascript.ru/ui/tree    перед шагом 6;
    function hasClass(elem, className) {
        return new RegExp("(^|\\s)" + className + "(\\s|$)").test(elem.className);
    }


/**
removeClass(node, className)

Удаляет классы у узла. Если название класса повторяется, удаляются все вхождения повторяющихся классов.


 * Removes all classes, that match className (which can be either string or array)
 * @param  {DOMNode} node      
 * @param  {String|Array} className

function removeClass(node, className) {

}
 */

function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
 
function addClass(ele,cls) {
    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
 
function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}







/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2012-11-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

(function (view) {

"use strict";

if (!('HTMLElement' in view) && !('Element' in view)) return;

var
      classListProp = "classList"
    , protoProp = "prototype"
    , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
    , objCtr = Object
    , strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
    }
    , arrIndexOf = Array[protoProp].indexOf || function (item) {
        var
              i = 0
            , len = this.length
        ;
        for (; i < len; i++) {
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    }
    // Vendors: please allow content code to instantiate DOMExceptions
    , DOMEx = function (type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
    }
    , checkTokenAndGetIndex = function (classList, token) {
        if (token === "") {
            throw new DOMEx(
                  "SYNTAX_ERR"
                , "An invalid or illegal string was specified"
            );
        }
        if (/\s/.test(token)) {
            throw new DOMEx(
                  "INVALID_CHARACTER_ERR"
                , "String contains an invalid character"
            );
        }
        return arrIndexOf.call(classList, token);
    }
    , ClassList = function (elem) {
        var
              trimmedClasses = strTrim.call(elem.className)
            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
            , i = 0
            , len = classes.length
        ;
        for (; i < len; i++) {
            this.push(classes[i]);
        }
        this._updateClassName = function () {
            elem.className = this.toString();
        };
    }
    , classListProto = ClassList[protoProp] = []
    , classListGetter = function () {
        return new ClassList(this);
    }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
    return this[i] || null;
};
classListProto.contains = function (token) {
    token += "";
    return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
    var
          tokens = arguments
        , i = 0
        , l = tokens.length
        , token
        , updated = false
    ;
    do {
        token = tokens[i] + "";
        if (checkTokenAndGetIndex(this, token) === -1) {
            this.push(token);
            updated = true;
        }
    }
    while (++i < l);

    if (updated) {
        this._updateClassName();
    }
};
classListProto.remove = function () {
    var
          tokens = arguments
        , i = 0
        , l = tokens.length
        , token
        , updated = false
    ;
    do {
        token = tokens[i] + "";
        var index = checkTokenAndGetIndex(this, token);
        if (index !== -1) {
            this.splice(index, 1);
            updated = true;
        }
    }
    while (++i < l);

    if (updated) {
        this._updateClassName();
    }
};
classListProto.toggle = function (token, forse) {
    token += "";

    var
          result = this.contains(token)
        , method = result ?
            forse !== true && "remove"
        :
            forse !== false && "add"
    ;

    if (method) {
        this[method](token);
    }

    return !result;
};
classListProto.toString = function () {
    return this.join(" ");
};

if (objCtr.defineProperty) {
    var classListPropDesc = {
          get: classListGetter
        , enumerable: true
        , configurable: true
    };
    try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    } catch (ex) { // IE 8 doesn't support enumerable:true
        if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
    }
} else if (objCtr[protoProp].__defineGetter__) {
    elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

}

/**
Пройти по DOM дереву вверх
Вызывает callback с каждым родителем node, возвращает тот узел, для которого callback вернет не falsy значение.


 * Returns first element, of node parents, that matches callback returned true for.
 * @param  {DOMNode}   node
 * @param  {Function} callback
 * @return {DOMNode}

function closest(node, callback) {

}
 */




/*Получить массив элементов уникальных типов
Проверить корректность работы предыдущей функции
Починить функцию next*/
