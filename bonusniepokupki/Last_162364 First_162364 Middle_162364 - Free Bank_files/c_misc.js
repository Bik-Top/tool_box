var DMASKid = 'DMASK';


function fn_unescape(s) {
    s = s.replace(/%22/g, "\"").replace(/%25/g, "%").replace(/%20/g, " ").replace(/%21/g, "!").replace(/%23/g, "#").replace(/%24/g, "$");
    s = s.replace(/%26/g, "&").replace(/%27/g, "'").replace(/%28/g, "(").replace(/%29/g, ")").replace(/%2C/g, ",").replace(/%2F/g, "/");
    s = s.replace(/%3A/g, ":").replace(/%3B/g, ";").replace(/%3C/g, "<").replace(/%3D/g, "=").replace(/%3E/g, ">").replace(/%3F/g, "?");
    s = s.replace(/%5B/g, "[").replace(/%5C/g, "\\").replace(/%5D/g, "]").replace(/%5E/g, "^").replace(/%60/g, "`").replace(/%0D%0A/g, "\n").replace(/&quot;/g, "\"");
    return s;
}
function getTrim(STR) {
    if (STR == null) return "";
    return STR.replace(/(^\s*)|(\s*$)/g, "");
}
function DoScrollForm(w) {
    if (isIE)window.document.body.scrollTop = 0;
}
function getSelectParam(Obj, P) {
    try {
        s = Obj.options[Obj.selectedIndex].getAttribute(P);
    } catch (e) {
        s = "";
    }
    if (!s)s = "";
    return(s);
}
function BSDate2UTCDate(sDate) {
    if ((sDate == '') || (sDate.length != 10) || (sDate.substr(2, 1) != '.') || (sDate.substr(5, 1) != '.'))return '';
    return sDate.substr(6, 4) + '-' + sDate.substr(3, 2) + '-' + sDate.substr(0, 2);
}
function fngetDate(sD) {
    var d = new Date(), re = new RegExp('^(\\d{4}).(\\d{2}).(\\d{2})$', 'ig');
    var s = re.exec(sD);
    if (s)d.setFullYear(s[1], s[2], s[3]);
    return d.valueOf();
}
function setCLN(w, o, cn) {
    try {
        var ar = $(w, o.id);
        var iL = (ar.length) ? ar.length : 0;
    } catch (e) {
        iL = 0;
    }
    if (iL == 0) {
        o.className = cn;
        return;
    }
    for (i = 0; i < iL; i++) {
        ar.item(i).className = cn;
    }
}


function SetElClass(w, o, x, cl) {
    var cn = o.className, cn_m = cn.replace(/(-ro$)|(-a$)|(-d$)|(-dis$)/g, '');
    if (cl) {
        setCLN(w, o, cn_m);
        return;
    }
    if (o.readOnly || o.disabled)return;
    var re = new RegExp(x + '$', 'ig');
    if (re.exec(cn))return;
    setCLN(w, o, cn_m + x);
}
var focusEvent = false;
var labelObjectSelected;
var Bb;
function InpClass(w, o, b) {
    try {
        if (o.id == '')return;
        var _o = window.document.getElementById('t-' + o.id);
        var sCN = _o.className;
        var str = sCN;

        var Rr = /^actElm/ig;
        var ii = Rr.exec(sCN);

        if (b == true) {
            if (ii) {
                _o.className = "actElm";
            } else {
                var Rr2 = /^CntTxt/ig;
                var yy = Rr2.exec(sCN);
                if (yy) {
                    _o.className = "CntTxt-a";
                } else {
                    _o.className = "actElm";
                }
            }
        } else {
            if (ii) {
                _o.className = "";
            }
        }
        Rr = /^CntTxt/ig;
        ii = Rr.exec(sCN);

        if (b == true) {

        } else {
            if (ii) {
                _o.className = "CntTxt";
            }
        }

    } catch (e) {
    }
}
function ElAct(w, o) {

    SetElClass(w, o, '-a');
    InpClass(w, o, true);
}
function ElDisAct(w, o) {
    SetElClass(w, o, '-a', true);
    InpClass(w, o, false);
}
function ModifyElActAttr(se) {
    if (se == null)return '';
    return isIE ? se.toString().replace(/[\r\n]/g, "").replace(/(function anonymous\(\) ?\{)(.*)(\})/g, '$2').replace(/([,(;]|^)(w)([,).])/g, '$1this.document.parentWindow$3').replace(/(event)/g, 'this.document.parentWindow.event') : se;
}
function SetElActAttr(el, n, v) {
    isIE ? eval('el.' + n + '=new Function("' + v + '")') : el.setAttribute(n, v);
}
function EnableInpEvents(w, el, b) {
    var EAr = new Array('onclick', 'onfocus', 'onblur', 'onkeypress', 'onkeydown', 'onmousedown'), x, datt, odAtr;
    for (var i = 0; i < EAr.length; i++) {
        try {
            if (el.getAttribute(EAr[i]) != null) {
                dattr = '_' + EAr[i];
                odAtr = el.getAttribute(dattr);
                if (b && ((odAtr == '') || (odAtr == null)))el.setAttribute(dattr, ModifyElActAttr(el.getAttribute(EAr[i])));
                x = b ? '' : el.getAttribute(dattr);
                SetElActAttr(el, EAr[i], x);
            }
        } catch (e) {
            alert(e.description);
        }
    }
}
function extMoney(x) {
    x = x.toString();
    var i = x.indexOf('.');
    if (i < 0)i = x.length;
    var sR = x.substr(i), sA = x.substr(0, i), r = '';
    for (i = 0; i < sA.length; i++) {
        if (i > 0 && i % 3 == 0)r = ' ' + r;
        r = x.charAt(sA.length - 1 - i) + r;
    }
    return r = (r == '') ? ' ' : r + sR;
}
//****
function fn_hide_block(w, b, obj) {
    try {
        var xName = ((!obj) || (obj == '')) ? 'FormTarget' : obj;
        var oF = $(window, xName);
        oF.style.display = b ? 'block' : 'none';
    } catch (e) {
    }
}
function RollFilter(w, f) {
    try {
        var sN = 'none', sB = 'block', oF = window.document.all.FilterForm;
        if (oF.length > 0) {
            var i = oF.length, sDsp = oF[i - 1].style.display;
            var xv = f ? ((f == '1') ? sB : sN) : (((sDsp == sB) || (sDsp == '')) ? sN : sB);
            oF[i - 1].style.display = xv;
            window.document.all.FHImg[i - 1].className = 'arrow-filt-' + ((xv == sB) ? 'open' : 'close');
            try {
                eval('_filter_' + $(window, 'SCHEMENAME').value + '_' + ((window.IsForm) ? $(window, 'FORMACTION').value : $(window, 'FILTERIDENT').value) + '="' + xv + '"')
            } catch (e) {
            }
        }
        else {
            var sDsp = oF.style.display;
            var xv = f ? ((f == '1') ? sB : sN) : (((sDsp == sB) || (sDsp == '')) ? sN : sB);
            oF.style.display = xv;
            window.document.all.FHImg.className = 'arrow-filt-' + ((xv == sB) ? 'open' : 'close');
            try {
                eval('_filter_' + $(window, 'SCHEMENAME').value + '_' + ((window.IsForm) ? $(window, 'FORMACTION').value : $(window, 'FILTERIDENT').value) + '="' + xv + '"')
            } catch (e) {
            }
        }
    } catch (e) {
    }
}
function fnOpenFilter(w, o, b) {
    try {
        var oT = window.document.all.FilterTbl, sDf = oT.getAttribute('DOpen'), sO;
        if (sDf == '2')return;
        try {
            sO = eval('_filter_' + $(window, 'SCHEMENAME').value + '_' + ((w.IsForm) ? $(window, 'FORMACTION').value : $(window, 'FILTERIDENT').value));
        } catch (e) {
            sO = null
        }
        var _b = (!sO) ? (sDf == '1') : (sO == 'block');
        RollFilter(w, (_b ? '1' : '0'));
    } catch (e) {
    }
}
//**************************
function DSBForm(w, _b, zIndex) {
    var od;
    try {
        od = window.document.getElementById(DMASKid)
    } catch (e) {
    }
//	try{
    if (!od) {
        od = window.document.createElement('DIV');
        od.style.display = 'none';
        od.id = DMASKid;
        try {
            od.style.MozOpacity = 0.2
        } catch (e) {
        }
        try {
            od.style.KHTMLOpacity = 0.2
        } catch (e) {
        }
        try {
            od.style.opacity = 0.2
        } catch (e) {
        }
        try {
            var oS = window.document.createStyleSheet(), oP = window.document.createStyleSheet();
            oS.media = "screen";
            oS.addRule('#DMASK', 'background-color:#CCCCCC;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=20);');
            oP.media = "print";
            oP.addRule('#DMASK', 'display:none;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0,enabled=0);');
        } catch (e) {
        }
        od.style.backgroundColor = "#333333";
        od.style.position = 'absolute';
        od.style.top = 0;
        od.style.left = 0;
        od.style.zIndex = 1000;
        od.style.width = "100%";
        od.style.height = "100%";
        od.innerHTML = '&#160;';
        window.document.body.appendChild(od);
    } else {
        if (zIndex != null && zIndex != '') od.style.zIndex = zIndex;
        else od.style.zIndex = 1000;
    }
    od.style.display = _b ? 'block' : 'none';
    if (isIE)hideSelects(w, _b)
    window.Disabled = _b;
//	}catch(e){}
}

function hideSelects(w, _b) {
    try {
        var Ar = window.document.getElementsByTagName('SELECT'), el;
        for (var i = 0; i < Ar.length; i++) {
            el = Ar[i];
            el.style.display = _b ? 'none' : 'inline';
            var st, iW = el.style.pixelWidth, _r = '_' + el.name + '_RO', _or;
            try {
                st = el.options.item(el.selectedIndex).text;
            } catch (e) {
                st = '&#160'
            }
            try {
                _or = window.document.all(_r)
            } catch (e) {
                _or = null
            }
            if (!_or && _b)el.insertAdjacentHTML('beforeBegin', '<SPAN ID="' + _r + '" class="elm-inp" style="overflow:hidden;display:inline;padding:2px 2px 2px 3px;width:' + iW + 'px;">' + st + '</SPAN>')
            else {
                _or.style.display = _b ? 'inline' : 'none';
                try {
                    if (_b)_or.innerHTML = st;
                } catch (e) {
                }
            }
        }
    } catch (e) {
    }
}
function _DSElement(w, el, _b) {
    switch (el.type) {
        case 'text':
            ;
        case 'password':
            ;
        case 'textarea':
            ;
            SetElClass(w, el, '-ro', !_b);
            EnableInpEvents(w, el, _b);
            el.readOnly = _b;
            break;
        default:
            el.disabled = _b;
            break;
    }
}
function _Focus(w, x) {
    try {
        el = $(w, x);
        if (el)el.focus();
    } catch (e) {
    }
}
function _attachEvents(w) {
    var OW = (isIE || IsOpera) ? window.document.body : window;
    var sw = (isIE ? "this.window" : "w"),
        res = "try{fn_msg_position(" + sw + ");ClickHideClnd(" + sw + ");}catch(e){}";
    if (isIE) {
        OW.onresize = new Function(res);
        OW.onscroll = new Function(res);
    } else {
        with (w) {
            OW.onresize = new Function(res);
            OW.onscroll = new Function(res);
        }
    }
    if (!window.IsDict && !window.IsVIEW)
        with (w) {
            OW.onmousedown = new Function("try{ClickHideListDictionary(window,((isIE || IsOpera)?window.event:Event));}catch(e){} try{ClickHideClnd(window,((isIE || IsOpera)?window.event:Event))}catch(e){}");
        }
}
function InitFormFiles(w) {
    window.FormHasAttachment = true;
    window.sFN = 'FILE_NAME_';
    window.pN;
    window.iFiles = 0;
    window.xT = window.document.all.tFiles;
    window.xTB = window.xT.tBodies[0];
    window.ofc = window.document.all.ItemsContainedUploadFiles;
    var f = window.document.all._FR;
    if (!window.oFR) {
        window.oFR = f.cloneNode(true);
        f.style.display = 'none';
    }
}
function fillFileForView(w, b) {
    var xO = window.document.getElementsByName('RO_FN'), xOI, oP;
    for (var i = 1; i < xO.length; i++) {
        try {
            oP = xO[i].parentNode;
            xOI = oP.getElementsByTagName("INPUT");
            if (b && (xO[i].value != '') && (xOI[1])) {
                xO[i].style.display = 'block';
                oP.removeChild(xOI[0]);
            } else if (xOI.value != '')xO[i].value = xOI[0].value;
        } catch (e) {
        }
    }
}
function ShowBanner(w) {
    var oBnr, bnst, SRC, Ref, oTarget, oR, oC, oA, k, n, str = '', y = 0, b = false;

    function getChildren(Obj, level) {
        var j = Obj.childNodes.length, Arr = new Array(2);
        var n = 0, b = true;
        for (var i = 0; i < j; i++) {
            if (Obj.childNodes.item(i).nodeType == 1) {
                n = n + 1;
                if (b) {
                    oR = Obj.childNodes.item(i);
                    b = false;
                }
            }
        }
        Arr[0] = oR;
        Arr[1] = n;
        if (level > 1) Arr = getChildren(oR, level - 1, n);
        return Arr;
    }

    try {
        if (window.document.getElementById("BANNER").innerHTML != '') {
            oBnr = window.document.getElementById("BANNER").firstChild;
            bnst = oBnr.getAttribute("status");
            SRC = oBnr.getAttribute("S");
            Ref = oBnr.getAttribute("R");
            oTarget = window.document.getElementById("FormTarget").getElementsByTagName("TABLE").item(0)
            switch (bnst) {
                case '1':
                    oR = oTarget.insertRow(0);//вверху
                    str = 'top';
                    break;
                case '2':
                    str = 'right';
                case '3':
                    if (str == '') str = 'left';
                    y = window.document.getElementById("FormTarget").offsetHeight;
                    var oH = oTarget.insertRow(-1);
                    var Arr = getChildren(oTarget, 2)
                    oR = Arr[0];
                    n = Arr[1];
                    b = true;
                    break;
                case '4':
                    oR = oTarget.insertRow(-1);
                    str = 'bottom';
            }
            k = (bnst == '2') ? -1 : 0;
            oC = oR.insertCell(k);
            if (bnst == '2' || bnst == '3') {
                oC.setAttribute("rowSpan", n)
            }
            if (Ref != '') {
                oA = window.document.createElement("A");
                oA.setAttribute("href", Ref);
                oA.setAttribute("target", "_blank");
                oA.appendChild(oBnr);
            } else {
                oA = oBnr;
            }
            oC.appendChild(oA);
            eval("oC.className='banner_" + str + "';");
            oBnr.setAttribute("border", "0");
            oBnr.setAttribute("src", SRC);
            if (b) {
                function setDiff() {
                    if (window.bCnt > 5) return;
                    window.bCnt++;
                    if (oBnr.readyState == 'complete' || typeof(oBnr.readyState) == 'undefined') {
                        var z = oBnr.clientHeight, x;
                        x = z - y;
                        window.x2 = x;
                        if (x > 0) {
                            oHC = oH.insertCell(0);
                            oH.setAttribute("height", x);
                            if (!isIE) oHC.outerHTML = '<TD>&nbsp;</TD>';
                        } else {
                            if (window.x1 != window.x2) {
                                window.x1 = window.x2;
                                window.setTimeout(setDiff, 100);
                            }
                        }
                    }
                }

                window.bCnt = 1;
                window.x1 = 0;
                window.x2 = 0;
                if (typeof(oBnr.onreadystatechange) == 'object') {
                    oBnr.onreadystatechange = setDiff;
                }
                else {
                    window.setTimeout(setDiff, 100);
                }
            }
        }
    } catch (e) {
    }
}

function fn_alert(w, x, t, oFocus) {
    if (getTrim(x) == '')return;
    MessageBoxObject.alert(transformMsg(w, x, t), LRSMLCaption, oFocus);
}


function fn_prompt(w, x, t, h, doc, dtype, NAME) {
    if (getTrim(x) == '')return;
    MessageBoxObject.prompt(transformMsg(w, x, t), h, doc, dtype, NAME);
}

function fn_confirm(w, x, t, h, doc) {
    if (getTrim(x) == '')return;
    MessageBoxObject.confirm(transformMsg(w, x, t), h, doc);
    /*
     x - заголовок алерт-окна
     t - номер ошибки
     h - текст окна
     doc - действие по нажатию ОК
     */
}
//**************


var gWaitInfoID = 'WaitInfo';
var gWaitShadowID = 'WaitShadow';


function fn_wait(w, xMsg) {
    this.doPosition = function () {
        with ($(w, gWaitInfoID).style) {
            left = ((window.innerWidth) ? window.innerWidth : window.document.body.clientWidth) / 2 - $(w, gWaitInfoID).offsetWidth / 2 + window.document.body.scrollLeft;
            top = ((window.innerHeight) ? window.innerHeight : window.document.body.clientHeight) / 2 + window.document.body.scrollTop - $(w, gWaitInfoID).offsetHeight / 2;
        }
    }
    if (!$(w, gWaitInfoID)) {
        var oWaitDiv = window.document.createElement('DIV');
        oWaitDiv.style.display = 'none';
        oWaitDiv.id = gWaitInfoID;
        window.document.body.appendChild(oWaitDiv);
    }
    if (!xMsg)xMsg = WAITLRS;
    var shadowRtLt = 'height:expression(document.getElementById(\'' + gWaitShadowID + '\').offsetHeight);';
    var shadow = '<div id="' + gWaitShadowID + '"><div class="shadow-left" style="' + shadowRtLt + '"></div><div class="shadow-top"></div><div class="shadow-right" style="' + shadowRtLt + '"></div><div class="shadow-bottom"></div><div class="shadow-rt"></div><div class="shadow-lt"></div><div class="shadow-rb "></div><div class="shadow-lb"></div>';
    $(w, gWaitInfoID).innerHTML = xMsg ? (shadow + '<IMG SRC="../img/ico/' + window.colorstyle + '/wait.gif"><p>' + xMsg + '</p></div>') : shadow + '&#160;</div>';
    this.doPosition();
    $(w, gWaitInfoID).style.display = 'block';
    this.doPosition();
}

function wait_hide(w) {
    try {
        $(w, gWaitInfoID).style.display = 'none';
    } catch (e) {
    }
}

function transformMsg(w, x, t) {
    x = x.replace(/\r/g, '').replace(/\n/g, ' ').replace(/\[BR\]/g, '<BR/>');
    var Ar = x.split('[NL]'), xs = '', el;
    for (var i = 0; i < Ar.length; i++) {
        el = fn_unescape(Ar[i]);
        if (el != '') {
            if ((el.match(/\d{1,2}\|/) == null) && t)el = t + '|' + el;
            var img = '<IMG SRC="../img/err/$1.gif" ALIGN="abstop"/>';
            if (t)img = '<IMG SRC="../img/err/' + t + '.gif" ALIGN="abstop"/>';
            el = el.replace(/(^\d{1,2})(\|)(.*)/, img + '</TD><TD>$3').replace(/(^.{1})(.*)(.{1}$)/, '<TR><TD style="vertical-align:top;text-align:justify">$1$2$3</TD></TR>');
            if (el.match(/\<TD/g).length < 2)el = el.replace(/\<TD/g, '<TD colspan="2"');
            xs += el;
        }
    }
    xs = '<TABLE style="margin:0px;"><COL style="width:20px"/><COL style="width:0*%;"/>' + xs + '</TABLE>';
    return(xs);
}

c_misc_js = true;
