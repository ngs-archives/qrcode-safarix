const
    ID = "bookmarklet-qr-overlay",
    QR = "http://chart.apis.google.com/chart?chs=250x250&cht=qr&chl=";

document.addEventListener("contextmenu", handleContextMenu, false);
safari.self.addEventListener("message", handleMessage, false);

function handleContextMenu(event) {
    safari.self.tab.setContextMenuEventUserInfo(event, window.location.toString());
}

function handleMessage(event) {
    showQR(event.message);
}
////////////////////////////////////////////////////////

function div(p,id,s,o) {
    var e = document.createElement("div");
    if(id) e.id = id;
    p.appendChild(e);
    for(var i in o) e.setAttribute(i,o[i]);
    var style = [];
    for(var i in s) style.push(i,":",s[i],";");
    e.setAttribute("style",style.join(""));
    return e;
}

function showQR(url) {
    var w = document.getElementById(ID);
    if(w) {
        w.style.display = "block";
        return;
    }
    w = div(document.body,ID,{
        position : "fixed",
        top:0, left:0,
        width:"100%", height:"100%",
        "z-index":10000
        },{
        onmousedown : "this.style.display = 'none';"
    });
    div(w,null,{
        position : "absolute",
        top:0, left:0,
        width:"100%", height:"100%",
        background:"#fff",
        opacity:0.8
    },{});

    div(w,null,{
        position : "absolute",
        top:0, left:0,
        width:"100%", height:"100%",
        background:"url('"+QR+encodeURIComponent(url)+"') no-repeat center center"
    },{});
}


