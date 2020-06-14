var firstLanding = true
var historyLastURL = document.URL

// document.addEventListener('click',function(){
//     console.log(document.getElementsByTagName("ytd-app")[0])
//     alert("page-loaded")
// })
//oddly this fires whenever we go from history to a video 
// document.addEventListener('yt-guide-close',function(){
//     console.log(document.getElementsByTagName("ytd-app")[0])
//     // console.log("body tag:", document.getElementsByTagName("body")[0])
//     alert("guide closed")
// })


//this will fire whenever we land on a page after navigating to it (the info is not necessarily loaded yet)
// document.addEventListener('yt-navigate-finish',function(){
//     console.log("asdfadfgagfagag", document.getElementsByTagName("ytd-app")[0])
//     console.log(document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML)
//     alert("we navigated")
// })

//this will fire every time the toggle icon is clicked!
// document.addEventListener('yt-guide-toggle',function(){
//     console.log(document.getElementsByTagName("ytd-app")[0])
//     console.log("body tag:", document.getElementsByTagName("body")[0])
//     alert("toggle clicked")
// })


// document.getElementsByTagName("ytd-app")[0].addEventListener('yt-focus-searchbox',function(){
//     alert("searchbox focused")
// })


//when the page is full and the title updates
// document.getElementsByTagName("ytd-app")[0].addEventListener('yt-update-title',function(){
//     alert("title updated")
// })


// document.getElementsByTagName("ytd-app")[0].addEventListener('yt-visibility-refresh',function(){
//     console.log("visibility refreshed")
//     // alert("visibility refreshed")
// })

//fires when a full page vid ends (BEFORE THE TIMER)
// document.getElementsByTagName("ytd-app")[0].addEventListener('yt-autonav-pause-player-ended',function(){
//     // console.log("player ended")
//     alert("player ended")
// })

// document.getElementsByTagName("ytd-app")[0].addEventListener('app-drawer-transitioned',function(){
//     // console.log("player ended")
//     alert("app-drawer transitioned")
// })
// document.getElementsByTagName("ytd-app")[0].addEventListener('app-drawer-transitioned',function(){
//     // console.log("player ended")
//     alert("app-drawer transitioned")
// })

document.addEventListener('readystatechange',function(){
    // console.log("player ended")
    // alert("state changed")      // important check
})

var playAbleVid = function(){
   console.log("we can now play")
}


document.querySelector("#movie_player > div.html5-video-container > video").addEventListener('canplay', playAbleVid )
// document.getElementsByTagName("body")[0].addEventListener('yt-page-data-updated',function(){
    
// })
document.getElementsByTagName("body")[0].addEventListener('yt-page-data-updated',function(){
    console.log("miniplayer info:", document.querySelector("ytd-miniplayer"))
    console.log("SHOW RENDERED body tag:", document.getElementsByTagName("body")[0])
    console.log("SHOW  TITLE :", document.getElementById("info-contents").querySelector("h1").firstChild)
    const notVideoRegex = /.*\/\/.*youtube.com\/(?!watch).*/
    const found = document.URL.match(notVideoRegex);
    if (found != document.URL){
        console.log("WE SHOULD NOW PROCESS")
        historyLastURL = document.URL
        firstLanding = false //not needed 

        observer.observe( document.querySelector("body > ytd-app") , observerOptions);
        if (document.querySelector("body > ytd-app").hasAttribute("is-watch-page")){
            // alert("it's watch")      // important check
            removeTitle()
            checkTitle( 2, document.URL , pauseVideo, "player")
            resetPopup()
            // code if we go background.js is the primary script
            // alert("we are processing")      // important check
        }


        
        // chrome.runtime.sendMessage({ "message": "PROCESS_PAGE" } , function(){
        //     console.log("WE SHOULD NOW PROCESS")
        //     historyLastURL = document.URL
        //     firstLanding = false
        //     // alert("page PROCESSING")
        // } )
    }
    else{
        // alert("NOT A VIDEO")
        deletePopup()
        resetPopup()
    }

    // alert("page-UPDATED")
})




var observerOptions = {
    childList: false,
    attributes: true,
    subtree: false //Omit or set to false to observe only changes to the parent node.
  }

function callback(mutationList, observer) {
    console.log ("MUTATION:", mutationList)
    mutationList.forEach(function(ml){
        console.log("attribute: ", ml.attributeName)
        
        if (ml.attributeName == "miniplayer-active_"){
            console.log("Mini player: ", document.querySelector("#movie_player > div.html5-video-container > video") )
            console.log("Mini player Title: ", document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string") )
            observerTitle.observe( document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string") , observerOptionsTitle);


            // document.querySelector("#movie_player > div.html5-video-container > video").addEventListener("canplaythrough", function(){
            //     console.log("Mini player: ", document.querySelector("#movie_player > div.html5-video-container > video") )
            //     console.log("Mini player Title: ", document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string") , document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string").innerHTML)
            // })
        }

    })
    
}

var observer = new MutationObserver(callback);





var observerOptionsTitle = {
    childList: false,
    attributes: true,
    subtree: false //Omit or set to false to observe only changes to the parent node.
  }

function callbackTitle(mutationList, observer) {
    console.log ("TITLE MUTATION:", mutationList)
    mutationList.forEach(function(ml){
        console.log("TITLE attribute: ", ml )
        if (ml.attributeName == "title"){
            console.log( document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string").innerHTML)
            checkTitle( 2, document.URL , pauseVideo, "miniplayer")
            resetPopup()
            // document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string").innerHTML = "ttesttest"
        }
        // if (ml.attributeName == "miniplayer-active_"){
            // console.log("Mini player: ", document.querySelector("#movie_player > div.html5-video-container > video") )
            // console.log("Mini player Title: ", document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string") )

            
            // document.querySelector("#movie_player > div.html5-video-container > video").addEventListener("canplaythrough", function(){
            //     console.log("Mini player: ", document.querySelector("#movie_player > div.html5-video-container > video") )
            //     console.log("Mini player Title: ", document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string") , document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string").innerHTML)
            // })
        // }

    })
    
}

var observerTitle = new MutationObserver(callbackTitle);


//response listeners____________________________________________________________________________________________________

chrome.runtime.onMessage.addListener( function (request, sender, sendResponse ){
    

    if (request.message == "IS_PAGE_PROCESSABLE"){
        // alert(document.getElementById("ext-styled-text").innerHTML)
        // console.log()

        if (request.msgOriginType == "onHistoryStateUpdated"){
            if ( historyLastURL != document.URL || firstLanding){
                
                console.log("WE SHOULD NOW PROCESS")
                historyLastURL = document.URL
                firstLanding = false
                sendResponse({"processCommand": "PROCESS_PAGE"})
                // chrome.runtime.sendMessage({ "message": "PROCESS_PAGE" } , function(){
                //     console.log("WE SHOULD NOW PROCESS")
                //     historyLastURL = document.URL
                //     firstLanding = false
                //     // alert("success")
                // } )
            }
            else{
                sendResponse({"processCommand": "DON'T_PROCESS_PAGE"})
            }
        }else{
            console.log("WE SHOULD NOW PROCESS")
            firstLanding = false
            sendResponse({"processCommand": "PROCESS_PAGE"})
            // chrome.runtime.sendMessage({ "message": "PROCESS_PAGE" } , function(){
            //     console.log("WE SHOULD NOW PROCESS")
            //     firstLanding = false
            //     // alert("success")
            // } )
        }
        //HIDDEN OLD CODE:
            // // alert("WE SHOULD PROCESS")
            // console.log("PROCESS CONSIDERATION", firstLanding)
            // if (firstLanding){
            //     chrome.runtime.sendMessage({ "message": "PROCESS_PAGE" } , function(){
            //         console.log("WE SHOULD NOW PROCESS")
            //         firstLanding = false
            //         // alert("success")
            //     } )
            // }
            // else{
            //     console.log("CANNOT PROCESS",firstLanding , document.URL)
            // }
    }

    if (request.message == "remove_old_title" && document.getElementById("ext-styled-text") != null){
        // alert(document.getElementById("ext-styled-text").innerHTML)
        removeTitle()
    }
    
    if (request.message == "pause_video"){
        var video = document.querySelector("video");
        console.log("video ", video )//, "title", title, "titleString", titleString)

        console.log("pausing")
        video.pause();
        sendResponse({video: video})
    }

    if (request.message == "get_video_info"){
        sendResponse( getVideoInfo("player") )
        
        // console.log(window.location.href)
        // // var video = document.querySelector("video");
        // var background =  document.getElementById("columns")

        // if (document.getElementById("channel-name")!= null){
        //     var channelName = document.getElementById("channel-name").querySelector("a").innerHTML
        // }
        // // var channelName = document.getElementById("channel-name").querySelector("a").innerHTML//alternatively: .querySelector("#text").getElementsByTagName("a")         //.getElementsByTagName("div")//.getElementById("text")//.getElementsByTagName("a").innerHTML;
        // var title = document.querySelector("title") ;
        // var titleString = null
        // if (title!= null){
        //     titleString = document.querySelector("title").innerHTML ;
        // }
        // // titleString = document.querySelector('meta[name="title"]').content
        // //VERSION THAT TAKES THE SEARCH TITLE STRING FROM THE SAME TITLE WE EDIT
        // // var titleString = document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML
        
        // console.log(/*"video ", video,*/ "title", title, "titleString", titleString, "channelName:", channelName)
        
        // sendResponse({vidTitle: titleString, channelName: channelName})
    }

    if (request.message == "show_popup"){
        // console.log("This is the video title" , document.querySelector('meta[name="title"]').content)

        var titleVal = document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML
        // titleVal = document.querySelector('meta[name="title"]').content
        console.log("TITLE INFO", titleVal )
        console.log("INSTIGATING KEYWORDS", request.instigatorKeyword )
        // if ((document.getElementById("ext-styled-text")== null && document.getElementById("ext-styled-text")== undefined) ){ //|| (document.getElementById("ext-styled-text")!= null && document.getElementById("ext-styled-text")== undefined)){
        //     if(document.getElementById("info-contents")){
        //         if ( document.getElementById("info-contents").querySelector("h1")){
        //             if ( document.getElementById("info-contents").querySelector("h1").firstChild){
        //                 if ( document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML != ""){
        //                     alert("filling")
        //                     document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML = styleSearchString( titleVal , request.instigatorKeyword )
        //                 }    
        //             }
        //         }
        //     }      
        // }
        console.log("THESE ARE THE STYLE TAGSjvuj:", document.getElementsByClassName("ext-searchIndication"))
        if (document.getElementsByClassName("ext-searchIndication")!= null  && document.getElementsByClassName("ext-searchIndication").length == 0  ){ //|| (document.getElementById("ext-styled-text")!= null && document.getElementById("ext-styled-text")== undefined)){
            if (document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML.length > 0){
                document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML = styleSearchString( /*titleVal*/ request.title , request.instigatorKeyword )  
                // alert("ADDING title")
            }
           
        }
        else{
            console.log("THIS IS THE TITLE STYLED OBJECT:", document.getElementById("ext-styled-text"))
            console.log("THESE ARE THE STYLE TAGS:", document.getElementsByClassName("ext-searchIndication"))
            // removeTitle()
            // if (document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML.length > 0){
            //     document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML = styleSearchString( /*titleVal*/ request.title , request.instigatorKeyword )  
            // }
            // if 
            // .parentNode.removeChild(popupArr[0]
        }
        
        

        var div=document.createElement("div"); 
        document.body.appendChild(div); 
        div.setAttribute("id", "ext-popup")
        
        var keywords = request.instigatorKeyword 
        var keywordsStr = ''
        if (keywords.length > 2){
            keywords[keywords.length-1]= " <span class='ext-array-and-styles'>and</span> "+keywords[keywords.length-1]
            keywordsStr = keywords.join(', ')
        }
        else{
            keywordsStr = keywords.join(" <span class='ext-array-and-styles'>and</span> ")
        }
        
        div.innerHTML=      "<div class='ext-title-container'>"+
                                "Whoops, looks like this video's on your  NoNoList!"+
                            "</div>"+
                            "<div class='ext-subtitle-container'>"+
                                "<span>This video contains the word(s): "+keywordsStr+"</span><br>"+
                                "What would you like to do?"+
                            "</div>"+
                            "<div class='ext-popup-button-container'>"+
                                "<div class='ext-button-container'>"+
                                    "<button id='ext-return-button' class='ext-popup-button' >Return to Safety</button>"+
                                    "<button id='ext-proceed-button' class='ext-popup-button'>Proceed to Video</button>"+
                                "</div>"+
                            "</div>"
        div.classList.add("ext-popupDiv");
    }
    if (request.message == "hide_popup"){
        deletePopup()
    }
    if (request.message == "print_test"){
        console.log("PRINTF: " , request.printMsg)
    }
    // return true
})

//listeners for popup clicks____________________________________________________________________________________________

document.addEventListener('click',function(e){
    if(e.target){
        switch(e.target.id){
            case "ext-return-button":
                chrome.runtime.sendMessage({"message": "GO_BACK"} ) 
            case "ext-proceed-button":
                deletePopup()
                resetPopup()
                break;
        }
    }
});



//helper functions______________________________________________________________________________________________________

function recursiveSplitJoin( stringArr, queryArr, queryIdx ){
    var splitArr = []
    if (queryIdx == queryArr.length){
        return 
    }
    else{
        for (var i= 0; i< stringArr.length; i++){
            // if not empty string
            splitArr = stringArr[i].split(queryArr[queryIdx])//the regex before

        }
    }
}




function styleSearchString( string , query = []){

    // var strArr =  string.split(" ").filter(Boolean);
    // const querySet = new Set(query);
    // var objString =''

    // strArr.forEach(function(t){
    //     term = t
    //     termRE1 = term.match(/([\w](.*\s?)[\w])|([\w])/);
        
    //     console.log("TERM:", termRE1)
    //     if (termRE1){
    //         term=termRE1[0]
    //         if (querySet.has(term.toUpperCase())){
    //             objString+='<span class="ext-searchIndication">'+term+'</span>'
    //         }
    //         else{
    //             objString+=term
    //         }
    //     }

    // }


    console.log("QUERY: ", query, "STRING:", string)
    var querystr = '' 
    var result = string;
    var reg = null;
    final_str =  result
    stringArr = []
    regString=''


    // for (var idx = 0; idx< query.length ; idx++ ){
    //     querystr = query[idx]
    //     strPart = 

        

    // }

    // for (var idx = 0; idx< query.length ; idx++ ){
    //     querystr = query[idx]
    //     if (idx == query.length-1){
    //         regString+="((?<=\\W)("+querystr+")(?=\\W))|((?<=\\W)("+querystr+"))|(("+querystr+")(?=\\W))"
    //     }
    //     else{
    //         regString+="((?<=\\W)("+querystr+")(?=\\W))|((?<=\\W)("+querystr+"))|(("+querystr+")(?=\\W))|"
    //     }
    //     // reg = new RegExp(querystr, 'gi');
    // }
    // reg = new RegExp(regString, 'gi');
    // console.log("REGEX:", reg)

    // final_str =  "" + final_str.replace(reg, function(str) {return '<span class="ext-searchIndication">'+str+'</span>'});
    //will fail if the added tag itself will be a search string like "class"

    for (var idx = 0; idx< query.length ; idx++ ){
        querystr = query[idx]
        if (querystr == "CLASS"){
            reg = new RegExp("((?<=\\W)("+querystr+")((?!(\=\"ext-searchIndication\">)|(\\w))))|(^("+querystr+")((?!(\\=\"ext-searchIndication\">)|(\\w))))", 'gi');
        }
        else if (querystr == "SPAN"){
            reg = new RegExp( "((?<=[^\\w<])("+querystr+")((?!(\\sclass\=\"ext-searchIndication\">)|(\\w))))|(^("+querystr+")((?!(\\sclass\=\"ext-searchIndication\">)|(\\w))))", 'gi');
        }
        else{
            reg = new RegExp("((?<=\\W)("+querystr+")(?=\\W))|((?<=\\W)("+querystr+"))|(("+querystr+")(?=\\W))", 'gi');
        }
        // reg = new RegExp(querystr, 'gi');
        console.log("REGEX:", reg)
        final_str =  "" + final_str.replace(reg, function(str) {return '<span class="ext-searchIndication">'+str+'</span>'});
    }


    final_str = "<span id='ext-styled-text' vidURL='"+document.URL+"'>"+final_str+"</span>"
    return final_str
}



function deletePopup(){
    var popupArr = document.getElementsByClassName("ext-popupDiv")
    while(popupArr.length > 0){
        popupArr[0].parentNode.removeChild(popupArr[0]);   
    }  
 }


// NOT SENDING THIS LIKE THE REST TO BACKGROUND FIRST BECAUSE, IF ANYTHING, I DON'T WANT THIS TO HAPPEN TOO IMMEDIATELY
function resetPopup(){
    chrome.storage.local.set({'popup_activated': false}, function() {
    });
 }


 function removeTitle(){
    // alert("removing title")
    if (document.getElementById("ext-styled-text") != null && document.getElementById("ext-styled-text") != undefined && document.getElementById("ext-styled-text").getAttribute("vidURL")!= document.URL){
        document.getElementById("ext-styled-text").remove()
        // console.log()
        // alert("removing title")

    }
 }











/////



function getVideoInfo(videoType){
    if (videoType == "player"){
        console.log(window.location.href)
        // var video = document.querySelector("video");
        var background =  document.getElementById("columns")

        if (document.getElementById("channel-name")!= null){
            var channelName = document.getElementById("channel-name").querySelector("a").innerHTML
        }
        // var channelName = document.getElementById("channel-name").querySelector("a").innerHTML//alternatively: .querySelector("#text").getElementsByTagName("a")         //.getElementsByTagName("div")//.getElementById("text")//.getElementsByTagName("a").innerHTML;
        var title = document.querySelector("title") ;
        var titleString = null
        if (title!= null){
            titleString = document.querySelector("title").innerHTML ;
        }
        // titleString = document.querySelector('meta[name="title"]').content
        //VERSION THAT TAKES THE SEARCH TITLE STRING FROM THE SAME TITLE WE EDIT
        // var titleString = document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML
        
        console.log(/*"video ", video,*/ "title", title, "titleString", titleString, "channelName:", channelName)

    }
    else if (videoType == "miniplayer"){
        var titleString  =document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string").title
        var channelName = ""
    }
    
    
    return({vidTitle: titleString, channelName: channelName})
}




function checkTitle( tabID, currUrl , pauseVideo,  videoType){
    // alert("arriced at check title")
    // chrome.tabs.sendMessage(
    //     // details.tabId,
    //     tabID, 
    //     {"message": "get_video_info"}, 
    //     function(res){
    var res = getVideoInfo(videoType)
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
 
                            
                    var strArr =  string.toUpperCase().split(" ").filter(Boolean);

                    console.log("THE SEARCH ARRAY:", strArr)
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
                                // alert("in nono")      // important check
                                if (currUrl != result.last_video.url || result.last_video["toggle-cleared"] == true || (videoType == "miniplayer")){
                                    console.log("STORAGEKEY freq:", term, storageKeys[term])
                                    storageKeys[term].total_freq++
                                    storageKeys[term].session_freq++
                                    storageKeys[term].latest_occur = currDateTime
                                    if (!(term in sessionStorageKeys)){
                                        console.log("THIS TERM IS NOT IN SSKEYS:", term, sessionStorageKeys[term])
                                        sessionStorageKeys[term] = {
                                            "total_freq": storageKeys[term].total_freq,
                                            "session_freq": 1,
                                            "first_occur": storageKeys[term].first_occur,
                                            "latest_occur": currDateTime,
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
                                if (!(currUrl in block_sites) && videoType == "player"){
                                    
                                    block_sites[currUrl]={
                                        "keywords": {}
                                    }
                                    block_sites[currUrl]["keywords"][term] = true
                                    // alert("added")
                                }
                                else if ( block_sites[currUrl] && !(term in block_sites[currUrl].keywords) && videoType == "player"){
                                    // alert("This must be a player")      // important check
                                    block_sites[currUrl].keywords[term] = true
                                }
                                else if  (!(instigatorKeywordsArr.includes(term)) && videoType == "miniplayer"){
                                    instigatorKeywordsArr.push(term)
                                }
                                console.log("BLOCKED SITES: ", block_sites)
                                console.log("STORAGEKEY freq incr:", term, storageKeys[term])

                            }
                            if ((term in sessionStorageKeys) && !isFirstSessionOccur && (currUrl != result.last_video.url || result.last_video["toggle-cleared"] == true || videoType == "miniplayer")){
                                console.log("SESSIONSTORAGEKEY freq:", term, sessionStorageKeys[term])
                                sessionStorageKeys[term].total_freq++
                                sessionStorageKeys[term].session_freq++
                                sessionStorageKeys[term].latest_occur = currDateTime

                                console.log("SESSIONSTORAGEKEY freq incr:", term, sessionStorageKeys[term])
                            }
                            else if (!(term in sessionStorageKeys) && !(term in storageKeys) && (currUrl != result.last_video.url || result.last_video["toggle-cleared"] == true || videoType == "miniplayer" ) ){
                                console.log("NEW SESSIONSTORAGEKEY freq:", term, sessionStorageKeys, sessionStorageKeys[term])
                                sessionStorageKeys[term] = {
                                        "total_freq": 1,
                                        "session_freq": 1,
                                        "first_occur": currDateTime,
                                        "latest_occur": null,
                                        "wordID": new_max_wordID++
                                }
                                console.log("NEW SESSIONSTORAGEKEY freq:", term, sessionStorageKeys[term])
                            }
                        });
                        chrome.runtime.sendMessage({"message": "save_keys", "user_changes": {'keywords': storageKeys, 'session_keywords': sessionStorageKeys , 'max_wordID': new_max_wordID, 'last_video': {'url': currUrl, 'toggle-cleared': false}, 'session_block': block_sites}} , function(res){
                            if (currUrl in block_sites){
                                instigatorKeywordsArr = instigatorKeywordsArr.concat(Object.keys(block_sites[currUrl]["keywords"]))
                                // alert("it's blocked")
                            }
                            console.log("instigatorKeywordsArr:", instigatorKeywordsArr, currUrl )
                            // alert("reached last part of check")
                            pauseVideo( tabID, currUrl, instigatorKeywordsArr, string , videoType, result.keywords == storageKeys) 
                            // console.log({'keywords': storageKeys, 'session_keywords': sessionStorageKeys , 'max_wordID': new_max_wordID, 'last_video': {'url': currUrl, 'toggle-cleared': false}, 'session_block': block_sites})
                        } )
                        // console.log("instigatorKeywordsArr:", instigatorKeywordsArr, currUrl )
                        // chrome.storage.local.set({'keywords': storageKeys, 'session_keywords': sessionStorageKeys , 'max_wordID': new_max_wordID, 'last_video': {'url': currUrl, 'toggle-cleared': false}, 'session_block': block_sites}, function() {
                        //     console.log('Values changed to 1: ' , storageKeys);
                        //     console.log('Values changed to 2: ' , sessionStorageKeys);
                        //     console.log('Values changed to 3: ' , new_max_wordID);
                        //     console.log('Values changed to 4: ' , currUrl);
                        //     console.log('Values changed to 5: ' , block_sites);
                        // });
                        // if (currUrl in block_sites){
                        //     instigatorKeywordsArr = Object.keys(block_sites[currUrl]["keywords"])
                        // }
                        // console.log("instigatorKeywordsArr:", instigatorKeywordsArr, currUrl )
                        // alert("reached last part of check")
                        // pauseVideo( tabID, currUrl, instigatorKeywordsArr, string ) //instigatorKeywordsArr != [] ? instigatorKeywordsArr[0] : '' )
                    }
                })
            }
        // }
    // );
}

function pauseVideo( tabID, url, instigatorKeyword = [] , title , videoType ){
    // alert("arriced at pause function")
    // alert("not Paused yet")

    chrome.storage.local.get(['session_block', 'popup_activated','keywords'], function(result) {
        // alert("not Paused yet")
        console.log("returned True!", url, result.session_block)
        console.log("PAUSE WORDS!", instigatorKeyword)
        // console.log(url, result.session_block)
        // console.log("returned True!", url, result.session_block)
        if (url in result.session_block || (videoType == "miniplayer" && instigatorKeyword.length > 0) ){
            console.log("BLOCKED SITES2:",result.session_block )
            console.log("PAUSING")
        
            var video = document.querySelector("video");
            if (videoType == "miniplayer"){
                video =  document.querySelector("#movie_player > div.html5-video-container > video") 
            }
            console.log("video ", video )//, "title", title, "titleString", titleString)
    
            console.log("pausing")
            video.pause();
            // sendResponse({video: video})
            if(!result.popup_activated){
                showPopup({"message": "show_popup" , 'instigatorKeyword': instigatorKeyword , 'title': title }, videoType )
                // chrome.tabs.sendMessage(
                //     // details.tabId,
                //     tabID, 
                //     {"message": "show_popup" , 'instigatorKeyword': instigatorKeyword , 'title': title }, function(res){
                //     console.log("popup! 1")
                //     console.log("THESE ARE THE PARTIALLY AVAILABLE KEYWORDS:",result.keywords )
                //     chrome.storage.local.set({'popup_activated': true}, function() {
                //     });
                //     // alert("video is paused")
                // });
                chrome.runtime.sendMessage({"message": "save_keys", "user_changes": {'popup_activated': true} } , function(){
                    // console.log({'keywords': storageKeys, 'session_keywords': sessionStorageKeys , 'max_wordID': new_max_wordID, 'last_video': {'url': currUrl, 'toggle-cleared': false}, 'session_block': block_sites})
                } )
            }
            console.log("video paused! 2")
            // alert("Paused")
        }
        else if (videoType == "miniplayer" && instigatorKeyword.length == 0 ){
            document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string").innerHTML = document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string").title 
        }
        else{
            // alert("not paused")
        }
    })
}




function showPopup(request, videoType ){//instigatorKeyword , title ){
    // console.log("This is the video title" , document.querySelector('meta[name="title"]').content)

    var titleVal = document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML
    // titleVal = document.querySelector('meta[name="title"]').content
    console.log("TITLE INFO", titleVal )
    console.log("INSTIGATING KEYWORDS", request.instigatorKeyword )

    console.log("THESE ARE THE STYLE TAGSjvuj:", document.getElementsByClassName("ext-searchIndication"))
    if (videoType == "player"){
        if (document.getElementsByClassName("ext-searchIndication")!= null  && document.getElementsByClassName("ext-searchIndication").length == 0  ){ //|| (document.getElementById("ext-styled-text")!= null && document.getElementById("ext-styled-text")== undefined)){
            if (document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML.length > 0){
                deletePopup() //if going from a blocked video to another one, this must be done to prevent them from stacking
                document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML = styleSearchString( /*titleVal*/ request.title , request.instigatorKeyword )  
                // alert("ADDING title")
            }    
        }
    }
    else if ("miniplayer"){
        document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string").innerHTML =styleSearchString( /*titleVal*/ request.title , request.instigatorKeyword )
    }

    else{
        console.log("THIS IS THE TITLE STYLED OBJECT:", document.getElementById("ext-styled-text"))
        console.log("THESE ARE THE STYLE TAGS:", document.getElementsByClassName("ext-searchIndication"))
        // removeTitle()
        // if (document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML.length > 0){
        //     document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML = styleSearchString( /*titleVal*/ request.title , request.instigatorKeyword )  
        // }
        // if 
        // .parentNode.removeChild(popupArr[0]
    }
    
    

    var div=document.createElement("div"); 
    document.body.appendChild(div); 
    div.setAttribute("id", "ext-popup")
    
    var keywords = request.instigatorKeyword 
    var keywordsStr = ''
    if (keywords.length > 2){
        keywords[keywords.length-1]= " <span class='ext-array-and-styles'>and</span> "+keywords[keywords.length-1]
        keywordsStr = keywords.join(', ')
    }
    else{
        keywordsStr = keywords.join(" <span class='ext-array-and-styles'>and</span> ")
    }
    
    div.innerHTML=      "<div class='ext-title-container'>"+
                            "Whoops, looks like this video's on your  NoNoList!"+
                        "</div>"+
                        "<div class='ext-subtitle-container'>"+
                            "<span>This video contains the word(s): "+keywordsStr+"</span><br>"+
                            "What would you like to do?"+
                        "</div>"+
                        "<div class='ext-popup-button-container'>"+
                            "<div class='ext-button-container'>"+
                                "<button id='ext-return-button' class='ext-popup-button' >Return to Safety</button>"+
                                "<button id='ext-proceed-button' class='ext-popup-button'>Proceed to Video</button>"+
                            "</div>"+
                        "</div>"
    div.classList.add("ext-popupDiv");
}