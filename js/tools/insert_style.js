;(function attach_style (text) {
        var style = document.createElement('style');

        style.type = 'text/css';
        if ( /WebKit|MSIE/i.test(navigator.userAgent) ) {
                if ( style.styleSheet ) {
                        style.styleSheet.cssText = text;
                } else {
                        style.innerText = text;
                }
        } else {
                style.innerHTML = text;
        }
        document.getElementsByTagName('head')[0].appendChild(style);
        return style;
}("body{background: #ccc;}"+".tabs6 li {"+
      "float:left;"+
      'background:url("images/leftGradMenu.png") no-repeat left top, url("images/rightGradMenu.png") no-repeat right top;'+
      "margin:0;"+
     " padding:0 0 0 22px;"+
     " text-decoration:none;"+
      "}"));

