// alert("roar")
chrome.runtime.onInstalled.addListener(function(details){
    console.log("previousVersion:" ,details.previousVersion)
    //set the dafault values for the empty Map object// scratch that, can't use a map object
    var value = "testing hello"
    // chrome.storage.sync.set({"hello": value, "hello2": value+"2"}, function() {
    //     console.log('Value is set to ' + value);
    //   });
    chrome.storage.sync.set({
        "mode": "PRODUCTIVITY", 
        "keywords": {   "Musical":{
                                    "total_freq": 1,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":0
                                    },
                        "really":{
                                    "total_freq": 1,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":1
                                    },
                    },
        "session_keywords": {},
        "session_block": {},
        "last_video": null,
        "max_wordID":1,
        "freq_channels": [],
        "word_ignore":["a", "or", "if", "it's", "it", "is", "the"],

    }, function() {
        console.log('Value is set to ' + value);
      });
});

console.log("testest")


var newKeys = []
var oldUrl = null;

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
    console.log(" anytime", changeInfo.status, changeInfo.url)
    // if (changeInfo.status == undefined ) {
    //     console.log("IT's UNDEFINED")
    // }
    // if (changeInfo.url!=undefined && changeInfo.url!=oldUrl ){
    //     oldUrl = changeInfo.url
    //     console.log(" url is not undefined", changeInfo.status, changeInfo.url)
    // }
    if ((changeInfo.status == 'complete' || (changeInfo.status == undefined ) ) && tab.active) { //make sure to do this after processing if it's in the tag //undefined might go forever and call when the page is not laoded, but it's necessary for internal navigation (that goes in history without sending a "completed" status. But, putting a listener on the history changing fires before the page changes.)

// chrome.webNavigation.onCompleted.addListener(function(details) {
// chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
// chrome.webNavigation.onCommitted.addListener(function(details) {
        // chrome.tabs.executeScript(null,{file:"content.js"});

        console.log("hngcgcj")
        // var tab = chrome.tabs.get(info.tabId, function(tab) {
        //     localStorage["current_url"] = tab.url;
        // });
        // console.log("helllloooo2", details.url)

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            var url = tab.url;

            // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
            if (activeTab){

                // checkTitle( activeTab.id, url )
                checkTitle( activeTab.id, url , pauseVideo)

                // chrome.tabs.sendMessage(
                //     // details.tabId,
                //     activeTab.id, 
                //     {"message": "get_video_info"}, function(res){
                //     if (res && res.vidTitle){
                //         console.log(res.vidTitle.substring(0, res.vidTitle.length-10), res.channelName) //minus 10 to get rid of "- Youtube" (9+1)
                //         chrome.storage.sync.get(['last_video'], function(result) {
                //             if (url != result.last_video){
                //                 checkTitle(res.vidTitle, url)
                //             }
                //         })
                //     }
                // });

                // pauseVideo(activeTab.id, url)
                
                // chrome.storage.sync.get(['session_block'], function(result) {
                //     console.log("BLOCKED SITES1:",result.session_block )
                    
                //     if (url in result.session_block){
                //         console.log("BLOCKED SITES2:",result.session_block )
                //         chrome.tabs.sendMessage(
                //             // details.tabId,
                //             activeTab.id, 
                //             {"message": "pause_video"}, function(res){
                //             console.log("video paused! 1",res.video )
                //         });
                //         console.log("video paused! 2")
                //     }
                // })
            }
            
        });
        // var video = document.querySelector("video");
        // console.log("video ", video)
        // video.pause();
        // if (video.paused){video.play();} else {video.pause();}
    }
});

// async 
function pauseVideo(tabID, url){
    // var nonoVideo = await checkTitle( tabID, url )
    // alert("finished awaiting") //, nonoVideo)
    // if (nonoVideo ){
        chrome.storage.sync.get(['session_block'], function(result) {
            console.log("returned True!", url, result.session_block)
            // console.log(url, result.session_block)
            // console.log("returned True!", url, result.session_block)
            // if (pauseVideo){
            if (url in result.session_block){
                console.log("BLOCKED SITES2:",result.session_block )
                console.log("PAUSING")
                chrome.tabs.sendMessage(
                    // details.tabId,
                    tabID, 
                    {"message": "pause_video"}, function(res){
                    console.log("video paused! 1",res.video )
                    // alert("video is paused")
                });
                console.log("video paused! 2")
            }
        })
    // }
    

}

function checkTitle( tabID, currUrl, callback ){
    chrome.tabs.sendMessage(
        // details.tabId,
        tabID, 
        {"message": "get_video_info"}, function(res){
        if (res && res.vidTitle){
            console.log(res.vidTitle.substring(0, res.vidTitle.length-10), res.channelName) //minus 10 to get rid of "- Youtube" (9+1)
            // chrome.storage.sync.get(['last_video'], function(result) {
                // if (currUrl != result.last_video){
                    // checkTitle(res.vidTitle, currUrl)


    var string = res.vidTitle;
    var strArr =  string.split(" ").filter(Boolean);
    var nonoVideo = false;
    // chrome.storage.sync.get(['hello', "hello2"], function(result) {
    //     console.log('Value currently is ' + result.hello + " || " + result.hello2);
    //   });
    chrome.storage.sync.get(['keywords', 'session_keywords' , 'max_wordID', 'session_block'], function(result) {
        console.log('Value currently is ' + result.keywords + " || " + result.session_keywords );
        var storageKeys = result.keywords
        var sessionStorageKeys = result.session_keywords
        var new_max_wordID = result.max_wordID
        var block_sites = result.session_block
        strArr.forEach(function(term){
            var currDateTime = Date.now()
            if(term in storageKeys){
                console.log("STORAGEKEY freq:", term, storageKeys[term])
                storageKeys[term].total_freq++
                storageKeys[term].session_freq++
                storageKeys[term].lastest_occur = currDateTime
                block_sites[currUrl] = true

                console.log("STORAGEKEY freq incr:", term, storageKeys[term])
                //pause the video
                nonoVideo = true
            }
            if (term in sessionStorageKeys){
                console.log("SESSIONSTORAGEKEY freq:", term, sessionStorageKeys[term])
                sessionStorageKeys[term].total_freq++
                sessionStorageKeys[term].session_freq++
                sessionStorageKeys[term].lastest_occur = currDateTime

                console.log("SESSIONSTORAGEKEY freq incr:", term, sessionStorageKeys[term])
            }
            else{
                console.log("NEW SESSIONSTORAGEKEY freq:", term)
                sessionStorageKeys[term] = {
                        "total_freq": 1,
                        "session_freq": 1,
                        "first_occur": currDateTime,
                        "lastest_occur": null,
                        "wordID": new_max_wordID++
                }
                console.log("NEW SESSIONSTORAGEKEY freq:", term, sessionStorageKeys[term])
            }
        });
        chrome.storage.sync.set({'keywords': storageKeys, 'session_keywords': sessionStorageKeys , 'max_wordID': new_max_wordID, 'last_video': currUrl, 'session_block': block_sites}, function() {
            console.log('Values changed to 1: ' , storageKeys);
            console.log('Values changed to 2: ' , sessionStorageKeys);
            console.log('Values changed to 3: ' , new_max_wordID);
            console.log('Values changed to 4: ' , currUrl);
            console.log('Values changed to 5: ' , block_sites);
        });
    
        pauseVideo(tabID, currUrl)
    })
    
    // return Promise.resolve(nonoVideo);
    // return nonoVideo
// }
// })
}
});
// return true
}

// function splitString(string){

// }

// function checkString(string){
    
// }


// chrome.browserAction.onClicked.addListener(function (tab) {
//     // chrome.tabs.create({url: 'popup.html'})


// })


chrome.runtime.onMessage.addListener( function (request, sender, sendResponse ){
    console.log("we hit background.js ")

    if (request.message == "show_new_keys"){
        console.log("newKeys array: ", newKeys)
        sendResponse({newKeys: newKeys , divContent: `wowowo`})
        // chrome.tabs.sendMessage(activeTab.id, {"message": "pause_video"});
        // video.pause();
    }
    if (request.message == "show_user_keys"){
        console.log("userKeys array: ", newKeys)//get from storage
        sendResponse({userKeys: newKeys , divContent: `wowowo`}) //send storage info
        // chrome.tabs.sendMessage(activeTab.id, {"message": "pause_video"});
        // video.pause();
    }
    if (request.message == "test"){
        console.log("todalidooh")//get from storage
        sendResponse({testVal: `hidiho` , divContent: `wowowo`}) //send storage info
        // chrome.tabs.sendMessage(activeTab.id, {"message": "pause_video"});
        // video.pause();
    }

    switch(request.message){
        case "ADD_KEYWORD":
            break;
        case "DELETE_KEYWORD":
            break;
        case "START_TIMER":
            break;
        case "STOP_TIMER":
            break;
    }

    return Promise.resolve("Dummy response to keep the console quiet");
})


chrome.alarms.onAlarm.addListener(function( alarm ) {
    // alert("you got an alarm")
    console.log("Got an alarm!", alarm);
  });