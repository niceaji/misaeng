var su = -1
,   MAX_SU = 80
,   $wrap = $('#main_content .wrap')
,   $su = $('#main_content .su')
,   $suText = $('.suText')
,   $body = $(document.body)
,   EPISODES = episodes.data.webtoonEpisodes.reverse()
,   WEBTOON_LINK_PREFIX = 'http://cartoon.media.daum.net/webtoon/viewer/'

function getWebtoonLink(){
    return WEBTOON_LINK_PREFIX+EPISODES[(su+1)].id;
}
function getSuText(){
    return ((su===-1) ? '예고편' : su+' 수');
}

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

        $su.html( '<a href="'+getWebtoonLink()+'">' + getSuText() +'</a>' );
        $suText.text( getSuText() );
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
    $('.button-wrap .webtoon').click(function(){
        location.href = getWebtoonLink();
    });
});


