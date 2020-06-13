//this background script has been treated mostly peristently so far (in my mind)
chrome.runtime.onInstalled.addListener(function(details){
    console.log("previousVersion:" ,details.previousVersion)
    //set the dafault values for the empty Map object// scratch that, can't use a map object
    chrome.storage.local.set({
        //default mode to PRODUCTIVITY for testing
        "mode": "PRODUCTIVITY", //"LEISURE", 
        "keywords": {   
                        "MUSICAL":{
                                    "total_freq": 10000000,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":0
                                    },
                        "HAMILTON":{
                                    "total_freq": 7,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":0
                                    },
                        "IUBLOIYBLIBYLIYBIYLI;UTBILTUBI7LRTVFILRTBIVTIKVTLTIUBLOIYBLIBYLIYBIYLI;UTBILTUBI7LRTVFILRTBIVTIKVTLT":{
                                    "total_freq": 60,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":1
                                    },
                        "SUPERCALIFRAGILISTICEXPIALIDOCIOUS":{
                                    "total_freq": 50,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":1
                                    },
                        "PNEUMONOULTRAMICROSCOPICSILICOVOLCANOCONIOSIS":{
                                    "total_freq": 55,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":1
                                    },
                        "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW":{
                                    "total_freq": 100,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":1
                                    },

                        "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM":{
                                    "total_freq": 1,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":1
                                    },

                        "MIDDLE":{
                                    "total_freq": 1,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":1
                                    },

                        "CLASS":{
                                    "total_freq": 1,
                                    "session_freq": 0,
                                    "first_occur": Date.now(),
                                    "lastest_occur": null,
                                    "wordID":1
                                    },
                        "POP":{
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
        "session_keywords": {
                        // "MUSICAL":{
                        //             "total_freq": 10000000,
                        //             "session_freq": 10000000,
                        //             "first_occur": Date.now(),
                        //             "lastest_occur": null,
                        //             "wordID":0
                        //             },
                        // "HAMILTON":{
                        //             "total_freq": 7,
                        //             "session_freq": 7,
                        //             "first_occur": Date.now(),
                        //             "lastest_occur": null,
                        //             "wordID":0
                        //             },
                        // "IUBLOIYBLIBYLIYBIYLI;UTBILTUBI7LRTVFILRTBIVTIKVTLTIUBLOIYBLIBYLIYBIYLI;UTBILTUBI7LRTVFILRTBIVTIKVTLT":{
                        //             "total_freq": 60,
                        //             "session_freq": 60,
                        //             "first_occur": Date.now(),
                        //             "lastest_occur": null,
                        //             "wordID":1
                        //             },
                        // "SUPERCALIFRAGILISTICEXPIALIDOCIOUS":{
                        //             "total_freq": 50,
                        //             "session_freq": 50,
                        //             "first_occur": Date.now(),
                        //             "lastest_occur": null,
                        //             "wordID":1
                        //             },
                        // "PNEUMONOULTRAMICROSCOPICSILICOVOLCANOCONIOSIS":{
                        //             "total_freq": 55,
                        //             "session_freq": 55,
                        //             "first_occur": Date.now(),
                        //             "lastest_occur": null,
                        //             "wordID":1
                        //             },
                        // "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW":{
                        //             "total_freq": 100,
                        //             "session_freq": 0,
                        //             "first_occur": Date.now(),
                        //             "lastest_occur": null,
                        //             "wordID":1
                        //             },

                        // "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM":{
                        //             "total_freq": 1,
                        //             "session_freq": 1,
                        //             "first_occur": Date.now(),
                        //             "lastest_occur": null,
                        //             "wordID":1
                        //             },
                        // "POP":{
                        //             "total_freq": 1,
                        //             "session_freq": 1,
                        //             "first_occur": Date.now(),
                        //             "lastest_occur": null,
                        //             "wordID":1
                        //             },
                        // "TO":{
                        //             "total_freq": 1,
                        //             "session_freq": 1,
                        //             "first_occur": Date.now(),
                        //             "lastest_occur": null,
                        //             "wordID":1
                        //             },
        },
        "session_block": {},
        "last_video": {'url': null, 'toggle-cleared': false},
        "max_wordID":1,
        "freq_channels": [],
        "word_ignore":["a", "or", "if", "it's", "it", "is", "the"],
        "popup_activated":false
    }, 
    function() {
        console.log('Starting values have been preset...');
    });
});


const PAUSE_DELAY = 3000 //miliseconds
//the first regex string is to get every youtube video that does not end with 'watch' after the first '/' of the path
const notVideoRegex = /.*\/\/.*youtube.com\/(?!watch).*/
// const notVideoRegexString = ".*\/\/.*youtube.com\/(?!watch).*" //"^(.*)$"//


//rendering listeners___________________________________________________________________________________________________

// chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) { 
//     chrome.storage.local.get(['keywords', 'session_keywords' , 'max_wordID', 'session_block', 'last_video', 'mode' ], function(result) {
    

//     console.log("NAV DATA:" , details)
//     // alert("History Nav") 
//     var activeTab = details.tabId;
//     var url = details.url;
//     // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     //     var activeTab = tabs[0];
//     //     console.log("History Nav", activeTab.url)
//         // chrome.tabs.sendMessage(
//         //     // details.tabId,
//         //     activeTab.id,
//         //     {"message": "remove_old_title"}, function(res){
//         //         console.log("removed old title")
//         // })


//         const found = url.match(notVideoRegex);
//         // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//         if (activeTab && found == url ){
//             chrome.tabs.sendMessage(activeTab , {"message": "hide_popup"});
//             resetPopup()
//         }
//         else if ( url == result.last_video.url ){
//             // chrome.tabs.sendMessage(activeTab , {"message": "remove_old_title"},  function(){
//         setTimeout(function(){ 
//             // alert("WE SHOULD HAVE PROCESSED")
//             chrome.tabs.sendMessage(activeTab , {"message": "IS_PAGE_PROCESSABLE", "msgOriginType": "onHistoryStateUpdated"}, function(res){
//                 console.log("check message sent") 
//                 if (res.processCommand == "PROCESS_PAGE"){

//                     // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//                     //     var activeTab = tabs[0];
//                     //     var url = activeTab.url;


//                         // var url = tab.url;
//                         // var url = details.url;
//                         // console.log("active vs details: ", activeTab.url,  details.url)
            
//                         // chrome.tabs.sendMessage(
//                         //     // details.tabId,
//                         //     activeTab.id,
//                         //     {"message": "remove_old_title"}, 
//                         //     function(res){
//                         //         console.log("removed old title")




//                                 // const found = url.match(notVideoRegex);
//                                 // // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//                                 // if (activeTab && found == url ){
//                                 //     chrome.tabs.sendMessage(activeTab , {"message": "hide_popup"});
//                                 //     resetPopup()
//                                 // }
//                                 // else{
//                                     // checkTitle( activeTab.id, url , pauseVideo)
//                                     // chrome.tabs.sendMessage(activeTab , {"message": "remove_old_title"},  function(){
//                                         checkTitle( activeTab , url , pauseVideo)
//                                         // setTimeout(function(){ checkTitle( activeTab.id, url , pauseVideo); }, PAUSE_DELAY); //to avoid calling content when it's not available
//                                         resetPopup()
//                                     // });
//                                 // }





//                         //     }
//                         // )



//                     // });

//                 }

               

//             })
//         }, PAUSE_DELAY)
//     // })
//         }
//         else{
//             chrome.tabs.sendMessage(activeTab , {"message": "remove_old_title"},  function(){
//         setTimeout(function(){ 
//             // alert("WE SHOULD HAVE PROCESSED")
//             chrome.tabs.sendMessage(activeTab , {"message": "IS_PAGE_PROCESSABLE", "msgOriginType": "onHistoryStateUpdated"}, function(res){
//                 console.log("check message sent") 
//                 if (res.processCommand == "PROCESS_PAGE"){

//                     // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//                     //     var activeTab = tabs[0];
//                     //     var url = activeTab.url;


//                         // var url = tab.url;
//                         // var url = details.url;
//                         // console.log("active vs details: ", activeTab.url,  details.url)
            
//                         // chrome.tabs.sendMessage(
//                         //     // details.tabId,
//                         //     activeTab.id,
//                         //     {"message": "remove_old_title"}, 
//                         //     function(res){
//                         //         console.log("removed old title")




//                                 // const found = url.match(notVideoRegex);
//                                 // // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//                                 // if (activeTab && found == url ){
//                                 //     chrome.tabs.sendMessage(activeTab , {"message": "hide_popup"});
//                                 //     resetPopup()
//                                 // }
//                                 // else{
//                                     // checkTitle( activeTab.id, url , pauseVideo)
//                                     // chrome.tabs.sendMessage(activeTab , {"message": "remove_old_title"},  function(){
//                                         checkTitle( activeTab , url , pauseVideo)
//                                         // setTimeout(function(){ checkTitle( activeTab.id, url , pauseVideo); }, PAUSE_DELAY); //to avoid calling content when it's not available
//                                         resetPopup()
//                                     // });
//                                 // }





//                         //     }
//                         // )



//                     // });

//                 }

               

//             })
//         }, PAUSE_DELAY)
//     })
//         }
//     // })


//     //hidden old code for saving space:
    
//     // SAVING IN CASE WE BACKTRACK AND JUST WANT TO PERFORM THIS AS A RESPONSE TO THE FIRST MESSAGE INSTEAD OF A SEPARATE MESSAGE
//     // SINCE THIS IS FUNCTIONALLY THE SAME AS THE OTHER ONE, WE CAN MAKE IT A FUNCTION AND USE IT FOR BOTH (BUT IF THEY'RE DIFFERENT LATER THEN THAT'S A DIFFERENT STORY AND WE NEED THESE TWO SEPERATE)
//     //
//                     // console.log("hngcgcj", window.location.href, details.url, details.transitionType, details.parentFrameId)

//                     // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//                     //     var activeTab = tabs[0];
//                     //     // var url = tab.url;
//                     //     var url = details.url;
//                     //     console.log("active vs details: ", activeTab.url,  details.url)
//                     //     const found = url.match(notVideoRegex);

//                     //     //to make sure that the old title is deleted while internally navigating
//                     //     //Reason:   after applying styles, the default youtube system seems to be unable to get 
//                     //     //          rid of the title by itself unless the page is just reloaded
//                     //     chrome.tabs.sendMessage(
//                     //         // details.tabId,
//                     //         activeTab.id,
//                     //         {"message": "remove_old_title"}, function(res){

//                     //             // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//                     //             if (activeTab && found == url ){
//                     //                 chrome.tabs.sendMessage(activeTab.id, {"message": "hide_popup"} , function(resp){
//                     //                     resetPopup()
//                     //                 });   
//                     //             }
//                     //             else{
//                     //                 // checkTitle( activeTab.id, url )

//                     //                 setTimeout(function(){ checkTitle( activeTab.id, url , pauseVideo); }, PAUSE_DELAY); //to avoid taking the information from the last page
//                     //                 // checkTitle( activeTab.id, url , pauseVideo)

//                     //             }
//                     //             // alert("DELETED")
//                     //         })
//                     // });
    
//     })
//                 }, {url: [{hostSuffix: 'youtube.com' /* , urlContains: '/watch'*/}]}
// );


// chrome.webNavigation.onCompleted.addListener(function(details) { 
//     // alert("Page Completed")  

//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         var activeTab = tabs[0];
//         setTimeout(function(){ 
//             // alert("WE SHOULD HAVE PROCESSED")
//             chrome.tabs.sendMessage(activeTab.id, {"message": "IS_PAGE_PROCESSABLE", "msgOriginType": "onCompleted" } , function(res){

//                 if (res.processCommand == "PROCESS_PAGE"){

//                     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//                         var activeTab = tabs[0];
//                         var url = activeTab.url;
//                         // var url = tab.url;
//                         // var url = details.url;
//                         // console.log("active vs details: ", activeTab.url,  details.url)
            
//                         chrome.tabs.sendMessage(
//                             // details.tabId,
//                             activeTab.id,
//                             {"message": "remove_old_title"}, 
//                             function(res){
//                                 console.log("removed old title")
//                                 const found = url.match(notVideoRegex);
//                                 // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//                                 if (activeTab && found == url ){
//                                     chrome.tabs.sendMessage(activeTab.id, {"message": "hide_popup"});
//                                     resetPopup()
//                                 }
//                                 else{
//                                     // checkTitle( activeTab.id, url , pauseVideo)
//                                     checkTitle( activeTab.id, url , pauseVideo)
//                                     // setTimeout(function(){ checkTitle( activeTab.id, url , pauseVideo); }, PAUSE_DELAY); //to avoid calling content when it's not available
//                                     resetPopup()
//                                 }
//                             }
//                         )
//                     });

//                 }



//             } )
//         }, PAUSE_DELAY)
        
//     })
//     //
//                                     // console.log("hngcgcj", window.location.href, details.url, details.transitionType, details.parentFrameId)

    
//                                     // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//                                     //     var activeTab = tabs[0];
//                                     //     // var url = tab.url;
//                                     //     var url = details.url;
//                                     //     // console.log("active vs details: ", activeTab.url,  details.url)

//                                     //     chrome.tabs.sendMessage(
//                                     //         // details.tabId,
//                                     //         activeTab.id,
//                                     //         {"message": "remove_old_title"}, function(res){
                            
                            

//                                     //         const found = url.match(notVideoRegex);
//                                     //         // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//                                     //         if (activeTab && found == url ){
//                                     //             chrome.tabs.sendMessage(activeTab.id, {"message": "hide_popup"});
//                                     //             resetPopup()
//                                     //         }
//                                     //         else{
                                            

//                                     //             // checkTitle( activeTab.id, url , pauseVideo)
//                                     //             setTimeout(function(){ checkTitle( activeTab.id, url , pauseVideo); }, PAUSE_DELAY); //to avoid calling content when it's not available
//                                     //             resetPopup()
//                                     //         }

//                                     //     })
                                        
//                                     // });
//                                     // }        
//     }
//     ,{url: [{hostSuffix: 'youtube.com' /* , urlContains: '/watch' */}]}
// );

//response listeners____________________________________________________________________________________________________

chrome.runtime.onMessage.addListener( function (request, sender, sendResponse ){
    console.log("we hit background.js ")
    if (request.message == "PROCESS_PAGE"){

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            var url = activeTab.url;
            // var url = tab.url;
            // var url = details.url;
            // console.log("active vs details: ", activeTab.url,  details.url)

            chrome.tabs.sendMessage(
                // details.tabId,
                activeTab.id,
                {"message": "remove_old_title"}, 
                function(res){
                    console.log("removed old title")
                    const found = url.match(notVideoRegex);
                    // chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
                    if (activeTab && found == url ){
                        chrome.tabs.sendMessage(activeTab.id, {"message": "hide_popup"});
                        resetPopup()
                    }
                    else{
                        // checkTitle( activeTab.id, url , pauseVideo)
                        checkTitle( activeTab.id, url , pauseVideo)
                        // setTimeout(function(){ checkTitle( activeTab.id, url , pauseVideo); }, PAUSE_DELAY); //to avoid calling content when it's not available
                        resetPopup()
                    }
                }
            )
        });
    }
    //This is an important function since we're saving changes to storage in background and changes are immediate (saving from content scripts require for you to wait until the page is reloaded or changed)
    if (request.message == "save_keys"){
        chrome.storage.local.set(request.user_changes, function() {
            console.log("USER CHANGES", request.user_changes)

            chrome.storage.local.get("last_video", function(request){
                console.log("Last video", request.last_video)
            })
        });
        //must send SOME kind of response or else you will get an "Unchecked runtime.lastError: The message port closed before a response was received." error
        sendResponse({"message": "success"})
    }
    //This responds to the popup return button to go to the last page you were on in history
    if (request.message == "GO_BACK"){
        chrome.tabs.goBack(function(){
            console.log("WE ARE REACTIVATING IT")
            resetPopup()
        })
    }
    //switch statment ver hidden:
        // switch(request.message){
        //     case "GO_BACK":
        //         chrome.tabs.goBack(function(){
        //             console.log("WE ARE REACTIVATING IT")
        //             resetPopup()
        //         })
        //         break;
        //     case "ADD_KEYWORD":
        //         break;
        //     case "DELETE_KEYWORD":
        //         break;
        //     case "START_TIMER":
        //         break;
        //     case "STOP_TIMER":
        //         break;
        // }
        // return true
})

chrome.alarms.onAlarm.addListener(function( alarm ) {
    // alert("you got an alarm")
    console.log("Got an alarm!", alarm);
    if(alarm.name == "PRODUCTIVITY_MODE"){
        chrome.storage.local.set({'mode':'LEISURE'}, function() {
            console.log('Alarm is firing! ');
        });
    }
});

//helper functions______________________________________________________________________________________________________

function checkTitle( tabID, currUrl ){
    // alert("arriced at check title")
    chrome.tabs.sendMessage(
        // details.tabId,
        tabID, 
        {"message": "get_video_info"}, 
        function(res){
            if (res && res.vidTitle){
                                
              
                chrome.storage.local.get(['keywords', 'session_keywords' , 'max_wordID', 'session_block', 'last_video', 'mode' ], function(result) {
                    var string = ''
                    // var re = /(^\(\d*\)\s(.*)\s-\sYouTube$|^\(\d*\)\s(.*)$|^(.*)\s-\sYouTube$|^(.*)$)/
                    var re = /(^\(\d*\)\s([\s\S]*)\s-\sYouTube$|^\(\d*\)\s([\s\S]*)$|^([\s\S]*)\s-\sYouTube$|^([\s\S]*)$)/
                    //this regEx checks for a string that begins with a number in parenthesis or ends with ' - YouTube' and cuts out the string inbetween
                    //the text inbetween can be any group between 2 and 5 inclusive
                    //group 1 happens to contain the whole string
                    //group number curresponds to the index in the returned array by .match()
                    //the 0 index is the whole string
                    const foundRE = res.vidTitle.match(re);
                    console.log("REGEX RESULTS:", foundRE, res.vidTitle , re)
                    console.log("GROUP 2: prefix+suffix",   "(234) This is(?s)432 (.*sdf - YouTube".match(re))
                    console.log("GROUP 3: prefix",          "(234) This is(?s)432 (.*sdf - YouTub".match(re))
                    console.log("GROUP 4: suffix",          "(234)This is(?s)432 (.*sdf - YouTube".match(re))
                    console.log("GROUP 5: neither",         "(234)This is(?s)432 (.*sdf - YouTub".match(re))
                    if (foundRE){
                        console.log("whole string: ", foundRE[0])
    
                        var idx = 2;
                        while (idx < 6 && string == ''){
                            console.log(foundRE[idx])
                            if (foundRE[idx] != undefined){
                                string = foundRE[idx]
                            }
                            idx++
                        }
    
                    }
                    // console.log("whole string: ", foundRE[0])
    
                    // if (string == ''){
                    //     string = res.vidTitle
                    // }
                            // Hidden code to go with using a string that comes from a div without need to strip
                                // console.log(res.vidTitle.substring(4, res.vidTitle.length-10), res.channelName) //minus 10 to get rid of "- Youtube" (9+1)
                                // var string = res.vidTitle
                                // if( string.substring(0, 27) == "<span id='ext-styled-text'>"){
                                //     console.log("THE TITLE IS STYLED", string = '')
                                //     string = ''
                                // }
                                
                                //The below code only works for strings that may or may not begin with "(1) " but not any other number
                                // var string = res.vidTitle
                                // if(res.vidTitle.substring(0,4)=="(1) "){
                                //     string = string.substring(4, string.length) 
                                // }
                                // if(res.vidTitle.substring(res.vidTitle.length-10,res.vidTitle.length)==" - YouTube"){
                                //     string = string.substring(0, string.length-10) 
                                // }
                                // console.log("["+string+"]", "["+res.channelName+"]", "["+res.vidTitle.substring(res.vidTitle.length-10,res.vidTitle.length)+"]" )
                            //
                            
                    var strArr =  string.toUpperCase().split(" ").filter(Boolean);
                    if (result.mode == "PRODUCTIVITY" && string != ''){
                        // alert( currUrl ) //result.last_video)
                        var instigatorKeywordsArr = []

                        var storageKeys = result.keywords
                        var sessionStorageKeys = result.session_keywords
                        var new_max_wordID = result.max_wordID
                        var block_sites = result.session_block
                        // if (currUrl != result.last_video){
                        console.log('Value currently is ' + result.keywords + " || " + result.session_keywords );
                        var isFirstSessionOccur =false
                        var term = ""
                        strArr.forEach(function(t){
                            term = t
                            // termRE1 = term.match(/\w(.*\s\w?)\w/);
                            // termRE1 = term.match(/([\w#@](.*\s?)[\w])|([\w])/);  //  this accepts hashtags and @something
                                                                                    //  in order to accept more than letters and 
                                                                                    //  numbers for starters, all you need to do 
                                                                                    //  is add the symbol between the [], the one 
                                                                                    //  exception is the hyphen (-) because it is 
                                                                                    //  special and must be the first thing between 
                                                                                    //  the brackets if you want to use it
                            termRE1 = term.match(/([\w](.*\s?)[\w])|([\w])/);
                            
                            console.log("TERM:", termRE1)
                            if (termRE1){
                                term=termRE1[0]
                            }
                            else{
                                term =''
                            }
                            // term=termRE1[0]

                            isFirstSessionOccur =false
                            
                            var currDateTime = Date.now()
                            if(term in storageKeys){
                                if (currUrl != result.last_video.url || result.last_video["toggle-cleared"] == true){
                                    console.log("STORAGEKEY freq:", term, storageKeys[term])
                                    storageKeys[term].total_freq++
                                    storageKeys[term].session_freq++
                                    storageKeys[term].lastest_occur = currDateTime
                                    if (!(term in sessionStorageKeys)){
                                        console.log("THIS TERM IS NOT IN SSKEYS:", term, sessionStorageKeys[term])
                                        sessionStorageKeys[term] = {
                                            "total_freq": storageKeys[term].total_freq,
                                            "session_freq": 1,
                                            "first_occur": storageKeys[term].first_occur,
                                            "lastest_occur": currDateTime,
                                            "wordID": storageKeys[term].max_wordID
                                        }
                                        isFirstSessionOccur =true
                                        console.log("THIS TERM IS NOT IN SSKEYS1:", term, sessionStorageKeys[term])
                                    }
                                    else{
                                        if (sessionStorageKeys[term].session_freq < (storageKeys[term].session_freq -1)){
                                            storageKeys[term].session_freq = sessionStorageKeys[term].session_freq +1
                                        }
                                    }
                                }
                                if (!(currUrl in block_sites)){
                                    
                                    block_sites[currUrl]={
                                        "keywords": {}
                                    }
                                    block_sites[currUrl]["keywords"][term] = true
                                }
                                else if (!(term in block_sites[currUrl].keywords)){
                                    block_sites[currUrl].keywords[term] = true
                                }
                                console.log("BLOCKED SITES: ", block_sites)
                                console.log("STORAGEKEY freq incr:", term, storageKeys[term])

                            }
                            if ((term in sessionStorageKeys) && !isFirstSessionOccur && (currUrl != result.last_video.url || result.last_video["toggle-cleared"] == true)){
                                console.log("SESSIONSTORAGEKEY freq:", term, sessionStorageKeys[term])
                                sessionStorageKeys[term].total_freq++
                                sessionStorageKeys[term].session_freq++
                                sessionStorageKeys[term].lastest_occur = currDateTime

                                console.log("SESSIONSTORAGEKEY freq incr:", term, sessionStorageKeys[term])
                            }
                            else if (!(term in sessionStorageKeys) && !(term in storageKeys) && (currUrl != result.last_video.url || result.last_video["toggle-cleared"] == true) ){
                                console.log("NEW SESSIONSTORAGEKEY freq:", term, sessionStorageKeys, sessionStorageKeys[term])
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
                        chrome.storage.local.set({'keywords': storageKeys, 'session_keywords': sessionStorageKeys , 'max_wordID': new_max_wordID, 'last_video': {'url': currUrl, 'toggle-cleared': false}, 'session_block': block_sites}, function() {
                            console.log('Values changed to 1: ' , storageKeys);
                            console.log('Values changed to 2: ' , sessionStorageKeys);
                            console.log('Values changed to 3: ' , new_max_wordID);
                            console.log('Values changed to 4: ' , currUrl);
                            console.log('Values changed to 5: ' , block_sites);
                        });
                        if (currUrl in block_sites){
                            instigatorKeywordsArr = Object.keys(block_sites[currUrl]["keywords"])
                        }
                        console.log("instigatorKeywordsArr:", instigatorKeywordsArr, currUrl )
                        pauseVideo( tabID, currUrl, instigatorKeywordsArr, string ) //instigatorKeywordsArr != [] ? instigatorKeywordsArr[0] : '' )
                    }
                })
            }
        }
    );
}

function pauseVideo( tabID, url, instigatorKeyword = [] , title ){
    // alert("arriced at pause function")
    chrome.storage.local.get(['session_block', 'popup_activated','keywords'], function(result) {
        console.log("returned True!", url, result.session_block)
        // console.log(url, result.session_block)
        // console.log("returned True!", url, result.session_block)
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
                    {"message": "show_popup" , 'instigatorKeyword': instigatorKeyword , 'title': title }, function(res){
                    console.log("popup! 1")
                    console.log("THESE ARE THE PARTIALLY AVAILABLE KEYWORDS:",result.keywords )
                    chrome.storage.local.set({'popup_activated': true}, function() {
                    });
                    // alert("video is paused")
                });
            }
            console.log("video paused! 2")
        }
    })
}

function resetPopup(){
    chrome.storage.local.set({'popup_activated': false}, function() {
    });
}

