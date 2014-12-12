var DivL = "", DivSel = "tr-s";

function dofnSortLnk(El, w) {
    var F = El.getAttribute('FLD');
    if (F != null)ReSort(w, F);
}

function InitFlds4GetScroll(w, PGN, RSRT, XA) {
    $(window, 'PAGENUMBER').value = PGN;
    $(window, 'RESORT').value = RSRT;
    try {
        $(window, 'XACTION').value = XA;
    } catch (e) {
    }
}

function ReSort(w, FLD) {
    $(window, 'T').value = _MBll + 'sc';
    InitFlds4GetScroll(w, 1, FLD, '');
    GetScrollData(w);
}

function GetParentTBL(el) {
    var TBL = el;
    do {
        TBL = TBL.parentNode
    } while (TBL.tagName != 'TABLE')
    return TBL;
}
function IsFirstRowEmpty(TBL) {
    return (TBL.getAttribute("firstrowempty") != null);
}
function getLSTR(TBL) {
    var LSTR = TBL.getAttribute("lstr");
    return ((LSTR == null) || (LSTR == '')) ? -1 : LSTR;
}

function setLSTR(LSTR, TBL) {
    TBL.setAttribute("lstr", LSTR);
}

function getTRC(TBL) {
    var TRC = TBL.getAttribute("trc");
    return TRC == null ? 0 : TRC;
}
function setTRC(TRC, TBL) {
    TBL.setAttribute("trc", TRC);
}
function getTRARR(TBL) {
    return TBL.getAttribute("trarr") || (new Array());
}
function setTRARR(TRARR, TBL) {
    TBL.setAttribute("trarr", TRARR);
}
//11.04.13 ChernyshDV: IE10 почему то не понимает метод item(). Тут и далее item использовать не будем, заменим на выборку из массива.
function getRowAttr(TBL, x) {
    try {
        var i = getLSTR(TBL), at = (i > -1) ? TBL.rows[i].getAttribute(x) : '';
    } catch (e) {
    }
    return ((at == null) ? '' : at);
}
function getIDRS(TBL) {

        return getRowAttr(TBL, "sidr");
}
function getLMSSTR(TBL) {
    var x = TBL.getAttribute(selT);
    return ((x != null) && (x.toString() != '')) ? x : -1;
}
function getMSIDRS(TBL) {
    var sR = getLMSSTR(TBL), oAr, iLR, sIDRS = '', TBLBR = TBL.tBodies[0].rows;
    try {
        oAr = sR.split(','), iLR = oAr.length
    } catch (e) {
        iLR = 0
    }
    if (iLR < 2)return (sR != '-1') ? TBLBR[parseInt(sR, 10)].getAttribute('SIDR') : '';
    for (var i = 0; i < iLR; i++) {
        if (sIDRS != '')sIDRS += ';';
        sIDRS += TBLBR[parseInt(oAr[i], 10)].getAttribute('SIDR');
    }
    return sIDRS;
}

function ClearSelection(TBL, bs) {
    var LastSelectedTR = getLSTR(TBL),
        TRArray = getTRARR(TBL);
    var RWS = TBL.rows, TRSelectCount = getTRC(TBL);
    //11.04.2013 ChernyshDV: IE10 некорректно работает с методом item
    if ((TRSelectCount == 1) && (RWS[LastSelectedTR] != null)) {
        RWS[LastSelectedTR].className = DivL;
        TRArray[LastSelectedTR] = false;
    }
    setLSTR(-1, TBL);
    setTRC(0, TBL);
    setTRARR(TRArray, TBL)
}

function TrOverOut(w, o, b) {
    var TBL = GetParentTBL(o);
    if ((w.IsScroller) && (w.onDCEval == ''))return;
    if (o.className == DivSel)return;
    TBL.setAttribute("ovr", o.rowIndex);
    o.className = b ? 'tr-a' : '';
}
//выделение одной строки таблицы
function SelectSingleRow(el) {
    var TBL = GetParentTBL(el),
        LastSelectedTR = el.rowIndex,
        TRArray = getTRARR(TBL);
    ClearSelection(TBL);
    el.className = DivSel;
    TRArray[LastSelectedTR] = true;
    setLSTR(LastSelectedTR, TBL);
    setTRC(1, TBL);
    setTRARR(TRArray, TBL)
}

function RemoveTRSelection(w, ScrollerIDToClearSelection) {
    try {
        w.event.cancelBubble = true;
    } catch (e) {
    }
    var oSCR = $(window, (ScrollerIDToClearSelection || 'SCROLLER'));
    if (oSCR != null) ClearSelection(oSCR);
}

//действие на событие onclick на строке таблицы
function TrCL(tr, w, evt) {
    if (w.onDCEval == '')return;
    evt.cancelBubble = true;
    var TBL = GetParentTBL(tr);
    try {
        if (IsFirstRowEmpty(TBL) && (TBL.tBodies[0].rows.length == null)) return;
    } catch (e) {
    }
    SelectSingleRow(tr);
    setLSTR(tr.rowIndex, TBL);
}

function TrDCL(tr, w, e) {
    if (w.onDCEval == '')return;
    try {
        if (w.iShowMessageType)return;
    } catch (e) {
    }
    e.cancelBubble = true;
    SelectSingleRow(tr);
    if (w.onDCEval != '') {
        var bResult = true;
        try {
            eval.call((w.IsDict ? w : mw), w.onDCEval)
        } catch (e) {
            bResult = false
        }
        try {
            if (!bResult)eval(w.onDCEval)
        } catch (e) {
            alert(e || e.description)
        }
    }
}

function GetScrollData(w) {
    ScroolToUp(w);
    $(window, 'TIC').value = '1';
    try {
        $(window, 'WSTATUS').value = $(window, 'SIGNDATA').value = '';
    } catch (e) {
    }
    try {
        RemoveTRSelection(w);
    } catch (e) {
    }
    CreateBSSHTTPRequest();
    BSSHTTPRequest.init(getFormElements('ScrollerForm'));
    BSSHTTPRequest.resultMethod = Check_ScrollData;
    BSSHTTPRequest.resultHTMLObject = $(window, 'ScrollBlock');
    BSSHTTPRequest.sendData();

}

function Check_ScrollData(xHTTP) {
    var iC = xHTTP.errorCode;
    if (iC > 0) {
        fn_alert(w, xHTTP.error);
    }
    else {
        //Chernysh: прижатие воттоm-menu к нижнему краю окна
        onResizeMid();
    }
}

function resetForm(wdf) {
    var oEL = wdf.elements, oIel;
    for (var i = 0; i < oEL.length; i++) {
        oIel = oEL[i];
        if (oIel.parentNode.tagName != 'PRE') {
            switch (oIel.type) {
                case 'select-one':
                    oIel.selectedIndex = 0;
                    break;
                case 'checkbox':
                    ;
                case 'radio':
                    oIel.checked = false;
                    break;
                default:
                    oIel.value = '';
                    break;
            }
        }
    }
}

function GoToPage(Page, w) {
    $(window, 'T').value = _MBll + 'sc';
    InitFlds4GetScroll(w, Page, '', '');
    GetScrollData(w);
}

function XFilter(ACTID, w) {
    if (ACTID == 'REMOVE') {
        resetForm(document.forms['ScrollerForm']);
        return;
    }
    if (!CheckMaskFields(w))return;
    if ((typeof(window.checkFilterData) == 'function' || typeof(window.checkFilterData) == 'object') && window.checkFilterData != false) {
        if (!(checkFilterData()))return;
    }

    $(window, 'T').value = _MBll + 'sc';
    InitFlds4GetScroll(w, 1, '', '');
    GetScrollData(w);

}


function ACTS(w, ACTID, Prm1, Prm2, SchemeName, vAddParam, DEL) {
    if (IsOpera) {
        if (event.preventDefault)event.returnValue = false
    }
    ACTID = ACTID.toUpperCase();
    var TBL = $(window, 'SCROLLER'), iRemoved, URL, shStr = '', sTsk = null, sActID = null;
    var bMultiSel = TBL.getAttribute('MULTISELECT') == '1';
    var sch = $(window, 'SCHEMENAME').value;
    $(w, 'XACTION').value = ACTID;
    var IDR = bMultiSel ? getMSIDRS(TBL) : getIDRS(TBL),
        iR = bMultiSel ? getLMSSTR(TBL) : getLSTR(TBL);
    try {
        $(window, 'SIGNDATA').value = '';
        $(window, 'WSTATUS').value = '';
    } catch (e) {
    }
    if (SchemeName && SchemeName != '')$(windoww, 'SCHEMENAME').value = SchemeName;
    if (sch == 'WEBCB_DOCUMENTS') {
        shStr = getMSSCHEMES(TBL);
        try {
            $(window, 'SCHEMESLIST').value = shStr
        } catch (e) {
        }
        ;
        sch = shStr;
    }


    if ((sch == 'DOCUMENTS') || (sch == 'REGULARPAYDOCS')) {
        shStr = getRowAttr(TBL, "tid");
        try {
            $(window, 'SCHEMESLIST').value = shStr
        } catch (e) {
        }
        ;
        sch = shStr;
    }

    var CustomScheme = getRowAttr(TBL, 'SCHEME');
    switch (ACTID) {
        case 'VIEW':
            ;
        case 'PRN':
            ;
        case 'DOCS_VIEW':
            ;
        case 'DOCS_PRN':
            $(window, 'TIC').value = '1';
            $(window, 'IDR').value = IDR;
            if (iR < 0)fnHlp(w)
            else {
                var USERKEY = null;

                if (ACTID == 'DOCS_VIEW' || ACTID == 'DOCS_PRN') {
                    sTsk = ( ($(window, 'SCHEMENAME').value == 'REGULARPAYDOCS') ? 'rt_2cdb_regularpaydocs' : 'rt_2cdb_documents') + '.Documents_View_Print';
                    sActID = (ACTID == 'DOCS_VIEW') ? 'VIEW' : 'PRN';
                    CustomScheme = sch;
                }
                ((ACTID == 'PRN') ? fnPrint(window, CustomScheme) : fnVIEW(window, sTsk, CustomScheme, sActID, USERKEY));
                wait_hide(window);
            }
            return;
        //для новой схемы период. платежей 
        case 'EDIT_REGULARPAY':
            if (IDR == '') {
                fnHlp(w);
                return;
            }
            //Изменять расписание только если регулярный платеж активен
            if (getRowAttr(TBL, 'st') != '412') {
                fn_alert(w, lRSDocs2, 3);
                return;
            }
            CustomScheme = sch; //цифровой код схемы
            nv.CREATE('RETCANCELREGULARPAY', 'NEW', 'DIDR=' + IDR + '&FROMSCHEME=' + CustomScheme);
            break;
        //Для новой схемы период. платежей: удаление автоматического платежа 
        case 'DEL_REGULARPAY':
            if (IDR == '') {
                fnHlp(w);
                return;
            }
            fn_confirm(w, (getRowAttr(TBL, 'st') == '412' ) ? LRS31 + LRS29 : LRS29, 3, LRS28, 'del');
            if (DEL == 'yes') {
                CustomScheme = sch;
                CreateBSSHTTPRequest();
                BSSHTTPRequest.init('T=RT_2RetCancelRegularPay.fnDelRegularPayDoc',
                    'DIDR=' + IDR,
                    'SCHEMENAME=' + $(window, 'SCHEMENAME').value,
                    'FROMSCHEME=' + CustomScheme);
                BSSHTTPRequest.resultMethod = fnOnDataResult;
                BSSHTTPRequest.sendData();
            }
            break;
        case 'NEW':
            ;
        case 'ADD':
            ;
        case 'EDIT_TPL':
            ;
        case 'EDIT':
            ;
        case 'CLIENTSRV':
            var _bn = ACTID == 'NEW';
            if (!_bn && (IDR == '')) {
                fnHlp(w);
                return;
            }
            var FirstIDR = IDR.split(';');
            /*****19.07.10 Черныш:*/
            //  nv.CREATE($(window,'SCHEMENAME').value,ACTID,(_bn?'':'IDR='+FirstIDR[0]),w);
            if ($(window, 'SCHEMENAME').value == 'DOCUMENTS') {
                var tid = getRowAttr(TBL, "tid");
                switch (tid) {
                    case '1138':
                        //D.Chernysh: если это не обмен бонусов тогда создаем док-т на основе
                        if (getRowAttr(TBL, "type") != '160') {
                            nv.CREATE(sch, ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w, 'DOCUMENTS');
                        }
                        else {
                            fn_alert(w, lRSDocs, 1);
                        }
                        break;
                    case '1701':
                        nv.CREATE(sch, ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w, 'DOCUMENTS');
                        break;
                    case '1207':
                        switch (getRowAttr(TBL, "puid")) {
                            // 183 - ГИВЦ,
                            // 326 - Киевгаз
                            case '183':
                                nv.CREATE('RETPUPAYKIEV', ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w, 'DOCUMENTS');
                                break;
                            case '326':
                                nv.CREATE('RETPUPAYKIEVGAZ', ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w, 'DOCUMENTS');
                                break;
                            case '327':
                                nv.CREATE('RETPUPAYKIEVENERGO', ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w, 'DOCUMENTS');
                                break;
                            case '439':
                                nv.CREATE('RETPUPAYKIEVGAZ', ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w, 'DOCUMENTS');
                                break;
                            case '432':
                            case '1758':
                                nv.SC('INFOCOMPAY');
                                break;
                            case '2148':
                                nv.CREATE('RETPUPAYKIEVNEW', ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w, 'DOCUMENTS');
                                break;
                            default   :
                                nv.CREATE(sch, ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w, 'DOCUMENTS');
                                break;
                        }
                        break;
                    case '1122':
                        if (getRowAttr(TBL, "type") == '3') {
                            nv.CREATE('RETPAYDOCRUCDB', ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w, 'DOCUMENTS');
                        }
                        else {
                            nv.CREATE(sch, ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w, 'DOCUMENTS');
                        }
                        break;
                    default:
                        fn_alert(w, lRSDocs, 1);
                        break;
                }
            }
            else {
                if ($(window, 'SCHEMENAME').value == 'RETPAYDOCRU' || $(window, 'SCHEMENAME').value == 'RETPAYDOCRUCDB') {
                    switch (getRowAttr(TBL, "ptc")) {
                        case '3':
                            nv.CREATE('RETPAYDOCRUCDB', ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w);
                            break;
                        default:
                            nv.CREATE('RETPAYDOCRU', ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w);
                            break;
                    }
                }
                else if ($(window, 'SCHEMENAME').value == 'RETPUPAYONETIME' && getRowAttr(TBL, "pid") === "2148"){
                    nv.CREATE("RETPUPAYKIEVNEW", ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w);
                } else {
                    nv.CREATE($(window, 'SCHEMENAME').value, ACTID, (_bn ? '' : 'IDR=' + FirstIDR[0]), w);
                }
            }
            /**********/

            return;
        case 'CHK':
            if (IDR == '') {
                fnHlp(w);
                return;
            }
            $(window, 'TIC').value = '1';
            $(window, 'IDR').value = IDR;
            $(window, 'T').value = _MBll + 'InsDict';

            CreateBSSHTTPRequest();
            BSSHTTPRequest.init(getFormElements('ScrollerForm'));
            BSSHTTPRequest.resultMethod = fnOnDataResult;
            BSSHTTPRequest.sendData();

            return;
        case 'DEL':
            if (IDR == '') {
                fnHlp(w);
                return;
            }
            fn_confirm(w, LRS30, 1, LRS28, 'del');
            if (DEL == 'yes') {
                $(window, 'TIC').value = '1';
                $(window, 'IDR').value = IDR;
                $(window, 'T').value = _MBll + 'del';
                GetScrollData(w);
            }
            return;
        case 'CHNSTATUS':
            ;
        case 'VIEWFLAG':
            if (IDR == '') {
                fnHlp(w);
                return;
            }
            fn_wait(w, true);
            w.CNTRow = iR;
            var arParams = new Array(
                'T=' + _MBll + 'sc_STATUS',
                'XACTION=' + ACTID,
                'IDR=' + IDR,
                'WSTATUS=' + Prm1,
                'SCHEMENAME=' + (CustomScheme ? CustomScheme : $(window, 'SCHEMENAME').value));
            CreateBSSHTTPRequest();
            BSSHTTPRequest.init(arParams);
            BSSHTTPRequest.resultMethod = fnOnDataResult;
            BSSHTTPRequest.sendData();

            return;
        case 'TPL':
            if (IDR == '') {
                fnHlp(w);
                return;
            }
            fn_wait(w, true);
            $(window, 'TIC').value = '1';
            $(window, 'IDR').value = IDR;
            $(window, 'T').value = _MBll + 'sc_to_template';
            CreateBSSHTTPRequest();
            BSSHTTPRequest.init(getFormElements('ScrollerForm'));
            BSSHTTPRequest.resultMethod = fnOnDataResult;
            BSSHTTPRequest.sendData();
            break;
        case 'PRNSC':
            if (TBL.rows.length <= 0) {
                fn_alert(w, LRS24, 3);
                return;
            }
            fnVIEW(w, _MBll + 'PRN_SCROLLER&FILTERIDENT=' + $(window, 'FILTERIDENT').value + '&PAGENUMBER=' + $(window, 'PAGENUMBER').value + '&RESORT=' + $(window, 'RESORT').value, SchemeName, 'PRNSC');
            return;
        case 'DO_REASON_OPER':
            if (IDR == '') {
                fnHlp(w);
                return;
            }
            Dict(w, 'webcb_reasonoperation', null, 'form', null, 'NEW', null, 'IDRS=' + IDR + '&OPER=' + Prm1 +
                '&SCHEMESLIST=' + shStr);
            return;
        case 'DO_OPER':
            var el_to_send;
            if (IDR == '') {
                fnHlp(w);
                return;
            }
            $(window, 'TIC').value = '1';
            $(window, 'IDR').value = IDR;
            $(window, 'T').value = 'rt_webcb_02core.doOperation';

            CreateBSSHTTPRequest();
            el_to_send = getFormElements('ScrollerForm');
            el_to_send.push('OPER=' + Prm1);

            if (Prm1 == 'CancelDoc') {
                if ($(w, 'REASON').value == '') {
                    fn_alert(w, LRSChecks43, 2, $(w, 'REASON'));
                    break;
                } else {
                    el_to_send.push('IDR=' + IDR);
                    el_to_send.push('REASON=' + $(w, 'REASON').value);
                }
                //ExitDict(w);
            } else el_to_send.push('SCHEMENAME=' + sch);
            BSSHTTPRequest.init(el_to_send);
            BSSHTTPRequest.resultMethod = fnOnDataResult;
            BSSHTTPRequest.sendData();
            break;
        case 'DO_KVIT':
            fn_wait(w, true);
            var TBL = $(window, 'SCROLLER'), oRS = TBL.tBodies[0].rows, iRL = oRS.length, oR, RIDR = '';
            if (iRL > 0) {
                for (var i = 0; i < iRL; i++) {
                    oR = oRS[i];
                    RIDR = RIDR + oR.getAttribute('SIDR') + ';';
                }
            }
            $(window, 'TIC').value = '1';
            $(window, 'IDR').value = RIDR;
            $(window, 'T').value = 'rt_webcb_02core.RefreshDocStatus';

            CreateBSSHTTPRequest();
            el_to_send = getFormElements('ScrollerForm');
            el_to_send.push('SCHEMENAME=' + sch);
            BSSHTTPRequest.init(el_to_send);
            BSSHTTPRequest.resultMethod = fnOnDataResult;
            BSSHTTPRequest.sendData();
            break;
        default:
            fn_alert(w, LRSscr3 + ACTID, 4);
            return;
    }
//    PostData(w,'fnOnDataResult')
}

function fnOnDataResult(xHTTP) {
    wait_hide(window);
    if (!xHTTP)return;
    var iC = xHTTP.errorCode;
    if (iC == 110)fn_alert(w, xHTTP.error, null, 'GetScrollData(window)')
    else if (iC == 105) {
        ExitDict(w);
        fn_alert(w, xHTTP.error);
    }
    else if (iC > 0)fn_alert(w, xHTTP.error);
    if ((iC > 0) && (iC < 10))return;
    var ACTID = $(window, 'XACTION').value, TBL = $(window, 'SCROLLER');
    $(window, 'TIC').value = xHTTP.Tic;
    switch (ACTID) {
        case 'CHK':
            ExitDict(w);
            //xHTTP.updateData(mw);
            break;
        case 'TPL':
            fn_alert(w, LRS8t, 5);
            $(window, 'STATUS').value = sST_NEW;
            break;
        case 'CHNSTATUS':
            ;
        case 'VIEWFLAG':
            ;
        case 'DEL_REGULARPAY':
            GetScrollData(window);
            break;
        case 'DO_OPER':
            ;
        case 'DO_KVIT':
            ;
        case 'CUSTDEL':
            ;

            break;
        default:
            break;
    }
}

function RefreshRestByClient(w) {

    fn_wait(w, true);
    var el_to_send;
    $(window, 'TIC').value = 1;
    $(window, 'SID').value = SID;

    CreateBSSHTTPRequest();
    if ($(window, 'SCHEMENAME').value != 'COMMPAGE') el_to_send = getFormElements('ScrollerForm');
    else el_to_send = getFormElements('DocumentForm');
    el_to_send.push('T=RT_0ClientUpdateRest.RefreshRest');
    BSSHTTPRequest.init(el_to_send);
    BSSHTTPRequest.resultMethod = on_RefreshRest_result;
    BSSHTTPRequest.sendData();
}
function on_RefreshRest_result(xHTTP) {
    wait_hide(w);
    if (!xHTTP)return;
    var iC = xHTTP.errorCode;
    if (iC > 0) fn_alert(w, xHTTP.error);
    if ((iC > 0) && (iC < 10))return;
    var TaskName, P1, P2, P3, wdf = w.df;
    if ($(window, 'SCHEMENAME').value != 'COMMPAGE') {
        InitFlds4GetScroll(w, 1, '', '');
        GetScrollData(w);
    } else nv.GoToPanelId('29');
}
function RefreshScroller(w) {
    InitFlds4GetScroll(w, 1, '', '');
    GetScrollData(w);
}
//********** 14/07/10 
function RefreshDocuments(w) {
    fn_wait(w, true);
    var el_to_send;
    CreateBSSHTTPRequest();
    el_to_send = getFormElements('ScrollerForm');
    el_to_send.push('T=CDB_UpdateDocuments.RefreshDocuments');
    BSSHTTPRequest.init(el_to_send);
    BSSHTTPRequest.resultMethod = on_RefreshDocuments_result;
    BSSHTTPRequest.sendData();
}
function on_RefreshDocuments_result(xHTTP) {
    wait_hide(w);
    if (!xHTTP)return;
    var iC = xHTTP.errorCode;
    if (iC > 0) fn_alert(w, xHTTP.error);
    if ((iC > 0) && (iC < 10))return;
    InitFlds4GetScroll(w, 1, '', '');
    GetScrollData(w);
}
//******************************************

//**********
var selT = '_sel_rows';

function getMSVAL(TBL, V) {
    var sR = getLMSSTR(TBL), oAr, iLR, sVAL = '', TBLBR = TBL.tBodies[0].rows;
    try {
        oAr = sR.split(','), iLR = oAr.length
    } catch (e) {
        iLR = 0
    }
    if (iLR < 2)return (sR != '-1') ? TBLBR[parseInt(sR, 10)].getAttribute(V) : '';
    for (var i = 0; i < iLR; i++) {
        if (sVAL != '')sVAL += ';';
        sVAL += TBLBR[parseInt(oAr[i], 10)].getAttribute(V);
    }
    return sVAL;
}

function getMSSCHEMES(TBL) {
    var sR = getLMSSTR(TBL), oAr, iLR, sSchemes = '', TBLBR = TBL.tBodies[0].rows;
    try {
        oAr = sR.split(','), iLR = oAr.length
    } catch (e) {
        iLR = 0
    }
    if (iLR < 2)return (sR != '-1') ? TBLBR[parseInt(sR, 10)].getAttribute('TID') : '';
    for (var i = 0; i < iLR; i++) {
        if (sSchemes != '')sSchemes += ';';
        sSchemes += TBLBR[parseInt(oAr[i], 10)].getAttribute('TID');
    }
    return sSchemes;
}
function isMRowSel(TBL, iR) {
    var b = false;
    try {
        var sA = TBL.getAttribute(selT);
        if (sA == null)TBL.setAttribute(selT, '');
        sA = TBL.getAttribute(selT).toString();
        re = new RegExp('(^' + iR + '$)|(^' + iR + ',)|(,' + iR + ',)|(,' + iR + '$)', 'ig');
        b = sA.match(re) ? true : false;
    } catch (e) {
    }
    return b;
}
function clearTR_MULT_ARR(TBL, iR) {
    try {
        var sA = TBL.getAttribute(selT);
    } catch (e) {
    }
    if ((sA == null) || (sA.toString() == ''))return;
    sA = sA.toString(), sR = iR.toString();
    var re = new RegExp('(^' + sR + '$)|(^' + sR + ',)|(,' + sR + '$)', 'ig');
    sA = sA.replace(re, '');
    re = new RegExp('(,' + iR + ',)', 'ig');
    sA = sA.replace(re, ',');
    TBL.setAttribute(selT, sA);
}
function setTR_MULT_ARR(TBL, iR) {
    try {
        x = TBL.getAttribute(selT);
    } catch (e) {
    }
    if (!isMRowSel(TBL, iR))TBL.setAttribute(selT, (((x == null) || (x.toString() == '')) ? iR : (x + ',' + iR)));
}
function TrMultiCL(tr, w, sel) {
    var TBL = GetParentTBL(tr);
    try {
        if (TBL.tBodies[0].rows.length == 0)return;
    } catch (e) {
    }
    var iR = tr.sectionRowIndex;
    bS = (sel == null) ? (isMRowSel(TBL, iR) || false) : (sel == 1);
    tr.className = bS ? DivL : DivSel;
    /* tr.cells.item(1): 1 - номер колонки табл, где разположен input, первая колонка 0*/
    tr.cells[1].getElementsByTagName('INPUT')[0].checked = !bS;
    bS ? clearTR_MULT_ARR(TBL, iR) : setTR_MULT_ARR(TBL, iR);
}
function TrMultiCLAll(w, obj, ex) {
    var b = obj.checked;
    var TBL = GetParentTBL(obj), oR = TBL.tBodies[0].rows, iRL = oR.length;
    if (iRL < 1)return;
    for (var i = 0; i < iRL; i++) {
        if (i != ex)   TrMultiCL(oR[i], w, (b ? 0 : 1));
    }
}
function ClearAndMSel(w, obj, e) {
    var src = e.target || e.srcElement;
//       if(src.type!='checkbox')TrMultiCLAll(w,obj,obj.sectionRowIndex);
    TrMultiCL(obj, w);
}

c_scroller_js = true;
//version 2013.05.30