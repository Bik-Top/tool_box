// вариант 1
var app = {
    property1: 'value',
    property2: 'value',
    /*...*/
    method1: function () {
        /*...*/
    }
    /*...*/
};
// вариант 2

function SomeFunction() {
    if (typeof(SomeFunction.instance) == 'object') {
        return SomeFunction.instance;
    }
    this.property1 = 'value';
    this.property2 = 'value';
    SomeFunction.instance = this;
    return this;
}

SomeFunction.prototype.method1 = function () {
};


// вариант 3
var mySingleton = (function () {
    // Instance stores a reference to the Singleton
    var instance;

    function init() {
        // Singleton
        // Private methods and variables
        var privateVariable = "Im also private",
            privateRandomNumber = Math.random();

        function privateMethod() {
            console.log("I am private");
        }

        return {
            // Public methods and variables
            publicMethod: function () {
                console.log("The public can see me!");
            },
            publicProperty: "I am also public",
            getRandomNumber: function () {
                return privateRandomNumber;
            }
        };
    }

    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };

})();

var myBadSingleton = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {
        // Singleton
        var privateRandomNumber = Math.random();
        return {
            getRandomNumber: function () {
                return privateRandomNumber;
            }
        };
    }

    return {
        // Always create a new Singleton instance
        getInstance: function () {
            instance = init();
            return instance;
        }

    };

})();


// Usage:

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber()); // true