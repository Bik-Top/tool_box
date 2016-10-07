;(function attach_style (text) {
        var style = document.createElement('link');

        style.type = "text/css";
        style.rel = "stylesheet" ;
        style.href = "style.css";

        document.getElementsByTagName('head')[0].appendChild(style);
        return style;
}());

