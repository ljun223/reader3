`<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/ljun223/reader3@main/js/yingshi.css" />

<script src="//cdn.staticfile.org/jquery/2.2.4/jquery.min.js"></script>

<link rel="stylesheet" type="text/css" href="https://muiplayer.js.org/css/mui-player.min.css" />

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/ljun223/reader3@main/js/mui-player.min.js"></script>

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/ljun223/reader3@main/js/mui-player-mobile-plugin.min.js"></script>

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/ljun223/reader3@main/js/decodeUrl.js"></script>

<div class ="dz" width="100%"></div>

<div class="muiplayer" id="muiplayer" style="width:100%;height:350"></div>

<div id="tab"><ul>${li}</ul></div>
${button}

<script>
function video(url){
$.get(url,function(result){

json=result.match(/var player.*?=(\{.*?\})</)[1];

src= JSON.parse(json).url;
src=decodeM3U8Url(src);

if(src.match(/m3u8|mp4/)){

	$(".muiplayer").html(""); 	
 var mp = new MuiPlayer({"container": ".muiplayer","src": src,"autoFit":false,"lang": "zh-cn","height":"300px",plugins: [new MuiPlayerMobilePlugin({"key": "01I01I01H01J01L01K01J01I01K01J01H01D01J01G01E","showMenuButton": true,"pageGesture":true,})] });

}else{

iframe='<iframe src="'+src+'" width="350" height="280" id="cciframe" scrolling="no"allowfullscreen="true" webkitallowfullscreen="true" autoplay="true" mozallowfullscreen="true"></iframe>'

$(".muiplayer").html(iframe)

}
$(".dz").html(src);
});
}

(function(){
$("${xj}").hide();
$("${xj}:eq(0)").show();
$("li:eq(0)").addClass("active")})();

$("button").ready(function(){
url=$(this).val();
$("button:first").addClass("upBtn");
video(url);
});

$("button").click(function(){
$("button").removeClass("upBtn");
$(this).addClass("upBtn");
url="${URL}"+$(this).attr("href");
video(url);
});

$("li").click(function(){
$("li").removeClass("active");
$(this).addClass("active");
index=$(this).index();
$("${xj}").hide();
$("${xj}:eq("+index+")").show();
})

</script>`