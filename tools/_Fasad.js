/**
 * @returns {SubSystem1}
 * @constructor
 *  SubSystem1 {method1: function}
 */
function SubSystem1() {
   this.method1 = function() {
        console.log("вызван SubSystem1.method1");
    };
    return this;
}
/**
 *
 * @returns {SubSystem2}
 * @constructor
 * SubSystem2 {method2: function, methodB: function}
 */
function SubSystem2() {

    this.method2 = function() {
        console.log("вызван SubSystem2.method2");
    };
    this.methodB = function() {
        console.log("вызван SubSystem2.methodB");
    };
    return this;
}
/**
 * @returns {Facade}
 * @constructor
 * Facade {m1: function, m2: function}
 */
function Facade() {
    var s1 = new SubSystem1(),
        s2 = new SubSystem2();

    this.m1 = function() {
        console.log("вызван Facade.m1");
        s1.method1();
        s2.method2();
    };

    this.m2 = function() {
        console.log("вызван Facade.m2");
        s2.methodB();
    };
    return this;
}
/**
 *  Entry point
 *  Client
 */
function test() {
    var facade = new Facade();
    facade.m1();
    facade.m2();
}

test();
/*
Выведет:
"вызван Facade.m1"
  "вызван SubSystem1.method1"
  "вызван SubSystem2.method2"
"вызван Facade.m2"
  "вызван SubSystem2.methodB"
*/
