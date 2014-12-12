var itemCount = 0;
var itemsString = null;

var sheduleTypeMap = {
    d: {
        name: PPLRS11,
        createEdit: function () {
            if ($(w, 'USEWORKDAYONLY').value == '1') return null;
            else {
                var edit = document.createElement('div');
                edit.id = 'dayTypeGroup';
                edit.innerHTML =
                    '<input type="radio" name="dt" id="dt1" value="ed" onclick="" checked="checked">' +
                        '<label for="dt1">' + PPLRS23 + '</label>' +
                        '</input><br/>' +
                        '<input type="radio" name="dt" id="dt2" value="wd" onclick="">' +
                        '<label for="dt2">' + PPLRS24 + '</label>' +
                        '</input>';

                return edit;
            }
        },
        canAddItem: function () {
            return byId('items').children.length < 1;
        },
        caption: function () {
            return ($(w, 'USEWORKDAYONLY').value == '1') ? PPLRS12 : '';
        }
    },

    w: {
        name: PPLRS13,
        createEdit: function () {
            var edit = document.createElement('select');
            edit.className = 'elm-inp';
            edit.options[0] = new Option('', 0);
            for (var i = 1; i < (($(w, 'USEWORKDAYONLY').value == '1') ? 6 : 8); i++)
                edit.options[i] = new Option(WeekDay[i - 1], i);
            return edit;
        },
        canAddItem: function () {
            return byId('items').children.length < 5;
        },
        caption: PPLRS14
    },

    m: {
        name: PPLRS15,
        createEdit: function () {
            var edit = document.createElement('select');
            //edit.style.width='50px';
            edit.className = 'elm-inp';
            initDays(edit);
            return edit;
        },
        canAddItem: function () {
            return byId('items').children.length < 31;
        },
        caption: PPLRS16
    },

    y: {
        name: PPLRS17,
        createEdit: function () {
            var edit = document.createElement('div');

            var d = document.createElement('select');
            d.className = 'elm-inp payonetime_edit_m';
            initDays(d);

            var m = document.createElement('select');
            m.className = 'elm-inp payonetime_edit_w';

            var mn = C_LRSMounths.split(',');
            for (var i = 0; i < mn.length; i++)
                m.options[i] = new Option(mn[i], i + 1);

            edit.appendChild(d);
            edit.appendChild(m);

            return edit;
        },
        canAddItem: function () {
            return true;
        },
        caption: PPLRS18
    }
};

document.getElementsByClassName = function (cl) {
    var retnode = [];
    var myclass = new RegExp('\\b' + cl + '\\b');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) {
        var classes = elem[i].className;
        if (myclass.test(classes)) retnode.push(elem[i]);
    }
    return retnode;
};

function initDays(select) {
    select.options[0] = new Option('', 0);
    for (var i = 1; i <= 31; i++)
        select.options[i] = new Option(i, i);
}

function byId(id) {
    return document.getElementById(id);
}

function itemSelect(item) {
    var items = byId('items').children;
    for (var i = 0; i < items.length; i++) {
        var td = items[i].getElementsByTagName('td');
        if (td.length > 0) td[0].className = (items[i] == item) ? (sheduleTypeId() == 'd' ? 'itemSelectorFocusNoImg' : 'itemSelectorFocus') :
            'itemSelectorBlur';
    }
}

function itemClick(item) {
    itemSelect(item);
}

/*--- Выбор типа расписания (ежедневно, еженедельно и т.д.) ---*/
function sheduleTypeClick(sender) {
    var c = sheduleTypeMap[sheduleTypeId()]['caption'];
    var caption = '';

    if (typeof (c) == 'function') caption = c();
    else caption = c;

    byId('itemsCaption').innerHTML = caption;
    clearItems();
    if (sender) {
        updateToolbar();
        addItem(true);
    }
}

function itemSelected() {
    var td = document.getElementsByClassName('itemSelectorFocus')[0];
    if (!td) td = document.getElementsByClassName('itemSelectorFocusNoImg')[0];
    return td ? td.parentNode.parentNode.parentNode.parentNode : null;
}

function clearItems() {
    var items = byId('items').children;
    for (var i = items.length - 1; i >= 0; i--)
        items[i].parentNode.removeChild(items[i]);
}

/*--- Удаление из расписания выбранного пункта ---*/
function deleteItem() {
    if (byId('btItemDelete').className.indexOf('Disabled') < 0) {
        var item = itemSelected();
        if (item) {
            if (item.nextSibling) itemSelect(item.nextSibling);
            else if (item.previousSibling) itemSelect(item.previousSibling);
            item.parentNode.removeChild(item);
            updateToolbar();
        } else fn_alert(w, PPLRS19, 3);
    }
}

function sheduleTypeSelected() {
    var result = null;
    var radioGroup = byId('sheduleTypeGroup').getElementsByTagName('input');
    for (var i = 0; i < radioGroup.length; i++) {
        if (radioGroup[i].checked) {
            result = radioGroup[i];
            break;
        }
    }
    return result;
}

function dayTypeValue() {
    var result = null;
    var dtg = byId('dayTypeGroup');
    if (dtg) {
        var radioGroup = dtg.getElementsByTagName('input');
        for (var i = 0; i < radioGroup.length; i++) {
            if (radioGroup[i].checked) {
                result = radioGroup[i].value;
                break;
            }
        }
    } else {
        result = 'wd';
    }

    return result;
}


function sheduleTypeId() {
    var result = null;
    var sht = sheduleTypeSelected();
    if (sht) result = sht.id.substr(sht.id.lastIndexOf('_') + 1);
    return result;
}

/*создание нового эл-та расписания*/
function createItemEdit() {
    var typeId = sheduleTypeId();
    var edit = sheduleTypeMap[typeId]['createEdit']();

    if (edit) edit.className += (edit.className == '' ? '' : ' ') + 'payonetime_edit_' + typeId;
    return edit;
}

/*--- Добавление в расписание нового пункта/условия ---*/
function addItem(needUpdate) {
    if ((!needUpdate || byId('btItemAdd').className.indexOf('Disabled') < 0) && typeof (sheduleTypeMap[sheduleTypeId()]['createEdit']) == 'function') {
        var itemEdit = createItemEdit();
        if (itemEdit) {
            itemCount++;

            var item = document.createElement('div');
            //item.className = 'payonetime_item';             //особой необходимости нет
            item.id = 'item_' + itemCount.toString();
            item.onclick = function () {
                itemClick(this);
            };
            byId('items').appendChild(item);

            var t = document.createElement('table');
            t.className = 'itemTable';

            var tr = t.insertRow(-1);
            tr.insertCell(-1).className = 'itemSelectorFocus';
            tr.insertCell(-1).appendChild(itemEdit);

            item.appendChild(t);

            if (needUpdate) {
                itemSelect(item);
                updateToolbar();
            } else return item;
        }
    }
}


function updateToolbar() {
    byId('btItemAdd').className = 'itemButton ' + (sheduleTypeMap[sheduleTypeId()]['canAddItem']() ? 'addEnabled' : 'addDisabled');

    byId('btItemDelete').className = 'itemButton ' + ((byId('items').children.length > 0) && (sheduleTypeId() != 'd') ? 'deleteEnabled' : 'deleteDisabled');

}

/*--- Обработка условий периодичности при нажатии "Продолжить" ---*/
function itemsCheck() {
    var b = true;
    if (!$(w, 'PERIODPAY').checked) return b;

    b = SubCheckEmptyTrim(w, 'BEGINPDATE', '', PPLRS6, b);
    b = SubCheckEmptyTrim(w, 'ENDPDATE', '', PPLRS7, b);
    b = fnChekDateDif(w, 'BEGINPDATE', 'ENDPDATE', LRSChecks34_.replace('%', PPLRS10), b);

    if (!b) return;
    var items = byId('items');
    var result = true;

    if (items) {
        items = items.children;
        result = (items.length > 0) || (sheduleTypeId() == 'd');

        if (result) for (var i = 0; result && (i < items.length); i++) {
            var selects = items[i].getElementsByTagName('select');
            for (var j = 0; j < selects.length; j++) {
                result = (selects[j].options[selects[j].selectedIndex].text != '');
                if (!result) {
                    itemSelect(items[i]);
                    fn_alert(w, PPLRS20 + ' ' + sheduleTypeMap[sheduleTypeId()]['name'], 3);
                    break;
                }
            }
        } else fn_alert(w, PPLRS21, 3);

        if (result) byId('sheduleString').value = itemsToString();
    }
    return result;
}

function itemsToString() {
    var result = '';
    var items = byId('items').children;
    var sht = sheduleTypeId();

    if (sht == 'd') result = dayTypeValue();
    else {
        for (var i = 0; i < items.length; i++) {
            var selects = items[i].getElementsByTagName('select');
            var itemStr = '';

            for (var j = 0; j < selects.length; j++) {
                itemStr += (itemStr == '' ? '' : ',') + selects[j].options[selects[j].selectedIndex].value;
            }

            if (selects.length > 1) itemStr = '(' + itemStr + ')';
            result += (result == '' ? '' : ',') + itemStr;
        }
    }

    return sht + '(' + result + ')';
}

function itemsFromString(str) {
    byId('sheduleType_' + str[0]).checked = true;
    sheduleTypeClick();

    var s = removeBrackets(str.substr(1)) + ',';
    var i1 = 0,
        i2 = 0;
    var j = 0;
    while (i2 < s.length) {
        switch (s[i2]) {
            case '(':
                j++;
                break;

            case ')':
                j--;
                break;

            case ',':
                if (j == 0) {
                    var values = removeBrackets(s.substr(i1, i2 - i1)).split(',');
                    var item = addItem(false);
                    var selects = item.getElementsByTagName('select');
                    var k;
                    if (selects) {
                        for (k = 0; k < Math.min(values.length, selects.length); k++)
                            setSelectValue(selects[k], values[k]);
                    } else {
                        var radio = item.getElementsByTagName('input');
                        for (k = 0; k < Math.min(values.length, radio.length); k++)
                            radio[k].value = values[k];
                    }

                    i1 = i2 + 1;
                }
                break;
        }

        i2++;
    }

    var items = byId('items').children;
    if (items.length > 0) itemSelect(items[0]);
    updateToolbar();
}

function removeBrackets(str) {
    return (str.length > 1 && str[0] == '(' && str[str.length - 1] == ')') ? str.substr(1, str.length - 2) : str;
}

function setSelectValue(select, value) {
    for (var i = 0; i < select.options.length; i++)
        if (select.options[i].value == value) {
            select.selectedIndex = i;
            break;
        }
}
/*Chernysh D.V.: значение по умолчанию для даты окончания периода оплат
 выставляем на год вперед от текущей даты*/
function setDefaultEndDate() {
    var y_End = iYY_Today + 1,
        m_End = iMM_Today,
        d_End = iDD_Today - 1;
    if (d_End == 0) {
        m_End--;
        if (m_End == 0) {
            m_End = 12;
            y_End--;
        }
        d_End = getMonthLength(m_End - 1, y_End);
    }
    if (m_End == 0) {
        m_End = 12;
        y_End--;
    }
    return FormatDate(d_End, m_End, y_End);
}
/*--- Показ/скрытие блока расписания оплаты по отметке "Периодический платеж" ---*/
function setDisplayPeriodicalTable(oChk) {
    if (oChk.checked) {
        $(w, 'TablePeriodical').style.display = '';
        $(w, 'BEGINPDATE').value = sToday; //<-- дата начала сегодня    
        $(w, 'ENDPDATE').value = setDefaultEndDate(); //<-- дата окончания по умолч. через год
    } else {
        $(w, 'TablePeriodical').style.display = 'none';
        $(w, 'BEGINPDATE').value = '';
        $(w, 'ENDPDATE').value = '';
        $(w, 'sheduleString').value = '';
    }
    oChk.value = (oChk.checked) ? '1' : '0';
    onResizeMid();
}

/*
 Chernysh D.V.: на форме подтверждения платежа показ/скрытие таблицы с расписанием.
 Эта ф-ция вызывается из form.js.
 b==true - показать расписание.
 */
function ShowSheduleTblAuth(b) {
    try {
        var formAction = $(w, 'FORMACTION').value;
        if ((formAction != 'NEW') && (formAction != 'ADD')) return;
        var oSpan = $j('#isShowHideShdl span');

        $(w, 'sheduleTblAuth').style.display = (b == true) ? '' : 'none';
        oSpan.text((b == true) ? PPLRS29 : PPLRS28);

        //создаем событие на onclick
        oSpan.click(function (e) {
            $j('#sheduleTblAuth').slideToggle(0);
            var sDspl = $(w, 'sheduleTblAuth').style.display;
            oSpan.text((sDspl == 'none') ? PPLRS28 : PPLRS29);
            onResizeMid();
        });
    } catch (e) {
    }
}

periodicalpays_js = true;
//version 2013.06.07