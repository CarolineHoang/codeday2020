// alert("roar")
console.log("testest")


var newKeys = []

// chrome.tabs.onActivated.addListener(function(info) {
chrome.tabs.onActivated.addListener(function(request, sender, sendResponse) {
    // var tab = chrome.tabs.get(info.tabId, function(tab) {
    //     localStorage["current_url"] = tab.url;
    // });
    console.log("helllloooo1")
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
        chrome.tabs.sendMessage(activeTab.id, {"message": "pause_video"});
      });
    var video = document.querySelector("video");
    console.log("video ", video)
    newKeys.push("grdg")
    console.log("newKeys array: ", newKeys)

    // video.pause();
    // if (video.paused){video.play();} else {video.pause();}
});



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {   
    console.log(" jhkvbkb")
    if (changeInfo.status == 'complete' && tab.active) { //make sure to do this after processing if it's in the tag
        console.log("hngcgcj")
        // var tab = chrome.tabs.get(info.tabId, function(tab) {
        //     localStorage["current_url"] = tab.url;
        // });
        console.log("helllloooo2")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
            chrome.tabs.sendMessage(activeTab.id, {"message": "pause_video"});
        });
        var video = document.querySelector("video");
        console.log("video ", video)
        // video.pause();
        // if (video.paused){video.play();} else {video.pause();}
    }
});