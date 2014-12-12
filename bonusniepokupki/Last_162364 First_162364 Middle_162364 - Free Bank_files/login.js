var oWinLoc = window.document.location, sWinPath = oWinLoc.protocol + '//' + oWinLoc.host + '/';
var colorstyle='green';
var LNGG = 0;
var CL = 0;
var langCapsIndicators = [];
//fn_for_loadjs(Top);
AtachSEvents(w);
init();
function Hlp(sArg) {
    var sAddP = (!w.VIPPATH) ? '' : VIPPATH;
    switch (sArg) {
        case 'free_bank_tariffs.pdf':
        case 'dogovor_free_bank.pdf':
        case 'free_bank_limits.pdf':
            x = '../help/' + sAddP + LLangID + '/' + sArg;
            break;
        case 'dogovor':
            x = '../help/' + sAddP + LLangID + '/dogovor.html';
            break;
        default:
            x = '../help/' + sAddP + LLangID + '/' + sArg + '.html';
            break;
    }
    ((isIE) && (bKiosk)) ? w.showModelessDialog(x, w) : w.open(x, '_blank', 'top=150, height=500,width=850,status=no,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes');
}
/*
function toColor(x) {
    window.location.href = location.pathname + '?t=RT_2Auth.login_frame&L=' + LLangID + '&colorstyle=' + x;
    colorstyle = x;
}
*/
function fnOnEnter(w) {
    if (MessageBoxObject.AlertBox && MessageBoxObject.AlertBox.IsShow)return;

    try {

        var b1 = SubCheckEmpty(w, 'A', '', '', true);
        var b2 = SubCheckEmpty(w, 'B', '', '', true);
        if (b1 && b2) {
            try {
                $(w, 'A').blur();
                $(w, 'B').blur();
            } catch (e) {
            }
            SD();
        } else {_Focus(w, ((!b1) ? 'A' : 'B'));}
    } catch (e) {
    }
}
function mess(s) {
    $(w, 'CLT').innerHTML = s;
}//transformMsg(w,s,err);} //ДЛЯ НОВОГО ДИЗАЙНА
function LoadNewCaptcha() {
    var oImg = $(w, 'Captcha'), ID = $(window, 'IdCaptcha');
    oImg.src = "bsi.dll?T=rt_2Reg.InitCaptcha&ID=" + ID.value + "&tms=" + fnRnd();
}
function init() {
    mess(AuthLRS0);
    var oB = $(w, 'SDB');
    DisblObj(oB, false);
    //D.Chernysh:
    $j('#SDB').click(function () {
        SD();
    });
    setLandID();
    setLangCapsIndicator();

    $j('body').keyup(function(e){
        if(e.target.getAttribute("type") === "password"){
            if(e.target.value == ""){
                for(var ii=0;ii<langCapsIndicators.length;ii++){
                    if(langCapsIndicators[ii].caps.getAttribute("for") == e.target.id){
                        langCapsIndicators[ii].caps.style.display = "none";
                        langCapsIndicators[ii].lang.style.display = "none";
                    }
                }
            }
        }
    });
    $j('body').keypress(function (e) {
        getLangCapsIndicator(e);
        //if((e.target.getAttribute("type") === "password")&&(e.target.value == "")){
            var Key = whatTheKey(e);
            var Lang = whatTheLanguage(e);
            for(var ii=0;ii<langCapsIndicators.length;ii++){
                if(langCapsIndicators[ii].caps.getAttribute("for") == e.target.id){
                    if(Key == ""){
                        langCapsIndicators[ii].caps.style.display = "none";
                    }
                    if(Lang == ""){
                        langCapsIndicators[ii].lang.style.display = "none";
                    }
                }
            }
        //}

        //D.Chernysh: на странице логина вход по нажатию ENTER*/
        if (e.keyCode == 13) {
            var dmask = $(w, 'DMASK');
            if (!dmask) {
                SD();
                return;
            }
            if (dmask.style.display == 'none') SD();
        }
    });
    var bool = $(w, 'bShow').value == 'yes';
    /*03.08.2011 Chernysh: from v2.2. Новое отображение Captcha*/
    if (bool) {
        var oLoginTbl = $(w, 'LoginTbl');
        for (i = 0; i < oLoginTbl.rows.length; i++) {
            if (oLoginTbl.rows[i].getAttribute('name') == 'divCAPTCHA')oLoginTbl.rows[i].style.display = '';
        }
    }
    /**/
    if (bool)LoadNewCaptcha();

    var oLoginFld = $(w,"a1");
    oLoginFld.focus();
    var cnt = oLoginFld.value.length;
    if($(w,"a1").createTextRange){
        var tr = oLoginFld.createTextRange();
        tr.move("character",cnt);
        tr.moveEnd("character",cnt);
        tr.select();
    }else{
        oLoginFld.selectionStart = cnt;
        oLoginFld.selectionEnd = cnt;
    }

}

function setLangCapsIndicator(){
    langCapsIndicators = [];
    for(var ii=0;ii<langCapsIndicators.length;ii++){
        var tO = langCapsIndicators[ii];
        document.body.removeChild(tO.caps);
        document.body.removeChild(tO.lang);
    }
    for(var ii=0;ii < $j("input[type=password]").length; ii++){
        var caps = document.createElement("div");
        caps.style.display = 'none';
        caps.style.whiteSpace = 'nowrap';
        caps.style.color = '#808080';
        caps.setAttribute('for',$j("input[type=password]")[ii].id);
        caps.setAttribute("name","caps");
        caps.style.position = 'absolute';
        var cP = $j("input[type=password]")[ii];
        caps.style.top = $j(cP).position().top;
        caps.style.left = ($j(cP).position().left + $j(cP).width() - 90) + "px";
        caps.innerHTML = "CAPS LOCK";
        caps.style.paddingTop = '4px';
        var tm = $j("input[type=password]")[ii];
        tm.parentNode.appendChild(caps);
        //document.body.appendChild(caps);

        var lang = document.createElement("div");
        lang.style.display = 'none';
        lang.style.whiteSpace = 'nowrap';
        lang.style.color = '#808080';
        lang.setAttribute('for',$j("input[type=password]")[ii].id);
        lang.setAttribute("name","caps");
        lang.style.position = 'absolute';
        var lN = $j("input[type=password]")[ii];
        lang.style.top = $j(lN).position().top;
        lang.style.left = ($j(lN).position().left + $j(lN).width() - 20) + "px";
        lang.innerHTML = "LNG";
        lang.style.paddingTop = '4px';
        tm.parentNode.appendChild(lang);
        //document.body.appendChild(lang);

        langCapsIndicators.push({"caps":caps,"lang":lang});
    }

}

function getLangCapsIndicator(e){
    if(e.target.type === 'password'){
        var ii = 0,
            j = 0,
            tO;

        j = langCapsIndicators.length;
        for(ii = 0; ii < j; ii++){
            tO = langCapsIndicators[ii];
            tO.lang.style.display = "none";
            tO.caps.style.display = "none";
            $j("input[type=password]")[ii].setAttribute("sel","false");
        }
        j = langCapsIndicators.length;
        e.target.setAttribute("sel","true");
        for(ii = 0;ii < j; ii++){
            //if(e.target.id == langCapsIndicators[ii].caps.getAttribute("name")){
                if($j("input[type=password]")[ii].getAttribute("sel") == "true"){
                    tO = langCapsIndicators[ii];
                    whatTheKey(e);
                    CL==true?(tO.caps.style.display = "block"):(tO.caps.style.display = "none");
                    whatTheLanguage(e);
                    tO.lang.innerHTML = LNGG;
                    tO.lang.style.display = "block";
                }
            //}
        }
    }
}

/**
 * ChernyshDV: изменение языка интерфейса
 */
function setLandID() {
    var lngFld = $(w, "L");
    window.LLangID = "russian";

    if (lngFld) {
       if (lngFld.value !== "") {
           window.LLangID = lngFld.value;
       }
    }

    //Меняем текст переключателя языка
    var lLng = "";
    switch(window.LLangID){
        case 'russian': lLng = 'Рус'; break;
        case 'ukrainian': lLng = 'Укр'; break;
        case 'english': lLng = 'Eng'; break;
    }
    $j('#' + window.LLangID).text(lLng).css('color','#FFCCCC');
}

function whatTheLanguage(e){
    var charCode = false;
    if (e.which) {
        charCode = e.which;
    } else if (e.keyCode) {
        charCode = e.keyCode;
    }
    if(charCode >= 1040 && charCode <= 1103){
        LNGG = "RUS"
    }else if((charCode >= 65 && charCode <=90)||(charCode >= 97 && charCode <=122)){
        LNGG = "ENG"
    } else if((charCode >= 1020 && charCode <=1039)||(charCode >= 1104 && charCode <= 1111)){
        LNGG = "UKR"
    }else{
        return "";
    }
    return LNGG;

}
function whatTheKey(e){
    e = (e) ? e : window.event;

    var charCode = false;
    if (e.which) {
        charCode = e.which;
    } else if (e.keyCode) {
        charCode = e.keyCode;
    }

    var shifton = false;
    if (e.shiftKey) {
        shifton = e.shiftKey;
    } else if (e.modifiers) {
        shifton = !!(e.modifiers & 4);
    }

    if ((charCode >= 97 && charCode <= 122 && shifton)||(charCode >=1072 && charCode <=1111 && shifton)) {
        CL = true;
    } else if ((charCode >= 65 && charCode <= 90 && !shifton)||(charCode >= 1028 && charCode <= 1071 && !shifton)) {
        CL = true;
    }else if ((charCode >= 97 && charCode <= 122 && !shifton)||(charCode >=1072 && charCode <=1111 && !shifton)) {
        CL = false;
    }else if ((charCode >= 65 && charCode <= 90 && shifton)||(charCode >= 1028 && charCode <= 1071 && shifton)) {
        CL = false;
    }else{
        return ""
    }

    return CL;
}

function fnDsbInp(dVal) {
    w.document.all.A.disabled = w.document.all.B.disabled = dVal;
}
function DisblObj(o, b) {
    _detachEvent(o, b);
    o.className = 'elm-auth-' + (b ? 'dis' : 'up');
    o.disabled = b;
}

function InpFocus(iP) {
    var oEl = window.event.srcElement;
    oEl.className = 'elm-inp' + ((iP == 1) ? '-a' : '');
}

function SD() {
    if (doLogin)return;
    var b = true,
        pass = '';
    b = SubCheckEmpty(w, 'A', '', AuthLRS2, b);
    b = SubCheckEmpty(w, 'B', '', AuthLRS2_, b);
    if (!b)return;
    doLogin = true;
    /*03.08.2011 Chernysh: from v2.2. Новое шифрование паролей для ИК*/
    if ($(window, 'MapID')) {
        var ch = '', i = 0, k = 0, TempPass = '';
        TempPass = $(window, 'B').value;
        while (TempPass != '') {
            ch = TempPass.substr(0, 1);
            k = ch.charCodeAt(0);
            if (k > 0xFF) k -= 0x350;
            if (k == 7622) k = 185;
            TempPass = TempPass.length > 1 ? TempPass.substr(1, TempPass.length) : '';
            if (pass != '')pass = pass + ';';
            pass = pass + PassTemplate[k];
        }
    } else {
        pass = $(w, 'B').value;
    }

    //*****
    CreateBSSHTTPRequest();
    BSSHTTPRequest.init('T=RT_2Auth.CL',
        'A=' + $(w, 'A').value,
        'B=' + pass,
        'L=' + window.LLangID,
        'IMode=' + $(window, 'IMode').value,
        'MapID=' + ($(window, 'MapID') ? $(window, 'MapID').value : ''),
        'Provider=' + $(window, 'Provider').value,
        'ProviderOrder=' + $(window, 'ProviderOrder').value);
    BSSHTTPRequest.resultMethod = logonResult;
    BSSHTTPRequest.sendData();
}

function logonResult(xHTTP) {
    if (xHTTP.errorCode > 0) {
        /*03.08.11 Chernysh: switch(xHTTP.errorCode) from 2.2*/
        switch (xHTTP.errorCode) {
            case 50:
                var oLoginTbl = $(w, 'LoginTbl');
                for (i = 0; i < oLoginTbl.rows.length; i++) {
                    if (oLoginTbl.rows[i].getAttribute('name') == 'divCAPTCHA') {
                        oLoginTbl.rows[i].style.display = '';
                    }
                }
                LoadNewCaptcha();
                break;
            case 5:
                LoadNewCaptcha();
                break;
            default:
                mess(AuthLRS0);
                fn_alert(w, xHTTP.error, 2);
                break;
        }
        doLogin = false;
        try {
            $(w, 'LoginTbl').focus();
        } catch (e) {
        }
        return;
    }
//	var oClientInfo=
    eval(xHTTP.responseBody);
    SID = ClientInfo['SID'];
    ClientName = ClientInfo['CNS'];
    ClientUserGRid = ClientInfo['UserGRid'];
    FHLP = ClientInfo['HLP'];
    FHLP2 = ClientInfo['HLP2'];
    FHLP3 = ClientInfo['HLP3'];
    AUTHSCH = ClientInfo['ASCH'];
    if (ClientName != '') document.title = ClientName + ' - ' + document.title;
    var authSHN = ( ClientInfo['TANAUTH'] == '1' ? 'TAN' : ( ClientInfo['SMSAUTH'] == '1' ? 'SMSCODE' : ( ClientInfo['ETOKENAUTH'] == '1' ? 'ETOKEN' : '') ) );

    if (authSHN != '') {
        DisplayAuthPage(authSHN);
        return;
    }

    if (AUTHSCH == 'pki') {
        if (IMode == 'info') {
            NOAX = 1;
            Auth();
            return;
        }
        if (!isIE) {
            NOAX = 1;
            fn_alert(w, AuthLRS16, 1, 'Auth()');
            return;
        }
        mess(AuthLRS14);
        w.document.body.insertAdjacentHTML('afterEnd', '<OBJECT ID="AX" WIDTH=0 HEIGHT=0 CLASSID="clsid:AD445BC2-39DF-4A05-8CC5-389FB44B595C" codebase="' + sWinPath + ClientInfo['OCXC'] + '#version=' + ClientInfo['OCXV'] + '"></OBJECT>');
        window.ogIntOCX = window.setInterval("check_AX();", 100);
    } else Auth();
}

function fn_onSystemResError(w) {
    mess(AuthLRS0);
}

function fn_onResult(w, xHTTP) {
    if (xHTTP.errorCode > 0) {
        mess(AuthLRS0);
        fn_alert(w, xHTTP.error, 2);
        doLogin = false;
        try {
            $(w, 'LoginTbl').focus();
        } catch (e) {
        }
        return;
    }
    try {
        SID = xHTTP.getElm('SID');
        USR = xHTTP.getElm('USR');
        CSN = xHTTP.getElm('CSN');
        DTO = xHTTP.getElm('DTO');
        SGTXTID = xHTTP.getElm('SGID');
        IsLegal = xHTTP.getElm('ISL');
        //URLdllSid = BSI+"sid="+SID+"&t=";
        URLdllSid = location.pathname + "?sid=" + SID + "&t=";
        Tclss = "RT_2Auth.CloseSess";
        clssURL = URLdllSid + Tclss;
        FHLP = xHTTP.getElm('HLP');
        FHLP2 = xHTTP.getElm('HLP2');
        FHLP3 = xHTTP.getElm('HLP3');
        AUTHSCH = xHTTP.getElm('ASCH');
        BDEMO = xHTTP.getElm('DEMO') == '1';
        ClientName = xHTTP.getElm('CNS');
        ClientUserGRid = xHTTP.getElm('UserGRid');
        VIPPATH = xHTTP.getElm('VIPFOLDER');
        document.title = ClientName + ' ' + document.title;
        colorstyle = xHTTP.getElm('COLOR');
        NOAX = 0;
        if (xHTTP.getElm('TANAUTH') == '1') {
            DisplayAuthPage('TAN');
            return;
        }
        if (xHTTP.getElm('SMSAUTH') == '1') {
            DisplayAuthPage('SMSCODE');
            return;
        }
        if (xHTTP.getElm('ETOKENAUTH') == '1') {
            DisplayAuthPage('ETOKEN');
            return;
        }
        if (AUTHSCH == 'pki') {
            if (IMode == 'info') {
                NOAX = 1;
                Auth();
                return;
            }
            if (!isIE) {
                NOAX = 1;
                fn_alert(w, AuthLRS16, 1, 'Auth()');
                return;
            }
            mess(AuthLRS14);
            window.OCXCODEBASE = sWinPath + xHTTP.getElm('OCXC');
            window.OCXVERSION = xHTTP.getElm('OCXV');
            window.OCXServerName = xHTTP.getElm('OCXSN');
            w.document.body.insertAdjacentHTML('afterEnd', '<OBJECT ID="AX" WIDTH=0 HEIGHT=0 CLASSID="clsid:AD445BC2-39DF-4A05-8CC5-389FB44B595C" codebase="' + window.OCXCODEBASE + '#version=' + window.OCXVERSION + '"></OBJECT>');
            window.ogIntOCX = window.setInterval("check_AX();", 100);
        } else Auth();
    } catch (e) {
    }
}
function check_AX() {
    try {
        result = IsReadyState(w.document.all.AX, window.ogIntOCX);
    } catch (e) {
        result = 1;
        w.clearInterval(window.ogIntOCX);
    }
    if (result == 2)return;
    NOAX = result;
    if (NOAX == 1)fn_alert(window, LRSLoad4, 3, 'Auth()');
    else Auth();
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
function ReloadCaptcha() {
    var oImg = $(w, 'Captcha'), ID = $(window, 'IdCaptcha');
    ID.value++;
    oImg.src = "bsi.dll?T=rt_2Reg.ReloadCaptcha&ID=" + ID.value + "&tms=" + fnRnd();
}
doLogin = false;

function GetMail(mail) {
    var subject = 'Letter from FreeBank',
        LoginName;
    if (ClientInfo['L'] == undefined) {
        LoginName = '.';
    }
    else {
        LoginName = ' (login: ' + ClientInfo['L'] + ').';
    }
    location.href = 'mailto:' + mail + '?subject=' + subject + LoginName;

}