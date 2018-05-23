setTimeout(function () {
    var conv = document.querySelector("#root .chat .conversation");
    var th = document.querySelector("#root .chat .chats .title").offsetHeight;
    conv.querySelector(".left .top").style.minHeight = th + "px";
    
}, 3000);