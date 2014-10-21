//Преобразовать объект в query-string 
//На входе - одноуровневый объект, значения свойств объекта - строки или числа.
function toSearchString(obj) {
    var arr = [''];
    if ( !! obj) {
        for (k in obj) {
            arr.push(k + '=' + obj[k]);
        }
    }
    var result = arr.join('&');
    return result;
}
/*
toSearchString({}); // ''
toSearchString({test: true}); // 'test=true'
toSearchString({num: 10, test: true}); // 'num=10&test=true'
toSearchString({num: 10, test: true, user: 'admin'}); // 'num=10&test=true&user=admin'
*/