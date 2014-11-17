/**
 * Created by BikTop on 17.11.2014.
 */
function addEvent(elem, evType, fn) {
  if (elem.addEventListener) {
    elem.addEventListener(evType, fn, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + evType, fn);
  } else {
    elem['on' + evType] = fn;
  }
}