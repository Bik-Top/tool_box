function fnSChk(w, sObjName, sCompVal, mess, bool, iCase, ifocus) {
    var el, vl;
    if (!bool) return false;
    el = $(window, sObjName);
    if (!el)return true;
    vl = el.value;
    switch (iCase) {
        case 1 :
            vl = getTrim(vl);
            break;
        case 2 :
            vl = NormalizeMoney(vl, false, el.getAttribute('DAFTER'));
            break;
    }
    if (vl == sCompVal) {
        fn_alert(w, mess, 2, (ifocus == 0) ? null : el);
        return false;
    }
    if (iCase == 2) return fnChkSummLen(w, el);
    return bool;
}
function SubCheckEmpty(w, sOName, CmpVal, msg, bl, ifocus) {
    return fnSChk(w, sOName, CmpVal, msg, bl, 0, ifocus);
}
function SubCheckEmptyTrim(w, sOName, CmpVal, msg, bl, ifocus) {
    return fnSChk(w, sOName, CmpVal, msg, bl, 1, ifocus);
}
function SubCheckEmptyMoney(w, sOName, CmpVal, msg, bl, ifocus) {
    return fnSChk(w, sOName, CmpVal, msg, bl, 2, ifocus);
}
function fnChkSummLen(w, obj, bNeedNormalize, bNullNotEqEmpty) {
    if (bNeedNormalize) obj.value = NormalizeMoney(obj.value, bNullNotEqEmpty);
    if (obj.value.indexOf('.') <= 12) return (true);
    fn_alert(w, LRSChecks13, 2, obj);
    obj.value = '';
    return(false);
}
function fnChkLen(w, sOName, iL, msg, b) {
    if (!b)return;
    var el = $(w, sOName);
    //  var bl = el.value.length==iL;
    var bl = el.value.length >= iL;  //с учетом 2620
    if (!bl)fn_alert(w, msg, 2, el);
    return(bl);
}
function fnChekDate(w, n, s, b) {
    if (!b)return false;
    b = true;
    var ob = $(w, n);
    var dt = ob.value;
    if (dt.length == 0)b = true;
    var re = /^(\d{1,2}).(\d{1,2}).(\d{4})$/;
    var a = dt.match(re);
    if (!a)return false;
    d = a[1];
    m = a[2];
    y = a[3];
    if (m < 1 || m > 12)b = false;
    if (d < 1 || d > 31)b = false;
    if ((m == 4 || m == 6 || m == 9 || m == 11) && d == 31)b = false;
    if (m == 2) {
        var q = (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0));
        if (d > 29 || (d == 29 && !q))b = false;
    }
    if (!b)fn_alert(w, s, 2, ob);
    return b;
}
function fnChekDateDif(w, n1, n2, s, bool) {
    if (!bool)return false;
    var o1 = $(w, n1), o2 = $(w, n2);
    var d1 = o1.value, d2 = o2.value;
    if (d1 == '' || d2 == '') {
        return true;
    }
    if (s == null) s = LRSChecks12;
    var re = /^(\d\d).(\d\d).(\d{4})$/;
    if (d1.replace(re, "$3$2$1") <= d2.replace(re, "$3$2$1")) return(true);
    fn_alert(w, s, 2, o1);
    return (false);
}
function CheckDATA(w, inp, func, sh, puid, inp2) {
    var oInp = $(w, inp),
        oInp2 = $(w, inp2),
        oInpCapt = $(w, 't-' + inp);
    if (!oInp || oInp.value == '')return;
    var arParams = new Array(
        'T=RT_2CHECK.CheckDATA',
        'ACT=' + func,
        'FOR=' + (sh || $(window, 'SCHEMENAME').value),
        'PUID=' + puid,
        'INP=' + oInp.value);
    if (oInp2) {
        arParams.push('INP2=' + oInp2.value);
    }
    ;
    if (oInpCapt) {
        arParams.push('INPCAPT=' + (oInpCapt.innerHTML).replace(/\*/g, '').replace(/\&nbsp;/g, ''));
    }
    CreateBSSHTTPRequest();
    BSSHTTPRequest.init(arParams);
    BSSHTTPRequest.resultMethod = fnOnCheckDATAResult;
    BSSHTTPRequest.sendData();
}

function fnOnCheckDATAResult(xHTTP) {
    if (!xHTTP)return;
    var iC = xHTTP.errorCode;
    if (iC > 0)fn_alert(w, xHTTP.error);
    /* Chernysh: снимаем сообщение о некорректно введенном значении, если значение успешно проверено*/
    if ($(w, 'SCHEMENAME').value == 'RETPUPAYONETIME') {
        clear_inp_err(w, 'INP_CHK');
        //вычисляем комиссию
        SetComission($(w, 'AMOUNT').value);
        //применяем к новым полям события 
        _ElmHndlrs(window, document.forms[1].getElementsByTagName("input"));
    }

}

function fnGetPercent(Sum, Percent, Min, Max) {
    if ((Sum == '') || (Percent == ''))return('');
    var vSum = NormalizeMoney(Sum, false, 2);
    var fCom = parseFloat('0' + Percent) / 100;
    var vMin = NormalizeMoney(Min, false);
    var vMax = NormalizeMoney(Max, false);
    var Res = '0.00';
    if (fCom * vSum != 0) {
        //fix для комиссии от суммы платежа < 1
        if (fCom * vSum < 1) {
            var z = 4;
        }
        else {
            var z = 2;
        } //было 2
        //
        Res = NormalizeMoney(fCom * vSum, false, z);
    }
    Res = ((vMin != '') && (parseFloat(Res) < parseFloat(vMin))) ? vMin : Res;
    Res = ((vMax != '') && (parseFloat(Res) > parseFloat(vMax))) ? vMax : Res;
    if (Res > 0) {
        Res = NormalizeMoney(Res, false, 2);
    }
    return(Res);
}

function NormalizeMoney(Value, bNullNotEqEmpty, DAD, bABC) {
    var bLNull = parseFloat(Value) < 0;
    Value = ('0' + Value).replace(/-/g, '').replace(/\s/g, '').replace(/\W(.*)/g, '.$1');
    if (isNaN(DAD) || DAD == undefined) DAD = 2;
    var s = ('0' + Value).replace(/\s/g, '').replace(/[^\.\d]/g, '.').replace(/[\.]+/g, '.');
    if (DAD < 0) {
        if (isNaN(Value))return '';
        DAD = (s.slice(s.indexOf('.') + 1)).length;
    }
    var re = new RegExp("(^\\d*)(\\d{" + DAD + "}$)", "");
    //Chernysh: Fix. Округление когда после точки 0 и после необходимо разряда (DAD >=2) цифра 5.
    if ((s.indexOf('.') != -1)) {
        if (/*(s.substr(s.indexOf('.')+1,1) == '0') && */(DAD >= 2) && (s.substr(s.indexOf('.') + 1 + DAD, 1) == '5') && ((s.substr(s.indexOf('.') + DAD, 1) == '2') || (s.substr(s.indexOf('.') + DAD, 1) == '3'))) {
            var array1 = s.split('.');
            var array2 = array1[1].split('');
            array2.splice(DAD, 1, '6');
            s = array1[0] + '.' + array2.join().replace(/,/g, '');
        }
    }
    //

    s = ('' + Math.pow(10, DAD)).substr(1, DAD) + Math.round(parseFloat(s) * Math.pow(10, DAD));
    var ar = re.exec(s);
    if (ar == null) return '';
    s = ((bLNull && !bABC) ? '-' : '') + parseFloat(ar[1]) + ((DAD != 0) ? ('.' + ar[2]) : '');
    if (bNullNotEqEmpty)return s;
    return (parseFloat(s) == 0) ? '' : s;
}

function Clear(w, x) {
    var oAr = x.split('|');
    for (var i = 0; i < oAr.length; i++) {
        try {
            var el = $(w, oAr[i]);
            if (el) {
                el.value = '';
                try {
                    if (el.getAttribute('DTYPE') && gdtypeMask[el.getAttribute('DTYPE')])el.setAttribute('_VALUE', '');
                } catch (e) {
                }
                if (el.getAttribute("err") == "1") {
                    el.getAttribute("err") == "0";
                    try {
                        elementMsgErrHide()
                    } catch (e) {
                    }
                    el.className = el.className.replace(/[ ]?incorrectValue/, '');
                }
            }
        } catch (e) {
        }
    }
}
function fnCheckEmtyCustFld(w, b) {
    if (!b)return false;
    var oForm = getFormByName('DocumentForm');
    var Ar = oForm.elements, xn, bcheck, b1, b2, sFN, msg, mf, prf = 'PREFIX_';
    for (var i = 0; i < Ar.length; i++) {
        xn = Ar.item(i).name;
        if ((xn.match(/^ADF_/) != null) || (xn.match(/^PREFIX_ADF_/) != null)) {
            try {
                b1 = SubCheckEmptyTrim(w, prf + xn, '', '', true), b2 = SubCheckEmptyTrim(w, xn, '', '', true);
            } catch (e) {
            }
            mf = (Ar.item(i).getAttribute('MF') == '1' && !(Ar.item(i).disabled));
            bcheck = mf || (window.document.getElementById(prf + xn) ? ((!b1 && b2) || (!b2 && b1)) : false);
            if (bcheck) {
                sFN = getTrim(window.document.getElementById('t-' + xn.replace(prf, '')).innerHTML.replace(/^\*/, '').replace(/&nbsp;/g, ' ').replace(/^\*.{1}/, ''));
                msg = (!mf && bcheck) ? CHK_FLDFULL : CHK_FLD;
                b = SubCheckEmpty(w, ((!mf && bcheck && !b1) ? (prf + xn) : xn), '', msg.replace(/%s/, sFN), b);
            }
        }
    }
    return b;
}
c_checks_js = true;
//version 2013.11.04