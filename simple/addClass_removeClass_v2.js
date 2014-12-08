/**
 *
 */
   var Module = function () {

      function addClass(node, className) {
         if ((node) && (className)) {
            var classArr = node.className.split(' ');
            if (Object.prototype.toString.call(className) !== '[object Array]') {
               className = className.split(' ');
            }
            className = className.filter(function (iArr) {
               return classArr.indexOf(iArr) === -1;
            });
            className.forEach(function (iArr) {
               classArr.push(iArr);
            });
            node.className = classArr.join(' ');
         }
      }

      function removeClass(node, className) {
         if ((node) && (className)) {
            var classArr = node.className.split(' ');
            if (Object.prototype.toString.call(className) !== '[object Array]') {
               className = className.split(' ');
            }
            classArr = classArr.filter(function (iArr) {
               return className.indexOf(iArr) === -1;
            });
            node.className = classArr.join(' ');
         }
      }

      function hasClass(node, className) {
         this.node=node;
         this.className=className;
         //var node=this.node, className=this.className;
         if ((node) && (className)) {
            var classArr = node.className.split(' ');
            if (Object.prototype.toString.call(className) !== '[object Array]') {
               className = className.split(' ');
            }
            return className.every(function (iarr) {
               if (classArr.indexOf(iarr) > -1) {
                  return removeClass(node, className);
               } else {
                  return addClass(node, className);
               }
            });
         }
      }
      return  {
         init:hasClass
      }
   }();


//RUN

   Module.init($0, 'active');
//or
var wrap = new Module.init($0, 'active');
var body = new Module.init($0, 'active');