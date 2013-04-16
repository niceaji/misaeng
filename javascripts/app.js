var su = -1
,   MAX_SU = 80
,   $wrap = $('#main_content .wrap')
,   $su = $('#main_content .su')
,   $suText = $('.suText')
,   $body = $(document.body)
,   $chart = $("#chart")
,   chart = ''
,   EPISODES = episodes.data.webtoonEpisodes.reverse()
,   WEBTOON_LINK_PREFIX = 'http://cartoon.media.daum.net/webtoon/viewer/'

function getWebtoonLink(){
    return WEBTOON_LINK_PREFIX+EPISODES[(su+1)].id;
}
function getWebtoonThumb(){
    return EPISODES[(su+1)].thumbnailImage.url;
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
    	renderChart(txt);
        txt = txt.replace(/--------/g,'</blockquote><hr>')
                 .replace(/\r\r/g,'<br><blockquote>')

        $su.html( '<img style="width:152px;height:90px;" src="'+getWebtoonThumb()+'" /><a href="'+getWebtoonLink()+'">' + getSuText() +'</a>' );
        $suText.text( getSuText() );
        $wrap.html(txt);
        $body.scrollTop(0);
    });

}

function renderChart(txt){
	var s1 = chart.get("s1"),
		s2 = chart.get("s2"),
		s3 = chart.get("s3"),
		d1 = [],
		d2 = [],
		d3 = [],
		xAxis = chart.get("xAxis"),
		cate = [];
	
	chart.series[0].data.length = chart.series[1].data.length = chart.series[2].data.length = 0;
	
	txt.replace(/(.*)\s\((\+\d+) (\-\d+)\)/ig, function(){
		var nick = arguments[1],
			n1 = parseInt(arguments[2], 10),
			n2 = parseInt(arguments[3], 10);
		cate.push(nick);
		d1.push({ "name": nick, "y": n1 });
		d2.push({ "name": nick, "y": n2 });
		d3.push({ "name": nick, "y": n1 + n2 });
	});
	
	s1.setData(d1);
	s2.setData(d2);
	s3.setData(d3);
	xAxis.setCategories(cate);
	chart.redraw();
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

    chart = new Highcharts.Chart({
    	"chart": {
    		"renderTo": "chart"
    	},
    	"colors": [ "#212121", "#C1C1C1", "#FFF" ],
    	"credits": {
    		"enabled": false
    	},
    	"title": {
    		"text": ""
    	},
    	"legend": {
    		"enabled": false
    	},
    	"xAxis": {
    		"id": "xAxis",
    		"labels": {
    			"staggerLines": 2
    		}
    	},
    	"yAxis": {
    		"endOnTick": false,
    		"startOnTick": false,
    		"title": {
    			"enabled": false
    		}
    	},
    	"plotOptions": {
    		"area": {
    			"marker": {
    				"enabled": false
    			}
    		},
    		"line": {
    			"marker": {
    				"enabled": false
    			}
    		}
    	},
    	"series": [ {
    		"id": "s1",
    		"type": "area",
    		"name": "추천",
    		"data": []
    	} , {
    		"id": "s2",
    		"type": "area",
    		"name": "반대",
    		"data": []
    	} , {
    		"id": "s3",
    		"type": "line",
    		"name": "순추천",
    		"data": []
    	}]
    });
});


