//ћетод Object.create() создаЄт новый объект с указанными объектом прототипа и свойствами.
//Object.create(proto[, propertiesObject])

// Shape Ч суперкласс
function Shape() {
    this.x = 0;
    this.y = 0;
}

// метод суперкласса
Shape.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    console.info('‘игура переместилась.');
}

// Rectangle Ч подкласс
function Rectangle() {
    Shape.call(this); // вызываем конструктор суперкласса
}

// подкласс расшир€ет суперкласс
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('явл€етс€ ли rect экземпл€ром Rectangle? ' + (rect instanceof Rectangle)); // true
console.log('явл€етс€ ли rect экземпл€ром Shape? ' + (rect instanceof Shape)); // true
rect.move(1, 1); // выведет '‘игура переместилась.'


function MyClass() {
    SuperClass.call(this);
    OtherSuperClass.call(this);
}

MyClass.prototype = Object.create(SuperClass.prototype); // наследование
mixin(MyClass.prototype, OtherSuperClass.prototype); // примешивание

MyClass.prototype.myMethod = function() {
    // что-то делаем
};