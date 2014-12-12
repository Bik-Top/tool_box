var bOpera = window.opera;
var defPlaceHolder = " ";
var ElementErrMsg = null;
var isDot = 0;
var gdtypeSymbols = {
  "RegNum": "[\\d]",
  "RegXMoney": "[\\d\\.|\\,]",
  "RegXMoneyNegative": "[\\-\\d\\.|\\,]",
  "Date": "[\\d]",
  "Account": "[\\d]",
  "AccountSmbl": "[\\d]",
  "RegLat": "[a-zA-Z\\.\\-' ]",
  "RegLatAndNum": "[a-zA-Z\\.\\-' 0-9]",
  "RegEmail": "[0-9a-zA-Z\\.\\_\\-@]",
  "RegSWIFT": "[a-zA-Z0-9/\\-\\?:\\(\\)\\.\\,'\\+\\{\\}\\ ]",
  "RegSWIFTUpper": "[a-zA-Z0-9/\\-\\?:\\(\\)\\.\\,'\\+\\{\\}\\ ]",
  "RegPayRu": "[\x20-\x7E\r\n№~!@#\$%^&*()_+!\\\"№;%:?ЁёІіЇїЄєҐґа-яА-Я ]",
  "RegPayEn": "[\x20-\x7E\r\n№~!@#\$%^&*()_+!\\\"№;%:? ]",
  "RegFreeGRND": "[^\\]\\[&' ]",
  "RegDrive": "[a-zA-Z]",
  "RegFilePath": "[^\/\?\"<>|]",
  "ShortTime": "[\\d]",
  "RegFreePercent": "[^%]",
  "RegEtokenID": "[0-9A-Z]",
  "RegCard": "[A-Z\\ \\.\\-']",
  "RegPhone": "[0-9/\\+]",
  "AccountLic": "[0-9]",
  "MncCardId": "[\\d]",
  "MncPhone": "[\\d]",
  "KievEnergoLS": "[\\d]"
};

var gdtypeFormat = {"RegXMoney": "^([0-9]{0,}[.|,]?[0-9]*)$",
  "RegXMoneyNegative": "^([-]{0,1}[0-9]{0,}[.|,]?[0-9]*)$",
//                 "Date":"^([\\d\\_]{2}[.][\\d\\_]{2}[.][\\d\\_]{4})$",
  "Date": "^([\\d\\ ]{2}[.][\\d\\ ]{2}[.][\\d\\ ]{4})$",
  "ShortTime": "^([\\d\\ ]{2}[:][\\d\\ ]{2})$",
  //  "Account" : "^([\\d\\ ]{0,4}[.]{0,1}[\\d\\ ]{0,1}[.]{0,1}[\\d\\ ]{9})$",
  "Account": "^([\\d]{0,14})$",
  "AccountSmbl": "^([\\d]{0,14})$",
  "Pan": "^([\\d]{0,16})$",
  // "RegPhone" : "^([+]{1,1}[3,7\\ ]{0,1}[0-9\\ ]{0,11})$",
  "RegEmail": "^([0-9a-zA-Z]{1}[0-9a-zA-Z\\.\\_\\-]{0,}[@]{1}[0-9a-zA-Z\\.\\_\\-]{1,}[\\.]{1}[0-9a-zA-Z]{1,})$",
  "MncPhone": "^([0-9\\ ]{0,7})$",
  "KievEnergoLS": "^([0-9\\ ]{0,6}[/]{1,1}[0-9\\ ]{0,3}[/]{1,1}[0-9\\ ]{0,2})$"
};
var gcheckFormatonblurOnly = {"RegEmail": true};
var gdtypeMask = {"Date": "  .  .    ",
  //  "Account":"              ",
  "ShortTime": "  :  ",
  //    "RegPhone":"+            "
  // "MncPhone":"       "
  "KievEnergoLS": "      /   /  "
};

function _attachElmHndlrs(w, Obj) {
  var oEArray, oF = (!Obj) ? $(window, 'MForm') : Obj, oAr = new Array("TEXTAREA", "INPUT");
  for (var i = 0; i < oAr.length; i++) {
    try {
      _ElmHndlrs(w, oF.getElementsByTagName(oAr[i]));
    } catch (e) {
    }
  }
}
function _ElmHndlrs(w, Ar) {
  var dt, el, t;
  for (var i = 0; i < Ar.length; i++) {
    t = Ar[i].type;
    if ((t == 'text') || (t == 'textarea') || (t == 'password'))AttachHandlers2Element(Ar[i], w);
  }
}
function CheckMaskFields(w) {

  function checkElmsForFormat(elms) {
    for (var i = 0; i < elms.length; i++) {
      if (elms[i].getAttribute("DTYPE") && elms[i].getAttribute('err') == '1')return false;
    }
    return true;
  }

  var _res = true;
  var oAr = new Array("TEXTAREA", "INPUT");
  for (var i = 0; i < oAr.length; i++) {
    try {
      _res = checkElmsForFormat(document.getElementsByTagName(oAr[i]));
      if (!_res)return false;
    } catch (e) {
    }
  }
  return _res;
}

function AttachHandlers2Element(el, w) {
  try {
    elementMsgErrHide();
  } catch (e) {
  }
  addElEvent(el, "focus", onChangeValue);
  addElEvent(el, "blur", onChangeValue);
  addElEvent(el, "drop", onChangeValue);
  addElEvent(el, "keydown", onChangeValue);
  addElEvent(el, "keypress", onChangeValue);
//  if(window.opera)
  addElEvent(el, "keyup", onChangeValue);
  addElEvent(el, "paste", onChangeValue);
  addElEvent(el, "cut", onChangeValue);
  addElEvent(el, "select", onChangeValue);

  try {
    var dtype = el.getAttribute("DTYPE");
    if (dtype == "RegNum") el.style.textAlign = "left";
    if (dtype == "RegXMoney") el.style.textAlign = "right";
    if (dtype == "RegXMoneyNegative") el.style.textAlign = "right";
    if (dtype == "RegPhone") {
      el.style.textAlign = "left";
    }
    if (dtype == "RegXMoney" || dtype == "RegXMoneyNegative") {
      if (el.getAttribute("MAXL") == null) el.setAttribute('MAXL', '15');
      el.value = NormalizeMoney(el.value, el.getAttribute('NOTEMPTY'), el.getAttribute('DAFTER') || 2);
    }
  } catch (e) {
  }

  if (!el.attachEvent)addElEvent(el, "input", onChangeValue);
  try {
    var oFEl = null, sFnName = 'window._fn_onvalue_change_' + el.name;
    try {
      oFEl = eval.call(w, sFnName);
    } catch (e) {
    }
    if (!oFEl)try {
      oFEl = eval(sFnName);
    } catch (e) {
    }
    if (!oFEl)return;
    addElEvent(el, "keydown", oFEl);
    addElEvent(el, "keypress", oFEl);
    addElEvent(el, "keyup", oFEl);
    addElEvent(el, "paste", oFEl);
    addElEvent(el, "cut", oFEl);
    if (!el.attachEvent)addElEvent(el, "input", oFEl);
  } catch (e) {
  }
}

function preventEvent(e) {
  if (!e)e = window.event;
  try {
    e.returnValue = false;
  } catch (e) {
  }
  try {
    e.preventDefault();
  } catch (e) {
  }
}

function onChangeValue(e) {
  if (!e)e = window.event;
  var el = e.target || e.srcElement;
  if (el.readOnly)return;
  if (el.value == el.getAttribute("placeholder")) return;
  var dtype = el.getAttribute("DTYPE") || "";
  var allowSymbols = el.getAttribute("allowSymbols") || "";
  var dTypeSymbols = (dtype != "") ? (gdtypeSymbols[dtype] || "") : "";
  var mask = (dtype != "") ? ((dtype == "maskedit") ? (el.getAttribute("mask") || "") : (gdtypeMask[dtype] || "")) : (el.getAttribute("mask") || "");
  var checkForFullMask = (mask != '') ? (el.getAttribute("checkforfullmask") || '1') : '1';
  var kC = e.keyCode;
  var kS = e.charCode || e.keyCode;
  var sChar = String.fromCharCode(kS);
  var cPos = new getCursorPos();
  if (dtype == "RegNum")el.style.textAlign = "left";
  if (dtype == "RegXMoney")el.style.textAlign = "right";
  if (dtype == "RegXMoneyNegative")el.style.textAlign = "right";
  if (dtype == "Account")el.setAttribute("maskhide", "1");
  if (dtype == "RegPhone")el.setAttribute("maskhide", "1");
  var bSafari = navigator.userAgent.indexOf('Safari') > -1,
    bGecko = navigator.userAgent.indexOf('Gecko') > -1;
  if (e.type != 'keyup')elementMsgErrHide();
  setValidClass();
  switch (e.type) {
    case "focus":
      setValtoMask();
      if (mask != "" && (!el.getAttribute("err") || el.getAttribute("err") == "0"))setCursor(0);
      ElAct(w, el);
      break;
    case "blur":
      if (bOpera)setValtoMask();
      if (dtype == "RegXMoney" || dtype == "RegXMoneyNegative") {
        var bf = checkMaxLengthForMoney(el.value);
        if (!bf) {
          errmsg(9);
          return;
        }
      }
      if (dtype == "Account") {
        var bf = checkMinLengthForAccount(el.value);
        if (!bf) {
          errmsg(11);
          return;
        }
      }
      if (dtype == "CNP" || dtype == "NP") {
        var bf = checkMinLengthForNewPass(el.value);
        if (!bf) {
          errmsg(13);
          return;
        }
      }
      if (dtype == "RegPhone") {
        var bf = checkMinLengthForPhone(el.value);
        if (!bf) {
          errmsg(17, el.getAttribute("MINLENGTH"));
          el.setAttribute("err", "1");
          return;
        }
      }
      //******

      if (dtype == "RegSWIFTUpper" || dtype == "RegEtokenID" || dtype == "RegCard") {
        el.value = el.value.toUpperCase();
      }

      var bf = checkForFormat();

      if (gcheckFormatonblurOnly[dtype]) {
        if (!bf)errmsg(5);
      } else if (!bf)el.value = "";
      var _b = setValtoMask();
      ElDisAct(w, el);
      if (!bf || !_b)el.className += " incorrectValue";
      else setValidClass();
      //el.setAttribute("err", (!_b ? "1":"0"));
      el.setAttribute("err", ((!bf || !_b) ? "1" : "0"));
      break;
    case "cut":
      deleteSelectedTxt();
      break;
    case "keydown":
      onKeyDownEl();
      break;
    case "keypress":
      onKeyPressEl();
      //************08.06 Чернвш
      if (dtype == "Account") {
        var bf = checkMaxLengthForAccount(el.value);
        if (!bf) {
          errmsg(12);
          return;
        }
      }
      if (dtype == "CNP" || dtype == "NP") {
        var bf = checkMaxLengthForNewPass(el.value);
        if (!bf) {
          errmsg(14);
          return;
        }
      }
      if (dtype == "RegPhone") {
        var bf = checkMaxLengthForPhone(el.value);
        if (!bf) {
          errmsg(16, el.getAttribute("MAXLENGTH"));
          return;
        }
      }
      //******************
      break;
    case "keyup":
      onOpKeyUp();
      break;
    case "drop":
      preventEvent(e);
      break;
    case "paste":
      try {
        var sNewVal = '';
        if (window.clipboardData) sNewVal = window.clipboardData.getData("Text");
        else sNewVal = e.clipboardData.getData("Text");
        if (!checkForFormat(sNewVal)) {
          preventEvent(e);
          if(dtype==="Account"){
             errmsg(12);
          }
           else{
             errmsg(8);
          }
        } else {
          el.setAttribute("_VALUE", sNewVal);
          //setValtoMask();
          //setCursor(0,el.value.length);

        }
      } catch (e) {
      }
      break;
    case "input":
      setValtoMask();
      break;
  }
  function checkMaxLengthForMoney(val) {
    if (el.getAttribute("MAXL") != null && val != '') {
      var iML = el.getAttribute("MAXL");
      if (parseInt(val, 10).toString().length > iML) return false;
    }
    return true;
  }

  //*****08.06 Черныш
  function checkMinLengthForAccount(val) {
    if (el.getAttribute("MINL") != null && val != '') {
      var iML = el.getAttribute("MINL");
      if (val.toString().length < iML) return false;
    }
    return true;
  }

  function checkMaxLengthForAccount(val) {
    if (el.getAttribute("MAXL") != null && val != '') {
      var iML = el.getAttribute("MAXL");
      if (val.toString().length >= iML) return false;
    }
    return true;
  }

  function checkMinLengthForNewPass(val) {
    if (el.getAttribute("MINL") != null && val != '') {
      var iML = el.getAttribute("MINL");
      if (val.toString().length < iML) return false;
    }
    return true;
  }

  function checkMaxLengthForNewPass(val) {
    if (el.getAttribute("MAXLENGTH") != null && val != '') {
      var iML = el.getAttribute("MAXLENGTH");
      if (val.toString().length >= iML) return false;
    }
    return true;
  }

  function checkMaxLengthForPhone(val) {
    if (el.getAttribute("MAXLENGTH") != null && val != '') {
      var iML = el.getAttribute("MAXLENGTH");
      if (val.toString().length >= iML) return false;
    }
    return true;
  }

  function checkMinLengthForPhone(val) {
    if (el.getAttribute("MINLENGTH") != null && val != '') {
      var iML = el.getAttribute("MINLENGTH");
      if (val.toString().length < iML) return false;
    }
    return true;
  }

  //************************************************
  function setValidClass() {
    el.className = el.className.replace(/[ ]?incorrectValue/, '');
  }

  function onKeyPressEl() {

    if ((bSafari || bOpera) && kC == 0) {
      return;
    }
    if (bGecko && (kC == 17 || kC == 86 || kC == 86 || kC == 88 || kS == 118 || kS == 120)) {  //88-x 86-v
      return;
    }
    if (bGecko && (kC == 45 || kC == 46) && sChar != '-') {  //45-Insert 46-Delete
      return;
    }
    if (bOpera && (kC == 16 || kC == 17 || kC == 46)) {      //16-Shift 17-Ctrl
      return;
    }
    if (kC == 13 && el.type != 'textarea') {   //13-Enter
      preventEvent(e);
    }

    switch (kC) {/*
     case 110:case 188:case 190:case 191:
     preventEvent(e);
     if((sChar === ',')||(sChar === '.')){
     if(el.value.indexOf('.')>0){
     bl = false;
     }
     }
     break;*/
      case 27: //Esc
        preventEvent(e);
        return;
      case 37: //стрелка влево
        if (bGecko || bOpera) {
          bl = false;
        }
        return;
        break;
      case 39:  //стрелка вправо
        if (bGecko || bOpera) {
          bl = false;
        }
        return;
      case 33:  //PageUp
      case 34:  //PageDown
      case 38:  //стрелка вверх
      case 40:  //стрелка вниз
        if (bGecko || bOpera) {
          var chArray = new Array('!', '@', '%', '&', '\'', '(', '\"', '-', '_'), bl = true;
          for (var a in chArray) {
            if (chArray[a] == sChar) {
              bl = false;
              break;
            }
          }
          if (bl) return;
        }
        break;
      case 9:   //Tab
      case 8:   //забой (?)
        return;
      case 35:  //End
        if (bGecko && !bSafari || bOpera) {
          setCursor(el.value.length - 1, 0);
          return;
        }
        break;
      case 36:  //Home
        if (bGecko && !bSafari || bOpera) {
          setCursor(0, 0);
          return;
        }
        break;
    }
    checkForKey();
  }

  function onKeyDownEl() {

    if (kC == 13 && el.type != 'textarea')preventEvent(e); //13-Enter

    if (dtype === "RegXMoney" || dtype === "RegXMoneyNegative") {
      if ((el.value.indexOf('.') >= 0) || (el.value.indexOf(',') >= 0)) {
        if ((kC == 110) || (kC == 188) || (kC == 190) || (kC == 191)) {  //110-NumPad 188-, 190-. 191-/
          preventEvent(e);
        }
      }
    }

    switch (kC) {

      case 38:
      case 40:  //38 40 стрелки
        preventEvent(e);
        break;

      case 27:   //Esc
        el.blur();
        break;
      case 46:   //Delete
        if (mask != "") {
          preventEvent(e);
          var iPos = cPos.istart;
          if (cPos.istart == cPos.iend && cPos.istart >= el.value.length)return;
          el.value = el.value.substring(0, cPos.istart) + mask.substring(((cPos.istart == cPos.iend) ? (cPos.istart + 1) : cPos.istart), cPos.iend) + el.value.substring((cPos.istart == cPos.iend) ? (cPos.iend + 1) : cPos.iend, el.value.length);
          el.setAttribute("_VALUE", el.value);
          if ((cPos.iend - cPos.istart) > 1)setCursor(cPos.istart);
          else setCursor(cPos.istart + 1);
        }
        break;
      case 8:    //забой (?)
        if (!bOpera)deleteSelectedTxt();
        break;
    }
  }

  function onOpKeyUp() {
    if (kC == 8) {   //забой (?)
      setValtoMask();
      deleteSelectedTxt();
    }
  }

  function checkForKey() {
    var iPos = cPos.istart; //проверяет кол-во знаков в поле???
    if (!checkForSmbl()) {
      switch (dtype) {
        case 'RegLat' :
          errmsg(6, sChar);
          break;
        default:
          errmsg(1, sChar);
          break;
      }
      preventEvent(e);
      return;
    }


    if (!checkForMaxTextarea(el, 1)) {
      errmsg(8);
      preventEvent(e);
      return;
    }

    if (mask != "") {
      if (iPos >= mask.length) {
        preventEvent(e);
        return;
      }
      iPos = getNextMaskPos(iPos);
    }

    var xval = el.value.substring((mask != "") ? (iPos + 1) : iPos, el.value.length) + el.value.substring(0, iPos) + sChar;

    if (!checkForFormat(xval)) {
      errmsg(2);
      preventEvent(e);
      return;
    }

    if (mask != "") {
      updateValue(iPos, el.getAttribute("_VALUE") || mask, sChar);
      setCursor(iPos);
    }
  }

  function deleteSelectedTxt() {
    function updateCursor() {
      setCursor(cPos.istart - 1, 1);
      cPos = new getCursorPos();
    }

    if (mask == "")return;
    preventEvent(e);
    var bEq = cPos.istart == cPos.iend;
    if (!bOpera && bEq) {
      updateCursor();
      bEq = cPos.istart == cPos.iend;
    }
    var i = bEq ? (cPos.istart - 1) : cPos.istart;
    if (bOpera)i = cPos.istart;
    var xv = el.value.substring(0, i) + mask.substring(i, cPos.iend) + el.value.substring(cPos.iend, el.value.length);
    if (!bOpera && xv == el.value) {
      updateCursor();
      xv = el.value.substring(0, i) + mask.substring(i, cPos.iend) + el.value.substring(cPos.iend, el.value.length);
      i = cPos.istart;
    }
    var imove = (mask.substr(i - 1, 1) != defPlaceHolder) ? (i - 2) : (i - 1);
    el.value = xv;
    el.setAttribute("_VALUE", xv);
    if (!bOpera) setCursor(cPos.istart, 1);
    else {
      var iL = cPos.iend - cPos.istart;
      setCursor(i, (iL > 0) ? iL : 1);
      cPos = new getCursorPos();
      xv = el.value.substring(0, cPos.istart) + mask.substring(cPos.istart, cPos.iend) + el.value.substring(cPos.iend, el.value.length);
      el.value = xv;
      setCursor(i, -1);
      el.setAttribute("_VALUE", xv);
    }
  }

  function getNextMaskPos(i) {
    for (var j = i; j < mask.length; j++) {
      if (mask.substr(j, 1) == defPlaceHolder)return j;
    }
  }

  function checkForSmbl(x) {
    if (!x)x = sChar;
    if (allowSymbols != "")return (allowSymbols.indexOf(x) >= 0);
    if (dTypeSymbols != "") {
      var re = new RegExp(dTypeSymbols, "ig");
      return (re.test(x));
    }
    return true;
  }

  function checkForFormat(x) {
    if (dtype == "")return true;
    if (!gdtypeFormat[dtype])return true;
    if (gcheckFormatonblurOnly[dtype] && e.type != 'blur')return true;
    if (!x)x = el.value;
    if (x == '')return true;
    var re = new RegExp(gdtypeFormat[dtype], "ig");
    return re.exec(x);
  }

  function setCursor(pos, iL) {
    if (!iL)iL = 1;
    if (iL == -1)iL = 0;
    if (el.createTextRange) {
      var tr = el.createTextRange();
      if (iL > 0) {
        tr.move("character", pos);
        tr.moveEnd("character", iL);
      } else {
        tr.move("character", -el.value.length);
        tr.move("character", pos);
      }
      tr.select();
    } else {
      el.selectionStart = pos;
      if (iL > 0)el.selectionEnd = pos + iL;
    }
  }

  function setValtoMask() {
    var smbl = "", xval = "", j = 0;
    if (!checkFordTypeValue()) {
      if (e.type == "input")errmsg(5);
      return false;
    }
    if (mask != "") {
      if (el.value.length > mask.length) {
        el.value = el.value.substr(0, mask.length);
        el.setAttribute("_VALUE", el.value);
      }
      var xv = ( (e.type == "input" && !bOpera) || e.type == "blur") ? el.value : (!el.getAttribute("_VALUE") ? el.value : el.getAttribute("_VALUE"));
      for (j = 0; j < mask.length; j++) {
        if (mask.substr(j, 1) != defPlaceHolder && xv.substr(j, 1) != mask.substr(j, 1)) xv = xv.substring(0, j) + mask.substr(j, 1) + xv.substring(j, xv.length);
        smbl = (mask.substr(j, 1) == defPlaceHolder) ? ( (xv.substr(j, 1) == "") ? mask.substr(j, 1) : xv.substr(j, 1) ) : mask.substr(j, 1);
        smbl = (!checkForSmbl(smbl)) ? mask.substr(j, 1) : (  (mask.substr(j, 1) != defPlaceHolder && mask.substr(j, 1) != xv.substr(j, 1)) ? mask.substr(j, 1) : smbl  );
        xval += smbl;
      }
      var re = new RegExp(defPlaceHolder, "ig");
//            el.value=(e.type=="blur")? ((xval==mask) ? "" : ( (el.getAttribute("maskhide")!="1" || re.exec(xval)) ? xval : xval.replace(/\./g, "") ) ) : xval;  
      el.value = (e.type == "blur") ? ((xval == mask) ? "" : ( (el.getAttribute("maskhide") != "1" || re.exec(xval)) ? xval : xval.replace(/\./g, "").replace(/\s/g, "0").replace(new RegExp("-", 'g'), '') ) ) : xval;
      if (e.type != "blur" && e.type != "focus")setCursor(cPos.istart);
      if (e.type == "blur" && xval != mask && re.exec(xval) && checkForFullMask != '0') {
        errmsg(4);
        return false;
      }
    } else {
      // || e.type=="paste"
      if ((e.type == "blur" || e.type == "focus" || e.type == "input") && !checkForMaxTextarea(el)) {
        preventEvent(e);
        errmsg(8);
        return false;
      }
      xval = el.value;
      if ((dtype == "RegSWIFTUpper" || dtype == "RegEtokenID") && e.type != "input")xval = xval.toUpperCase();
      for (j = 0; j < el.value.length; j++) {
        if (!checkForSmbl(el.value.substr(j, 1)))xval = xval.replace(el.value.substr(j, 1), "");
      }
      if (xval != el.value)el.value = xval;
    }
    el.setAttribute("_VALUE", xval);
    return true;
  }

  function checkFordTypeValue(x) {
    if (!x)x = (el.value == el.getAttribute('mask')) ? "" : el.value;
    switch (dtype) {
      case "RegXMoney":
      case "RegXMoneyNegative":
        if (el.value.indexOf(',') > 0) {
          var pos = cPos.istart;
          el.value = el.value.replace(',', '.');
          //setCursor(pos);
          if (el.createTextRange) {
            var tr = el.createTextRange();
            tr.move("character", pos);
            tr.moveEnd("character", pos);
            tr.select();
          } else {
            el.selectionStart = pos;
            el.selectionEnd = pos;
          }
        }

        if (!(isNaN(parseFloat(x)) || parseFloat(el.value) == 0)) {
          if (e.type == "blur") {
            iFlDigits = 100;
            iDigits = 2;
            if (el.getAttribute('DAFTER') != null) {
              iDigits = parseInt(el.getAttribute('DAFTER'), 10);
              if (iDigits > 0)iFlDigits = Math.pow(10, iDigits);
            }
            el.value = Math.round(parseFloat(x) * iFlDigits) / iFlDigits;
            var re = new RegExp("^([-]{0,1}[0-9]*)[.]?([0-9]*)$", "ig");
            re.exec(el.value);
            var rest = RegExp.$2, sdAfter = (iDigits > 0) ? ('.' + (rest + "00000000000000000000000000").substr(0, iDigits) ) : '';
            el.value = RegExp.$1 + sdAfter;
          }
        }
        break;
      case "Date":
        if (x != "" && x != mask) {
          re = new RegExp("(.{2})[.](.{2})[.](.{4})");
          re.exec(x.replace(/_/g, "0"));
          var iD = parseInt(RegExp.$1, 10), iM = parseInt(RegExp.$2, 10), iY = parseInt(RegExp.$3, 10);
          if (e.type == "focus" || e.type == "blur") {
            var validD = (iD > 0 && iD < 32), validM = (iM < 13 && iM > 0), validY = (iY > 0 && iY > 1900);
            if (!validD || !validM || !validY) {
              if (e.type == "focus") {
                (!validD) ? setCursor(0, 2) : (!validM ? setCursor(3, 2) : setCursor(6, 4) );
              }
              errmsg(3);
              return false;
            } else {
              var n = (iM != 2 ? ((iM % 2) ^ (iM > 7)) + 30 : (!(iY % 400) || !(iY % 4) && (iY % 25) ? 29 : 28));
              if (iD > n) {
                if (e.type == "focus") {
                  setCursor(0, 2);
                }
                errmsg(3);
                return false;
              }
            }
          }
        }
        break;

      case "ShortTime":
        if (x != "" && x != mask) {
          re = new RegExp("(.{2})[:](.{2})");
          re.exec(x.replace(/_/g, "0"));
          var iH = parseInt(RegExp.$1, 10), iM = parseInt(RegExp.$2, 10);
          var validH = (iH < 24), validM = (iM < 60);
          if (e.type == "focus" || e.type == "blur") {
            if (e.type == "focus") {
              if (!validM)setCursor(3, 2);
              if (!validH)setCursor(0, 2);
            }
            if (!validM || !validH) {
              errmsg(7);
              return false;
            }
          }
        }
        break;
      case "RegExp":
      case "RegPhone":
      case "maskedit":
        if (e.type == "blur" && x != '') {
          var sg = el.getAttribute('RegExp').replace(/^\/{1}/, '').replace(/\/{1}$/, '');
          var title = el.getAttribute('Title');
          if (title === null) {
            title = "";
          } else {
            title = title.replace(',', '&#44;');
          }

          re = new RegExp(sg);
          if (!re.exec(x.replace(' ', ''))) {
            if (title != '') {
              errmsg(15, title);
            }
            else {
              errmsg(10, title);
            }
            return false;
          }
        }
    }
    return true;
  }

  function getCursorPos() {
    var tryCreateRange = 0;
    try {
      if (el.createTextRange) {
        //var tr = el.document.selection.createRange(); //<-- неправильно указана ссылка на объект, возникает ислючение
        var tr = document.selection.createRange();
        this.istart = -(tr.moveStart("character", -el.value.length));
        this.iend = tr.text.length;
        tryCreateRange = 1;
      }
    } catch (e) {
    }
    try {
      if (tryCreateRange == 0) {
        this.istart = el.selectionStart;
        this.iend = el.selectionEnd;
      }
    } catch (e) {
      alert(e.description);
    }
  }

  function updateValue(ic, tval, xstr) {
    var x = tval.substr(0, ic) + xstr + tval.substr(ic + 1, el.value.length);
    el.value = x;
    el.setAttribute("_VALUE", x);
  }

  function errmsg(ic, params) {
    try {
      var txt = getElementError(ic, params);
      //if(!ElementErrMsg)initMsgErr();
      //if(!mw.document.getElementById("PromtElementBox"))initMsgErr();
      ElementErrMsg = new initMsgErr(el);
      ElementErrMsg.position(el);
      ElementErrMsg.setText(el, txt);
      //alert($(w,"PromtElementBox").style.left);
      //для корректировки ширины дива сообщения
      var ll = $(w, "PromtElementBox").style.left;
      var LL = ll.replace(/px/, '');
      LL = LL * 1;
      var sum = LL + 370;
      //alert(sum);
      if (document.body.clientWidth < sum) {
        $(w, "PromtElementBox").style.width = ($(w, "WorkWin").offsetWidth - LL - 33) + "px";
      } else {
        $(w, "PromtElementBox").style.width = "370px";
      }
    } catch (e) {
    }
  }
} //<-- END onChangeValue(e) 

function checkForMaxTextarea(el, _b) {
  if (el.tagName == 'TEXTAREA' && el.getAttribute('MAXLENGTH')) {
    var iL = parseInt(el.getAttribute('MAXLENGTH'), 10);
    if (_b == 1) {
      if (el.value.length >= iL)return false;
    } else {
      if (el.value.length > iL)return false;
    }
  }
  return true;
}
function getTopOffset(o) {
  i = 0;
  while (o) {
    i += o.offsetTop;
    o = o.offsetParent;
  }
  if ($(window, '_WorkPanel_'))i -= $(window, '_WorkPanel_').scrollTop;
  return i;
}
function getLeftOffset(o) {
  i = 0;
  while (o) {
    i += o.offsetLeft;
    o = o.offsetParent;
  }
  return i;
}

//Блок ошибок
var sId = 'PromtElementBox';
function elementMsgErrHide() {
  try {
    var d;
    //try{d=(mw.newwin!=null)?mw.newwin.document:mw.document;}catch(e){d=mw.document;}
    var _op;
    try {
      _op = d.getElementById(sId);
    } catch (e) {
      _op = window.document.getElementById(sId);
    }
    _op.style.display = "none";
  } catch (e) {
  }
}

function initMsgErr(el) {
  var d = (isIE) ? el.document : el.ownerDocument;
  if (!d.getElementById(sId)) {
    if (isIE) {
      this.pmsg = d.createElement('IFRAME');
      this.pmsg.frameBorder = '0';
      this.pmsg.marginWidth = '0';
      this.pmsg.scrolling = 'no';
      this.pmsg.src = '../inull.htm';
      this.pmsg.style.height = "53px";
      this.pmsg.setAttribute('NAME', sId);
    } else this.pmsg = d.createElement('DIV');
    this.pmsg.id = sId;
    isIE ? d.body.insertAdjacentHTML('beforeEnd', this.pmsg.outerHTML) : d.body.appendChild(this.pmsg);
    if (isIE) {
      this.pmsg = d.getElementById(sId);
    }
  } else this.pmsg = d.getElementById(sId);
  this.pmsg.style.display = 'block';
  this.position = function (el) {
    this.pmsg.style.top = getTopOffset(el) + el.offsetHeight + "px";
    this.pmsg.style.left = getLeftOffset(el) + "px";
  }
  this.pmsg.style.zIndex = '20000';
  this.setText = function (el, txt) {
    this._t = txt + (el.getAttribute("z.ermg") ? ("<BR>" + el.getAttribute("z.ermg")) : "");
    //  this.pmsg.innerHTML= _t;
    if (!isIE) {
      this.pmsg.innerHTML = this._t;
      this.pmsg.style.display = 'block';
    } else {
      var _po = el.document.frames(sId).document;
      if (_po.readyState != "complete")_po.onreadystatechange = _ie_setPromtTxt
      else _po.body.innerHTML = this.getIETxt();
    }
  }
  this.getIETxt = function () {
    return ('<DIV class="PromtElementBox">' + this._t + '</DIV>');
  }
}
function _ie_setPromtTxt() {
  var d;
//  try{d=(mw.newwin!=null)?mw.newwin.document:window.document;}catch(e){d=window.document;}
  d = window.document;
  var _po = d.frames(sId).document;
  if (_po.readyState != "complete")return;
  _po.createStyleSheet('css/main.css');
  if (colorstyle != '')_po.createStyleSheet('css/_' + colorstyle + '.css');
  _po.body.innerHTML = ElementErrMsg.getIETxt();
  //mw.document.getElementById(sId).style.height = _po.getElementsByTagName('DIV')[0].clientHeight;
}
function getElementError(ic, x) {
  var m = LRSChecks15;
  switch (ic) {
    case 1:
      m = LRSChecks16;
      break;
    case 2:
      m = LRSChecks15;
      break;
    case 3:
      m = LRSChecks18;
      break;
    case 4:
      m = LRSChecks38;
      break;
    case 5:
      m = LRSChecks39;
      break;
    case 6:
      m = LRSChecks41;
      break;
    case 7:
      m = LRSChecks21;
      break;
    case 8:
      m = LRSChecks17;
      break;
    case 9:
      m = LRSChecks13;
      break;
    case 10:
      m = LRSChecks42;
      break;
    case 11:
      m = LRSChecks44;
      break;
    case 12:
      m = LRSChecks45;
      break;
    case 13:
      m = LRSChecks46;
      break;
    case 14:
      m = LRSChecks47;
      break;
    case 15:
      m = LRSChecks48;
      break;
    case 16:
      m = LRSChecks49;
      break;
    case 17:
      m = LRSChecks50;
      break;
  }
  if (x) {
    var xa = x.split(",");
    for (var i = 0; i < xa.length; i++) {
      m = m.replace("%", xa[i]);
    }
  }
  return m;
}

//=====================================================

c_maskinp_js = true;
//version 2012.11.29