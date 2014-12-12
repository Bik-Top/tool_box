/**
 * Диспетчер запросов. Получение кроссбраузерного объекта запроса.
 *
 * Пример вызова функции:
 * Top.dspReq(S_PathName + URL, '', false, true, 'PResFunc',w);
 *
 * @param path URL
 * @param xml xml, если необходимо передать данные на сервер методом "POST"
 * @param meth метод запроса. Если false, по умолчанию "GET"
 * @param asy асинхронность запроса. По умолчанию true
 * @param func  имя функции обработки пришедшего ответа для отображенния данных
 * @param w объект окна
 */
function dspReq(path, xml, meth, asy, func, w) {
    var method = (meth) ? meth : "GET", async = (asy == false) ? false : true;
    var xmlHTTP = getXmlHttp();
    try {
        xmlHTTP.open(method, path, async, "", "");
    } catch (e) {
    }

    function onRSChange() {
        if (xmlHTTP.readyState == 4) {
            var rStatus = xmlHTTP.status, rHeaders = xmlHTTP.getAllResponseHeaders();
            xmlHTTP.onreadystatechange = new Function('');
            if (rStatus == 200) {
                try {
                    eval('Top.' + func + '(w,xmlHTTP.responseText)');
                } catch (e) {
                }
            }
            xmlHTTP = null;
            xml = null;
        }
    }

    xmlHTTP.onreadystatechange = onRSChange;
  //xmlHTTP.setRequestHeader("XMLHTTP","1");
    xmlHTTP.setRequestHeader("Content-Type", "text/html");
    xmlHTTP.send(xml);
}

/* функция - пример, использовалась для теста*/
function PResFunc(w, html, Func) {
    mw.document.body.innerHTML = html;
    w._iPostResponse = 0;
    w.clearInterval(w.HTTPInterval);
    /*if(Func!=='')w.HTTPInterval=w.setInterval("Top.onReadyData(w,'"+Func+"')",1000);*/
}

/*
 ==================================================================
 XML HTTP Request module
 ==================================================================
 */
var _gPOST_FRAME = "_POST_FRAME_";
var BSSReqIFRAME;
var _gPOSTMETHOD = "POST";
var _gGETMETHOD = "GET";

function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

/**
 * Функция для асинхронного обновления полей по результату с сервера.
 * @param xmlDoc XML структура ответа с сервера.
 */
function dpUpdateData(xmlDoc) {
    if (xmlDoc == null) {
        return;
    }

    var oNodes, sValue, sName, o, sTagName;
    try {
        oNodes = xmlDoc.selectNodes('//I');
    } catch (e) {
    }
    if (!oNodes) {
        oNodes = xmlDoc.getElementsByTagName('I');
    }
    var iCount = oNodes.length,
        i;
    for (i = 0; i < iCount; i++) {
        sValue = oNodes[i].textContent || oNodes[i].text;
        sName = oNodes[i].getAttribute('N').replace('LIST!_!', '');
        if (!sValue || sValue == 'undefined') {sValue = ''; }
        if (sName && sName != 'undefined') {
            o = $(w, sName);
            sTagName = o.tagName;
            if (sTagName == 'SELECT' && oNodes[i].getAttribute('N').indexOf('LIST!_!') != -1) {
                updateSelectOptions(w, o, sValue);
            } else if (sTagName == 'INPUT' || sTagName == 'TEXTAREA') {o.value = sValue;}
            else if (sTagName == 'TD') {
                o = $(w, 'SCROLLER');
                if (o.tagName != 'TABLE') {return;}
                var sAt = oNodes[i].getAttribute('IDR');
                for (var g = 0; g < o.rows.length; g++) {
                    var oR = o.rows.item(g);
                    if (oR.getAttribute('SIDR') != sAt){continue;}
                    var oC = oR.cells;
                    for (var j = 0; j < oC.length; j++) {
                        if (oC.item(j).id != '') {
                            try {
                                if (oC.item(j).id == sName) {
                                    oC.item(j).innerHTML = (sValue == '') ? '&nbsp;' : sValue;
                                }
                            } catch (e) {
                            }
                        }
                    }
                }
            } else {
                o.innerHTML = sValue;
            }
        }
    }

}

function newXMLObject(inXML) {
    var xmlDoc = null;
    inXML = '<?xml version="1.0" encoding="windows-1251"?>' + inXML;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.loadXML(inXML);
    } else {
        xmlDoc = new DOMParser().parseFromString(inXML, "text/xml");
    }
    return xmlDoc;
}

function BSSHTTPResponse() {

    var re = new RegExp("<BSS_ERROR>.*</BSS_ERROR>", "ig");
    var respBody = arguments[1];
    var errText = re.exec(respBody);
    if (errText) {
        errText = errText.toString();
        errText = errText.replace(/bss_error/g, 'BSS_ERROR');
        respBody = respBody.replace(re, '');
        errText = errText.toString();
        errText = errText.replace('<BSS_ERROR>', '').replace('</BSS_ERROR>', '');
    }
    this.errorCode = arguments[0];
    this.error = errText;
    var updateObj = null;
    re = new RegExp("<UPDATEDATA>.*</UPDATEDATA>", "ig");
    var strXML = re.exec(respBody);
    if (strXML != '' && strXML != null) {
        strXML = strXML.toString();
        strXML = strXML.replace(/<i n/g, '<I N').replace(/\/i/g, '/I');
        var xmlDoc = newXMLObject(strXML);
        if (xmlDoc != null) {
            updateObj = xmlDoc;
            respBody = respBody.replace(re, '');
        }
    }
    if (updateObj) {dpUpdateData(updateObj);}
    if (isNaN(this.errorCode)) {this.errorCode = 0;}
    this.responseBody = respBody;
    this.responseHTMLObj = arguments[2];

}

function onResultBSMethos() {

    var initBSSHTTPObject = this.getReqObject();

    if (initBSSHTTPObject.HTTPObject.readyState != 4) {return;}
    var rStatus = initBSSHTTPObject.HTTPObject.status, rHeaders = initBSSHTTPObject.HTTPObject.getAllResponseHeaders(), resTxt = '';
    var iErrCode = parseInt(initBSSHTTPObject.HTTPObject.getResponseHeader('ERRCODE'), 10);

    var xHTTPResponse = new BSSHTTPResponse(
        iErrCode,
        initBSSHTTPObject.HTTPObject.responseText,
        initBSSHTTPObject.resultHTMLObject);

    resTxt = xHTTPResponse.responseBody;
    if (initBSSHTTPObject.resultHTMLObject) {
        if (initBSSHTTPObject.resultHTMLObject == window) {window.document.write(resTxt);}
        else {
            initBSSHTTPObject.resultHTMLObject.innerHTML = resTxt;
            checkSessionOpened(resTxt);
            try {
                showAcyncInfo();
            } catch (e) {
            }
        }
        //if( initBSSHTTPObject.resultHTMLObject==$(window,'_WorkPanel_') )loadWorkPanel();
    }

    if (initBSSHTTPObject.disableWin) {
        if (BOX_STATUS == 0) {DSBForm(w, false);}
        wait_hide(w);
    }
    /*02.08.11 Chernysh: from v2.4
     Heading check on errors from RTS, BSI
     RTS: RCode=-1; BSI: RCode=-2;
     */
    var RCode = 0;
    try {
        RCode = parseInt(initBSSHTTPObject.HTTPObject.getResponseHeader('RCode'), 10);
    } catch (e) {
    }
    if ((RCode == -1) || (RCode == -2)) {
        //ChernyshDV: Если ошибка "Error on receive buffer from RTS..." это код -2. Покажем читабельное сообщение.
        if (RCode === -2) {
            resTxt = LRS32;
        }
        try {
            $(window, '_WorkPanel_').innerHTML = "<div style='margin-top: 100px;'>" +
                                                   "<div align='center'>" +
                                                     "<div id='RTSError' style='position:relative; margin-top:50px;'>" +
                                                       "<p>" + resTxt + "</p>" +
                                                       "</div>" +
                                                     "</div>" +
                                                   "</div>";
            checkSessionOpened(resTxt);
        } catch (e) {
        }
        return;
    }
    /**/

    if (initBSSHTTPObject.resultMethod) {
        initBSSHTTPObject.resultMethod(xHTTPResponse);
    }
}

/**
 * Инициализация нового BSSHTTP-запроса к серверу
 * @param objName 'BSSHTTPRequest'
 */
function newBSSHTTPRequest(objName) {

    this.objectName = objName;

    this.getName = function () {
        return this.objectName;
    };

    this.getReqObject = function () {
        var rObj = null;
        try {
            rObj = eval.call(window, this.objectName);
        } catch (e) {
        }
        try {
            if (!rObj) {
                rObj = eval(this.objectName);
            }
        } catch (e) {
        }

        return rObj;
    };
    if (!$(window, _gPOST_FRAME)) {
        var oIF = window.document.createElement('IFRAME');
        oIF.style.display = 'none';
        oIF.id = _gPOST_FRAME;
        oIF.name = _gPOST_FRAME;
        oIF.setAttribute('name', _gPOST_FRAME);
        oIF.src = '../null_russian.htm';
        window.document.body.appendChild(oIF);
        BSSReqIFRAME = window.frames[window.frames.length - 1];
        if (self.frames[_gPOST_FRAME].name != _gPOST_FRAME) {
            self.frames[_gPOST_FRAME].name = _gPOST_FRAME;
        }
    }

    this.init = function () {
        var Args = arguments;
        if (arguments.length < 1) {return;}
        var queryArray = (typeof(arguments[0]) == 'object') ? arguments[0] : arguments;
        if (this.useIFRAME){
            this.initFORM(queryArray);
        } else {
            this.initAjax(queryArray);
        }
    };

    this.newInpuEl = function (xName, xVal) {
        var oI = BSSReqIFRAME.document.createElement('INPUT');
        oI.name = xName;
        oI.id = xName;
        var isFile = (xName.substr(0, 10) == 'FILE_NAME_');
        oI.type = isFile ? 'file' : 'text';
        if (!isFile) {
            oI.value = decodeURIComponent(xVal);
        }
        return oI;
    };
    this.initFORM = function (queryArray) {
        var i;
        if (this.method == _gGETMETHOD) {
            try {
                if (window.SID != 'undefined') {
                    queryArray.push('SID=' + SID);
                }
            } catch (e) {
            }
            var sReq = '';
            for (i = 0; i < queryArray.length; i++) {
                sReq += queryArray[i].replace(/:=/g, '=');
                if (sReq != ''){
                    sReq += '&';
                }
            }
            BSSReqIFRAME.location.href = 'bsi.dll?' + sReq;
        } else {
            BSSReqIFRAME.document.body.innerHTML = '';
            var xForm = BSSReqIFRAME.document.createElement('FORM');
            xForm.encoding = 'multipart/form-data';
            xForm.method = _gPOSTMETHOD;
            xForm.action = ScriptPath;
            var Ar;
            try {
                if (window.SID != 'undefined') {
                    xForm.appendChild(this.newInpuEl('SID', SID));
                }
            } catch (e) {
            }

            for (i = 0; i < queryArray.length; i++) {
                Ar = queryArray[i].split('=');
                xForm.appendChild(this.newInpuEl(Ar[0], Ar[1]))
            }
            BSSReqIFRAME.document.body.appendChild(xForm);
        }
    };
    this.initAjax = function (queryArray) {
        this.reqBody = '';
        /*
         try{if(window.SID!='undefined')this.reqBody='SID='+SID+'&tic=1';}catch(e){}
         */
        /*02.08.11 Chernysh: from v2.4*/
        if (!this.armSID) {
            try {
                if (window.SID != 'undefined'){
                    this.reqBody = 'SID=' + SID + '&tic=1';
                }
            } catch (e) {
            }
        } else {
            this.reqBody = '&tic=1';
        }
        /**/
        if (this.reqBody == ''){
            this.reqBody = 'tic=0';
        }
        for (var i = 0; i < queryArray.length; i++) {
            if (this.reqBody != ''){
                this.reqBody += '&';
            }
            this.reqBody += queryArray[i];
        }
        this.actionURL = BSI;
        this.method = _gPOSTMETHOD;
    };
    this.sendData = function () {
        if (this.disableWin) {
            DSBForm(w, true);
            fn_wait(w, this.waitAnswerMessage);
        }
        if (this.useIFRAME) {
            if (this.method != _gGETMETHOD)BSSReqIFRAME.document.forms[0].submit();
            window.BSSReqIFRAMEInt = window.setInterval("checkForLoadingIFRAME(" + this.getName() + ")", 1000);
            return;
        }
        this.HTTPObject = new getXmlHttp();
        this.HTTPObject.open(this.method, this.actionURL, true, "", "");
        this.HTTPObject.setRequestHeader("BSSHTTPRequest", "1");
        this.HTTPObject.setRequestHeader("Accept-Language", "ru, en");
        this.HTTPObject.setRequestHeader("Accept-Charset", "windows-1251");
        this.HTTPObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');
        this.HTTPObject.send(this.reqBody);
        this.HTTPObject.onreadystatechange = new Function('onResultBSMethos.apply(' + this.getName() + ', arguments)');
    }

}
function checkForLoadingIFRAME(xReq) {
    try {
        //ChernyshDV: IE не как все браузеры, у него то после загрузки файла readyState=='interactive'
        //if(BSSReqIFRAME.document.readyState=='complete' || BSSReqIFRAME.response){
        if (BSSReqIFRAME.document.readyState == 'complete' || BSSReqIFRAME.document.readyState == 'interactive' || BSSReqIFRAME.response) {
            window.clearInterval(window.BSSReqIFRAMEInt);
            var evalErrCode = '', respBody = BSSReqIFRAME.document.getElementById('RESPONSETEXT') ? BSSReqIFRAME.document.getElementById('RESPONSETEXT').innerHTML : '';
            if (BSSReqIFRAME.document.body.getAttribute('ERRCODE'))evalErrCode = BSSReqIFRAME.document.body.getAttribute('ERRCODE');
            var iErrCode = isFinite(evalErrCode) ? parseInt(evalErrCode, 10) : 0;
            if (xReq.disableWin) {
                DSBForm(w, false);
                wait_hide(w);
            }

            xReq.resultMethod(new BSSHTTPResponse(
                iErrCode,
                respBody,
                xReq.resultHTMLObject)
            );
        }
    } catch (e) {
    }
}

/**
 * Функция создания BSSHTTP запроса.
 */
function CreateBSSHTTPRequest() {
    BSSHTTPRequest = null;
    BSSHTTPRequest = new newBSSHTTPRequest('BSSHTTPRequest');
    BSSHTTPRequest.resultMethod = null;
    BSSHTTPRequest.resultHTMLObject = null;
    BSSHTTPRequest.useIFRAME = false;
    BSSHTTPRequest.disableWin = true;
    BSSHTTPRequest.method = _gPOSTMETHOD;
    BSSHTTPRequest.waitAnswerMessage = WAITLRS;
}
var BSSHTTPRequest = null;

c_xmlhttp_js = true;