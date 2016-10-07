//����� Object.create() ������ ����� ������ � ���������� �������� ��������� � ����������.
//Object.create(proto[, propertiesObject])

// Shape � ����������
function Shape() {
    this.x = 0;
    this.y = 0;
}

// ����� �����������
Shape.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    console.info('������ �������������.');
}

// Rectangle � ��������
function Rectangle() {
    Shape.call(this); // �������� ����������� �����������
}

// �������� ��������� ����������
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('�������� �� rect ����������� Rectangle? ' + (rect instanceof Rectangle)); // true
console.log('�������� �� rect ����������� Shape? ' + (rect instanceof Shape)); // true
rect.move(1, 1); // ������� '������ �������������.'


function MyClass() {
    SuperClass.call(this);
    OtherSuperClass.call(this);
}

MyClass.prototype = Object.create(SuperClass.prototype); // ������������
mixin(MyClass.prototype, OtherSuperClass.prototype); // ������������

MyClass.prototype.myMethod = function() {
    // ���-�� ������
};