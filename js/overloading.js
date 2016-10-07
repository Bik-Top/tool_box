function twins(an1, an2, an3, an4) {
    return console.log('an1 '+ an1 + ' an2 '+ an2 + ' an3 ' + an3 +'an4' + an4 +"\n");
}

function twins(bn1, bn2) {
    return console.log('bn1 '+ bn1 + ' bn2 '+ bn2  + "\n");
}

function polymorph() {
    var len2func = [];
    for (var i = 0; i < arguments.length; i++)
        if (typeof(arguments[i]) == "function")
            len2func[arguments[i].length] = arguments[i];
    return function () {
        return len2func[arguments.length].apply(this, arguments);
    }
}
//V 1.0.0
var twins_prior = polymorph(
    function (an1, an2, an3, an4) {
        return console.log('an1 '+ an1 + ' an2 '+ an2 + ' an3 ' + an3 +' an4 ' + an4 +"\n");
    },
    function (bn1, bn2) {
        return console.log('bn1 '+ bn1 + ' bn2 '+ bn2  +"\n");
    }
);

// V 1.0.1

var PolyFunc = polymorph(
    function(a,b,c) {
        return "Three arguments version -- any types";
    },

    {i: Number, str: String},
    function (i, str) {
        return "Number and string passed";
    },

    {re: RegExp},
    function(re,a) {
        return "RegExp and something else passed";
    },

    {f: Function, b: Boolean},
    function(f,b) {
        return "Function and boolean passed";
    },

    {f: Function, i: Number},
    function(f,i) {
        return "Function and number passed";
    }
);

console.log(PolyFunc(1,2,3)); // "Three arguments version -- any types"
console.log(PolyFunc(1,"qq")); // "Number and string passed"
console.log(PolyFunc(function() {}, true)); // "Function and boolean passed"
console.log(PolyFunc(function() {}, 1)); // "Function and number passed"
console.log(PolyFunc(/a/, 1)); // "RegExp and something else passed"
console.log(PolyFunc(/a/, "str")); // "RegExp and something else passed"
