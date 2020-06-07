// alert("roar")
chrome.runtime.onInstalled.addListener(function(details){
    console.log("previousVersion:" ,details.previousVersion)
    //set the dafault values for the empty Map object// scratch that, can't use a map object
    var value = "testing hello"
    // chrome.storage.sync.set({"hello": value, "hello2": value+"2"}, function() {
    //     console.log('Value is set to ' + value);
    //   });
    chrome.storage.sync.set({//default to PRODUCTIVITY for testing
        "mode": "PRODUCTIVITY", //"LEISURE", 
        "keywords": {   "MUSICAL":{
                                    "total_freq": 1,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":0
                                    },
                        "REALLY":{
                                    "total_freq": 1,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":1
                                    },
                        "ICONIC":{
                                    "total_freq": 1,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":1
                                    },
                        "TO":{
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
        "popup_activated":false

    }, function() {
        console.log('Value is set to ' + value);
      });
});

console.log("testest")


var newKeys = []
// var oldUrl = null;

const PAUSE_DELAY = 2000 //miliseconds
const notVideoRegex = /.*\/\/.*youtube.com\/(?!watch).*/
const notVideoRegexString = ".*\/\/.*youtube.com\/(?!watch).*" //"^(.*)$"//


// chrome.tabs.onActivated.addListener(function(request, sender, sendResponse) {
//     // console.log("helllloooo1")
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         var activeTab = tabs[0];
//         // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//         // chrome.tabs.sendMessage(activeTab.id, {"message": "pause_video"});
//       });
//     // var video = document.querySelector("video");
//     // console.log("video ", video)
//     // newKeys.push("grdg")
//     // console.log("newKeys array: ", newKeys)
// });




// chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
    
//     // var channelName = document.getElementById("channel-name").querySelector("a").innerHTML//alternatively: .querySelector("#text").getElementsByTagName("a")         //.getElementsByTagName("div")//.getElementById("text")//.getElementsByTagName("a").innerHTML;
//     // var title = document.querySelector("title") ;
//     // var titleString = document.querySelector("title").innerHTML ;
//     // console.log("testingtesting123 ")
//     // console.log(/*"video ", video,*/ "title", title, "titleString", titleString, "channelName:", channelName)
//     alert("the page has loaded")
//     // alert("the page has loaded", "title", title, "titleString", titleString, "channelName:", channelName)
    
// })
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {  


// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {   
    // console.log(" anytime", changeInfo.status, changeInfo.url)
    // // if (changeInfo.status == undefined ) {
    // //     console.log("IT's UNDEFINED")
    // // }
    // // if (changeInfo.url!=undefined && changeInfo.url!=oldUrl ){
    // //     oldUrl = changeInfo.url
    // //     console.log(" url is not undefined", changeInfo.status, changeInfo.url)
    // // }
    // if ((changeInfo.status == 'complete' || (changeInfo.status == undefined ) ) && tab.active) { //make sure to do this after processing if it's in the tag //undefined might go forever and call when the page is not laoded, but it's necessary for internal navigation (that goes in history without sending a "completed" status. But, putting a listener on the history changing fires before the page changes.)

// chrome.webNavigation.onCompleted.addListener(function(details) {
// chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
// chrome.webNavigation.onCommitted.addListener(function(details) {
        // chrome.tabs.executeScript(null,{file:"content.js"});
        // alert(details.frameId)

        //if there is a old styled title, delete it



        console.log("hngcgcj", window.location.href, details.url, details.transitionType, details.parentFrameId)
        // var tab = chrome.tabs.get(info.tabId, function(tab) {
        //     localStorage["current_url"] = tab.url;
        // });
        // console.log("helllloooo2", details.url)

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            // var url = tab.url;
            var url = details.url;
            console.log("active vs details: ", activeTab.url,  details.url)
            const found = url.match(notVideoRegex);

            
            //to make sure that the old title is deleted while internally navigating
            //Reason:   after applying styles, the default youtube system seems to be unable to get 
            //          rid of the title by itself unless the page is just reloaded
            chrome.tabs.sendMessage(
                // details.tabId,
                activeTab.id,
                {"message": "remove_old_title"}, function(res){
                    // alert("DELETED")
                })




            // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
            if (activeTab && found == url ){
                chrome.tabs.sendMessage(activeTab.id, {"message": "hide_popup"});
                resetPopup()
            }
            else{
                // checkTitle( activeTab.id, url )
                


                setTimeout(function(){ checkTitle( activeTab.id, url , pauseVideo); }, PAUSE_DELAY); //to avoid taking the information from the last page
                // checkTitle( activeTab.id, url , pauseVideo)

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
    // }
}, {url: [{hostSuffix: 'youtube.com'
// , urlContains: '/watch'
}]
});





// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {   
//     console.log(" anytime", changeInfo.status, changeInfo.url)

    // if ( changeInfo.status == 'complete'  && tab.active) { //make sure to do this after processing if it's in the tag //undefined might go forever and call when the page is not laoded, but it's necessary for internal navigation (that goes in history without sending a "completed" status. But, putting a listener on the history changing fires before the page changes.)


chrome.webNavigation.onCompleted.addListener(function(details) {  

            // console.log("hngcgcj", window.location.href, details.url, details.transitionType, details.parentFrameId)

    
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                // var url = tab.url;
                var url = details.url;
                console.log("active vs details: ", activeTab.url,  details.url)

                const found = url.match(notVideoRegex);
                // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
                if (activeTab && found == url ){
                    chrome.tabs.sendMessage(activeTab.id, {"message": "hide_popup"});
                    resetPopup()
                }
                else{
                

                    // checkTitle( activeTab.id, url , pauseVideo)
                    setTimeout(function(){ checkTitle( activeTab.id, url , pauseVideo); }, PAUSE_DELAY); //to avoid calling content when it's not available
                    resetPopup()
                }
                
            });
        // }        
    }
    ,{url: [{hostSuffix: 'youtube.com' 
    // , urlContains: '/watch'
}]}
);


// async 
function pauseVideo( tabID, url, instigatorKeyword = [] ){
    // var nonoVideo = await checkTitle( tabID, url )
    // alert("finished awaiting") //, nonoVideo)
    // if (nonoVideo ){
        chrome.storage.sync.get(['session_block', 'popup_activated'], function(result) {
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
                if(!result.popup_activated){
                    chrome.tabs.sendMessage(
                        // details.tabId,
                        tabID, 
                        {"message": "show_popup" , 'instigatorKeyword': instigatorKeyword }, function(res){
                        console.log("popup! 1")
                        chrome.storage.sync.set({'popup_activated': true}, function() {
                        });
                        // alert("video is paused")
                    });
                }
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
            // console.log(res.vidTitle.substring(4, res.vidTitle.length-10), res.channelName) //minus 10 to get rid of "- Youtube" (9+1)
            
            
            
            // chrome.storage.sync.get(['last_video'], function(result) {
                // if (currUrl != result.last_video){
                    // checkTitle(res.vidTitle, currUrl)

                                    // var string = ''
                                    // var re = /(^\(\d*\)\s(.*)\s-\sYouTube$|^\(\d*\)\s(.*)$|^(.*)\s-\sYouTube$|^(.*)$)/
                                    // //this regEx checks for a string that begins with a number in parenthesis or ends with ' - YouTube' and cuts out the string inbetween
                                    // //the text inbetween can be any group between 2 and 5 inclusive
                                    // //group 1 happens to contain the whole string
                                    // //group number curresponds to the index in the returned array by .match()
                                    // //the 0 index is the whole string
                                    // const foundRE = res.vidTitle.match(re);
                                    // console.log("REGEX RESULTS:", foundRE)
                                    // console.log("GROUP 2: prefix+suffix",   "(234) This is(?s)432 (.*sdf - YouTube".match(re))
                                    // console.log("GROUP 3: prefix",          "(234) This is(?s)432 (.*sdf - YouTub".match(re))
                                    // console.log("GROUP 4: suffix",          "(234)This is(?s)432 (.*sdf - YouTube".match(re))
                                    // console.log("GROUP 5: neither",         "(234)This is(?s)432 (.*sdf - YouTub".match(re))
                                    // console.log("whole string: ", foundRE[0])
                                    // var idx = 2;
                                    // while (idx < 6 && string == ''){
                                    //     console.log(foundRE[idx])
                                    //     if (foundRE[idx] != undefined){
                                    //         string = foundRE[idx]
                                    //     }
                                    //     idx++
                                    // }
                                    // if (string == ''){
                                    //     string = res.vidTitle
                                    // }

    var string = res.vidTitle
    
    //The below code only works for strings that may or may not begin with "(1) " but not any other number
    // var string = res.vidTitle
    // if(res.vidTitle.substring(0,4)=="(1) "){
    //     string = string.substring(4, string.length) 
    // }
    // if(res.vidTitle.substring(res.vidTitle.length-10,res.vidTitle.length)==" - YouTube"){
    //     string = string.substring(0, string.length-10) 
    // }

    // console.log("["+string+"]", "["+res.channelName+"]", "["+res.vidTitle.substring(res.vidTitle.length-10,res.vidTitle.length)+"]" )
    var strArr =  string.toUpperCase().split(" ").filter(Boolean);
    var nonoVideo = false;
    // chrome.storage.sync.get(['hello', "hello2"], function(result) {
    //     console.log('Value currently is ' + result.hello + " || " + result.hello2);
    //   });
    chrome.storage.sync.get(['keywords', 'session_keywords' , 'max_wordID', 'session_block', 'last_video', 'mode' ], function(result) {
        if (result.mode == "PRODUCTIVITY"){
            // alert( currUrl ) //result.last_video)
            var instigatorKeywordsArr = []

            var storageKeys = result.keywords
            var sessionStorageKeys = result.session_keywords
            var new_max_wordID = result.max_wordID
            var block_sites = result.session_block
            if (currUrl != result.last_video){
                console.log('Value currently is ' + result.keywords + " || " + result.session_keywords );
                strArr.forEach(function(term){
                    var currDateTime = Date.now()
                    if(term in storageKeys){
                        console.log("STORAGEKEY freq:", term, storageKeys[term])
                        storageKeys[term].total_freq++
                        storageKeys[term].session_freq++
                        storageKeys[term].lastest_occur = currDateTime
                        if (!(currUrl in block_sites)){
                            
                            block_sites[currUrl]={
                                "keywords": {}
                            }
                            block_sites[currUrl]["keywords"][term] = true
                            // block_sites[currUrl]["keywords"][term] = true
                                // "keywords" : {term: true}
                            // }
                        }
                        else if (!(term in block_sites[currUrl].keywords)){
                            block_sites[currUrl].keywords[term] = true
                            // block_sites[currUrl].keywords.push(term)
                        }
                        console.log("BLOCKED SITES: ", block_sites)



                        console.log("STORAGEKEY freq incr:", term, storageKeys[term])
                        //pause the video
                        nonoVideo = true
                        if (!instigatorKeywordsArr.includes(term)){
                            instigatorKeywordsArr.push(term)
                        }
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


                // pauseVideo(tabID, currUrl)
            }

            var instigatorKeywordsArr2 = []
            if (currUrl in block_sites){
                instigatorKeywordsArr = Object.keys(block_sites[currUrl]["keywords"])
            }
            console.log("instigatorKeywordsArr:", instigatorKeywordsArr, currUrl )
        
            pauseVideo( tabID, currUrl, instigatorKeywordsArr ) //instigatorKeywordsArr != [] ? instigatorKeywordsArr[0] : '' )
        }
        
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
    // if (request.message == "test"){
    //     console.log("todalidooh")//get from storage
    //     sendResponse({testVal: `hidiho` , divContent: `wowowo`}) //send storage info
    //     // chrome.tabs.sendMessage(activeTab.id, {"message": "pause_video"});
    //     // video.pause();
    // }

    switch(request.message){
        case "GO_BACK":
            chrome.tabs.goBack(function(){
                console.log("WE ARE REACTIVATING IT")
                resetPopup()
                // chrome.storage.sync.set({'popup_activated': false}, function() {
                // });
            })
            
            break;
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
    if(alarm.name == "PRODUCTIVITY_MODE"){
        chrome.storage.sync.set({'mode':'LEISURE'}, function() {
            console.log('Alarm is firing! ');
           
        });
    }

  });


  function resetPopup(){
    chrome.storage.sync.set({'popup_activated': false}, function() {
    });
 }




//  chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {  

//        console.log("NAV INTER OFF VIDEOS", details.url)
//     }, {url: [{urlMatches: notVideoRegex}]}
// );
    


//  chrome.webNavigation.onCompleted.addListener(function(details) {  

//     // console.log("hngcgcj", window.location.href, details.url, details.transitionType, details.parentFrameId)
//     console.log("NAV EX OFF VIDEOS",details.url)
// // }        
// }
// ,{url: [{ urlMatches: notVideoRegex}]}
// );