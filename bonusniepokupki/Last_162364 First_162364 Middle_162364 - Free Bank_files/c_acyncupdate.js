var AcyncInfoColor = '#d87705';
var iCheckAcyncInterval = 900;

function showAcyncInfo() {
    if (window._AcyncUpdateFinished)return;
    if (window._AcyncUpdateAccounts)ShowAcyncUpdateAccounts();
    if (window._AcyncUpdateCards || window._AcyncUpdateCardRests) ShowAcyncUpdateCards();
    if (window._AcyncUpdateCredits)ShowAcyncUpdateCredits();
    if (window._AcyncUpdateDocs)ShowAcyncUpdateDocs();
}

function setColor(el) {
    if (AcyncInfoColor != '') {
        el.style.color = AcyncInfoColor;
        el.style.textAlign = 'left';
    }
}

function SetInfoElementByName(x) {
    var AccEls = null;
    try {
        AccEls = window.document.getElementsByName(x);
        for (var i = 0; i < AccEls.length; i++) {
            AccEls[i].innerHTML = LRACYNCUPDATEINFO1;
            setColor(AccEls[i]);
        }
    } catch (e) {
    }
}

function ShowAcyncUpdateAccounts() {
    SetInfoElementByName('ACCUPDATE');
}

function ShowAcyncUpdateCards() {
    SetInfoElementByName('CARDUPDATE');
    if (window._AcyncUpdateCards)SetInfoElementByName('CARDSTUPDATE');
}

function ShowAcyncUpdateCredits() {
    SetInfoElementByName('CREDITUPDATE');
}

function ShowAcyncUpdateDocs() {
    SetInfoElementByName('DOCUPDATE');
}

function GetAcyncState() {
    return 1;
}

function StartAcyncUpdate() {
    if (window._AcyncClientInfoType == 2)
        MessageBoxObject.pullDownAcyncInfo('<TABLE WIDTH="100%"><TR><TD><IMG SRC="../img/ico/' + window.colorstyle + '/wait.gif"></TD><TD>' + LRACYNCUPDATEINFO2 + '</TD></TR></TABLE>');

    AcyncUpdateHTTPRequest = new newBSSHTTPRequest('AcyncUpdateHTTPRequest');
    AcyncUpdateHTTPRequest.resultMethod = StartAcyncUpdate_Result;
    AcyncUpdateHTTPRequest.resultHTMLObject = null;
    AcyncUpdateHTTPRequest.useIFRAME = false;
    AcyncUpdateHTTPRequest.disableWin = false;
    AcyncUpdateHTTPRequest.init('T=rt_0clientupdaterest.doheavyupd');
    AcyncUpdateHTTPRequest.sendData();

}

function CheckAcyncProcess() {
    AcyncUpdateHTTPRequest.resultMethod = CheckAcyncProcess_Result;
    AcyncUpdateHTTPRequest.resultHTMLObject = null;
    AcyncUpdateHTTPRequest.useIFRAME = false;
    AcyncUpdateHTTPRequest.disableWin = false;
    AcyncUpdateHTTPRequest.init('T=rt_0clientupdaterest.CheckForAcyncProcess');
    AcyncUpdateHTTPRequest.sendData();
}

function AcyncReloadPages() {

    var sSchemeName = $(window, 'SCHEMENAME').value;
    var bDoReload = false;
    switch (sSchemeName) {
        case 'COMMPAGE':
            bDoReload = true;
            break;
        case 'CARDS': //список карт
            bDoReload = (window._AcyncUpdateCards || window._AcyncUpdateCardRests);
            break;
        case 'STM':
        case 'DEPOSITS':
        case 'ACCOUNTS': //выписка по счетам, список депозитов
            bDoReload = window._AcyncUpdateAccounts;
            break;
        case 'CREDITS': //список кредитов
            bDoReload = window._AcyncUpdateCredits;
            break;
        case 'RETSUBSLSRVADD':
        case 'RETSUBSLSRVLESS':
        case 'RETBONEXCHANGE':
        case 'RETFEEACCCHNG':
        case 'RETOPENDEPOSIT':
        case 'RETDEPOSITADD':
        case 'RETCREDITREPAYMENT':
        case 'RETUNISTREAMSEND':
        case 'RETUNISTREAMRECEIVE':
            if (window.IsScroller) {
                bDoReload = window._AcyncUpdateDocs ||
                    window._AcyncUpdateAccounts;
            }
            if (window.IsForm) bDoReload = window._AcyncUpdateAccounts;
            break;
        case 'RETCARDACC':
        case 'RETCARDACCCDB':
        case 'RETPUPAYONETIME':
        case 'RETPUPAYINFOCOM':
        case 'RETPUPAYKIEV':
        case 'RETPUPAYKIEVNEW':
        case 'RETPAYDOCRU':
        case 'RETPAYDOCRUCDB':
            if (window.IsScroller) {
                bDoReload = window._AcyncUpdateDocs ||
                    window._AcyncUpdateAccounts ||
                    window._AcyncUpdateCards ||
                    window._AcyncUpdateCardRests;
            }
            if (window.IsForm) bDoReload = window._AcyncUpdateAccounts ||
                window._AcyncUpdateCards ||
                window._AcyncUpdateCardRests;
            break;
    }

    if (bDoReload) {
        AcyncUpdateHTTPRequest.init(window.LastDEFRequestParams);
        AcyncUpdateHTTPRequest.resultHTMLObject = $(window, '_WorkPanel_');
        AcyncUpdateHTTPRequest.resultMethod = loadWorkPanel;
        AcyncUpdateHTTPRequest.sendData();
    }
}

function CheckAcyncProcess_Result(xHTTP) {
    var iErr = xHTTP.errorCode;
    if (iErr == 0) { // процесс завершен
        window._AcyncUpdateFinished = true;
        try {
            var sErr = xHTTP.error.replace(/\[BR\]/g, '<BR>');

            // Определяем что у нас не обновилось из АБС по полученной битовой маске.
            var iRezUpABS = parseInt(xHTTP.responseBody);

            if (iRezUpABS != 0) { // Если ошибки обновления
                MessageBoxObject.pullDownAcyncInfo('<DIV style="text-align:right;padding:0px;height:10px;"><IMG SRC="../img/clientadvice/close.gif" onclick="MessageBoxObject.pullDownAcyncProcess.close();"/></DIV><TABLE WIDTH="100%"><TR><TD style="vertical-align:top;"><IMG SRC="../img/err/alert.png" style="padding-right: 5px;"></TD><TD style="background: white;"/><TD>' + sErr.bold() + '</TD></TR></TABLE>');
            }
            else {
                MessageBoxObject.pullDownAcyncProcess.close();
//               MessageBoxObject.pullDownAcyncInfo('<DIV style="text-align:right;padding:0px;height:10px;"><IMG SRC="../img/clientadvice/close.gif"  onclick="MessageBoxObject.pullDownAcyncProcess.close();"/></DIV><TABLE WIDTH="100%"><TR><TD style="vertical-align:top;"><IMG SRC="../img/err/1.gif"></TD><TD>'+sErr+'</TD></TR></TABLE>');
            }
        } catch (e) {
        }
        AcyncReloadPages();
    } else {
        window.setTimeout('CheckAcyncProcess()', iCheckAcyncInterval);
    }
}

function StartAcyncUpdate_Result(xHTTP) {
    if (xHTTP.responseBody != '') window._AcyncUpdateOperationId = xHTTP.responseBody;
    var iErr = xHTTP.errorCode;
    if (iErr == 0) {
        //window.AcyncInterval =
        window.setTimeout('CheckAcyncProcess()', iCheckAcyncInterval);
    } else {
        window.setTimeout('StartAcyncUpdate()', window._AcyncRepeateUpdateAfterSec * 100)
    }
    //0 - все хорошо
    //не 0 - системная ошибка и пробуем запустить повторно
}

function StartAcyncProcess() {
    if (window._AcyncUpdateAfterSec > 0)window.setTimeout('StartAcyncUpdate()', window._AcyncUpdateAfterSec * 100)
    else StartAcyncUpdate();
}
/*  function GetAcyncUpdateStatus(){
 //возвращаем 0 если разрашать обращение к АБС
 var sSchemeName = $(window,'SCHEMENAME').value;
 var iStatus = 1;
 switch(sSchemeName){
 case 'COMMPAGE':;case 'EXP1C': //главная страница
 iStatus = GetAcyncState();
 break;
 case 'STMCARD':;case 'CARDS':
 iStatus = (window._AcyncUpdateCards || window._AcyncUpdateCardRests) ? GetAcyncState() : 0;
 break;
 case 'STM':;case 'DEPOSITS':
 iStatus = window._AcyncUpdateAccounts ? GetAcyncState() : 0;
 break;
 case 'CREDITS':
 iStatus = window._AcyncUpdateCredits ? GetAcyncState() : 0;
 break;
 default:
 if(window.IsScroller)iStatus = window._AcyncUpdateDocs ? GetAcyncState() : 0
 else iStatus = GetAcyncState();
 break;

 }
 if(iStatus!=0)fn_alert(window,LRACYNCUPDATEINFO2,3);
 return (iStatus==0);
 }*/

StartAcyncProcess();