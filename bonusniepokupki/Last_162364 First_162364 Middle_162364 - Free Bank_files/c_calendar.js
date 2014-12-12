var ar_g_MonthD = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var ar_g_MonthN = C_LRSMounths.split(',');
var _Today = new Date(), iDD_Today = _Today.getDate(), iMM_Today = _Today.getMonth(), iYY_Today = _Today.getFullYear(),
    sToday = FormatDate(iDD_Today, iMM_Today + 1, iYY_Today);
var aCL = 'actdate';
var iMinYear = 2000, iMaxYear = iYY_Today + 5;

function IsToday(Y, M, D) {
    return((Y == iYY_Today) && (M == iMM_Today) && (D == iDD_Today));
}
function getDaysInYear(iY) {
    var iL = 0;
    for (var i = 0; i < 12; i++) {
        iL += getMonthLength(i, iY);
    }
    return iL;
}
function getMonthLength(iM, iY) {
    var iL = ar_g_MonthD[iM];
    if (iL && (iM == 1) && (iY % 4 == 0))iL++;
    return iL;
}
function makeTBody(w, T) {
    var oB = w.document.createElement('TBODY'), oTR, oTD;
    T.appendChild(oB);
    oB = T.tBodies[0];
    for (var i = 0; i < 6; i++) {
        oTR = isIE ? oB.insertRow() : window.document.createElement('TR');
        for (var j = 0; j < 7; j++) {
            oTD = isIE ? oTR.insertCell() : window.document.createElement('TD');
            oTD.innerHTML = '!';
            if (!isIE)oTR.appendChild(oTD);
        }
        if (!isIE)oB.appendChild(oTR);
    }
}
function RD(i) {
    return (i < 10) ? ('0' + i) : i;
}
function FormatDate(iD, iM, iY) {
    return (RD(iD) + '.' + RD(iM) + '.' + iY)
}
function Calendar(w, e, inp) {
    this.position = function () {
        cl.style.position = 'absolute';
        cl.style.zIndex = '1000'; //added by D.Chernysh
        var el = this.ClBtn;
        var oP = el.offsetParent,
            bH = (window.innerHeight || window.document.body.clientHeight),
            bW = (window.innerWidth || window.document.body.clientWidth),
            y = getTopOffset(el) + 5 + /*+el.offsetTop*/ +el.offsetHeight,
            x = getLeftOffset(el) - el.offsetWidth - 170,
            clW = 180, clH = 232,
            iHgh = ((parseInt(y, 10) + clH) < bH) ? y : (parseInt(y, 10) - clH - el.offsetHeight - 5);
        with (cl.style) {
            top = (iHgh < 0) ? (window.document.body.scrollTop + 5) : iHgh;
            left = (parseInt(x, 10) > 0) ? (((parseInt(x, 10) + clW) > bW) ? (parseInt(x, 10) - clW - el.offsetWidth) : x) : 10;
        }
    }
    this.fill = function (dt) {
        if (!dt) {
            re = new RegExp('(\\d{2})\\.(\\d{2})\\.(\\d{4})', 'ig');
            r = re.exec(this.input.value);
            var _b = r == null;
            dt = _b ? (new Date()) : (new Date(parseInt(RegExp.$3, 10), parseInt(RegExp.$2, 10) - 1, parseInt(RegExp.$1, 10)));
            iActD = _b ? iDD_Today : parseInt(RegExp.$1, 10);
        }
        //D.Chernysh: document.all - устаревший метод, не работает в FF 15.0.1
        //window.cl_win.document.all.TodayLnk.innerHTML=C_LRSToday+': '+sToday;
        window.cl_win.document.getElementById('TodayLnk').innerHTML = C_LRSToday + ': ' + sToday;
        //
        iDD = dt.getDate();
        iMM = dt.getMonth();
        iYY = dt.getFullYear();
        /*
         D.Chernysh: document.all - устаревший метод, не работает в FF 15.0.1
         window.cl_win.d.all.MNT.innerHTML=ar_g_MonthN[iMM];
         window.cl_win.d.all.MNT.setAttribute('I',iMM);
         window.cl_win.d.all.YEAR.innerHTML=iYY;
         window.cl_win.d.all.btnin.innerHTML=C_LRSIns;
         window.cl_win.d.all.btnclose.innerHTML=C_LRSCls;
         */
        //D.Chernysh: так работает 
        window.cl_win.document.getElementById('MNT').innerHTML = ar_g_MonthN[iMM];
        window.cl_win.document.getElementById('MNT').setAttribute('I', iMM);
        window.cl_win.document.getElementById('YEAR').innerHTML = iYY;
        window.cl_win.document.getElementById('btnin').innerHTML = C_LRSIns;
        window.cl_win.document.getElementById('btnclose').innerHTML = C_LRSCls;
        //
        dy = new Date(iYY, iMM, 1);
        var oT = window.cl_win.document.getElementById('DayTbl');
        if ((!oT.tBodies[0]) || (oT.tBodies[0].rows.length == 0))makeTBody(window.cl_win, oT);
        var rs = oT.tBodies[0].rows, r, oc, d = 0, d_ = 1, ds = getMonthLength(iMM, iYY), dc = dy.getDay(), b, xitemN;
        dc = ((dc == 0) ? 7 : dc) - 1;
        if (iActD > ds)iActD = ds;
        for (var i = 0; i < rs.length; i++) {
            r = rs.item(i);
            for (var j = 0; j < 7; j++) {
                xitemN = 'D' + j.toString();
                oCl = window.cl_win.document.getElementById(xitemN);
                oCl.innerHTML = C_LRSWeekDay.split(',')[j];
                oc = r.cells.item(j);
                b = (d >= dc) && (d_ <= ds);
                oc.innerHTML = (b) ? (d_) : '&#160;';
                oc.className = b ? 'insdate' : '';
                if ((d_ == iActD) && b)this.setActD(oc)
                d++;
                if (b)d_++;
            }
        }
        with (cl.style) {
            height = window.cl_win.document.getElementById("CLTbl").offsetHeight + "px";
            //D.Chernysh: document.all - устаревший метод, не работает в FF 15.0.1
            //width=window.cl_win.d.all.DayTbl.scrollWidth+3;
            width = window.cl_win.document.getElementById('DayTbl').scrollWidth + 3;
        }
    }
    this.hide = function () {
        cl.style.visibility = 'hidden';
        window._calendar_.show = false;
    }
    this.show = function () {
        try {
            _l = window.cl_win.c_loaded
        } catch (e) {
            _l = false
        }
        if (!_l) {
            if (!window.TClnd)window.TClnd = window.setInterval("window._calendar_.show();", 100);
            return;
        }
        window.clearInterval(window.TClnd);
        window.cl_win.mwin = w;
        this.fill();
        cl.style.visibility = 'visible';
        window._calendar_.show = true;
        _attachEvents(w);
    }
    //выдел€ем число в календаре
    this.setActD = function (o) {
        try {
            this.actDay.className = '';
        } catch (e) {
        }
        this.actDay = o;
        //D.Chernysh: document.all - устаревший метод, не работает в FF 15.0.1
        //window.cl_win.d.all.CLTbl.setAttribute("ovr",'1');
        window.cl_win.document.getElementById('CLTbl').setAttribute("ovr", '1');

        this.actDay.className = aCL;
        iActD = parseInt(this.actDay.innerHTML, 10);
        /*D.Chernysh: в Opera 12 визуально не отображаетс€ результат метода className объекта this.actDay, 
         хот€ в коде CSS-класс добавл€етс€. ѕричина непон€тна...
         –ешение  - переписать значение в теге методом innerHTML и визуально применитьс€ CSS-класс.
         -->*/
        if (IsOpera) this.actDay.innerHTML = iActD;

    }
    this.insDate = function (bToday) {
        var newVal = bToday ? sToday : FormatDate(iActD, iMM + 1, iYY);
        this.input.value = newVal;
        this.hide();
        if (this.input.getAttribute('DTYPE') == 'Date') {
            this.input.setAttribute('_VALUE', newVal);
            this.input.setAttribute('err', '0');
            elementMsgErrHide();
            this.input.className = this.input.className.replace(/[ ]?incorrectValue/, '');
        }
    }
    var id = 'calendar';
    try {
        this.input = $(window, inp)
    } catch (e) {
        this.input = null
    }
    this.ClBtn = e.target || e.srcElement;
    try {
        cl = $(w, id);
    } catch (e) {
        cl = null
    }
    if (!cl) {
        cl = window.document.createElement('IFRAME');
        cl.style.visibility = 'hidden';
        cl.frameBorder = '0';
        cl.marginWidth = '0';
        cl.scrolling = 'no';
        cl.setAttribute('NAME', id);
        cl.setAttribute('id', id);
        cl.src = '../calendar.html';
        this.position();
        isIE ? window.document.body.insertAdjacentHTML('beforeEnd', cl.outerHTML) : window.document.body.appendChild(cl);
        cl = $(w, id);
        window.cl_win = window.frames[window.frames.length - 1];
    } else this.position();
}

function ShowCalendar(w, e, inp) {
    window._calendar_ = new Calendar(w, e, inp);
    window._calendar_.show();
}
function HideCalendar(w) {
    try {
        window._calendar_.hide()
    } catch (e) {
    }
}
function PrevNextClnd(w, iT) {
    if (!window._calendar_)return;
    /*D.Chernysh: document.all - устаревший метод, не работает в FF 15.0.1
     var iY=parseInt(w.document.all.YEAR.innerHTML,10),
     iM=parseInt(w.document.all.MNT.getAttribute('I'),10);
     */
    var iY = parseInt(w.document.getElementById('YEAR').innerHTML, 10),
        iM = parseInt(w.document.getElementById('MNT').getAttribute('I'), 10);
    //
    switch (iT) {
        case 1:
            iM--;
            break;
        case 2:
            iM++;
            break;
        case 3:
            if (iY <= iMinYear)return;
            iY--;
            break;
        case 4:
            if (iY >= iMaxYear)return;
            iY++;
            break;
    }
    if (iM < 0) {
        iM = 11;
        iY--
    }
    if (iM == 12) {
        iM = 0;
        iY++
    }
    var dt = new Date(iY, iM, 1);
    window._calendar_.fill(dt);
}
function SelectDay(w, e) {
    var o = e.target || e.srcElement;
    if (!window._calendar_)return;
    if (parseInt('0' + o.innerHTML, 10) <= 0)return;
    window._calendar_.setActD(o);
}
function InsDate(w, today) {
    window._calendar_.insDate(today);
}
function ClickHideClnd(w, e) {
    try {
        if (!window._calendar_.show)return;
        if (!e)HideCalendar(w)
        else {
            var o = e.target || e.srcElement;
            if (o != window._calendar_.ClBtn)HideCalendar(w);
        }
    } catch (e) {
    }
}

function MonthPlus(w, inp) {
    try {
        if ($(w, inp).value == '') {
            $(w, inp).value = String(iYY_Today) + RD(iMM_Today)
        }
        var y = $(w, inp).value.substr(0, 4);
        m = $(w, inp).value.substr(4, 2);
        if (m == '12') {
            y = String(Number(y) + 1);
            m = '01';
        } else {
            m = RD(Number(m) + 1);
        }
        $(w, inp).value = y + m;
        $(w, 'PREF_' + inp).value = ar_g_MonthN[Number(m) - 1] + ' ' + y;
    } catch (e) {
    }
}

function MonthMinus(w, inp) {
    try {
        if ($(w, inp).value == '') {
            $(w, inp).value = String(iYY_Today) + RD(iMM_Today)
        }
        var y = $(w, inp).value.substr(0, 4);
        m = $(w, inp).value.substr(4, 2);
        if (m == '01') {
            y = String(Number(y) - 1);
            m = '12';
        } else {
            m = RD(Number(m) - 1);
        }
        $(w, inp).value = y + m;
        $(w, 'PREF_' + inp).value = ar_g_MonthN[Number(m) - 1] + ' ' + y;
    } catch (e) {
    }
}

function MonthFormat(val) {
    try {
        var y = val.substr(0, 4);
        m = val.substr(4, 2);
        return ar_g_MonthN[Number(m) - 1] + ' ' + y;
    } catch (e) {
    }
}

//—ледующий мес€ц (название)+год(цифры)
function MonthNameAndYearPlus(w, inp) {
    try {
        var m, y;
        if (($(w, 'PREF_' + inp).value == '') || ($(w, 'PREF_' + inp).value == 'undefined')) {
            $(w, 'PREF_' + inp).value = String(iYY_Today) + RD(iMM_Today);
        }
        y = $(w, 'PREF_' + inp).value.substr(0, 4);
        m = $(w, 'PREF_' + inp).value.substr(4, 2);
        if (m == '12') {
            y = String(Number(y) + 1);
            m = '01';
        }
        else {
            m = RD(Number(m) + 1);
        }
        $(w, 'PREF_' + inp).value = y + m;
        $(w, inp).value = ar_g_MonthN[Number(m) - 1] + ' ' + y;
    } catch (e) {
    }
}
//ѕредыдущий мес€ц (название)+год(цифры)
function MonthNameAndYearMinus(w, inp) {
    try {
        var m, y;
        if (($(w, 'PREF_' + inp).value == '') || ($(w, 'PREF_' + inp).value == 'undefined')) {
            $(w, 'PREF_' + inp).value = String(iYY_Today) + RD(iMM_Today);
        }
        y = $(w, 'PREF_' + inp).value.substr(0, 4);
        m = $(w, 'PREF_' + inp).value.substr(4, 2);
        if (m == '01') {
            y = String(Number(y) - 1);
            m = '12';
        } else {
            m = RD(Number(m) - 1);
        }
        $(w, 'PREF_' + inp).value = y + m;
        $(w, inp).value = ar_g_MonthN[Number(m) - 1] + ' ' + y;
    } catch (e) {
    }
}

//****************************************************************************
//Chernysh D.V.: дл€ ”кртелекома ( иев) формат периода не такой как везде.
//1-а€ цифра Ц всегда статична (3);
//2-а€ Ц последн€€ цифра года (2012);
//3-€ и 4-€ Ц пор€дковый номер мес€ца, за который выставл€етс€ счет. 
function DayMonthPlus(w, inp) {
    try {
        var d = String(3);    //всегда статична (3)
        if ($(w, inp).value == '') {
            var per = d + String(iYY_Today.substr(3, 1)) + RD(iMM_Today);
            $(w, inp).value = per;
            $(w, 'PREF_' + inp).value = String(iYY_Today) + RD(iMM_Today);
        }
        var y = $(w, 'PREF_' + inp).value.substr(0, 4),     //пор€дковый номер мес€ца
            m = $(w, 'PREF_' + inp).value.substr(4, 2); 	  //год полностью YYYY
        if (m == '12') {
            m = '01';
            y = String(Number(y) + 1);
        } else {
            m = RD(Number(m) + 1);
        }
        $(w, 'PREF_' + inp).value = y + m;
        $(w, inp).value = d + String(y.substr(3, 1)) + m;
    } catch (e) {
    }
}
function DayMonthMinus(w, inp) {
    try {
        var d = String(3);    //всегда статична (3
        if ($(w, inp).value == '') {
            var per = d + String(iYY_Today.substr(3, 1)) + RD(iMM_Today);
            $(w, inp).value = per;
            $(w, 'PREF_' + inp).value = per;
        }
        var y = $(w, 'PREF_' + inp).value.substr(0, 4),    //пор€дковый номер мес€ца
            m = $(w, 'PREF_' + inp).value.substr(4, 2);	 //год полностью YYYY
        if (m == '01') {
            m = '12';
            y = String(Number(y) - 1);
        } else {
            m = RD(Number(m) - 1);
        }
        $(w, 'PREF_' + inp).value = y + m;
        $(w, inp).value = d + String(y.substr(3, 1)) + m;
    } catch (e) {
    }
}
//********************************************************************************

// *** преобразование даты док-та в формат √√√√ћћƒƒ дл€ PayDate (киев коммуналка)
function PayDate(val_date) {
    try {
        var y = val_date.substr(6, 4);
        m = val_date.substr(3, 2);
        d = val_date.substr(0, 2);
        return y + m + d;
    } catch (e) {
    }
}

c_calendar_js = true;
/*version 2013.12.05*/