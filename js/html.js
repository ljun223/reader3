`<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/ljun223/reader3@main/js/yingshi.css" />

<script src="//cdn.staticfile.org/jquery/2.2.4/jquery.min.js"></script>

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/ljun223/reader3@main/js/decodeUrl.js"></script>

<link rel="stylesheet" type="text/css" href="https://muiplayer.js.org/css/mui-player.min.css" />

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/ljun223/reader3@main/js/mui-player.min.js"></script>

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/ljun223/reader3@main/js/mui-player-mobile-plugin.min.js"></script>

<div class ="dz" width="100%"></div>

<div class="muiplayer" id="muiplayer" style="width:100%;height:350"></div>

<div id="tab"><ul>${li}</ul></div>
${button}

<script>
function video(url){
  $.get(url,function(result){
    iframe=String(result).match(/<iframe id="player_if" .*iframe>/);
    json=result.match(/var player.*?=(\{.*?\})</)[1];

    src= JSON.parse(json).url;
    src=decodeM3U8Url(src);
    if(src.match(/m3u8|mp4/)){

     	$(".muiplayer").html(""); 	
      var mp = new MuiPlayer({"container": ".muiplayer","src": src,"autoFit":false,"lang": "zh-cn","height":"300px",plugins: [new MuiPlayerMobilePlugin({"key": "01I01I01H01J01L01K01J01I01K01J01H01D01J01G01E","showMenuButton": true,"pageGesture":true,})] });

    }else{
      if(!iframe){
      main()
      src=parseUrl+src;
      iframe= '<iframe width="100%" height="100%" src="'+src+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>';
      }else{iframe=iframe};

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

let parseUrl;
function getParse(json){
	 return new Promise((resolve) =>{
    var path="${URL}/static/js/playerconfig.js";
    $.get(path,function(data){
	     js=data.match(/player_list=(\{.*?\}),MacPlayerConfig/)[1];
	     from=JSON.parse(json).from;
	     parse=JSON.parse(js)[from].parse;
      parse=decodeM3U8Url(parse);
      resolve (parse)
    })
  })
}
async function main (){
	 parseUrl= await getParse(json)
}
	
</script>`