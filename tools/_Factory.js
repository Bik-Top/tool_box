/**
 *
 * @constructor
 */
function Foo() {
  //...
}
function Bar() {
  //...
}

/**
 *
 * @param type
 * @returns {*}
 */
function factory(type) {
  if (type == '1') {
    return new Foo();
  }
  else if (type == '2') {
    return new Bar();
  }
}