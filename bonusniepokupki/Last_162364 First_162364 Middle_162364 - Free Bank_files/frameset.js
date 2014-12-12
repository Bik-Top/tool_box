function check_browser_ver() {
    var BrowserOk = IsOpera || IsFirefox || IsNetscape || IsIE || IsMozilla;
    if (IsOpera && BrowserOk) {
        re = new RegExp("(opera.{0,1})(.{0,4})", "ig");
        BrowserOk = re.exec(na) && (parseInt(RegExp.$2, 10) >= 8);
    }
    if (isIE) {
        re = new RegExp("(MSIE.{0,1})(.{0,4})", "ig");
        var r = re.exec(navigator.userAgent);
        if (r)IEVer = RegExp.$2;
    }
    w.frames[3].location.href = (BrowserOk ? (w.location.pathname + '?t=RT_2Auth.login_frame&L=' + LLangID.toUpperCase() + '&colorstyle=' + colorstyle + ((IMode != '') ? ('&IMode=' + IMode) : '')) : 'browser_err_' + LLangID + '.htm');
}

function _addEvent(w, el, action, func) {
    if (el.attachEvent) {
        el.attachEvent('on' + action, func);
    } else {
        el.addEventListener(action, func, false);
    }
}

function fnIsElement(e) {
    var x = e.target ? e.target.type : e.srcElement.type;
    return((x == 'text') || (x == 'textarea') || (x == 'file') || (x == 'password'));
}
function returnFalse(e) {
    isIE ? (e.returnValue = false) : e.preventDefault();
}

function fnOnDragStart(e) {
    if (!e)e = window.event;
    e.returnValue = false;
}

function fnOnContextMenu(event) {
    var e = event ? event : window.event;
    if (!fnIsElement(e))returnFalse(e);
}
function fnOnKeyDown(event) {
    var e = event ? event : window.event;
    if (e.keyCode == 8)if (!fnIsElement(e))returnFalse(e);
}

function fnOnKeyPress(event) {
    var e = event ? event : window.event;
    var el = e.target || e.srcElement;
    if ((e.keyCode == 13) && (el.type != 'textarea'))returnFalse(e);
    if ($(w, 'PUSearch') && (e.keyCode == 13)) {
        goToPUList(w, -1, $(w, 'PUNAME').value);
    }

}

function fnOnResize(event) {
    var e = event ? event : window.event;
    setMaxSizePanels();
    onResizeMid();//Chernysh
    try {
        if (MessageBoxObject.AlertHTMLBox.IsShow) {
            MessageBoxObject.AlertHTMLBox.setPupUpHeight();
            MessageBoxObject.AlertHTMLBox.setPosition();
        }
    } catch (e) {
    }
}

function AtachSEvents(w) {
    try {
        if (window.document.all == 'undefined')
            window.document.constructor.prototype.__defineGetter__('all', function () {
                return window.document.getElementsByTagName('*');
            });
    } catch (e) {
    }

    if (isIE) {
        w.document.body.attachEvent('onkeydown', fnOnKeyDown);
    } else {
        w.document.addEventListener('keypress', fnOnKeyDown, false);
    }
    _addEvent(w, window.document.body, 'contextmenu', fnOnContextMenu);
    _addEvent(w, window.document.body, 'dragstart', fnOnDragStart);
    _addEvent(w, window.document.body, 'keypress', fnOnKeyPress);
    _addEvent(w, w, 'resize', fnOnResize);
}
//**************
function Auth(main) {
    if (((FHLP != '') || (FHLP2 != '') || (FHLP3 != '')) && !main) {
        ShowPageByUrl(FHLP || FHLP2 || FHLP3);
        if (FHLP != '') FHLP = '';
        else if (FHLP2 != '') FHLP2 = '';
        else if (FHLP3 != '') FHLP3 = '';
    }
    else {
        try {
            try {
                checkForAcyncUpdate();
            } catch (e) {
            }
            CreateBSSHTTPRequest();
            BSSHTTPRequest.init('T=RT_2IC.buildMAINW', 'colorstyle=' + colorstyle, 'L=' + LLangID.toUpperCase());
            BSSHTTPRequest.resultHTMLObject = $(window, 'LOGONWIN');
            BSSHTTPRequest.resultMethod = onBuildMAINWResult;
            BSSHTTPRequest.sendData();
        } catch (e) {
        }
    }
}

function DisplayAuthPage(sSignType) {
    var sURL;
    if (sSignType == 'TAN') sURL = 'RT_1TAN.tanAutenticate';
    if (sSignType == 'SMSCODE') sURL = 'RT_1SMSCODE.smsAutenticate';
    if (sSignType == 'ETOKEN') sURL = 'RT_1ETOKEN.eTokenAutenticate';
    CreateBSSHTTPRequest();
    BSSHTTPRequest.init('T=' + sURL);
    BSSHTTPRequest.resultHTMLObject = $(window, 'LOGONWIN');
    BSSHTTPRequest.resultMethod = loadWorkPanel;
    BSSHTTPRequest.sendData();
    AuType = sSignType;
    wOnSessClose();
}
function ShowPageByUrl(url) {
    CreateBSSHTTPRequest();
    BSSHTTPRequest.init("t=" + _MBll + url);
    BSSHTTPRequest.resultHTMLObject = $(window, 'LOGONWIN');
    BSSHTTPRequest.resultMethod = loadWorkPanel;
    BSSHTTPRequest.sendData();
    wOnSessClose();
}

function switchlang(LLangID) {
    var lngFld = $(w, "L");

    if (typeof LLangID === "string") {
        if (LLangID !== "") {
            if (lngFld) {
                lngFld.value = LLangID;
                location.href = "bsi.dll?T=RT_2Auth.BF&L=" + LLangID;
            }
        }
    }
}

var w = window, maxLoadTry = 5;
w.name = "TOP_FRAME";
d = document;
ScriptPath = ('/' + w.location.pathname).replace(/^\/\//, "/");
try {
    w.moveTo(0, 0);
    w.resizeTo(screen.availWidth, screen.availHeight);
} catch (e) {
}
_MBll = "RT_2IC.", BSI = 'bsi.dll?';
var na = navigator.userAgent, MS = na.indexOf("MSIE");
var IsOpera = (w.opera != null);
var IsFirefox = na.indexOf("Firefox") >= 0;
var IsSafari = navigator.userAgent.indexOf('Safari') > -1;
var IsNetscape = na.indexOf("Netscape") >= 0;
var isIE = (MS > 0) && (parseInt(na.substring(MS + 5, MS + 6), 10) >= 4) && (!IsOpera) && (!IsFirefox);
var isIE55 = isIE && (na.indexOf("5.5") > 0);
var IEVer = 0;
var oJSArray;
var IsMozilla = (!isIE) && (!IsFirefox) && (!IsOpera) && (!IsNetscape) && (na.indexOf("Mozilla") >= 0);
var bKiosk = $(w, 'IMode').value == 'kiosk';
var IMode = $(w, 'IMode').value;

//Chernysh D.V.: установка ширины скроллера и блока фильтра над скроллером
function setScrollAndFltrWidth() {
    var oScroller = $j('#SCROLLER'),
        oScrlFltr = $j('#scroller-filter'),
        oCntrlBar = $j('#CONTROLBAR');
    /*подгон ширины скроллера под ширину Controlbar и ширины scroller-filter под ширину скроллера*/
    if (oScroller) {
        var rezFltrW = 0;
        if (oScroller.width() > 0) {
            //если ширина Controlbar больше ширины скроллера
            if (oCntrlBar.outerWidth() > oScroller.outerWidth()) {
                var rezScrlW = oCntrlBar.outerWidth();
                oScroller.outerWidth(rezScrlW);
            }
            //если ширина scroller-filter больше ширины скроллера
            if (oScrlFltr.outerWidth() > 0) {
                rezFltrW = oScrlFltr.outerWidth() > oScroller.outerWidth() ? oScroller.outerWidth() : oScroller.outerWidth() - 10;
                oScrlFltr.outerWidth(rezFltrW);
            }
        }
        //если скроллера нет, задаем ширину scroller-filter = 600(иначе текст растягивается на весь экран)
        else {
            if (oScrlFltr.outerWidth() > 0) {
                rezFltrW = (oCntrlBar.outerWidth() > 600) ? oCntrlBar.outerWidth() : 600;
                oScrlFltr.outerWidth(rezFltrW);
            }
        }
    }
}

/*Chernysh D.V.: установка min ширины окна (контроль ширины хедера), прижатие bottom-menu к нижнму краю*/
function onResizeMid() {
    var rBanner = $(w, 'BannerRight'),
        bannerWidth = 0,
        workWin = $(w, 'WorkWin'),
        bMenu = $(w, 'bottommenu'),
        minWidth = 960;

    //если есть баннеры сбоку    
    if (rBanner) {
        bannerWidth = rBanner.offsetWidth + 20;
    }
    //хеадер
    var Header = $(w, 'FormHeader').offsetWidth + 290 + 330 + bannerWidth;

    //в IE скроллер уходит под меню.
    if (isIE && $(w, 'cont_center_SC')) {
        var WidthFor_IE = $(w, 'cont_center_SC').offsetWidth + 270;
        if (WidthFor_IE > minWidth) minWidth = WidthFor_IE;
    }

    minWidth = minWidth + bannerWidth;
    //ширина рабочей области
    if ($(w, 'LOGONWIN')) {
        $(w, 'LOGONWIN').style.width = (document.body.clientWidth < ((Header > minWidth) ? (Header) : (minWidth))) ? ((Header > minWidth) ? (Header + 'px') : (minWidth + 'px')) : '100%';
    }
    //прижатие футера к bottom
    if ($(w, 'LoginPageMid')) {
        var mHeight = document.body.clientHeight - $(w, 'LoginPageMid').offsetHeight - 160;
        if (mHeight > 0) {
            bMenu.style.marginTop = mHeight + 'px';
        }
    }

    if (workWin) {
        var mHeight2 = document.body.clientHeight - workWin.offsetHeight - 100;
        if (mHeight2 > 0) {
            bMenu.style.marginTop = mHeight2 + 'px';
        } else {
            bMenu.style.marginTop = 0;
        }
    }

    if (workWin && bMenu) {
        var maskH = workWin.offsetHeight + bMenu.offsetHeight;
        var maskW = workWin.offsetWidth;
        $(w, 'DMASK').style.height = (document.body.clientHeight < maskH) ? (maskH + 'px') : ('100%');
        $(w, 'DMASK').style.width = (document.body.clientWidth < maskW) ? (maskW + 'px') : ('100%');
    }

    //в IE ширина скроллера не меняется после его построения. 
    if (!isIE) setScrollAndFltrWidth();

    /*23.06.11 ChernyshDV: fix for IE6: png -> gif*/
    /*if (isIE && IEV == 6) {
        var imgObj = window.document.getElementsByTagName('img');
        for (i = 0; i < imgObj.length; i++) {
            var expr = (/arrow-hor.png/ig);
            if (expr.exec(imgObj[i].getAttribute('src'))) {
                var imgSrc = imgObj[i].getAttribute('src').replace(/png/ig, 'gif');
                imgObj[i].setAttribute('src', imgSrc);
            }
        }
    }*/
}

/*Центрирование блоков bottommenu*/
function onLoadMid() {
    var oLocks = $(w, 'locks');
    if ($(w, 'bottommenu')) {
        $(w, 'bottommenu').style.display = 'block';
    }
    if ($(w, 'menu-bottom')) {
        $(w, 'menu-bottom').style.width = $(w, 'bottom-dev1').offsetWidth + $(w, 'bottom-dev2').offsetWidth + $(w, 'bottom-dev3').offsetWidth + $(w, 'bottom-dev4').offsetWidth + $(w, 'bottom-dev5').offsetWidth + 50 + 'px';
    }
    if (oLocks) {
        oLocks.style.display = 'block';
    }
    onResizeMid();
}
//version 2013.06.06		