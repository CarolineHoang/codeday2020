// alert("grrr")

// chrome.runtime.onConnect.addListener(port => {
//     console.log('connected ', port);

// chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
    
//     // var channelName = document.getElementById("channel-name").querySelector("a").innerHTML//alternatively: .querySelector("#text").getElementsByTagName("a")         //.getElementsByTagName("div")//.getElementById("text")//.getElementsByTagName("a").innerHTML;
//     // var title = document.querySelector("title") ;
//     // var titleString = document.querySelector("title").innerHTML ;
//     // console.log("testingtesting123 ")
//     // console.log(/*"video ", video,*/ "title", title, "titleString", titleString, "channelName:", channelName)
//     alert("the page has loaded")
//     // alert("the page has loaded", "title", title, "titleString", titleString, "channelName:", channelName)
    
// })



// document.addEventListener('DOMContentLoaded', function(){
//     alert("the page has started")
// })
// document.addEventListener('DOMContentLoaded', process);
// function process(){
//     alert("the page has started")
// }


// alert("the page should have loaded")

// console.log("only when page loads")


// function afterNavigate() {
//     if ('/watch' === location.pathname) {
        // alert('Watch page!');
//         // var channelName = document.getElementById("channel-name").querySelector("a").innerHTML//alternatively: .querySelector("#text").getElementsByTagName("a")         //.getElementsByTagName("div")//.getElementById("text")//.getElementsByTagName("a").innerHTML;
//         // var title = document.querySelector("title") ;
//         // var titleString = document.querySelector("title").innerHTML ;
//         // console.log("testingtesting123 ")
//         // console.log(/*"video ", video,*/ "title", title, "titleString", titleString, "channelName:", channelName)
//         // alert('Watch page!',"title", title, "titleString", titleString, "channelName:", channelName);
//         // alert('Watch page!');
//     }
// }
(document.body || document.documentElement).addEventListener('DOMContentLoaded',
  function(/*TransitionEvent*/ event) {
    // afterNavigate();
    // if (event.propertyName === 'width' && event.target.id === 'progress') {
    //     afterNavigate();
    // }
    alert("page loaded")
    console.log("EVENT: ", event.propertyName)
    // if (event.propertyName === 'width' && event.target.id === 'progress') {
    //     afterNavigate();
    // }
}, true);
// // After page load
// afterNavigate();


chrome.runtime.onMessage.addListener( function (request, sender, sendResponse ){
    

    // const re = new RegExp('<h1 class=', 'gi')
    // const matches = document.documentElement.innerHTML.match(re) //|| []
    // document.documentElement.innerHTML.match(re)
    // var video = document.querySelector("video");
    // var title = document.querySelector("title") ;
    // var titleString = document.querySelector("title").innerHTML ;
    // console.log("testingtesting123 ")
    // console.log("video ", video, "title", title, "titleString", titleString)

    // chrome.storage.sync.set({key: value}, function() {
    //     console.log('Value is set to ' + value);
    //   });




    //THE FUNCTION TO SEARCH A PAGE FOR INSTANCES
    // console.log(request)
    // if (request.message == "send_matches"){
    //     const re = new RegExp('<h1 class=', 'gi')
    //     const matches = document.documentElement.innerHTML.match(re) //|| []
    //     document.documentElement.innerHTML.match(re)
        
    //     sendResponse({count: matches , divContent: `wowowo`})
    // }

    if (request.message == "remove_old_title" && document.getElementById("ext-styled-text") != null){
        // alert(document.getElementById("ext-styled-text").innerHTML)
        document.getElementById("ext-styled-text").remove()
    }
    if (request.message == "pause_video"){
        var video = document.querySelector("video");
        // var title = document.querySelector("title") ;
        // var titleString = document.querySelector("title").innerHTML ;
        // console.log("testingtesting123 ")
        console.log("video ", video )//, "title", title, "titleString", titleString)

        console.log("pausing")
        video.pause();
        sendResponse({video: video})
    }
    if (request.message == "get_video_info"){
        console.log(window.location.href)
        // var video = document.querySelector("video");
        var background =  document.getElementById("columns")
        // console.log("background: " , background, background.classList.add(""))



        // var iFrame  = document.createElement ("div");
        // iFrame.src  = chrome.extension.getURL ("embedded_warning.html");

        // document.body.insertBefore (iFrame, document.body.lastChild.nextSibling);

//         var div=document.createElement("div"); 
// document.body.appendChild(div); 
// div.setAttribute("id", "ext-popup")
// div.innerHTML= "<div class='ext-popup-button-container'><button id='ext-return-button' class='ext-popup-button' >Return to Safety</button><button id='ext-proceed-button' class='ext-popup-button'>Proceed to Video</button></div>"
// // div.innerText="test123";
// div.classList.add("ext-popupDiv");
// // div.focus();
// // var insertingCSS = browser.tabs.insertCSS({file: "contentStyles.css"});
// // insertingCSS.then(null, onError);
        // background.c
        var channelName = document.getElementById("channel-name").querySelector("a").innerHTML//alternatively: .querySelector("#text").getElementsByTagName("a")         //.getElementsByTagName("div")//.getElementById("text")//.getElementsByTagName("a").innerHTML;
        var title = document.querySelector("title") ;
        var titleString = document.querySelector("title").innerHTML ;
        // var titleString = document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML
        
        console.log("testingtesting123 ")
        console.log(/*"video ", video,*/ "title", title, "titleString", titleString, "channelName:", channelName)
        
        console.log("new+tab here")
        sendResponse({vidTitle: titleString, channelName: channelName})
        // video.pause();
    }
    if (request.message == "show_popup"){
        // alert(request.instigatorKeyword)
        // chrome.storage.sync.get(['keywords', 'session_keywords', 'max_wordID' ], function(result) {
        //     var storageKeys = result.keywords
        //     var sessionStorageKeys = result.session_keywords
        //     console.log("THESE ARE THE REAL AVAILABLE KEYWORDS:",storageKeys )

        // })

        var titleVal = document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML
        console.log("TITLE INFO", titleVal )
        console.log("INSTIGATING KEYWORDS", request.instigatorKeyword )
        document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML = styleSearchString( titleVal , request.instigatorKeyword )
        

        var titleString = document.querySelector("title").innerHTML ;
        // alert(titleString)
        console.log(document.querySelector("title"))
        // document.querySelector("title").innerHTML = "asdfsdg"//styleSearchString( channelName )

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
        
        
        // div.innerHTML= "<div class='ext-popup-button-container'><button id='ext-return-button' class='ext-popup-button' >Return to Safety</button><button id='ext-proceed-button' class='ext-popup-button'>Proceed to Video</button></div>"
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
        // div.innerText="test123";
        div.classList.add("ext-popupDiv");
// div.focus();
// var insertingCSS = browser.tabs.insertCSS({file: "contentStyles.css"});
// insertingCSS.then(null, onError);
       
        // sendResponse({vidTitle: titleString, channelName: channelName})
        // video.pause();
    }
    if (request.message == "hide_popup"){
        deletePopup()
    }
    if (request.message == "print_test"){
        console.log("PRINTF: " , request.printMsg)
    }
    // alert(request)
    // return Promise.resolve("Dummy response to keep the console quiet");
})


function styleSearchString( string , query = []){
    // alert(string)
    console.log("QUERY: ", query, "STRING:", string)
    var querystr = '' 
    var result = string;
    var reg = null;
    final_str =  result

   
    
    for (var idx = 0; idx< query.length ; idx++ ){
        querystr = query[idx]
        // reg = new RegExp(querystr, 'gi');
        // reg = new RegExp("(^\s"+querystr+"\s$|^\s"+querystr+"$|^"+querystr+"\s$)", 'gi');
        // reg = new RegExp(/\s/+querystr , 'gi');
        // reg = new RegExp(/\s/+querystr+" |REACTS)", 'gi');
        var doubleSymbols = [["(",")"]]
        // querystr=" "+querystr+" | "+querystr+"$|^"+querystr+" |"
        // for ( i in )
        // /\w(.*\s?)\w/
        // reg = new RegExp(" "+querystr+" | "+querystr+"$|^"+querystr+" |"+/(?<=\()/+querystr+/(?=\))/, 'gi');
        // reg = new RegExp(" "+querystr+" | "+querystr+"$|^"+querystr+" |"+/(?<=\()/+querystr+/(?=\))/, 'gi');
        // reg = new RegExp(" "+querystr+" | "+querystr+"$|^"+querystr+" |"+/(?<=\()/+querystr+/(?=\))/, 'gi');
        // reg = new RegExp("\W"+querystr+"\W|\W"+querystr+"$|^"+querystr+"\W", 'gi');

        // reg = new RegExp(/\s/+querystr+/\s|\W/+querystr+/$|^/+querystr+/\W/, 'gi');
        // "\\W"+querystr+"\\W|\\W"+querystr+"$|^"+querystr+"\\W"+
        // reg = new RegExp("\\W"+querystr+"\\W|\\W"+querystr+"$|^"+querystr+"\\W", 'gi');
        reg = new RegExp("((?<=\\W)("+querystr+")(?=\\W))|((?<=\\W)("+querystr+"))|(("+querystr+")(?=\\W))", 'gi');

        // reg = new RegExp(querystr, 'gi');
        console.log("REGEX:", reg)
        final_str =  "" + final_str.replace(reg, function(str) {return '<span class="ext-searchIndication">'+str+'</span>'});
    }
    final_str = "<span id='ext-styled-text'>"+final_str+"</span>"
    // alert(query)
    // var querystr = query
    // var result = string;
    // var reg = new RegExp(querystr, 'gi');
    // var final_str =  " " + result.replace(reg, function(str) {return '<span class="ext-searchIndication">'+str+'</span>'});
    // console.log("REPLACEMENT STRING:", final_str)
    return final_str
}
//if I wanted it to work specifically for function/class, replace Array for something else //correction: it didn't work
// Array.toString() = function() {
//     if (this.length > 0){
//         this[this.length-1]= "and "+this[this.length-1]
//         return this.join(',')
//     }
    
    // keywords[keywords.length-1]= "and "+keywords[keywords.length-1]
    // return keywords.join(',')
// }   



document.addEventListener('click',function(e){
    if(e.target){
        switch(e.target.id){
            case "ext-return-button":
                // chrome.tabs.goBack(integer tabId, function callback)
                chrome.runtime.sendMessage({"message": "GO_BACK"} ) 
                // chrome.tabs.goBack()
                
                // break;
            case "ext-proceed-button":
                deletePopup()
                resetPopup()
                // chrome.storage.sync.set({'popup_activated': false}, function() {
                // });
                break;
        }
            //do something)
    }
 });
 function deletePopup(){
    var popupArr = document.getElementsByClassName("ext-popupDiv")
    // var popup =null
    while(popupArr.length > 0){
        popupArr[0].parentNode.removeChild(popupArr[0]);
        // console.log("div to delete:", popupArr[i])
        // var popup= popupArr[i]
        // console.log("clicking")
        // if (popup!= null && popup.parentNode != null){
        //     popup.parentNode.removeChild( popup );
        // }    
        // elements[0].parentNode.removeChild(elements[0]);
    }
    // for ( var i = 0 ; i< popupArr.length ; i++){
    //     console.log("div to delete:", popupArr[i])
    //     var popup= popupArr[i]
    //     console.log("clicking")
    //     if (popup!= null && popup.parentNode != null){
    //         popup.parentNode.removeChild( popup );
    //     }    
    // }
    // var popup= document.getElementById("ext-popup")
    //             console.log("clicking")
    //             if (popup!= null && popup.parentNode != null){
    //                 popup.parentNode.removeChild( popup );
    //             }      
 }

 function resetPopup(){
    // chrome.runtime.sendMessage({"message": "save_keys", "user_changes": {'popup_activated': false} } , function(){
    //     console.log("PRODUCTIVE TIME NEW SESSION")
    //     // alert("success")
    // } )

    chrome.storage.sync.set({'popup_activated': false}, function() {
    });
 }

// function remove(element) {
//     element.parentNode.removeChild(element);
// }
// function removePopup() {
//     var popup= document.getElementById("ext-popup")
//     console.log("clicking")

//     popup.parentNode.removeChild( popup);
// }