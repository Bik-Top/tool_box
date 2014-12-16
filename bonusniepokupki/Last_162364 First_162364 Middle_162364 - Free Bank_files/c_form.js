var sFId = 'FileFrame';

function AuthForceSave() {
    if (!$(window, 'ForceSave'))return false;
    return ($(window, 'ForceSave').value == '1');
}
function getStepSaveForm() {
    if (!$(window, 'ISStepSaveForm'))return false;
    return ($(window, 'ISStepSaveForm').value == '1');
}
function getStepNum() {
    return parseInt($(window, 'iiStepSaveForm').value, 10);
}

function getDBOClientSign(w) {
    try {
        var oSt = window.document.getElementsByName('SIGNTYPE');
        for (var i = 0; i < oSt.length; i++) {
            if (oSt[i].checked)return oSt[i].value;
        }
    } catch (e) {
        return('0');
    }
}
function IsReadyState(Obj, oInt) {
    result = 2;
    if (!Obj) {
        clearInterval(oInt);
        return(result);
    }
    Rst = Obj.readyState;
    if (Rst == 4) {
        clearInterval(oInt);
        var s = (typeof(Obj.LastError) == 'undefined') ? 1 : Obj.LastError;
        R = (s) ? 0 : 1;
        result = (!R) ? 1 : 0;
    }
    return(result);
}

function check_client_AX(w) {
    var result = 0;
    try {
        result = IsReadyState($(w, 'AXSigner'), window.ogIntOCX);
    } catch (e) {
        result = 1;
        window.clearInterval(window.ogIntOCX);
    }
    if (result == 2)return;
    if (result == 1) {
        fn_alert(w, LRSLoad4, 3);
        window.clearInterval(window.ogIntOCX);
    } else {
        window.clearInterval(window.ogIntOCX);
        window._LoadOCXOK = true;
        if (window._gbLightFront) {// && $(window,'SIGNTYPE')
            ACTF(window, (window.IsEdit ? 'POSTDATA' : 'POSTAUTH_SIGN'));
        } else {
            if ($(window, 'SCHEMENAME').value == 'MODIFYCRYPTOPARAMS') {
                setSignDrive(w);
                DSBForm(w, false);
                wait_hide(w);
            }
        }
    }
}
function SignSetup(w, sUID) {
    var res = true;

    if (!isIE) {
        fn_alert(w, LRSign2, 2);
        res = false;
        NOAX = 1;
        return res;
    }
    window._LoadOCXOK = false;
    if ($(w, 'AXSigner')) {
        $(w, 'AXSigner').XMLSignConfig = "bsi.dll?T=RT_2IC.GetSignCFG&SID=" + SID + "&tms=" + fnRnd();
        window.ogIntOCX = window.setInterval("check_client_AX(window);", 100);
        //  ACTF(w,(window.IsEdit ? 'POSTDATA':'POSTAUTH_SIGN'));
        return res;
    }
    DSBForm(w, true);
    fn_wait(w, AuthLRS14);
//  window._LoadOCXOK=false;
    var oWinLoc = window.document.location, sWinPath = oWinLoc.protocol + '//' + oWinLoc.host + '/';
    var sPrm;
    if (sUID == '') sPrm = '<PARAM NAME="XMLSignConfig" VALUE="bsi.dll?T=RT_2IC.GetSignCFG&SID=' + SID + '" ></PARAM>';
    else sPrm = '<PARAM NAME="XMLSignConfig" VALUE="bsi.dll?T=RT_2IC.GetSignCFG&SID=' + SID + '&REGEN=1&CryptoUID=' + sUID + '" ></PARAM>';
    var sOCXXml = '<PRE><OBJECT ID="AXSigner" WIDTH=0 HEIGHT=0 CLASSID="CLSID:AD445BC2-39DF-4A05-8CC5-389FB44B595C" style="display:none;" ' +
        'codebase="' + (window.OCXCODEBASE || (sWinPath + $(w, 'CodeBase').value)) + '#version=' + (window.OCXVERSION || $(w, 'CryptoVersion').value) + '">' +
        '<PARAM NAME="DestLocation" VALUE="' + (window.OCXServerName || $(w, 'ServerName').value) + '"></PARAM>' +
        sPrm +
        '<PARAM NAME="InputsFrame" VALUE="RT_IC_MAINW"></PARAM>' +
        '<PARAM NAME="decodedXML" VALUE="true"/>' +
        '<PARAM NAME="ShowErrorDialog" VALUE="true"/>' +
        '<PARAM NAME="version" VALUE="3"/>' +
        '<PARAM NAME="LocResFile" VALUE="../toc/ax_res_' + LLangID + '.xml"></PARAM>' +
        '<PARAM NAME="Language" VALUE="' + LLangID.toUpperCase() + '"></PARAM>' +
        '</OBJECT><OBJECT ID="MyTools" nosend="1" classid="clsid:108D457E-C73C-470C-A0FB-A0AF5FB0134F" width="0" height="0"></OBJECT></PRE>';
    NOAX = 0;
    window.document.body.insertAdjacentHTML('afterEnd', sOCXXml);
    window.ogIntOCX = window.setInterval("check_client_AX(window);", 100);
    return res;
}
function setSignDrive(w) {
    try {
        var oT = $(w, 'MyTools');
        if (!oT)return;
        var Dr = oT.GetDriveList("25"), oAr = Dr.split(""), oSel = $(w, 'DRIVE'), oOpt;
        oSel.selectedindex = 0;
        for (var i = 0; i < oAr.length; i++) {
            oOpt = window.document.createElement("OPTION");
            oSel.options.add(oOpt);
            s = oAr[i].toUpperCase();
            oOpt.innerText = s + ':';
            oOpt.value = s;
            if (s.toUpperCase() == $(w, 'SDRIVE').value.toUpperCase())oOpt.selected = true;
        }
    } catch (e) {
    }
}
function updateSignDrive(w) {
    try {
        var snewDirve = $(w, 'DRIVE').value;
        if (snewDirve == '')return;
        var sPath = $(w, 'CRYPTO_FPATH').value;
        $(w, 'CRYPTO_FPATH').value = sPath.replace(/.{1}/, snewDirve);
    } catch (e) {
        'updateSignDrive: ' + alert(e || e.description)
    }
}
function updateSignPath(w) {
    try {
        var oP = $(w, 'CRYPTO_FPATH');
        if (!oP || oP.value == 'ETOKEN')return(true);
        var bool = false;
        if (!isIE) return bool;
        var sSF = '', iLibId = parseInt($(w, 'CryptLidID').value, 10), sP, SigPrmArr;
        switch (iLibId) {
            case 7:
                sP = 'User certificate file|CA certificates dir|Abonents cerificates dir';
                break;
            case 8:
                sP = 'User certificate file|CA certificates dir|Abonents cerificates dir';
                break;
            case 9:
                sP = 'Current certificate|Certificates directory|Private disk/directory';
                break;
            case 12:
                sP = 'User Secret key|User Certificate|Abonents dir|CA dir';
                break;
            case 15:
                sP = 'User PKey/Certificate|User Secret key|Abonents dir|CA dir';
                break;
            case 17:
                sP = 'User PKey/Certificate|User Secret key|Abonents dir';
                break;
        }
        SigPrmArr = sP.split('|');
        var oXML = new ActiveXObject("Microsoft.XMLDOM"), sXML, oNode, SigPrmArrLen, sFl;
        sXML = $(w, 'AXSigner').XMLCryptoParamsData;
        if (sXML != '') if (!oXML.loadXML(sXML)) return;
        SigPrmArrLen = SigPrmArr.length;
        for (var j = 0; j < SigPrmArrLen; j++) {
            try {
                oNode = oXML.selectSingleNode('//Signs/Sign/Params/Param[@Name="' + SigPrmArr[j] + '"]');
                sFl = oNode.getAttribute('Value').replace(/(.{1})(.*\\)(.{0,}\\*)/g, '$3');
                if (sFl == '') sFl = oNode.getAttribute('Value').replace(/(.{1})(.*\\)(.{0,}\\*)(\\)/g, '$3');
                oNode.setAttribute('Value', $(w, 'CRYPTO_FPATH').value + '\\' + sFl);
            } catch (e) {
                alert(SigPrmArr[j]);
            }
        }
        $(w, 'AXSigner').XMLCryptoParamsData = oXML.xml;
        return(true);
    } catch (e) {
        alert('updateSignPath: ' + e || e.description);
    }
}

function fnFileBrowse(w) {
    var FN = $(w, 'CryptoFileName').value, res = false, le, LFN;
    var oT = $(w, 'MyTools');
    try {
        res = oT.ChooseFile('Файл сертификата', 'Cert file (' + FN + ')|' + FN);
    } catch (e) {
        fn_alert(w, 'Произошла ошибка при попытке открыть диалоговое окно.\n Возмоно, Ваша версия установленного компонента ActiveX устрарела. Обратитесь в службу поддержки банка.');
        return;
    }
    le = oT.LastError;
    if (le != '') {
        fn_alert(w, le, 2);
        return;
    }
    if (res != 0)return;
    LFN = oT.LastFileName;
    if (LFN == '')return;
    var re = new RegExp("(.{1})(.*\\\\)(.{0,}\\\\*)", "ig");
    re.exec(LFN);
    if (RegExp.$3.toLowerCase() != FN.toLowerCase()) {
        oT.LastFileName = '';
        fn_alert(w, LRS5, 2, 'fnFileBrowse()');
        return;
    }
    var oP = $(w, 'CRYPTO_FPATH');
    oP.value = RegExp.$1 + RegExp.$2;
}

function ACTF(w, ACTID, TPLN) {
    if (window._ACTFORM_IN_PROCESS) return;
    if (isIE && (parseInt('0' + window.inputErrorCode) > 0))return;
    try {
        if (!CheckMaskFields(w)) {
            fn_alert(w, LRSChecks40, 2);
            return;
        }
    } catch (e) {
    }

    var paramT = _MBll + 'save';
    window.TokenCT = $(window, 'CASHTOKEN').value;
    window.PrevXACTION = $(window, 'XACTION').value;
    $(window, 'XACTION').value = ACTID;
    $(window, 'TIC').value = '1';
    var el_to_send = '';
    var FormHasAttachment = false;

    switch (ACTID) {
        case 'POSTDATA':
        case 'SAVENEW':
            window.baddFormConfig = false;
//          if((ACTID=='POSTDATA')&&(!fn_check_sign_param(w)))return;
            if (!window._gbLightFront && (ACTID == 'POSTDATA') && (AUTHSCH == 'pki')) if (!SignSetup(w, '')) return;
            if (window._gbLightFront && (ACTID == 'POSTDATA') && (window.ClientUID) && (window.ClientUID != '') && (AUTHSCH == 'pki')) {
                if (!window._LoadOCXOK) {
                    SignSetup(w, window.ClientUID);
                    return;
                }
            }
            if (typeof(window.fnOnSubmit) == 'function' || typeof(window.fnOnSubmit) == 'object') {
                if (!window.fnOnSubmit())return; else if (!itemsCheck()) return;
                if ($(window, 'ItemsContainedUploadFiles'))FormHasAttachment = true;
                // if($(window,'SCHEMENAME').value=='RETPOSTTOBANK')fillFileForView(w);
            }

            if ($(window, 'STATUS').value == '')$(window, 'STATUS').value = sST_NEW;
            break;
        case 'POSTAUTH':
            if (AUTHSCH == 'pki') {
                var iNumSigns = parseInt($(w, 'NUMBEROFSIGNS').value, 10);
                if ($(w, 'CRYPTO_FPATH'))if (!updateSignPath(w))return;
                if (iNumSigns > 0)
                    if (!fn_check_sign_param(w))return;
            } else if (!fn_check_sign_param(w))return;
            el_to_send = getFormElements('SystemForm', 'DocSignForm');
            break;
        case 'POSTAUTH_SIGN':
            var sSignType = getDBOClientSign(w), iST = parseInt(sSignType.substr(0, 1), 10);
            switch (iST) {
                case 1:
                    AUTHSCH = 'pki';
                    break;
                case 2:
                    AUTHSCH = 'tab';
                    break;
                case 3:
                    AUTHSCH = 'mobipass';
                    break;
                case 4:
                    AUTHSCH = 'smscode';
                    break;
                case 5:
                    AUTHSCH = 'etoken';
                    break;
            }
            el_to_send = getFormElements('SystemForm', 'DocumentForm');
            el_to_send.push('_selectedClientSignType=' + getDBOClientSign(window));
            if (iST == 1) {
                if (!window._LoadOCXOK) {
                    SignSetup(w, sSignType.substr(2, sSignType.length));
                    return;
                }
            }
            break;
        case 'SAVEDOCASTPL':
            window.LastStatus = $(window, 'STATUS').value;
            $(window, 'STATUS').value = sST_TPL;
            if (typeof(window.fnOnSubmit) == 'function')if (!window.fnOnSubmit()) {
                $(window, 'XACTION').value = window.PrevXACTION;
                $(window, 'STATUS').value = window.LastStatus;
                return;
            }
            if (TPLN == null || TPLN == '') {
                $(window, 'XACTION').value = window.PrevXACTION;
                $(window, 'STATUS').value = window.LastStatus;
                fn_prompt(w, LRSForm1, 1, LRSForm2, 'cform', '', LRSForm3); //08.06 Черныш
                return;
            }
            $(window, 'TPLCAPTION').value = TPLN;
            break;
        case 'SAVETPL':
            ;
        case 'NEWFROMTPL':
            if (typeof(window.fnOnSubmit) == 'function')if (!window.fnOnSubmit())return;
            el_to_send = getFormElements('SystemForm', 'DocumentForm');
            break;
        case 'CUSTADD':
            ;
        case 'CUSTIMP':
            ;
        case 'CUSTCHG':
            ;
        case 'ACCADD':
            ;
        case 'ACCIMP':
            ;
        case 'ACCCHG':
            ;
            paramT = 'rt_webcb_02core.save';
            if (typeof(window.fnOnSubmit) == 'function') {
                if (!window.fnOnSubmit())return; else if (!itemsCheck()) return;
            }
            break;
    }
    window._ACTFORM_IN_PROCESS = true;
    if (el_to_send == '')el_to_send = getFormElements('SystemForm', 'DocumentForm');
    el_to_send.push('T=' + paramT);
    CreateBSSHTTPRequest();
    BSSHTTPRequest.init(el_to_send);
    if (ACTID == 'CUSTIMP')BSSHTTPRequest.resultMethod = fnOnCustImp;
    if (ACTID == 'ACCIMP')BSSHTTPRequest.resultMethod = fnOnAccImp
    else BSSHTTPRequest.resultMethod = fnOnFormSaveResult;
    BSSHTTPRequest.sendData();
    if ((ACTID == 'SAVENEW') && w.IsDict) DSBForm(w, true, 10001);

}
function fnOnFormSaveResult(xHTTP) {
    var ACTID = $(window, 'XACTION').value;
    window._ACTFORM_IN_PROCESS = false;
    if (!xHTTP)return;
    var iC = xHTTP.errorCode, sErr = xHTTP.error, signF = 'signInpFocus(w)';
    try {
        sErr = sErr.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
    } catch (e) {
    }

    if ((iC > 0) && (iC < 5)) {
        if (sErr && sErr != '')fn_alert(w, sErr, 2, (ACTID == 'POSTAUTH') ? signF : '');
        return;
    }
    if (iC == -1) {
        if (sErr && sErr != '')fn_alert(w, (sErr == '') ? LRSChecks28 : sErr, 2, 'Exit();');
        return;
    }
    if (iC == -2) {
        if (sErr && sErr != '')fn_alert(w, sErr, 3);
        return;
    }
    //$(window,'CASHTOKEN').value=xHTTP.TokenCT;
    $(window, 'TIC').value = xHTTP.Tic;
    switch (ACTID) {
        case 'SAVENEW':
            fn_alert(w, LRS8, 5, (window.BACKSCACT ? window.BACKSCACT : ''));
            break;
        case 'POSTDATA':
        case 'CUSTIMP':
            if (getStepSaveForm()) {
                //oF - текущая форма
                //oFst - следующая форма
                var oStepSave = $(window, 'iiStepSaveForm'),
                    oF = $(w, "CustomForm" + oStepSave.value),
                    nId,
                    oFst;

                oStepSave.value = parseInt(oStepSave.value, 10) + 1;
                nId = 'CustomForm' + oStepSave.value;

                try {
                    oFst = $(window, nId)
                } catch (e) {
                }
                if (!oFst) {
                    oFst = window.document.createElement('DIV');
                    oFst.id = nId;
                }
                oFst.innerHTML = '<FORM ACTION="bsi.dll?" METHOD="POST" NAME="DocumentForm" onsubmit="return false;">' + xHTTP.responseBody + '</FORM>';
                oFst.style.display = 'block';
                oF.style.display = 'none';
                oF.parentNode.appendChild(oFst);
                _attachElmHndlrs(w, oFst);
                if (ACTID == 'CUSTIMP') {
                    $(window, 'FORMACTION').value = 'CUSTADD';
                    $(window, 'XACTION').value = 'CUSTADD';
                }
                //04.04.12 ChernyshDV: инициализация многошаговых форм.
                try {
                    InitFormStep();
                } catch (e) {
                }

                ScroolToUp(w);
                onResizeMid();
                /*Chernysh: для пошаговых форм ресайзим окно - прижимаем footer к нижней границе окна*/


            } else {
                fn_hide_block(w);
                window.IsEdit = false;

                if (iC != 100) {
                    $(window, 'ForceSave').value = '1';
                    $(window, 'ViewTarget').innerHTML = xHTTP.responseBody;
                    try {
                        window.InitAuth();
                    } catch (e) {
                    }

                    try {//D.Chernysh: кроссбраузерное решение для установки высоты таблицы графика период. платежей 
                        var sheduleTbl = $(window, 'sheduleTbl');
                        if (sheduleTbl) {
                            if (sheduleTbl.offsetHeight > 300) sheduleTbl.style.height = 300 + 'px';
                            //управляем скрытием/показом расписания оплат (ф-ция в periodicalpays.js)
                            ShowSheduleTblAuth(false);
                        }
                    } catch (e) {
                    }

                    setSignDrive(w);
                    onResizeMid(); //Chernysh
                } else {
                    $(w, 'addFormConfig').innerHTML = xHTTP.responseBody;
                    window.baddFormConfig = true;
                }
            }
            if (window.FormHasAttachment)fillFileForView(w, true);
            (iC < 7) ? fn_alert(w, sErr, 3, signF) : eval(signF);
            break;
        case 'POSTAUTH':
            /*Chernysh.D: конструкция try...catch переписана по наши нужды*/
            try {
                if (iC == 7) {
                    var SchemePay = $(window, 'SCHEMENAME').value;
                    switch (SchemePay) {
                        case 'RETPOSTTOBANK' :
                            fn_alert(w, sErr || LRS8_401, 5);
                            SC('RETPOSTTOBANK', '');
                            break;
                        case 'CRYPTOREGEN' :
                            fn_alert(w, sErr || LRS8_401, 5);
                            SC('CLIENTKEYEXCHANGE', 'ALL');
                            break;
                        case 'RETPUPAYONETIME' :
                            try {
                                //D.Chernysh: если документ платежа строиться сразу после входа (пример, "Покупон"), то
                                //показываем клиенту аутентичную форму после подтверждения платежа, в др. случаях показываем скроллер документов.
                                if ($(window, 'FORMACTION').value == 'AFTERLOGIN') {
                                    var iCountReq = 0; //счетчик кол-ва попыток запроса статуса
                                    var tmpWAITLRS = WAITLRS;
                                    $(window, 'ViewTarget').innerHTML = xHTTP.responseBody;
                                    window.IsStampForm = true;
                                    DSBForm(w, true);
                                    //переопределяем глобальную переменную
                                    WAITLRS = WAITLRS_ChkState;
                                    fn_wait(w, WAITLRS);
                                    //Проверяем статус документа
                                    var getDocStateInterval = setInterval(function () {
                                        CreateBSSHTTPRequest();
                                        BSSHTTPRequest.init(
                                            'T=cdb_check.getSingleDocState',
                                            'IDR=' + $(window, 'IDR').value,
                                            'SHEMENAME=' + SchemePay
                                        );
                                        BSSHTTPRequest.resultMethod = fnOnCheckStResult;
                                        BSSHTTPRequest.sendData();
                                    }, 2000);

                                    //функция обрабатывает результат запроса проверки статуса
                                    function fnOnCheckStResult(xHTTP) {
                                        //если какая то ошибка со стороны сервера
                                        if (xHTTP.errorCode == -1) {
                                            clearInterval(getDocStateInterval);
                                            //покажем клиенту ошибку
                                            fn_alert(w, xHTTP.responseBody, 4);
                                            //и кнопку "далее" для входа в банкинг
                                            $(w, 'CONTENTF').style.display = 'block';
                                            //переопредеям глоб. переменную, выставляя исходное значение
                                            WAITLRS = tmpWAITLRS;
                                            return;
                                        }
                                        iCountReq = iCountReq + 1;
                                        //если после iCountReq числа запросов не определили статус (остановлен шлюз FB-АБС, тупит коммуналка либо другой глюк)
                                        if (iCountReq == 15) {
                                            clearInterval(getDocStateInterval);
                                            //покажем клиенту, что документ принят в обрабоку
                                            fn_alert(w, sErr || LRS8_401, 5);
                                            //и кнопку "далее" для входа в банкинг
                                            $(w, 'CONTENTF').style.display = 'block';
                                            //переопредеям глоб. переменную, выставляя исходное значение
                                            WAITLRS = tmpWAITLRS;
                                            return;
                                        }
                                        ;
                                        DSBForm(w, true);
                                        fn_wait(w, WAITLRS);
                                        //форма redirectToProvider находится в default_view_send.htt
                                        var oForm = window.document.getElementById('redirectToProvider'),
                                            sendToURL = '',
                                            formAction = "if (oForm) {" +
                                                "if (sendToURL != '') {" +
                                                "oForm.setAttribute('action',sendToURL);" +
                                                "if (window.document.location.host == '10.30.1.248') oForm.setAttribute('method','GET');" +//<-- ЗАГЛУШКА ДЛЯ ТЕСТИРОВАНИЯ
                                                "oForm.submit();" +
                                                "}" +
                                                "else {Auth(); };" +
                                                "};",
                                            resultStamp = "var oStampImg = $(w,'stamp').getElementsByTagName('img')[0];" +
                                                "if ((oStampImg) && (sImg!='')) {" +
                                                "var expr = /[0-9]{1,1}(?=.gif)/ig;" +
                                                "var newStampImg = oStampImg.getAttribute('src').replace(expr,sImg);" +
                                                "oStampImg.setAttribute('src',newStampImg);" +
                                                "};";

                                        switch ($(w, 'pay_state').value) {
                                            case '401':
                                                ;
                                            case '402':
                                                ;
                                            case '411': //платеж принят в обработку
                                                //если присвоен референс, значит платеж успешен
                                                if ($(w, 'pay_bankid').value != '') {
                                                    clearInterval(getDocStateInterval);
                                                    //отрисовываем новый штамп
                                                    var sImg = '3';
                                                    eval(resultStamp);
                                                    //посылаем данные вместе с клиентом на нужный URL
                                                    setTimeout(function () {
                                                        sendToURL = $(w, 'pay_success_url').value;
                                                        eval(formAction);
                                                    }, 2000);
                                                }
                                                ;
                                                break;
                                            case '601': //платеж исполнен
                                                clearInterval(getDocStateInterval);
                                                //отрисовываем новый штамп
                                                var sImg = '3';
                                                eval(resultStamp);
                                                //посылаем данные вместе с клиентом на нужный URL
                                                setTimeout(function () {
                                                    sendToURL = $(w, 'pay_success_url').value;
                                                    eval(formAction);
                                                }, 2000);
                                                break;
                                            case '375': //платеж отказан
                                                clearInterval(getDocStateInterval);
                                                //отрисовываем новый штамп
                                                var sImg = '5';
                                                eval(resultStamp);
                                                //посылаем данные вместе с клиентом на нужный URL
                                                setTimeout(function () {
                                                    sendToURL = $(w, 'pay_fail_url').value;
                                                    eval(formAction);
                                                }, 2000);
                                                break;
                                        }
                                        ;
                                    }; //END fnOnCheckStResult

                                } //END "FORMACTION = AFTERLOGIN"
                                else {
                                    fn_alert(w, sErr || LRS8_401, 5);
                                    switch ($(w, 'PERIODPAY').value) {
                                        case '1':
                                            eval($j('#NavigtPanel div[url*="SC\\(\'REGULARPAYDOCS\',\'ALL\'\\)"]').attr('onclick'));
                                            break;
                                        default:
                                            eval($j('#NavigtPanel div[url*="SC\\(\'DOCUMENTS\',\'ALL\'\\)"]').attr('onclick'));
                                            break;
                                    }
                                    //обновим скроллер документов через N cек
                                    setTimeout(
                                        function () {
                                            if ($(window, 'SCHEMENAME').value == 'DOCUMENTS') RefreshScroller(w);
                                        },
                                        8000
                                    );
                                }
                            } catch (e) {
                                fn_alert(w, 'Непредвиденная ошибка: ' + e || e.description, 4);
                            }
                            ;
                            break;
                        default:
                            fn_alert(w, sErr || LRS8_401, 5);
                            switch ($(w, 'PERIODPAY').value) {
                                case '1':
                                    eval($j('#NavigtPanel div[url*="SC\\(\'REGULARPAYDOCS\',\'ALL\'\\)"]').attr('onclick'));
                                    break;
                                default:
                                    eval($j('#NavigtPanel div[url*="SC\\(\'DOCUMENTS\',\'ALL\'\\)"]').attr('onclick'));
                                    break;
                            }
                            //обновим скроллер документов через N cек
                            setTimeout(
                                function () {
                                    if ($(window, 'SCHEMENAME').value == 'DOCUMENTS') RefreshScroller(w);
                                },
                                8000
                            );
                            break;
                    }
                }
            } catch (e) {
            }
            //  $(window,'ViewTarget').innerHTML=xHTTP.responseBody;
            //  window.IsStampForm=true;
            break;
        case 'POSTAUTH_SIGN':
            fn_hide_block(w, false, 'addFormConfig');
            $(window, 'ForceSave').value = '1';
            $(window, 'ViewTarget').innerHTML = xHTTP.responseBody;
            try {
                window.InitAuth();
            } catch (e) {
            }
            setSignDrive(w);
            if (window.FormHasAttachment)fillFileForView(w, true);
            (iC < 7) ? fn_alert(w, sErr, 4, signF) : eval(signF);
            break;
        case 'SAVEDOCASTPL':
            $(window, 'XACTION').value = window.PrevXACTION;
            $(window, 'STATUS').value = window.LastStatus;
            fn_alert(w, LRS8t, 5);
            break;
        case 'SAVETPL':
            //при сохранении шаблона ГИВЦ переходить в скроллер шаблонов платежей
            var tplSC = 'SC($(window,"SCHEMENAME").value,"TPL")';
            var schemePay = $(window,"SCHEMENAME").value;
            if (schemePay === 'RETPUPAYKIEVNEW') {
                tplSC = 'SC("RETPUPAYONETIME","TPL")';
            }
            fn_alert(w, LRS8, 5, tplSC);
            break;
        case 'NEWFROMTPL':
            CREATE($(window, 'SCHEMENAME').value, 'ADD', '&IDR=' + $(window, 'IDR').value);
            break;
        case 'CUSTADD':
            ;
        case 'CUSTCHG':
            ;
            try {
                if (iC == 107) {
                    $(window, 'CONTENTF2').style.display = "none";
                    fn_alert(w, sErr, 5, (window.BACKSCACT ? window.BACKSCACT : ''));
                }
            } catch (e) {
            }
            break;
        case 'ACCADD':
            ;
        case 'ACCCHG':
            ;
            try {
                if (iC == 107) {
                    $(window, 'CONTENTF2').style.display = "none";
                    fn_alert(w, sErr, 5, (fnDoBackAccCust()));
                }
            } catch (e) {
            }
            break;
    }
    checkSessionOpened(xHTTP.responseBody);
    /*from v2.4*/
}
function ShowFORM(w) {
    try {
        if (!AuthForceSave() || (AuthForceSave() && !window.baddFormConfig)) {
            fn_hide_block(w, true);
            $(w, 'addFormConfig').innerHTML = '';
            window.IsEdit = true;
        } else if (AuthForceSave() && window.baddFormConfig) fn_hide_block(w, true, 'addFormConfig');
        DoScrollForm(w);
        $(window, 'ViewTarget').innerHTML = '';
        $(window, 'ForceSave').value = '0';
    } catch (e) {
        alert(e || e.description)
    }
    //Chernysh
    onResizeMid();
}
function ShowPrevForm(w) {
    try {
        window.fnOnPrevStep()
    } catch (e) {
    }
    $(window, 'ISStepSaveForm').value = '1';
    var xName = 'CustomForm' + $(window, 'iiStepSaveForm').value,
        xpName = 'CustomForm' + (parseInt($(window, 'iiStepSaveForm').value, 10) - 1);
    var objForm = $(window, xName),
        objpForm = $(window, xpName);
    if (!objForm || !objpForm)return;

    objForm.style.display = 'none';
    objForm.innerHTML = '';
    objpForm.style.display = 'block';
    $(window, 'iiStepSaveForm').value = parseInt($(window, 'iiStepSaveForm').value, 10) - 1;
    //Chernysh
    onResizeMid();

}
function signInpObj(w) {
    return($(w, signInpName(w)))
}
function signInpName(w) {
    return (AUTHSCH == 'tan') ? 'PSW' : 'MBP_RESULT';
}
function signInpFocus(w) {
    try {
        var el = signInpObj(w);
        el.focus()
    } catch (e) {
    }
}
function fn_check_sign_param(w) {
    res = true;
    if (window.NumberOfSigs == 0)return(res);
    var oSERR;
    try {
        oSERR = $(window, 'SERR')
    } catch (e) {
        oSERR = null
    }
    if (oSERR) {
        fn_alert(w, oSERR.innerHTML);
        return;
    }

    switch (AUTHSCH) {
        case 'tan':
            ;
        case 'mobipass':
            var bTan = AUTHSCH == 'tan', el = signInpObj(w);
            if (!window.IsEdit)res = SubCheckEmptyTrim(w, signInpName(w), '', bTan ? LRSSig17 : LRSSig18, true);
            break;
        case 'pki':
            x = (!isIE) ? LRSign2 : ((NOAX == 1) ? LRSSig15 : '');
            fn_alert(w, x, 1);
            res = x == '';
            if (!window.IsEdit)res = SignAXXML(w, res);
            break;
        case 'noauth':
            res = true;
            break;
        case 'smscode':
            if (!window.IsEdit)res = SubCheckEmptyTrim(w, 'SMS_RESULT', '', LRSSig19, true);
            break;
        case 'etoken':
            if (!window.IsEdit)res = SubCheckEmptyTrim(w, 'ETOKENPSW', '', LRSSig20, true);
            break;
        default:
            fn_alert(w, LRSign1, 1);
            res = false;
            break;
    }
    return res;
}

function SignAXXML(w, b) {
    if (!b)return false;
    try {
        var o = $(w, 'CRYPTO_SIGN'), oAX;
        if (!o)return false;
        oAX = $(w, 'AXSigner');
        oAX.NumberOfSignatures = $(window, 'NUMBEROFSIGNS').value;
        var oXML = new ActiveXObject("Microsoft.XMLDOM");
        var sXml = o.documentElement.cloneNode(true).xml;
        sXml = sXml.replace(/<D>/, '<D><![CDATA[').replace(/<\/D>/, ']]></D>');
        oXML.loadXML('<?xml version="1.0" encoding="windows-1251"?>' + sXml);
        if (!oXML.loadXML(oAX.DealSignaturesXML(oXML))) {
            fn_alert(w, LRSSig16 + oXML.parseError.reason, 4);
            return false;
        }
        var oSO = oXML.selectSingleNode('//TYP[@I="1"]');
        $(window, 'UID1').value = oSO.getAttribute('U');
        $(window, 'LIBTYPENAME1').value = oSO.getAttribute('L');
        $(window, 'SIGNNAME1').value = oSO.getAttribute('N');
        $(window, 'SIGNS').value = oXML.selectSingleNode('//SIGN/S').text;
        return(oXML.selectSingleNode('//SIGN/@SI').text == '7');
    } catch (e) {
        fn_alert(w, LRSLoad4, 2);
        return false;
    }
}

function SignEntr(w, KC) {
    try {
        if (KC == 13) {
            var oB = $(window, 'BTNPOSTAUTH');
            isIE ? (oB.click()) : eval(oB.getAttribute('onclick'))
        }
    } catch (e) {
    }
}

function go_back() {
    if ($(w, 'GO_FROM').value == 'DOCUMENTS') {
        SC('DOCUMENTS', 'ALL');
    }
    else {
        switch ($(w, 'SCHEMENAME').value) {
            case 'RETPUPAYKIEV':
            case 'RETPUPAYKIEVNEW':
            case 'RETPUPAYKIEVGAZ':
            case 'RETPUPAYKIEVENERGO':
                SC('RETPUPAYONETIME', 'TPL');
                break;
            default:
                SC($(w, 'SCHEMENAME').value, 'TPL');
                break;
        }
    }
}

c_form_js = true;

