var gPostFrame;
var sST_TPL = '20', sST_NEW = '0', sST_SIG = '7', sST_TOPROC = '10', sST_ARCH = '1901', sST_ACCPT = '401';
var iMinW = 850, iMinH = 600;
var iMaxTry = 180;
var gNWParam = 'height=' + iMinH + ',width=' + iMinW + ',top=100, status=no,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes';
var Top = window;
Top.nv = window;

//D.Chernysh: для дальнейшей работы с jQuery определим подключена ли библиотека.
function isJQuery(w) {
    var isJQ = true;
    try {
        jQuery();
    } catch (e) {
        if (e.message != null) isJQ = false;
    }
    return(isJQ);
}
//D.Chernysh: функция показа placeholder в полях форм в IE
function setPlaceholderInIE() {
    if($j.browser.msie) {
        var phldr = "",
            sVal = "";
        $j("form").find("input[placeholder]").each(function () {
            phldr = $j(this).attr("placeholder");
            if ($j(this).val() == "") {
                $j(this).attr("value", phldr).css("color", "#969696");
            }
        }).on("focusin", function () {
            sVal = $j(this).attr("placeholder");
            if ($j(this).val() == sVal) {
                $j(this).val("").css("color", "#000000");
            }
        }).on("focusout", function () {
            sVal = $j(this).attr("placeholder");
            if ($j(this).val() == "") {
                $j(this).val(sVal).css("color", "#969696");
            }
        });
    }
}

function InitTab() {
    //Ищем активную вкладку
    el = $(w, 'TABSROW');
    if (el != false) {
        td = el.firstChild;
        while (td != null) {
            /*Перебираем все элементы в поисках нужного*/
            if (td.className == 'active')break;
            td = td.nextSibling;
        }
        if (td != null) {
            /*Активируем вкладку чтобы получить её сожержимое*/
            if (td.getAttribute('_show') == null) {
                td.setAttribute('_show', '1');
                td.onclick();
            }
        }
    }
}
/*========================= 
 =====функция загрузки форм и скроллеров
 */
function fnCommOnload() {
    window.IsScroller = false;
    window.IsForm = false;
    window.IsTab = false;
    window._LoadOCXOK = false;
    try {
        window.IsScroller = $(window, 'SCROLLACTID') ? true : false;
    } catch (e) {
    }
    try {
        window.IsForm = $(window, 'FORMACTION') ? true : false;
    } catch (e) {
    }
    try {
        window.IsTab = $(window, 'PAGETABS') ? true : false;
    } catch (e) {
    }
    if (window.IsForm) {
        window.IsEdit = true;
        try {
            InitForm();
            setPlaceholderInIE();
        } catch (e) {
        }
    }
    if (window.IsScroller) {
    }
    if (window.IsTab) {
        try {
            InitTab();
        } catch (e) {
        }
    }

    _attachElmHndlrs(w, $(window, '_WorkPanel_'));

}

//======================================
function addElEvent(el, x, fn) {
    try {
        if (window.attachEvent)el.attachEvent("on" + x, fn);
        else el.addEventListener(x, fn, false);
    } catch (e) {
    }
}
//======================================
/*==========функция работы со справочниками в виде нового окна*/
function Dict(w, SchemeName, FromPoint, task, bll, P1, P2, P3) {
    CreateBSSHTTPRequest();
    var InitPoint = (FromPoint || $(window, 'SCHEMENAME').value);
    var oParams = new Array(
        'T=' + (bll || _MBll) + (task || 'sc'),
        'Dict=1',
        'SCHEMENAME=' + SchemeName,
        'FromPoint=' + InitPoint,
        'nw=1', 'DICTIONARY=1');
    if (P1 != null)oParams.push('XACTION=' + P1);
    if (P2 != null)oParams.push('FILTERIDENT=' + P2);
    if (P3 != null) {
        var Arr = P3.split(',');
        if (Arr.length == 1) {
            oParams.push(P3);
        }
        else {
            for (var i = 0; i < Arr.length; i++) {
                oParams.push(Arr[i]);
            }
        }
    }

    if (!w.IsDict && InitPoint != '') oParams.push('INITPOINT=' + InitPoint);
    BSSHTTPRequest.init(oParams);
    BSSHTTPRequest.resultMethod = fnDict_result;
    BSSHTTPRequest.sendData();
    w.IsDict = true;
}

function ExitDict(w) {
    w.IsDict = false;
    MessageBoxObject.AlertHTMLBox.close();
}
function fnDict_result(xHTTP) {
    MessageBoxObject.alertHTML(xHTTP.responseBody, '', WinHTMLBoxProps);
    MessageBoxObject.AlertHTMLBox.setTitle($(window, 'HeadersView').innerHTML);
    _attachElmHndlrs(w, MessageBoxObject.alertHTML.textBlock);
}
//======================================

/*==========функция работы со справочниками в виде ниспадающего списка*/
function newListDictionary(elementPosition, FilElementsList) {
    if (!window.selectionDectionary) {
        window.selectionDectionary = window.document.createElement('IFRAME');
        window.selectionDectionary.style.display = 'none';
        window.selectionDectionary.frameBorder = '0';
        window.selectionDectionary.marginWidth = '0';
        window.selectionDectionary.src = 'bsi.dll?T=RT_2ListDicts.getDictionaryWin';
        window.selectionDectionary.className = 'ListDict';
        window.selectionDectionary.id = 'ListDict';
        window.selectionDectionary.name = 'ListDict';
        window.selectionDectionaryreadyState = false;
        window.document.body.appendChild(window.selectionDectionary);
        if (window.frames['ListDict'].name != 'ListDict') window.frames['ListDict'].name = 'ListDict';
        _attachEvents(window);
    }
    this.objectPosition = $(window, elementPosition);
    this.FilElementsList = FilElementsList;
    this.position = function () {
        with (window.selectionDectionary.style) {
            top = getTopOffset(this.objectPosition) + this.objectPosition.offsetHeight + 5 + "px";
            left = getLeftOffset(this.objectPosition) + 15 + "px";
            var iTop = getTopOffset(this.objectPosition) + this.objectPosition.offsetHeight + 5;
        }
        var iWH = window.clientHeight || window.document.body.clientHeight;
        /*    alert('iWH='+iWH);
         alert('iTop='+iTop);
         alert('iTop+200='+(iTop+200));
         alert(iTop - (iWH-iTop+200));*/
        if ((iTop + 200) > iWH) {
            //window.selectionDectionary.style.top = (iTop - (iWH-iTop+200)) + 'px';
            with (window.selectionDectionary.style) {
                top = getTopOffset(this.objectPosition) - 205 + "px";
            }
        }
    };
    this.setRequestParams = function (obj) {
        this.RequestParams = obj;
    };
    this.getRequestParams = function (obj) {
        return(this.RequestParams);
    };
    this.insert = function (values) {
        var objectsArr = this.FilElementsList.split(',');
        var elList;
        for (var i = 0; i < objectsArr.length; i++) {
            elList = objectsArr[i].split('=');
            try {
                if ($(window, elList[0]))$(window, elList[0]).value = values[elList[1]];
                if ($(window, 'ro-' + elList[0]))$(window, 'ro-' + elList[0]).innerHTML = values[elList[1]];
            } catch (e) {
                alert(e || e.description);
            }
        }
        // Событие при выборе из ListDict
        try {
            onAfterListDictRun(w.Last_DictScheme);
        } catch (e) {
        }
    };
    this.getNewArrayList = function () {
        var newReqList = new Array('RELOADBODY=1');
        var initReq = this.getRequestParams();
        var i;
        for (i = 0; i < initReq.length; i++) {
            newReqList.push(initReq[i]);
        }
        var elList = window.frames['ListDict'].document.getElementsByTagName('INPUT');
        for (i = 0; i < elList.length; i++) {
            newReqList.push('SEARCHFIELD_' + elList[i].name + '=' + encodeURIComponent(elList[i].value));
        }
        return(newReqList);
    };
    this.doSearch = function () {
        CreateBSSHTTPRequest();
        BSSHTTPRequest.disableWin = false;
        var ReqList = this.getNewArrayList();
        BSSHTTPRequest.init(ReqList);
        BSSHTTPRequest.resultMethod = ListDictionary_result;//window._gListDictionary.updateContent;
        BSSHTTPRequest.sendData();
    };
    this.clearContent = function () {
        try {
            window.frames['ListDict'].document.body.removeChild(
                window.frames['ListDict'].document.getElementById('ListDictTBL')
            );
        } catch (e) {
        }
    };
    this.hide = function () {
        window.selectionDectionary.style.display = 'none';
        this.clearContent();
        window._gListDictionary.setRequestParams(null);
    };

    this.show = function (x) {
        this.clearContent();
        if (isIE)window.frames['ListDict'].document.body.insertAdjacentHTML('beforeEnd', x);
        else window.frames['ListDict'].document.body.innerHTML = x;
        window.frames['ListDict'].document.body.scrollTop = 0;
        window.selectionDectionary.style.display = 'block';
        window._gListDictionary.position();
    };
    this.updateContent = function (xHTTP) {
    };
}
/*
 В LDFilter можно передавать значения параметров фильтра
 в формате "имя=значение,имя=значение,..."
 */
function ListDictionary(elementPosition, DictScheme, FilElementsList, LDFilter) {
    try {
        window._gListDictionary.hide();
    } catch (e) {
    }
    window._gListDictionary = new newListDictionary(elementPosition, FilElementsList);

    window.Last_elementPosition = elementPosition;
    window.Last_DictScheme = DictScheme;
    window.Last_FilElementsList = FilElementsList;
    window.Last_LDFilter = LDFilter;

    if (!window.selectionDectionaryreadyState) {
        window.setTimeout('ListDictionary(window.Last_elementPosition,window.Last_DictScheme,window.Last_FilElementsList)', 1000);
        return;
    }
    var F = '';
    if (LDFilter)
        F = LDFilter;
    CreateBSSHTTPRequest();
    BSSHTTPRequest.disableWin = false;
    var oParams = new Array(
        'T=RT_2ListDicts.ListDictionary',
        'L=' + LLangID.toUpperCase(),
        'DICTSCHEME=' + DictScheme,
        'COLORSTYLE=' + colorstyle,
        'FPARAMS=' + F
    );
    window._gListDictionary.setRequestParams(oParams);
    BSSHTTPRequest.init(oParams);
    BSSHTTPRequest.resultMethod = ListDictionary_result;
    BSSHTTPRequest.sendData();
}

function ListDictionary_result(xHTTP) {
    var iC = xHTTP.errorCode, sErr = xHTTP.error;
    if (iC > 0) {
        fn_alert(window, sErr, 4);
        return;
    }
    window._gListDictionary.show(xHTTP.responseBody);
}
function ClickHideListDictionary(window, e) {
    try {
        if (!window._gListDictionary)return;
        if (!e)window._gListDictionary.hide();
        else {
            var o = e.target || e.srcElement;
            if (o != window.selectionDectionary)window._gListDictionary.hide();
        }
    } catch (e) {
    }
}
/*
 Функция заглушка для правильного отображения штампа в IE
 (исправление проблемы с отображением абсолютно-позиционируемых элементов)
 */
function _showStamp() {
    if (isIE) {
        var prnt = null;
        var el = null;
        var els = window.document.getElementsByName('stamp');
        if ((els.length > 0)) {
            for (var i = 0; i < els.length; i++) {
                el = els[i];
                prnt = el.parentElement;
                if (prnt != null) {
                    var y = el.offsetTop;


                    prnt.removeChild(el);
                    prnt.appendChild(el);

                    // уезжание вниз
                    y -= el.offsetTop;
                    if (y != 0) el.style.top = y + 'px';

                    // уезжание направо
                    var im = el.getElementsByTagName('image');
                    for (var j = 0; j < im.length; j++)
                        im[j].style.position = 'relative';
                }
            }
        }
    }
}

/*===============функция просмотра информации*/
function fnVIEW(w, sTsk, SchemeName, ACTID, sparam) {
    if (sTsk == null || sTsk == '') sTsk = _MBll + 'view';
    var sShn = (SchemeName || $(w, 'SCHEMENAME').value);
//  try{pr=getViewParam(w)}catch(e){pr=null}
    /*29.05.12 Chernysh.D. из v2.4: печатать квитанцию с графиком */
    try {
        if ((ACTID == 'PRN') && ($(w, 'ISPERIODPAY').value == '1')) {
            var sPeriod = '0';
            if (confirm(PPLRS25)) sPeriod = '1';
        }
    } catch (e) {
    }
    CreateBSSHTTPRequest();
    if (sparam == null)
        BSSHTTPRequest.init('T=' + sTsk, 'SCHEMENAME=' + sShn, 'IDR=' + $(w, 'IDR').value, 'FORMACTION=' + (ACTID || 'VIEW'));
    else BSSHTTPRequest.init('T=' + sTsk, 'SCHEMENAME=' + sShn, 'IDR=' + $(w, 'IDR').value, 'FORMACTION=' + (ACTID || 'VIEW'), 'USERKEY=' + sparam);
    BSSHTTPRequest.resultMethod = fnVIEW_result;
    BSSHTTPRequest.sendData();
}
function fnVIEW_result(xHTTP) {
    if (xHTTP.errorCode > 0) {
        fn_alert(w, xHTTP.error, xHTTP.errorCode);
        return;
    }
    MessageBoxObject.alertHTML(xHTTP.responseBody);
    MessageBoxObject.AlertHTMLBox.setTitle($(window, 'HeadersView').innerHTML);
    try {
        showAcyncInfo();
    } catch (e) {
    }
    _showStamp();
    if (isIE) {
        fnOnResize();
    }
}
//======================================

function fnRnd() {
    var now = new Date();
    return 'B' + (Date.parse(now.toGMTString()) + now.getMilliseconds()).toString(32);
}

/**
 * Функция обновление списка выбора SELECT.
 * @param w объект window
 * @param obj объект поля списка
 * @param Str строка массива данных для обновления
 */
function updateSelectOptions(w, obj, Str) {
    var oOpts = obj.options,
        iOl = oOpts.length,
        Arr = new Array(),
        i = 0;
    //удаление эл-тов OPTIONS
    for (i = iOl - 1; i > -1; i--) {
        if (oOpts[i].value != '') obj.remove(i);
    }
    if (Str == '') {
        //если нет данных для списка - запрещать редактировать элемент SELECT
        obj.setAttribute('disabled', 'disabled');
        return;
    }
    //Str должен быть в формате (вложенные массивы):
    //[['V','value1'],['T','TEXTvalue1'],['V','value2'],['T','TEXTvalue2'],.....,['V','valueN'],['T','TEXTvalueN']]
    Arr = eval(Str);

    for (var a in Arr) {
        try {
            if (Arr[a][0] == 'V' && Arr[a][1] != '') {
                oOpt = window.document.createElement("OPTION");
                oOpts.add(oOpt);
                oOpt.value = Arr[a][1];
                //снятие атрибута disabled с поля SELECT
                if (obj.getAttribute('disabled') != null) obj.removeAttribute('disabled');
            }
            if (Arr[a][0] == 'T') oOpt.innerHTML = fn_unescape(Arr[a][1]);
            if (Arr[a][0] != 'V' && Arr[a][0] != 'T') oOpt.setAttribute(Arr[a][0], Arr[a][1]);
        } catch (e) {
            alert(e || e.description);
        }
    }
}
/*function getResponse(w){
 this.error='';
 try{
 var oR=w.document.all.RESPONSETEXT;
 this.responseObj=oR;
 this.responseText=oR.innerHTML;
 this.TokenCT=w.document.body.getAttribute('TokenCT');
 this.TokenCTD=w.document.body.getAttribute('TokenCTD');
 var sTic=w.document.body.getAttribute('TokenCTD');this.Tic=(sTic=='')?'1':sTic;
 }catch(e){}
 try{this.updateObj=w.document.all.UPDATEDATA.getElementsByTagName("I");}catch(e){this.updateObj=null}
 try{
 this.error=w.document.all.ERROR.innerHTML;
 this.errorCode=(w.document.body.getAttribute('ERRCODE') == '-1')?-1:parseInt('0'+w.document.body.getAttribute('ERRCODE'),10);
 }catch(e){
 this.errorCode=1;
 }
 ((this.error=='')&&(this.errorCode>0))?this.error=ErrConnect:'';
 this.clearRText=function(){oR.innerHTML=''}
 this.getElm=function(x,ir){
 try{if(ir<0)return '';}catch(e){}
 s="";
 try{oC=oR.getElementsByTagName(x);s=oC.item(ir||0).getAttribute("V")}catch(e){s=""}
 return(s||'');
 }
 this.findElmByAttr=function(x,atrN,atrVal){
 try{
 oC=oR.getElementsByTagName(x);
 for(var i=0;i<oC.length;i++){
 if(oC.item(i).getAttribute(atrN) == atrVal)return i;
 }
 }catch(e){}
 return(-1);
 }
 this.updateData=function(w){
 if(this.updateObj==null)return;
 try{
 var oI,sN,sV,o;
 for(var i=0;i<this.updateObj.length;i++){
 oI=this.updateObj.item(i);sN=oI.getAttribute('N').replace('LIST!_!','');sV=fn_unescape(oI.innerHTML);
 try{
 o=$(w,sN);
 if (o.tagName=='SELECT' && oI.getAttribute('N').indexOf('LIST!_!')!=-1){
 if(sV=='')return;
 updateSelectOptions(w,o,sV);
 }else if(o)o.value=sV;
 }catch(e){}
 try{
 if(w.IsForm && (!w.IsEdit)){o=$(w,'A_'+sN);o.innerHTML=sV;}
 }catch(e){}
 }
 }catch(e){}
 }
 }*/
//**************
function _detachEvent(o, b) {
    try {
        if (((b ? o.onclick : o.onclickdis) == null) || (o.getAttribute('NODT') == '1'))return;
        o.setAttribute((b ? 'onclickdis' : 'onclick'), o.getAttribute((b ? 'onclick' : 'onclickdis')));
        if (b)o.onclick = null;
        else if (o.onclickdis != null)o.setAttribute('onclick', o.getAttribute('onclickdis'));
    } catch (e) {
    }
}
//**************

function showHlp(w, sH) {
    try {
        w.oTb.document.all.TitleHlp.style.visibility = (w.hlp) ? 'visible' : 'hidden';
    } catch (e) {
    }
}

/**
 * Функция вызова нового окна.
 *
 * @param w объект window
 * @param x ссылка (href)
 * @param bSelf имя окна или как открывать окно (_blank и т.д.)
 * @param gNWParam параметры окна
 * @returns {*} Объект новое окно
 */
function WOpen(w, x, bSelf, gNWParam) {
    //w.newwin = (isIE && bKiosk)?w.showModelessDialog(x,w):w.open(x,(bSelf?'_self':'_blank'),gNWParam);
    w.newwin = (isIE && bKiosk) ? w.showModelessDialog(x, w) : w.open(x, bSelf, gNWParam);  //09,06 Чернвш
    w.newwin.Top = Top;
    w.setInterval('try{w.newwin.Top=Top}catch(e){}', 2000);
    return w.newwin;
}


/**
 * Функция вывода на печать.
 *
 * @param w объект window
 * @constructor
 */
function WPrn(w) {
    try {
        var xHTML = $(window, 'ViewTarget').innerHTML;
        xHTML = xHTML.replace(/ID="SCROLLER"/ig, '');
        xHTML = xHTML.replace(/id=SCROLLER/ig, '');
        $(window, 'PrintPage').innerHTML = xHTML;
        window.print();
    } catch (e) {
    }
}
function fnPrint(w, SchemeName) {
    var _P = (w.IsVIEW ? 'VIEW' : (w.IsForm ? 'FORM' : 'SCROLLER')), pr;
    try {
        pr = w.getViewParam(w);
    } catch (e) {
        pr = null;
    }
    fnVIEW(w, _MBll + 'PRN&_PresentationType=' + _P, SchemeName, 'PRN', pr);
}
//********************
function ScroolToUp(w) {
    w.document.body.scrollTop = 0;
}
function fnHlp(w) {
    fn_alert(w, LRSscr1, 1);
}
function fn_nvLoad(w) {
    if (!nv.nv_onload)return;
    w.clearInterval(w.NvLoadInt);
    nv.nv_onload();
}


/**
 * Функция вызова хелпов.
 * @autor Chernysh.D.
 * @param HREF
 * @param w
 * @constructor
 */
function Help(HREF, w) {
    try {
        var SchemeName = $(window, 'SCHEMENAME').value,
            sh = SchemeName.toLowerCase() + '.html';
        groupID = '3';

        //  if (LLangID != 'russian'){LLangID = 'russian';}
        if (HREF == 'recomendforpay' || HREF == 'recomendforpaycdb' || HREF == 'rekvizits' || HREF == 'credrekvizits') {
            HREF = '../help/' + LLangID.toLowerCase() + '/' + HREF + '.html';
        }
        if (HREF == 'price') {
            if ((ClientUserGRid != '' && ClientUserGRid <= groupID) || ClientUserGRid == '305749') {
                //22.03.13 ChernyshDV: разделение тарифов по группам уже давно нет, а группы у клиентов различные.
                //  if (ClientUserGRid == '305749' || ClientUserGRid == '1') {
                HREF = '../help/' + LLangID.toLowerCase() + '/' + HREF + '.html';
                //      }
                //  else {
                //	      HREF='../help/'+LLangID.toLowerCase()+'/'+HREF+'_'+ClientUserGRid+'.html';
                //	   }
            }
            else {
                fn_alert(w, 'Внимание! Для группы ' + ClientUserGRid + ' тарифы не установлены.', 2);
                return;
            }
        }
        else {
            if (HREF == '' || HREF == null)HREF = '../help/' + LLangID.toLowerCase() + '/' + (w.IsScroller ? ('sc_' + sh) : (w.IsEdit ? sh : (w.IsStampForm ? (bKiosk ? ('stamp_error_k.html') : ('stamp_error.html')) : (bKiosk ? ('auth_error_k.html') : ('auth_error.html'))))).replace('sc_retcardacccdb', 'shablons').replace('sc_retcardacc', 'shablons').replace('sc_retpaydocrucdb', 'shablons').replace('sc_retpaydocru', 'shablons').replace('retpupaykievgaz', 'retpupayonetime').replace('retpupaykievenergo', 'retpupayonetime'); //*** замена для перехода в shablons
        }
        //  WOpen(w,HREF);
        WOpen(w, HREF, '_blank', gNWParam);
    } catch (e) {
        alert(e.message);
    }
}
function SessClose() {
    try {
        if (bCloseSess)return;
        document.getElementById('CLSS').src = clssURL;
    } catch (e) {
    }
}
function wOnSessClose() {
    if (isIE)attachEvent('onbeforeunload', SessClose);
    if (IsFirefox)addEventListener('beforeunload', SessClose, false);
}
function getRadioValue(Obj) {
    for (var i = 0; i < Obj.length; i++) {
        if (Obj[i].checked)return(Obj[i]);
    }
}
function $(w, xN, b) {
    try {
        var xObj = eval(window.document.all[xN] || 'window.document.all.' + xN) || window.document.getElementById(xN) || window.document.getElementsByName(xN)[0];
        try {
            if (xObj.tagName == 'SELECT')return xObj;
        } catch (e) {
        }
        if (xObj.length) {
            xObj = (xObj[xObj.length - 1].type == 'radio') ? getRadioValue(xObj) : xObj[xObj.length - 1];
        }
        return(xObj);
    } catch (e) {
        return false;
    }
}

var _dictFARMEId = 'dictFRAME';

function onDictTREvent(e) {
    if (!e)e = window.event;
    var el = e.target || e.srcElement;
    var oRow = el.parentNode;
    switch (e.type) {
        case 'click':
            var oInsEl = window._currentDictInsElement || window.mw._currentDictInsElement;
            oInsEl.value = oRow.cells.item(0).innerHTML;
            hideDictMW(window.mw);
            break;
        case 'mouseover':
            oRow.style.backgroundColor = "#dddbdb";
            break;
        case 'mouseout':
            oRow.style.backgroundColor = "#FFFFFF";
            break;
    }
}

function setEventsOnDict(w, oDict) {
    var oTbl = oDict.getElementsByTagName('TABLE')[0];
    if (!oTbl)return;
    var oR = oTbl.tBodies[0].rows;
    for (var i = 0; i < oR.length; i++) {
        //alert(oR.item(i).outerHTML);
        addElEvent(oR.item(i), "click", onDictTREvent);
        addElEvent(oR.item(i), "mouseover", onDictTREvent);
        addElEvent(oR.item(i), "mouseout", onDictTREvent);
    }
}

function _ie_setDictTxt() {
    var d;
    try {
        d = (mw.newwin != null) ? mw.newwin.document : mw.document;
    } catch (e) {
        d = mw.document;
    }
    var _po = d.frames(_dictFARMEId).document;
    if (_po.readyState != "complete")return;
    _po.createStyleSheet('../css/main.css');
    if (colorstyle != '')_po.createStyleSheet('../css/_' + colorstyle + '.css');
    _po.body.innerHTML = mw._currentDictMW.outerHTML;
    var oDictEl = $(d.frames(_dictFARMEId), mw._currentDictMW.id);
    oDictEl.style.display = 'block';
    setEventsOnDict(mw, oDictEl);
}
function setDictParams(obj, p1, p2, p3) {
    obj.style.top = p1;
    obj.style.left = p2;
    obj.style.width = p3;
    obj.style.height = "200px";
}

//======================================
//======================================
function ScriptsStage() {
    this.scriptsLength = 0;
    this.scriptsLoaded = 0;
    this.incCounter = function () {
        this.scriptsLoaded += 1;
    };
    this.functionList = new Array();
    this.locresList = new Array();
}

function loadWorkPanel(xHTTP) {
    onResizeMid();
    if (xHTTP.errorCode > 0) {
        fn_alert(w, xHTTP.error, 2);
        return;
    }

    if (!window.NEWLOAD_Scripts)window.NEWLOAD_Scripts = new ScriptsStage();
    /*удаляем существующие скрипты от старых схем*/
    var head = document.getElementsByTagName("head")[0];
    var oHeadScripts = head.getElementsByTagName("SCRIPT");
    for (var i = oHeadScripts.length - 1; i >= 0; i--) {
        if ((oHeadScripts[i].id == 'NEWLOAD_SHLRJS') || (oHeadScripts[i].id == 'NEWLOAD_SHJS')) {
            head.removeChild(oHeadScripts[i]);
            for (var property in NEWLOAD_Scripts.functionList) {
                eval('window.' + property.toString() + '=false');
            }
            for (var lrs in NEWLOAD_Scripts.locresList) {
                NEWLOAD_Scripts.locresList[lrs] = null;
            }
        }
    }
    var oAr = new Array("SHJS", "SHLRJS"), oScripts = new Array(), obj;
    for (var j = 0; j < oAr.length; j++) {
        if (xHTTP.responseHTMLObj) obj = xHTTP.responseHTMLObj.getElementsByTagName("DIV")[oAr[j]];
        else obj = $(window, '_WorkPanel_').getElementsByTagName("DIV")[oAr[j]];
        if (typeof(obj) == 'object') oScripts[j] = obj;
    }
    NEWLOAD_Scripts.scriptsLength = oScripts.length;
    NEWLOAD_Scripts.scriptsLoaded = 0;

    if (oScripts.length > 0) {
        var ScriptList = new Array();
        var xId = '';
        for (i = 0; i < oScripts.length; i++) {
            //addScript(oScripts[i].getAttribute('SRC'),'NEWLOAD_'+oScripts[i].getAttribute('ID'))
            xId = 'NEWLOAD_' + oScripts[i].getAttribute('ID');
            src = oScripts[i].getAttribute('SRC');
            ScriptList[i] = document.createElement("script");
            ScriptList[i].type = "text/javascript";
            ScriptList[i].id = xId;
            ScriptList[i].src = src + '?tmc=' + fnRnd();
            head.appendChild(ScriptList[i]);

            if ($(window, xId).readyState && !IsOpera) {
                $(window, xId).onreadystatechange = function () {
                    if (this.readyState == "loaded" || this.readyState == "complete" || this.readyState == 4) {
                        NEWLOAD_Scripts.incCounter();
                    }
                    ;
                }
            } else ScriptList[i].onload = function () {
                NEWLOAD_Scripts.incCounter();
            };
        }
    } else SCHEMESCRIPT = new Array();
    /*from v2.4*/
    try {
        if (window.NEWLOAD_Scripts_Int != -1) window.clearInterval(window.NEWLOAD_Scripts_Int);
    } catch (e) {
    }
    /**/
    window.NEWLOAD_Scripts_Int = window.setInterval('afterLoadScripts()', 50);
    //Chernysh D.V.: глюки в IE (нужно ширину скроллера выставить во время построения рабочей области).
    if (isIE)setScrollAndFltrWidth();
}

function afterLoadScripts() {
    NEWLOAD_Scripts.functionList = new Array();
    NEWLOAD_Scripts.locresList = new Array();
    if (NEWLOAD_Scripts.scriptsLoaded >= NEWLOAD_Scripts.scriptsLength) {
        try {
            NEWLOAD_Scripts.functionList = SCHEMESCRIPT;
            for (var property in SCHEMESCRIPT) {
                eval('window.' + property.toString() + '=' + SCHEMESCRIPT[property]);
            }
            NEWLOAD_Scripts.locresList = LOCRESSCRIPT;
            for (var lrs in LOCRESSCRIPT) {
                eval('window.' + lrs.toString() + '="' + LOCRESSCRIPT[lrs] + '"');
            }
        } catch (e) {
        }
        window.clearInterval(window.NEWLOAD_Scripts_Int);
        window.NEWLOAD_Scripts_Int = -1;
        /*from v2.4*/
        fnCommOnload(window);
    }
}

function setFracUnit(o, sISO) {
    var i, iD = 2, curL = '012DZD100BGL203CZK352ISK360IDR380ITL392JPY398KZT792TRL960XDR';
    try {
        sISO = sISO.replace(/ /g, '');
        i = curL.indexOf(sISO);
        if (i >= 0) iD = 0;
        if (o) {
            o.setAttribute('DAFTER', iD);
        }
    } catch (e) {
    }
}

function getFormByName(x) {
    if (!document.forms)return;
    var Obj = null;
    for (var j = 0; j < document.forms.length; j++) {
        if (document.forms[j].name == x)Obj = document.forms[j];
    }
    return Obj;
}
function getFormElements() {
    try {
        if (arguments.length == 0)arguments[0] = 'SystemForm';
        var arr = new Array(), el, oForm;
        arr.push('_PresentationType=' + (window.IsForm ? 'FORM' : (window.IsView ? 'VIEW' : 'SCROLLER')));
        var fileCount = 0;
        for (var i = 0; i < arguments.length; i++) {
            oForm = getFormByName(arguments[i]);
            for (var j = 0; j < oForm.elements.length; j++) {
                el = oForm.elements.item(j);
                if (el.getAttribute('DONOTAJAX') != '1' && el.type != 'file') {
                    switch (el.type) {
                        case 'radio':
                            var oFmEl = oForm.elements[el.name], oIn, sVal, sV, iL, bSelf;
                            iL = oFmEl.length;
                            if (typeof(oFmEl) == 'object' && typeof(iL) == 'undefined') {
                                iL = 1;
                                bSelf = true;
                            }
                            for (var k = 0; k < iL; k++) {
                                oIn = bSelf ? oFmEl : oFmEl[k];
                                if (oIn.checked) {
                                    sVal = el.name + '=' + oIn.value;
                                    for (sV in arr) {
                                        if (sVal == arr[sV])arr.splice(sV, 1, sVal);
                                        else if (sV == (arr.length - 1))arr.push(sVal);
                                    }
                                }
                            }
                            break;
                        case 'checkbox':
                            arr.push(el.name + '=' + (el.checked ? el.value : ''));
                            break;
                        case 'select-one':
                            arr.push(el.name + '=' + encodeURIComponent(el.value));
                            if (el.getAttribute('SENDTEXT') == '1') if (el.selectedIndex != '-1') arr.push('TEXT_' + el.name + '=' + encodeURIComponent(el.options[el.selectedIndex].text));
                            break;
                        default:
                            arr.push(el.name + '=' + encodeURIComponent(el.value));
                            break;
                    }
                }
            }
        }
        return arr;
    } catch (e) {
        alert('getFormElements: ' + e || e.description);
        return false;
    }
}
function checkSessionOpened(resTxt) {
    var re = new RegExp('_Session_completed', "g");
    if (!re.exec(resTxt)) return;
    else try {
        var t = setTimeout('Exit(1);', 3000);
    } catch (e) {
    }
}
c_common_js = true;
//==========делаем пункт Controlbar недоступным

function disableControlItem(ItemID) {
    var CI = $(w, "ControlItem" + ItemID);
    if (!CI) return;
    CI.onclick = function (e) {
        return false;
    };
    var CIL = $(w, "ControlItemLink" + ItemID);
    if (CIL.className != "CBDisabled") {
        CIL.className = "CBDisabled";
        CIL.style.backgroundImage = CIL.style.backgroundImage.replace('/toolbar/', '/toolbar/inactive/');
    }
}

function enableControlItem(ItemID) {
    var CI = $(w, "ControlItem" + ItemID);
    if (!CI) return;
    CI.onclick = function (e) {
        eval(CI.getAttribute("onclickmem"));
    };
    var CIL = $(w, "ControlItemLink" + ItemID);
    if (CIL.className = "CBDisabled") {
        CIL.className = "";
        CIL.style.backgroundImage = CIL.style.backgroundImage.replace('/inactive/', '/');
    }
}

//=============== работа с jquery-виджетом автопоиск. START ==================
var maxHeightForAutocomplete = 0;
var maxWidthForAutocomplete = 0;

/**
 * Дополнительные действия для обработчика события response.
 * @param fld - объект поля, в котором вызывается автопоиск
 */
function additionalResponseHandler(fld) {
    fnCalcMaxSizeForAutocomplete(fld);
}

/**
 * Дополнительные действия для обработчика события open.
 * @param fld - объект поля, в котором вызывается автопоиск
 * @param bH - TRUE - изменить высоту списка на максимально видимую высоту
 * @param bW - TRUE - изменить ширину списка на максимально видимую ширину
 */
function additionalOpenHandler(fld, bH, bW) {
    fnSetAutocompleteSize(fld, bH, bW);
}

/**
 * Задание высоты списку автопоиска.
 * Подключать в обработчик события open.
 * @param fld - поле, в котором вызывается автопоиск
 * @param bHeight - TRUE - изменить высоту списка на максимально видимую высоту
 * @param bWidth - TRUE - изменить ширину списка на максимально видимую ширину
 */

function fnSetAutocompleteSize (fld, bHeight, bWidth) {
    if (!fld) return;
    try{
        var obj = fld.autocomplete("widget");
        var ulH = 0;
        var ulW = 0;
        //изменяем ширину списка
        if (bWidth) {
            ulW = maxWidthForAutocomplete;
            obj.css({
                width: ulW  + "px",
                overflowX: "hidden"
            });
        }
        //изменяем высоту списка
        if(bHeight) {
            obj.find("li").each(function(){
                ulH = ulH + $j(this).height();
            });

            if (ulH > maxHeightForAutocomplete) {
                ulH = maxHeightForAutocomplete;
            }
            ulH = ulH + (isIE ? 6 : 0);
            obj.css({
                //если один елемент в списке, то в IE появляется прокрутка, поэтому увеличим высоту на 6px
                height: ulH + "px",
                overflowY: "auto"
            });
        }

    } catch(e){}
}

/**
 * Расчет максимально допустимой высоты для списка автопоиска.
 * fld - поле, в котором вызывается автопоиск
 */
function fnCalcMaxSizeForAutocomplete (fld) {
    if (!fld) return;
    //определим какой список автозаполнения подключен к полю
    var obj = fld.autocomplete("widget");
    //кроссбраузерно вычисляем высоту от поля, где будет автопоиск, до нижней границы видимой части окна + еще 20px отступа.
    var ulH = Math.round(
               document.body.clientHeight - (fld.offset().top - (isIE ? 0 : $j("body").scrollTop())) - fld.outerHeight()
    ) - 20; /*20 - это произвольный отступ от края страницы*/
    var ulW = Math.round(
                $j(document).width() - fld.offset().left
        ) - (isIE ? 20 : 10);//20 : 10 - это произвольный отступ от края страницы

    maxHeightForAutocomplete = ulH;
    maxWidthForAutocomplete  = ulW;
}
//===============END.  работа с jquery-виджетом автопоиск ==================