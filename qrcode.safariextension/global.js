const
    BITLY_API = "http://api.bit.ly/v3/shorten?format=txt&login=atsnngs&apiKey=R_49fd212d4ccc2d5331dbf5cd58a83398&longUrl=",
    COMMAND = "show-qr";

function handleCommand(event) {
    if(event.command!=COMMAND) return;
    shorten(event.userInfo);
}

function replaceAmazon(url) {
    var
        re  = /[\w\d]+\-22/,
        tag = /amazon\.co\.jp/.test(url) ? "atsushnagased-22" : "ngsdevorg-20";
    if(re.test(url))
        return url.replace(re,tag);
    return fixQuery(url) + "tag="+tag;
}

function fixQuery(url) {
    if(url.indexOf("?")==-1)
        return url + "?";
    if(!/.*&$/.test(url))
        return url + "&";
    return url;
}

function convertURL(url) {
    if(/^https?\:\/\/(:?[^\.]+\.)?amazon\.co(\.jp|m)\/.*$/.test(url))
        return replaceAmazon(url);
    return url;
}

function shorten(url) {
    var bitly = BITLY_API+encodeURIComponent(convertURL(url));
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            var res;
            try {
                res = xhr.responseText;
            } catch(e) {}
            if(!/^http/.test(res)) res = url;
            safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(COMMAND,res);
        }
    }
    xhr.open('GET',bitly,true)
    xhr.send(null);
}