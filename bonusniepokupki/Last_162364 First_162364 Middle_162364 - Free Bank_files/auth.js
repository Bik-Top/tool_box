window.IsForm = true;
function getObjectBySignType() {
    var ObjInp;
    switch (AuType) {
        case 'TAN':
            ObjInp = $(window, 'PSW');
            break;
        case 'SMSCODE':
            ObjInp = $(window, 'SMS_RESULT');
            break;
        case 'ETOKEN':
            ObjInp = $(window, 'ETOKENPSW');
            break;
    }
    return ObjInp;
}
function SDT() {
    var b, str = '', str2 = '';
    if (AuType == 'TAN') {
        str = 'PSW';
        b = SubCheckEmpty(w, str, '', LRSSig17, true);
    }
    if (AuType == 'SMSCODE') {
        str = 'SMS_RESULT';
        str2 = '&SMS_AUTOKEY=' + $(window, 'SMS_AUTOKEY').value;
        b = SubCheckEmpty(w, str, '', LRSSig19, true);
    }
    if (AuType == 'ETOKEN') {
        str = 'ETOKENPSW';
        b = SubCheckEmpty(w, str, '', LRSSig20, true);
    }
    if (!b)return;
    fn_wait(w);
    CreateBSSHTTPRequest();
    BSSHTTPRequest.init('T=RT_2advancedauth.CL', str + '=' + $(w, str).value, 'AUTHTYPE=' + $(w, 'AUTHTYPE').value, str2);
    BSSHTTPRequest.resultMethod = sdt_onresult;
    BSSHTTPRequest.sendData();
}
function sdt_onresult(xHTTP) {
    eval(xHTTP.responseBody);
    if (xHTTP.errorCode > 0) {
        var ObjInp = getObjectBySignType();
        if (xHTTP.errorCode == 2) {
            fn_alert(w, xHTTP.error, 2, 'Exit();');
        } else {
            fn_alert(w, xHTTP.error, null, ObjInp);
            ObjInp.value = '';
        }
        return;
    }
    ClientName = ClientInfo['CNS'];
    document.title = ClientName + ' - ' + document.title;
    Auth();
}
function InitForm() {
    AtachSEvents(window);
    var ObjInp = getObjectBySignType();
    try {
        ObjInp.focus();
    } catch (e) {
    }
}