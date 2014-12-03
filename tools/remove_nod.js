
/*variant 1*/
   function nodeKill(node){
      node.parentNode.removeChild(node);
   }
/*variant 2*/
   function remove (node) {
      var papa;
      if (node && (papa = node.parentNode)) {
         papa.removeChild(node);
         return node;
      }
      return false;
   }
