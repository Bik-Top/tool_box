function LoadFileFromServer(reqparams) {
    MessageBoxObject.pullDown('<IMG SRC="../img/ico/download.gif" style="float:left;margin-right:5px;">' + LRSDownLoad);
    CreateBSSHTTPRequest();
    BSSHTTPRequest.useIFRAME = true; //<- true - открывается окно сохранения файла во фрейме
    BSSHTTPRequest.disableWin = false;
    BSSHTTPRequest.method = _gPOSTMETHOD;
    BSSHTTPRequest.init(reqparams);
    BSSHTTPRequest.resultMethod = LoadFileFromServer_Result;
    BSSHTTPRequest.sendData();

}
function LoadFileFromServer_Result(xHTTP) {
    try {
        MessageBoxObject.PullDown.close();
        if (xHTTP.errorCode > 0) {
            fn_alert(window, xHTTP.error);

            /*Chernysh D.V.: наблюдается баг, когда во фрейм "_POST_FRAME_" один раз записывается текст и код ошибки,
             то отображается эта ошибка в течении сессии клиента, даже если при последующих обращениях к серверу ошибок нет.
             Решение - очищать тело фрейма после показа ошибки. */
            var frm = BSSReqIFRAME.document.body;
            frm.innerHTML = '';
            var i = frm.attributes.length;
            while (i--) {
                frm.removeAttribute(frm.attributes[i].name);
            }
            //
            return;
        }
    } catch (e) {
    }

}

function fnExportDoc(SchemeName, IDR) {
    if (!SchemeName)SchemeName = $(window, 'SCHEMENAME').value;
    if (typeof(window.fnCheck) == 'function' || typeof(window.fnCheck) == 'object') {
        if (!window.fnCheck()) return;
    }

    var arParams = new Array(
        'T=RT_1FileOperation.GetSchemeDocFile',
        'TIC=1',
        'SCHEMENAME=' + SchemeName
    );
    if (IDR)arParams.push('IDR=' + IDR);
    try {
        window.fillExpParams(arParams)
    } catch (e) {
    }
    LoadFileFromServer(arParams);
}


function delFileFCash(x) {
    if (!x)return;
    CreateBSSHTTPRequest();
    BSSHTTPRequest.init('T=RT_1FileOperation.DelFileFromCache', 'FILEID=' + x, 'CASHTOKEN=' + $(window, 'CASHTOKEN').value);
    BSSHTTPRequest.resultMethod = on_delFileFCash_result;
    BSSHTTPRequest.resultHTMLObject = $(w, 'UPLOADED_LIST');
    BSSHTTPRequest.sendData();
}
function on_delFileFCash_result(xHTTP) {
    if (xHTTP.errorCode > 0) {
        fn_alert(w, xHTTP.error);
        return;
    }
}

function newFILERequest() {
    this.resultMethod = attachNewFile_Result;
    this.resultHTMLObject = null;
    this.disableWin = true;
}

function checkFileExtention(sExtent) {
    sExtent = sExtent.toLowerCase();
    var re = new RegExp("^(exe|cmd|bat|dll|html|htm|js|vb|c|pas|cp|jar|java|sql|pl)$", "ig");
    return (sExtent.match(re) == null);
}
function onSelectFile() {
    var re = new RegExp("(.*\\\\)(.{0,}\\\\*)", "ig");
    var oForm = getFormByName('UPLOADFILEFORM');
    if (!oForm)return;
    var sFilename = re.exec($(w, 'FILE_NAME').value) ? RegExp.$2 : $(w, 'FILE_NAME').value;
    var sWaitMsg = LRDFILEUploading + $(w, 'FILE_PATH').value;

    re = new RegExp("(.*)\\.(.{0,})", "ig");
    if (re.exec(sFilename)) {
        var sExtent = RegExp.$2;
        var sFileName2 = RegExp.$1;
        sFileName2 = (sFileName2.length > 20) ? (sFileName2.substr(0, 20) + '~') : sFileName2;
        sWaitMsg = LRDFILEUploading + sFileName2 + '.' + sExtent;
        if (!checkFileExtention(sExtent)) {
            fn_alert(w, LRFILEExtentionERROR, 2);
            return;
        }
    }

    $(w, 'FILE_PATH').value = sFilename;
    $(w, 'SID').value = SID;
    if ($(w, 'FILE_PATH').value == '')return;

    DSBForm(w, true);
    fn_wait(w, sWaitMsg);
    BSSReqIFRAME.response = false;
    BSSReqIFRAME.document.body.innerHTML = '';
    oForm.submit();
    window.FILERequest = new newFILERequest();
    window.BSSReqIFRAMEInt = window.setInterval("checkForLoadingIFRAME(FILERequest)", 1000);
}

function attachNewFile_Result(xHTTP) {
    if (xHTTP.errorCode > 0) {
        fn_alert(w, xHTTP.error, 2);
        return;
    }
    $(w, 'UPLOADED_LIST').innerHTML += xHTTP.responseBody;
}

function getFile() {
    var sIDR = (arguments[2] == '' || arguments[2] == null) ? $(window, 'IDR').value : arguments[2];
    var arParams = new Array(
        'T=RT_1FileOperation.GetFileFromDocument',
        'FILEID=' + arguments[0],
        'FIELD=' + arguments[1],
        'IDR=' + sIDR,
        'SCHEMENAME=' + $(window, 'SCHEMENAME').value
    );
    LoadFileFromServer(arParams);
}

function on_getF_result(xHTTP) {
    if (xHTTP.errorCode > 0) {
        fn_alert(w, xHTTP.error, 2);
        return;
    }
}

function SendDataToPrint() {
    var el_to_send = '';
    el_to_send = getFormElements('SystemForm');
    el_to_send.push('T=RT_1FileOperation.PrintRegDocFile');
    LoadFileFromServer(el_to_send);
}