<script src="http://fe.it-academy.by/JQ/jquery.js"></script>
<script>

"use strict";

var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName='Score';

function storeInfo() {
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName},
            success : lockGetReady, error : errorHandler
        }
    );
}

function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        // нам всё равно, что было прочитано -
        // всё равно перезаписываем
        var info={
            score : document.getElementById('score').value;
        };
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName, v : JSON.stringify(info)},
                success : updateReady, error : errorHandler
            }
        );
    }
}

function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
}

function restoreInfo() {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady, error : errorHandler
        }
    );
}

function readReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else if ( callresult.result!="" ) {
        var info=JSON.parse(callresult.result);
        document.getElementById('scores_result').value=info;
    }
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

restoreInfo();

</script>
