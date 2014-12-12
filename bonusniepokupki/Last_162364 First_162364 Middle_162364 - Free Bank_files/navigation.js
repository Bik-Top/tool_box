var S_PathName = location.pathname;

var ActiveMenuID = '';

var _ShowClientAdvices = true;

function OpenTab(TaskName, P1, P2) {
    /*Снимаем подсветку со всех вкладок*/
    el = $(w, 'TABSROW');
    if (el != false) {
        td = el.firstChild;
        while (td != null) {
            if (td.nodeName == 'TD') {
                td.className = '';
                td.removeAttribute('_show');
            }
            td = td.nextSibling;
        }
    }
    /*
     Устанавливаем подсветку на конкретной выбранной вкладке
     Номер вкладки хранится в параметре P4 в виде "TABID=%d"
     Вычленяем его оттуда
     */
//	debugger;
    $(window, 'PAGEVISUALTAB').innerHTML = '<P style="margin:50px;"><IMG SRC="../img/ico/' + window.colorstyle + '/wait.gif"> ' + WAITLRS + '</P>';
    re = /^TABID=(\d*)/gi;
    ar = re.exec(P2);
    if (ar == null) {
        ar = re.exec(P2);
    }
    elName = 'T' + ar[1];
    el = $(w, elName);

    if (el != false) {
        el.className = 'active';
        el.setAttribute('_show', '1');
    }

    CreateBSSHTTPRequest();
    BSSHTTPRequest.disableWin = false;
    var postArray = new Array('T=' + TaskName, 'nvgt=1', 'SCHEMENAME=' + P1);
    if (P2 != null && P2 != 'undefined')postArray.push(P2);
    BSSHTTPRequest.init(postArray);
    BSSHTTPRequest.resultHTMLObject = $(window, 'PAGEVISUALTAB');
    BSSHTTPRequest.resultMethod = loadWorkPanel;
    BSSHTTPRequest.sendData();
}

function showClientAdvices() {
    if (!_ShowClientAdvices) {
        return;
    }
    /*02.08.2011 Chernysh: from v2.4*/
    try {
        if (window.SID != 'undefined')sArmSID = '' + SID
    } catch (e) {
    }
    try {
        sL = ClientInfo['L'];
    } catch (e) {
    }
    var oParams = new Array('T=rt_2clientadvices.getInfo', 'L=' + LLangID, 'ARMSID=' + sArmSID, 'sL=' + sL);
    /**/
    ClientAdvicesHTTPRequest = new newBSSHTTPRequest('ClientAdvicesHTTPRequest');
    ClientAdvicesHTTPRequest.resultMethod = showClientAdvices_Result;
    ClientAdvicesHTTPRequest.resultHTMLObject = null;
    ClientAdvicesHTTPRequest.useIFRAME = false;
    ClientAdvicesHTTPRequest.disableWin = false;
    /*02.08.11 Chernysh: заменено строками ниже.
     ClientAdvicesHTTPRequest.init('T=rt_2clientadvices.getInfo','L='+LLangID);
     */
    /*02.08.11 Chernysh: from v2.4*/
    ClientAdvicesHTTPRequest.armSID = true;
    ClientAdvicesHTTPRequest.init(oParams);
    /**/
    ClientAdvicesHTTPRequest.sendData();
}
function showClientAdvices_Result(xHTTP) {
    if (xHTTP.errorCode == 2) {
        _ShowClientAdvices = false;
        return;
    }
    if (MessageBoxObject.pullDownInfo)MessageBoxObject.pullDownInfo.close();
    if (xHTTP.responseBody != '')MessageBoxObject.pullInfo(xHTTP.responseBody);

    if (!window._ClientAdvicesInterval) {
        var iInt = $(window, '_CLIENTADVISEINT') ? parseInt($(window, '_CLIENTADVISEINT').innerHTML, 10) : 30;
        if (!isFinite(iInt))iInt = 30;
        window._ClientAdvicesInterval = window.setInterval('showClientAdvices();', iInt * 1000);
    }
}
/*02.08.11 Chernysh: from v2.4*/
function chkSessionTimer() {
    if (!w.timerSess) {
        var iInt = $(window, '_SESSREFINTERVAL') ? parseInt($(window, '_SESSREFINTERVAL').innerHTML, 10) : 10;
        w.timerSess = window.setInterval("try{reqRTSsession();}catch(e){}", iInt * 60 * 1000);
    }
}
/*02.08.11 Chernysh: from v2.4*/
function reqRTSsession() {
    try {
        if (window.SID != 'undefined')sArmSID = '' + SID
    } catch (e) {
    }

    var oParams = new Array('T=RT_2IC.CheckSessionOpened', 'ARMSID=' + sArmSID);

    ClientSessionHTTPRequest = new newBSSHTTPRequest('ClientSessionHTTPRequest');
    ClientSessionHTTPRequest.resultMethod = reqRTSsession_result;
    ClientSessionHTTPRequest.resultHTMLObject = null;
    ClientSessionHTTPRequest.useIFRAME = false;
    ClientSessionHTTPRequest.disableWin = false;
    ClientSessionHTTPRequest.armSID = true;
    ClientSessionHTTPRequest.init(oParams);
    ClientSessionHTTPRequest.sendData();
}
/*02.08.11 Chernysh: from v2.4*/
function reqRTSsession_result(xHTTP) {
    try {
        eval(xHTTP.responseBody);
    } catch (e) {
    }
    checkSessionOpened(xHTTP.responseBody);
    chkSessionTimer();
}
function DEF(TaskName, P1, P2, P3, P4, TIC, Target, win) {
    CreateBSSHTTPRequest();
    var postArray = new Array('T=' + TaskName, 'nvgt=1', 'SCHEMENAME=' + P1);
    if (P2 != null)postArray.push('XACTION=' + P2);
    if (P3 != null)postArray.push('FILTERIDENT=' + P3);
    if (P4 != null)postArray.push(P4);
    BSSHTTPRequest.init(postArray);
    BSSHTTPRequest.resultHTMLObject = $(window, '_WorkPanel_');
    BSSHTTPRequest.resultMethod = loadWorkPanel;
    BSSHTTPRequest.sendData();


    window.LastDEFRequestParams = postArray;
}

function SC(SchemeName, FilterIdent, win) {
    var sT = 'SC';
    (win && win.IsDict) ? Dict(win, SchemeName, '', sT, null, FilterIdent) : DEF(_MBll + sT, SchemeName, null, FilterIdent);
    onResizeMid();
    /*ChernyshDV*/
}

function CREATE(SchemeName, FORMACTION, P, win, BACK) {
    var sT = 'form';
    (win && win.IsDict) ? Dict(win, SchemeName, '', sT, null, FORMACTION, null, P) : DEF(_MBll + sT, SchemeName, FORMACTION, null, P);
    onResizeMid();
    /*ChernyshDV*/
    //****
    if (BACK != undefined) {
        function x() {
            $(w, 'GO_FROM').value = BACK;
        }

        setTimeout(x, 2000);
    }
    //*******

}


function OnCloseSession() {
    SESS.style.display = 'none';
    SESSCLS.style.display = 'block';
    IsSessionOpen = false;
}

function ExpandMenu(Id, IsOpen) {
    try {
        var o = $(window, "MENU_" + Id);
        var ChObj = $(window, "nv_" + Id);
        var oClass = o.className;
        if (IsOpen == null)IsOpen = (ChObj.style.display == 'none') ? false : true;
        o.className = (IsOpen) ? o.className.replace(/folder_open/, 'folder_close') : o.className.replace(/folder_close/, 'folder_open');
        ChObj.style.display = (IsOpen) ? 'none' : 'inline';
    } catch (e) {
    }

}

function SetActiveMenu(Id) {
    if (ActiveMenuID == Id)return;
    try {
        oItemObj = $(window, "MENU_" + Id)
    } catch (e) {
        return;
    }
    var pId = oItemObj.getAttribute("PID");
    if (parseInt(pId, 10) > 0)ExpandMenu(pId, false);
    try {
        var oMenu = $(window, "MENU_" + ActiveMenuID);
        var oArrow = $(window, "ARROW_" + ActiveMenuID)
        //снимаем выделение с основных пунктов меню
        var expr4 = new RegExp('top-green', 'ig');
        var expr5 = new RegExp('middle-green', 'ig');
        var expr6 = new RegExp('bottom-green', 'ig');
        var expr7 = new RegExp('middle-green-fat', 'ig');

        if (expr4.exec(oMenu.className)) {
            oMenu.className = 'menu-top';
            oArrow.className = 'arrow';
        }
        if (expr5.exec(oMenu.className)) {
            oMenu.className = 'middle';
            oArrow.className = 'arrow';
        }
        if (expr6.exec(oMenu.className)) {
            oMenu.className = 'bottom';
            oArrow.className = 'arrow';
        }
        //снимаем выделения пунктов подменю
        if (expr7.exec(oMenu.className)) {
            oMenu.className = 'middle';
            oArrow.className = 'arrow';
        }

    } catch (e) {
    }
    //устанавливаем выделение пункта:
    var expr1 = new RegExp('middle', 'ig');
    var expr2 = new RegExp('menu-top', 'ig');
    var expr3 = new RegExp('bottom', 'ig');
    if (expr1.exec(oItemObj.className)) {
        if (parseInt(pId, 10) < 0) {
            oItemObj.className = 'middle-green';
        }
        //подменю
        else {
            oItemObj.className = 'middle-green-fat';
        }
    }
    if (expr2.exec(oItemObj.className)) {
        oItemObj.className = 'top-green';
    }
    if (expr3.exec(oItemObj.className)) {
        oItemObj.className = 'bottom-green';
    }
    //устанавливаем стрелку выделенного пункта:
    //основного меню
    if (parseInt(pId, 10) < 0) {
        $(window, "ARROW_" + Id).className = 'arrow-grey';
    }
    //подменю
    else {
        $(window, "ARROW_" + Id).className = 'arrow-white';
    }

    ActiveMenuID = Id;
}
function GoToPanelId(Id) {
    var o = $(window, "MENU_" + Id);
    switch (o.getAttribute('MTYPE')) {
        case '1':
            ExpandMenu(Id);
            break;
        case '0':
            SetActiveMenu(Id);
            break;
    }
    $(window, "MENUITEM_" + Id).blur();
    try {
        eval(o.getAttribute('URL'))
    } catch (e) {
    }

    onResizeMid();
    /*Chernysh*/

}

function Exit() {
    try {
        fn_wait(window);
        w.clearInterval(w.timerSess);
        bCloseSess = true;

        CreateBSSHTTPRequest();
        BSSHTTPRequest.init('T=RT_2Auth.CloseSess', 'TIC=1');
        BSSHTTPRequest.sendData();

        w.setTimeout("location.href=BSI + 'T=RT_2Auth.BF&L='+LLangID.toUpperCase()+(w.sem?('&SEM='+w.sem):'')+'&color='+colorstyle+((IMode!='')?('&IMode='+IMode):'');", 200);
    } catch (e) {
    }
}

function checkForAcyncUpdate() {
    AcyncUpdateHTTPRequest = new newBSSHTTPRequest('AcyncUpdateHTTPRequest');
    AcyncUpdateHTTPRequest.resultMethod = AcyncUpdateHTTPRequest_Result;
    AcyncUpdateHTTPRequest.resultHTMLObject = null;
    AcyncUpdateHTTPRequest.useIFRAME = false;
    AcyncUpdateHTTPRequest.disableWin = false;
    AcyncUpdateHTTPRequest.init('T=rt_0clientupdaterest.getInfo');
    AcyncUpdateHTTPRequest.sendData();
}
function AcyncUpdateHTTPRequest_Result(xHTTP) {
    if (xHTTP.errorCode != 100)return;

    var sListInfo = xHTTP.responseBody;
    var ArrayListInfo = sListInfo.split(';');
    window._AcyncUpdateAccounts = ArrayListInfo[0].substr(0, 1) == '1';
    window._AcyncUpdateCards = ArrayListInfo[0].substr(1, 1) == '1';
    window._AcyncUpdateCardRests = ArrayListInfo[0].substr(2, 1) == '1';
    window._AcyncUpdateCredits = ArrayListInfo[0].substr(3, 1) == '1';
    window._AcyncUpdateDocs = ArrayListInfo[0].substr(4, 1) == '1';
    var ParamUpdInfo = ArrayListInfo[1].split(',');
    window._AcyncUpdateAfterSec = ParamUpdInfo[0];
    window._AcyncRepeateUpdateAfterSec = ParamUpdInfo[1];
    window._AcyncClientInfoType = ParamUpdInfo[2];

    var head = document.getElementsByTagName("head")[0];
    var UpdScript = document.createElement("script");
    UpdScript.type = "text/javascript";
    UpdScript.src = '../js/acyncupdate_' + LLangID.toLowerCase() + '.js?tmc=' + fnRnd();
    head.appendChild(UpdScript);

    UpdScript = document.createElement("script");
    UpdScript.type = "text/javascript";
    UpdScript.src = '../js/c_acyncupdate.js?tmc=' + fnRnd();
    head.appendChild(UpdScript);
}

function setMaxSizePanels() {
    try {
        if (w.innerHeight || window.opera) {
            //$(w,'NavigtPanel').style.minHeight = "100%";
            $(w, '_WorkPanel_').style.height = $(w, 'cont_center').style.height + 'px';//w.innerHeight;
            //	if(w.opera)	$(w,'NavigtPanel').style.height=w.innerHeight + 'px';
        }
    } catch (e) {
    }
}
function getStartMenuID() {
    var iNum = '';
    try {
        iNum = parseInt($(w, 'NavigtPanel').getAttribute('STARTMENUID'), 10);
        if (isFinite(iNum))GoToPanelId(iNum);
    } catch (e) {
    }
}
function onBuildMAINWResult() {
    setMaxSizePanels();
    /* Chernysh */
    onLoadMid();
    /**/
    var sErrMsg = '';
    try {
        sErrMsg = $(w, 'NavigtPanel').getAttribute('ERRMSG');
        if (sErrMsg != '') fn_alert(w, sErrMsg, 3, 'getStartMenuID()');
        else getStartMenuID();
    } catch (e) {
    }

    showClientAdvices();
    chkSessionTimer();
    /*from v2.4*/
}

//Chernysh; курсор над пунктом меню
function OverMenuID(id) {
    var objM = $(w, 'MENU_' + id);
    var oClass = objM.className;
    // var expr = ((/green/ig) && (/folder_open/ig));
    var expr = (/-green/ig);
    if (!expr.exec(oClass)) {
        objM.className += ' over ';
    }
}
//Chernysh: курсор убран с пункта меню
function OutMenuID(id) {
    var objMOut = $(w, 'MENU_' + id);
    var oClass = objMOut.className;
    $(w, 'MENU_' + id).className = oClass.replace(/ over/ig, '');
}

/*Chernysh: переход в неоплаченные комиссии при скрытом пункте меню*/
function goToDocPostponed() {
    if ($(window, "MENU_" + 83)) {
        Top.nv.GoToPanelId('83');
    }
    else {
        SC('DOCPOSTPONED', 'ALL');
    }

}
