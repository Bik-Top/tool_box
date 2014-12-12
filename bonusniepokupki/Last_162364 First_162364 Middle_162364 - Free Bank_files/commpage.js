var SCHEMESCRIPT = {
    InitForm: function () {
        if ($(window, 'CG').value == 'Æ')w.H_IMG = 'user_f';
        ShowWinHeader(w, Top.ClientName + ',');
    },
    ToSTM: function (x, it) {
        var sh = it ? 'STM' : 'STMCARD', nid = it ? '1' : '33';
        try {
            nv.SetActiveMenu(nid)
        } catch (e) {
        }
        nv.CREATE(sh, 'NEW', '&commpageitem=' + x);
    }
}