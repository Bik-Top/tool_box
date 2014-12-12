/*version 2013.05.30*/
var NO_EFFECT = 'NO',
    HORIZONT_EFFECT = 'HORIZONT',
    VERTICAL_EFFECT = 'VERTICAL',
    BOTH_EFFECT = 'BOTH',
    POSITION_TOP = 'TOP',
    POSITION_CENTER = 'CENTER',
    POSITION_LEFT = 'LEFT',
    POSITION_RIGHT = 'RIGHT',
    POSITION_BOTTOM = 'BOTTOM',
    BOX_STATUS = 0;

function iMaxH() {
    return ((window.clientHeight || window.document.body.clientHeight) - 80);
}

var MessageBoxParams = {
    //InitWidth :  350, //default width of message
    //InitHTMLWidth   :  800, //default minimum width of HTML pupup
    //Opacity      :  100, //opacity in %
    //ButtonOK  :  'Закрыть', //text on button
    //ShowEffects  :  BOTH_EFFECT, // NO, HORIZONT, VERTICAL or BOTH slow appirance of message
    //PupUpPosition   :  [POSITION_CENTER,POSITION_CENTER], //position of messagebox, {x,y} coords. Your can set own coords like {500,400} in px
    Moveable: true, // moveable popup
    //SaveLastMovePosition  :  false, //save last x & y position if popup has been moved
    //Resize    :  false, // if popup resizeable or not
    StyleDir: '../css/', //path to style files
    ImgDir: '../img/msgbox/' //path to img files
};

/*Окно предупреждения*/
var AlertBoxProps = {
    ShowEffectType: BOTH_EFFECT, //Chernysh: убираем эффект. Некорректно в Opera 11.10
    ButtonOK: C_LRSCls,
    InitWidth: '410px',
    PupUpPosition: [POSITION_CENTER, POSITION_CENTER],
    Moveable: true
};

/*Окно со строкой ввода*/
var PromptBoxProps = {
    ShowEffectType: BOTH_EFFECT,
    ButtonOK: C_LRSOk,
    ButtonCancel: C_LRSCancel,
    InitWidth: '380px',
    //  InitHeight   : 'AUTO',
    PupUpPosition: [POSITION_CENTER, POSITION_CENTER],
    Moveable: true
};
/*Окно подтвердждения ДА/НЕТ*/
var ConfirmBoxProps = {
    ShowEffectType: BOTH_EFFECT,
    ButtonOK: C_LRSOk,
    ButtonCancel: C_LRSCancel,
    InitWidth: '380px',
    PupUpPosition: [POSITION_CENTER, POSITION_CENTER],
    Moveable: true
};
//***************************************************end var
/*Окно просмотра детальной инф. по счету/карте/и т.д.*/
var AlertHTMLBoxProps = {
    ShowEffectType: BOTH_EFFECT,
    ButtonOK: C_LRSCls,
    InitWidth: 'AUTO',
    PupUpPosition: [POSITION_CENTER, POSITION_CENTER],
    Moveable: true
};
var WinHTMLBoxProps = {
    ShowEffectType: NO_EFFECT,
    ButtonOK: C_LRSCls,
    InitWidth: '800px',
    //  InitHeight  : 'MAX', //ChernyshDV: в Safari с MAX вниз страницы добавляется пустое пространство
    PupUpPosition: [POSITION_CENTER, '20'],// [POSITION_CENTER,POSITION_CENTER],
    Moveable: true
};
var PullDownProps = {
    ShowEffectType: NO_EFFECT,//VERTICAL_EFFECT,
    InitWidth: '300px',
    PupUpPosition: [POSITION_RIGHT, POSITION_TOP],
    ShowForTimer: 5
};

var PullDownPropsInfo = {
    ShowEffectType: NO_EFFECT, //VERTICAL_EFFECT,
    InitWidth: '300px',
    PupUpPosition: [POSITION_RIGHT, POSITION_BOTTOM],
    ShowForTimer: 5
};
var PullDownAcyncProcessInfo = {
    ShowEffectType: NO_EFFECT, //VERTICAL_EFFECT,
    InitWidth: '450px',
    PupUpPosition: ['280'], /*отступ слева*/
    ShowForTimer: 20
};
var MessageBoxObject = {
    alert: function (x, xHead, hideProc) {
//    try{DSBForm(w,true);}catch(e){}
        if (!MessageBoxObject.AlertBox) MessageBoxObject.AlertBox = new AlertBox();
        MessageBoxObject.AlertBox.setName('MessageBoxObject.AlertBox');
        MessageBoxObject.AlertBox.setProps(AlertBoxProps);
        MessageBoxObject.AlertBox.setTitle(xHead);
        MessageBoxObject.AlertBox.setBody(x, true);
        MessageBoxObject.AlertBox.setCloseMethod(hideProc);
        BOX_STATUS = BOX_STATUS + 1;
        MessageBoxObject.AlertBox.show();
    },

    prompt: function (x, xHead, doc, dtype, NAME, hideProc) {   //NAME
        if (!MessageBoxObject.PromptBox) MessageBoxObject.PromptBox = new AlertBox();
        MessageBoxObject.PromptBox.setName('MessageBoxObject.PromptBox');
        MessageBoxObject.PromptBox.setProps(PromptBoxProps);
        MessageBoxObject.PromptBox.setTitle(xHead);
        MessageBoxObject.PromptBox.setInput(x, doc, dtype, NAME, true);
        MessageBoxObject.PromptBox.setCloseMethod(hideProc);
        BOX_STATUS = BOX_STATUS + 1;
        MessageBoxObject.PromptBox.showprompt();
        $(w,'NEW').value = NAME;
    },
    confirm: function (x, xHead, doc, hideProc) {
        if (!MessageBoxObject.ConfirmBox) MessageBoxObject.ConfirmBox = new AlertBox();
        MessageBoxObject.ConfirmBox.setName('MessageBoxObject.ConfirmBox');
        MessageBoxObject.ConfirmBox.setProps(ConfirmBoxProps);
        MessageBoxObject.ConfirmBox.setTitle(xHead);
        MessageBoxObject.ConfirmBox.setBody(x, doc, true);
        MessageBoxObject.ConfirmBox.setCloseMethod(hideProc);
        BOX_STATUS = BOX_STATUS + 1;
        MessageBoxObject.ConfirmBox.show(x, doc);
    },
//***************************************end

    alertHTML: function (x, xHead, newBoxProps) {
        if (!MessageBoxObject.AlertHTMLBox) MessageBoxObject.AlertHTMLBox = new AlertBox();
        MessageBoxObject.AlertHTMLBox.setName('MessageBoxObject.AlertHTMLBox');
        MessageBoxObject.AlertHTMLBox.setProps(newBoxProps || AlertHTMLBoxProps);
        MessageBoxObject.AlertHTMLBox.setTitle(xHead);
        MessageBoxObject.AlertHTMLBox.setBody(x);
        BOX_STATUS = BOX_STATUS + 1;
        MessageBoxObject.AlertHTMLBox.show();
        //Chernysh: задание ширины окна для IE
        if (window.navigator.userAgent.indexOf('MSIE') >= 0) {
            MessageBoxObject.AlertHTMLBox.setMinWidth(x);
        }

    },
    pullDown: function (x) {
        if (!MessageBoxObject.PullDown)MessageBoxObject.PullDown = new PullDown();
        MessageBoxObject.PullDown.setName('MessageBoxObject.PullDown');
        MessageBoxObject.PullDown.setProps(PullDownProps);
        MessageBoxObject.PullDown.setBody(x);
        MessageBoxObject.PullDown.show();
    },
    pullInfo: function (x) {
        if (!MessageBoxObject.pullDownInfo)MessageBoxObject.pullDownInfo = new PullDown();
        MessageBoxObject.pullDownInfo.setName('MessageBoxObject.pullDownInfo');
        MessageBoxObject.pullDownInfo.setProps(PullDownPropsInfo);
        MessageBoxObject.pullDownInfo.setBody(x);
        MessageBoxObject.pullDownInfo.show();
    },
    pullDownAcyncInfo: function (x) {
        if (!MessageBoxObject.pullDownAcyncProcess)MessageBoxObject.pullDownAcyncProcess = new PullDown();
        MessageBoxObject.pullDownAcyncProcess.setName('MessageBoxObject.pullDownAcyncProcess');
        MessageBoxObject.pullDownAcyncProcess.setProps(PullDownAcyncProcessInfo);
        MessageBoxObject.pullDownAcyncProcess.setBody(x);
        MessageBoxObject.pullDownAcyncProcess.show();
    }
};

//**************MsgBox - PullDown
function PullDown() {
    this.PullDownBox = getNewLayer('PullDown');
    window.document.body.appendChild(this.PullDownBox);

    this.visualEffects = new VisualEffects();
    this.visualEffects.setEffectObject(this.PullDownBox);

    this.setName = function (x) {
        this.objName = x;
    };
    this.getName = function () {
        return this.objName;
    };
    this.setProps = function (Obj) {
        this.Props = Obj;
        this.visualEffects.setType(Obj.ShowEffectType);
    };

    this.setBody = function (x) {
        this.PullDownBox.innerHTML = '<P>' + x.replace(/\n/g, '</P><P>') + '</P>';
    };

    this.close = function () {
        this.PullDownBox.innerHTML = '';
        this.PullDownBox.style.display = 'none';
    };

    this.show = function () {
        if (this.TimeOutID)window.clearTimeout(this.TimeOutID);
        //this.PullDownBox.style.width = this.Props.InitWidth+'px';
        this.PullDownBox.style.width = this.Props.InitWidth;
        this.visualEffects.start(this.objName + '.visualEffects', 1);
        placeToCoords(this.PullDownBox, this.Props.PupUpPosition[0], this.Props.PupUpPosition[1]);
        if (this.Props.ShowForTimer)this.TimeOutID = window.setTimeout(this.getName() + '.close()', this.Props.ShowForTimer * 1000);
        this.PullDownBox.style.zIndex = '10000';
    }
}
//*************MsgBox - alert
function AlertBox() {

    this.alertBox = getNewLayer('MessageBox');
    this.IsShow = false;
    with (this.alertBox.style) {
        display = 'none';
    }

    this.headBlock = getNewLayer('MessageBoxHead');
    this.alertBox.appendChild(this.headBlock);

    this.textBlock = getNewLayer('MessageBoxText');
    this.textBlock.id = 'MessageBoxText';
    this.alertBox.appendChild(this.textBlock);

    this.buttonBlock = getNewLayer('MessageBoxButtons');
    this.alertBox.appendChild(this.buttonBlock);
    window.document.body.appendChild(this.alertBox);

    this.visualEffects = new VisualEffects();
    this.visualEffects.setEffectObject(this.alertBox);

    this.setName = function (x) {
        this.objName = x;
    };
    this.getName = function (x) {
        return this.objName;
    };

    this.setTitle = function (x) {
        this.headBlock.innerHTML = x ? x : '&nbsp;';
        placeToCoords(this.alertBox, this.Props.PupUpPosition[0], this.Props.PupUpPosition[1]);
    };

    this.setBody = function (x, doTransform) {
        try {
            if (!window.Disabled) DSBForm(w, true);
        } catch (e) {
        }
        this.textBlock.innerHTML = doTransform ? ('<P>' + x.replace(/\n/g, '</P><P>') + '</P>') : x;
    };
    //Chernysh: for AlertHTML if IE
    this.setMinWidth = function (x) {
        this.alertBox.style.width = 1020 + 'px';
    };


//********************
    this.setInput = function (x, doc, dtype, NAME) {
        try {
            if (!window.Disabled) DSBForm(w, true);
        } catch (e) {
        }
        var content = '<P>' + x.replace(/\n/g, '</P><P>') + '</P><br/><div align="center"><input name="NEW" type="text" dtype=' + '"' + dtype + '"' + ' style="width:260px;" class="elm-inp" maxlength="100" value="' + NAME + '"></input><input name="DOC" style="width:0px;" type="hidden" value=' + doc + '></input></div>';
        this.textBlock.innerHTML = content;
    };
//******************************************end of function

    this.clearBody = function (x, doTransform) {
        this.textBlock.innerHTML = '..';
    };

    this.setProps = function (Obj) {
        this.Props = Obj;
        this.visualEffects.setType(Obj.ShowEffectType);

        if (this.Props.Moveable) {
            attachMoveHandl('mousedown', this.getName(), 'mousedown', this.headBlock);
            attachMoveHandl('mousemove', this.getName(), 'mousemove', this.headBlock);
            attachMoveHandl('mouseup', this.getName(), 'mouseup', this.headBlock);
            attachMoveHandl('mouseout', this.getName(), 'mouseup', this.headBlock);
        }
    };

    this.setCloseMethod = function (obj) {
        this.CloseMethod = obj ? obj : null;
    };

    this.show = function (x, doc) {
        // this.alertBox.style.width = this.Props.InitWidth.toString()+'px';
        this.alertBox.style.width = this.Props.InitWidth.toString();
        switch (doc) {
            case 'del':
            case 'getNewMobiPass':
            case 'getCurrMobiPass':
                this.buttonBlock.innerHTML = '<BUTTON onclick="' + this.getName() + '.' + doc + '()" onmouseout="Top.ElDisAct(w,this);" onmouseover="Top.ElAct(w,this);">' + this.Props.ButtonOK + '</BUTTON><BUTTON onclick="' + this.getName() + '.close()" onmouseout="Top.ElDisAct(w,this);" onmouseover="Top.ElAct(w,this);">' + this.Props.ButtonCancel + '</BUTTON>';
                break;
            default:
                this.buttonBlock.innerHTML = '<BUTTON onclick="' + this.getName() + '.close()" onmouseout="Top.ElDisAct(w,this);" onmouseover="Top.ElAct(w,this);">' + this.Props.ButtonOK + '</BUTTON>';
                break;
        }

        if (this.alertBox.style.display == 'block') BOX_STATUS = BOX_STATUS - 1;
        this.alertBox.style.display = 'block';
        if (this.objName == 'MessageBoxObject.AlertHTMLBox') this.alertBox.style.zIndex = '10000';
        else this.alertBox.style.zIndex = '10005';
        this.setPupUpHeight();
        this.visualEffects.start(this.objName + '.visualEffects');
        this.IsShow = true;
        this.setPosition();
        _attachElmHndlrs(w, $(window, 'MessageBoxText'));
    };

//**************** 
    this.showprompt = function (x) {
        //  this.alertBox.style.width = this.Props.InitWidth.toString()+'px';
        this.alertBox.style.width = this.Props.InitWidth.toString();
        this.buttonBlock.innerHTML = '<BUTTON onclick="' + this.getName() + '.ok()" onmouseout="Top.ElDisAct(w,this);" onmouseover="Top.ElAct(w,this);">' + this.Props.ButtonOK + '</BUTTON><BUTTON onclick="' + this.getName() + '.close()" onmouseout="Top.ElDisAct(w,this);" onmouseover="Top.ElAct(w,this);">' + this.Props.ButtonCancel + '</BUTTON>';
        if (this.alertBox.style.display == 'block') BOX_STATUS = BOX_STATUS - 1;
        this.alertBox.style.display = 'block';
        if (this.objName == 'MessageBoxObject.AlertHTMLBox') this.alertBox.style.zIndex = '10000';
        else this.alertBox.style.zIndex = '10005';
        this.setPupUpHeight();
        this.visualEffects.start(this.objName + '.visualEffects');
        this.IsShow = true;
        this.setPosition();
        _attachElmHndlrs(w, $(window, 'MessageBoxText'));
    };
//***********************************************

    this.setPosition = function () {
        placeToCoords(this.alertBox, this.Props.PupUpPosition[0], this.Props.PupUpPosition[1]);
    };
    this.setPupUpHeight = function () {
        var iHMax = iMaxH();
        if (this.Props.InitHeight) {
            var iH = this.Props.InitHeight;
            if (this.Props.InitHeight == 'MAX')iH = iHMax;
            this.textBlock.style.height = (iH - this.headBlock.offsetHeight - this.buttonBlock.offsetHeight).toString() + 'px';
            this.alertBox.style.height = iH + 'px';
            return;
        }

        this.alertBox.style.height = 'auto';
        this.textBlock.scrollTop = 0;
        if (this.alertBox.scrollHeight > iHMax) {
            this.textBlock.style.height = (iHMax - this.headBlock.offsetHeight - this.buttonBlock.offsetHeight).toString() + 'px';
            this.alertBox.style.height = iHMax.toString() + 'px';
        }
        var iDif = this.alertBox.scrollHeight - this.textBlock.scrollHeight;
        if (iDif < 0) {
            this.textBlock.style.height = this.textBlock.scrollHeight + iDif - this.headBlock.offsetHeight - this.buttonBlock.offsetHeight;
            this.alertBox.style.height = (this.textBlock.offsetHeight + this.headBlock.offsetHeight + this.buttonBlock.offsetHeight).toString() + 'px';
        } else {
            this.textBlock.style.height = 'auto';
            this.alertBox.style.height = 'auto';
        }
    };

    this.close = function () {
            try {
                wait_hide(w);
            } catch (e) {
            }
        this.clearBody();
        this.alertBox.style.display = 'none';
        this.alertBox.style.height = '100%';
        BOX_STATUS = BOX_STATUS - 1;
        try {
            if (BOX_STATUS == 0) {
                DSBForm(w, false);
                if (w.IsDict) w.IsDict = false;
            }
        } catch (e) {
        }
        if (!this.CloseMethod)return;
        try {
            if (typeof(this.CloseMethod) == 'object')this.CloseMethod.focus();
            else {
                var bResult = true;
                try {
                    eval.call(window, this.CloseMethod)
                } catch (e) {
                    bResult = false
                }
                try {
                    if (!bResult)eval(this.CloseMethod)
                } catch (e) {
                    alert(e || e.description)
                }
            }
        } catch (e) {
        }
        this.IsShow = false;
    };
    //**********************
    this.ok = function () {
        var NEW = $(w, 'NEW').value,
            DOC = $(w, 'DOC').value;
        if (NEW == '' && DOC != 'accounts' && DOC != 'deposits') {
            this.close(fn_alert(w, MSGCheck, 2));
            return;
        }
        if (DOC == 'cform') {
            this.close(ACTF(w, 'SAVEDOCASTPL', NEW));
        }  //возврат в c_form
        if (DOC == 'deposits') {
            this.close(fnChangeDepName(NEW));
        }
        if (DOC == 'accounts') {
            this.close(fnChangeAccName(NEW));
        }  //возврат в accounts
        if (DOC == 'mncpaydnepr') {
            this.close(ConfirmAddC(NEW));
        }  //возврат в accounts
        if (DOC == 'mncpaydneprP') {
            this.close(ConfirmAddP(NEW));
        }
        fn_wait(w);
        DSBForm(w, true);
    };

    this.del = function () {
        switch ($(window, 'SCHEMENAME').value) {
            case 'MNCPAYDNEPR':
                this.close(toPage(w, 3, 'yes'));
                break;
            case 'REGULARPAYDOCS':
                this.close(ACTS(w, 'DEL_REGULARPAY', '', '', '', '', 'yes'));
                break;
            case 'INFOCOMPAY':
                this.close(fnDelPayments(w,'yes'));
                break;
            default:
                this.close(ACTS(w, 'DEL', '', '', '', '', 'yes'));
                break;
        }
        fn_wait(w);
        DSBForm(w, true);
    };

    this.getNewMobiPass = function () {
        if ($(window, 'SCHEMENAME').value == 'MOBILEBANK')this.close(fnGetMobiPass(w, true));
        else {
            this.close();
        }
    };
    this.getCurrMobiPass = function () {
        if ($(window, 'SCHEMENAME').value == 'MOBILEBANK')this.close(fnGetMobiPass(w, false));
        else {
            this.close();
        }
    };
    //********************************************************************

    this.mousedown = function (e) {
        if (!e)e = window.event;
        var el = e.target || e.srcElement;
        this.objX = e.layerX || e.offsetX;
        this.objY = e.layerY || e.offsetY;
        try {
            e.returnValue = false;
        } catch (e) {
        }
        try {
            e.preventDefault();
        } catch (e) {
        }
    };
    this.mousemove = function (e) {
        if (!e)e = window.event;
        if (!this.objX || !this.objY)return;
        var iXX = (e.clientX - this.objX + document.body.scrollLeft);
        var iYY = (e.clientY - this.objY + document.body.scrollTop);
        this.alertBox.style.left = iXX.toString() + 'px';
        this.alertBox.style.top = iYY.toString() + 'px';
        try {
            e.returnValue = false;
        } catch (e) {
        }
        try {
            e.preventDefault();
        } catch (e) {
        }
    };

    this.mouseup = function () {
        this.objX = null;
        this.objY = null;
    }

}

//***************VisualEffects  
//Chernysh: Opera 11.10 неадекватно воспринимает свойство CLIP - блок (окно) не видно вовсе
function VisualEffects() {
    this.setType = function (x) {
        this.effectType = x;
    };
    this.setEffectObject = function (obj) {
        this.effectObject = obj;
    };
    this.start = function (xIntervalObj, iInt) {
        if (!iInt)iInt = 10;
        switch (this.effectType) {
            case HORIZONT_EFFECT:
            case VERTICAL_EFFECT:
            case BOTH_EFFECT:

                var bBE = this.effectType == BOTH_EFFECT;
                this.heightClip = bBE ? 0 : 15;
                this.widthClip = bBE ? 0 : 15;
                //FIX from v2.4 for Opera 11.10, затирает эти параметры после установки clip:
                var oldHeight = this.effectObject.offsetHeight,
                    oldWidth = this.effectObject.offsetWidth;
                this.effectObject.style.clip = 'rect(0px,0px,0px,0px)';
                //восстанавливаем параметры для Opera
                if (IsOpera) {
                    this.effectObject.offsetHeight = oldHeight;
                    this.effectObject.offsetWidth = oldWidth;
                }

                this.effectObject.style.display = 'block';
                if (bBE) {
                    this.iCntX = this.effectObject.offsetWidth / 2;
                    this.iCntY = this.effectObject.offsetHeight / 2;
                }
                this.show(xIntervalObj, iInt);
                break;
            default:
                this.effectObject.style.display = 'block';
                break;
        }
    };
    this.show = function (xIntervalObj, iInt) {
        var iTop = 0, iBottom = 0, iRight = 0, iLeft = 0;
        switch (this.effectType) {
            case HORIZONT_EFFECT:
                this.widthClip += 25;
                iRight = this.widthClip;
                iBottom = this.effectObject.offsetHeight;
                break;
            case VERTICAL_EFFECT:
                this.heightClip += 20;// this.heightClip+=20; - так было
                iRight = this.effectObject.offsetWidth;
                iBottom = this.heightClip; //iBottom=this.heightClip; - так было
                break;
            case BOTH_EFFECT:
                iRight = this.iCntX + this.widthClip;
                iBottom = this.effectObject.offsetHeight;
                iLeft = this.effectObject.offsetWidth / 2 - this.widthClip;

                this.iCntX += 1;
                this.heightClip = this.heightClip * 2 + 1;
                this.iCntY -= this.effectObject.offsetHeight / 10;
                this.widthClip = this.widthClip * 2 + 1;
                break;
            default:
                this.effectObject.style.display = 'block';
                break;
        }
        // alert('iTop = '+iTop+'; iRight = '+iRight+'; iBottom = '+iBottom+'; iLeft = '+iLeft);
        this.effectObject.style.clip = 'rect(' + iTop.toString() + 'px,' + iRight.toString() + 'px,' + iBottom.toString() + 'px,' + iLeft.toString() + 'px)';
        if (!(iBottom >= this.effectObject.offsetHeight && iRight >= this.effectObject.offsetWidth))setTimeout(xIntervalObj.toString() + '.show("' + xIntervalObj + '")', 10);//iInt
    }

}
//****************VisualEffects
function placeToCoords(obj, x, y) {
    var xScroll = window.document.body.scrollLeft,
        yScroll = window.document.body.scrollTop,
        xPos = 3 + xScroll,
        yPos = 3 + yScroll,
        xWidth = window.innerWidth || window.document.body.clientWidth,
        xHeight = window.innerHeight || window.document.body.clientHeight;

    switch (x) {
        case POSITION_CENTER:
            xPos = xWidth / 2 + xScroll - obj.offsetWidth / 2;
            break;
        case POSITION_RIGHT:
            xPos = xWidth + xScroll - obj.offsetWidth - 20;
            break;
        default:
            xPos = x;
            break;
    }
    switch (y) {
        case POSITION_CENTER:
            yPos = xHeight / 2 + yPos - obj.offsetHeight / 2
            break;
        case POSITION_BOTTOM:
            yPos = xHeight + yScroll - obj.offsetHeight - 3;
            break;
        default:
            yPos = y;
            break;
    }
    if (yPos < 0)yPos = 10 + yScroll;
    if (xPos < 0)xPos = 10 + xScroll;
    //Chernysh D.V.: нужно проверять число ли это, иначе IE матюкается
    if (!isNaN(xPos * 1)) obj.style.left = xPos + 'px';
    if (!isNaN(yPos * 1)) obj.style.top = yPos + 'px';
}

function getNewLayer(className) {
    var oL = window.document.createElement('DIV');
    if (className)oL.className = className;
    return oL;
}

function attachMoveHandl(x, objName, func, obj) {
    if (obj.attachEvent)obj.attachEvent('on' + x, new Function(objName + '.' + func + '.apply(' + objName + ', arguments)'))
    else obj.addEventListener(x, new Function(objName + '.' + func + '.apply(' + objName + ', arguments)'), false);
}
//loading CSS
//*********************************************
function MessageBoxCSSLoad() {
    try {
        if (!window.document.body)return;
        window.clearInterval(window.MessageBoxInterval);
        var cssFileName = MessageBoxParams.StyleDir + 'msgbox.css';
        if (MessageBoxParams.StyleDir) {
            if (window.document.createStyleSheet)window.document.createStyleSheet(cssFileName)
            else {
                var in_style = window.document.createElement('LINK');
                in_style.setAttribute('REL', 'stylesheet');
                in_style.setAttribute('HREF', cssFileName);
                window.document.getElementsByTagName('HEAD')[0].appendChild(in_style);
            }
        }
    } catch (e) {
    }
}
if (MessageBoxParams.StyleDir)
    window.MessageBoxInterval = window.setInterval(MessageBoxCSSLoad, 200);