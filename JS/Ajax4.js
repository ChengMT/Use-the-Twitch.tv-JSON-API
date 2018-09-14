var link = "https://wind-bow.gomix.me/twitch-api/";
var back = "?callback=?";
var listNane = ["freecodecamp", "test_channel", "ESL_SC2"];

var mylist = [];
var b = "";
listNane.forEach(function (myname) {
    var mychannel = "https://www.twitch.tv/" + myname;
    //以下是得到 streams状态，代表在线或者离线
    var myLink = link + "streams" + '/' + myname + back;
    $.getJSON(myLink, function (json) {
        if (json.stream == null) {
            var mystreams = "offline";
        } else {
            var mystreams = "online";
        }

        //以下是得到 logo 图标 ，因为是异步，所以必须放在函数里面。在函数里面才能保证执行顺序
        var logolink = link + "channels" + '/' + myname + back;
        $.getJSON(logolink, function (json) {
            var mylogo = json.logo;
            var mycontext = json.game + ":" + json.status;
            //生成一个新的对象 ，因为是异步，所以必须放在函数里面。
            //方法1： 
            // $(".list").append("<div><span class='logo-style'></span><span class='name-style'></span><span class='context-style'></span><span class='stream-style'></span></div>");
            // console.log( $(".name-style:last"));
            // $(".stream-style:last").append(mystreams);
            // $(".name-style:last").append(myname);
            // $(".logo-style:last").append("<img src = " + mylogo + ">");
            // $(".context-style:last").append(mycontext);

            //方法2： 
           
            $(".list").append("<div class='list-style'><span class='logo-style'></span><span class='name-style'></span><span class='context-style'></span><span class='stream-style'></span></div>");
            $(".list div:last-child .stream-style").append(mystreams);
            $(".list div:last-child .name-style").append(myname);
            $(".list div:last-child .logo-style").append("<img src = " + mylogo + ">");
            
            
            if (mystreams == "online") {
                $(".list-style").css("background-color", "rgb(184,204,166)");
                $(".list div:last-child .context-style").append(mycontext);
            } else if (mystreams == "offline") {
                $(".list-style").css("background-color", "rgb(74,94,130)");
                $(".list div:last-child .context-style").append("");
                console.log($(".stream-style").text());
            }
        })
    })
})


$("#buttom-all").on("click", function () {
    for(var a=0;a<3;a++){
        if($($(".stream-style").get(a)).text() == "offline" || $($(".stream-style").get(a)).text() == "online"){
            $(".list-style").show();
           }
    }
});
$("#buttom-offline").on("click", function () {
    for(var a=0;a<3;a++){
        if ($($(".stream-style").get(a)).text() == "offline") {
            $(".list-style").show();
        }else if($($(".stream-style").get(a)).text() == "online" ){
            $(".list-style").hide();
        }
    }
});
$("#buttom-online").on("click", function () {
    for(var a=0;a<3;a++){
        if ($($(".stream-style").get(a)).text() == "online") {
            $(".list-style").show();
        }else if($($(".stream-style").get(a)).text() == "offline" ){
            $(".list-style").hide();
        }
    }
});


$("body").on("click", ".name-style", function(){
    var url = "https://www.twitch.tv/" + $(".name-style").text();
    window.open(url);
});

