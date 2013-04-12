var su = -1
,   MAX_SU = 80
,   $wrap = $('#main_content .wrap')
,   $su = $('#main_content .su')
,   $body = $(document.body)

function loadComment(){

    su = parseInt(location.hash.replace('#',''),10);
    if( isNaN(su)) {
        su = -1;
    }
    if(su < -1 || su > MAX_SU) {
        alert('없는 수 입니다');
        return;
    }

    var file = (su===-1) ? '0':'0'+su
        file = (file.length ===2) ? '0'+file:file
        file = 'comment/' + file + '.txt'

    $.get(file, function(txt){

        txt = txt.replace(/--------/g,'</blockquote><hr>')
                 .replace(/\r\r/g,'<br><blockquote>')

        $su.html( (su===-1) ? '예고편' : su+' 수' );
        $wrap.html(txt);
        $body.animate({ scrollTop: 0 });
    });

}

$(window).on('hashchange', loadComment);
loadComment();

$(document).ready(function(){

    loadComment();

    $('.button-wrap .next').click(function(){
        location.href = '#'+ (su+1);
    });
    $('.button-wrap .prev').click(function(){
        location.href = '#'+ (su-1);
    });

});


