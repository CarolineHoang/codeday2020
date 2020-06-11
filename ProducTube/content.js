var firstLanding = true
var historyLastURL = document.URL


//response listeners____________________________________________________________________________________________________

chrome.runtime.onMessage.addListener( function (request, sender, sendResponse ){
    

    if (request.message == "IS_PAGE_PROCESSABLE"){
        // alert(document.getElementById("ext-styled-text").innerHTML)
        // console.log()

        if (request.msgOriginType == "onHistoryStateUpdated"){
            if ( historyLastURL != document.URL || firstLanding){
                chrome.runtime.sendMessage({ "message": "PROCESS_PAGE" } , function(){
                    console.log("WE SHOULD NOW PROCESS")
                    historyLastURL = document.URL
                    firstLanding = false
                    // alert("success")
                } )
            }
        }else{
            chrome.runtime.sendMessage({ "message": "PROCESS_PAGE" } , function(){
                console.log("WE SHOULD NOW PROCESS")
                firstLanding = false
                // alert("success")
            } )
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
        if (document.getElementById("ext-styled-text") != null && document.getElementById("ext-styled-text") != undefined){
            document.getElementById("ext-styled-text").remove()
        }
    }
    
    if (request.message == "pause_video"){
        var video = document.querySelector("video");
        console.log("video ", video )//, "title", title, "titleString", titleString)

        console.log("pausing")
        video.pause();
        sendResponse({video: video})
    }

    if (request.message == "get_video_info"){
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
        
        //VERSION THAT TAKES THE SEARCH TITLE STRING FROM THE SAME TITLE WE EDIT
        // var titleString = document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML
        
        console.log(/*"video ", video,*/ "title", title, "titleString", titleString, "channelName:", channelName)
        
        sendResponse({vidTitle: titleString, channelName: channelName})
    }

    if (request.message == "show_popup"){

        var titleVal = document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML
        console.log("TITLE INFO", titleVal )
        console.log("INSTIGATING KEYWORDS", request.instigatorKeyword )
        if (document.getElementById("ext-styled-text")== null && document.getElementById("ext-styled-text")== undefined){
            document.getElementById("info-contents").querySelector("h1").firstChild.innerHTML = styleSearchString( titleVal , request.instigatorKeyword )
        }
        else{
            console.log("THIS IS THE TITLE STYLED OBJECT:", document.getElementById("ext-styled-text"))
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
        if (querystr == "class"){
            reg = new RegExp("((?<=\\W)(querystr)((?!(\=\"ext-searchIndication\">)|(\\w))))|(^(querystr)((?!(\\=\"ext-searchIndication\">)|(\\w))))", 'gi');
        }
        else if (querystr == "span"){
            reg = new RegExp( "((?<=[^\\w<])(span)((?!(\\sclass\=\"ext-searchIndication\">)|(\\w))))|(^(span)((?!(\\sclass\=\"ext-searchIndication\">)|(\\w))))", 'gi');
        }
        else{
            reg = new RegExp("((?<=\\W)("+querystr+")(?=\\W))|((?<=\\W)("+querystr+"))|(("+querystr+")(?=\\W))", 'gi');
        }
        // reg = new RegExp(querystr, 'gi');
        console.log("REGEX:", reg)
        final_str =  "" + final_str.replace(reg, function(str) {return '<span class="ext-searchIndication">'+str+'</span>'});
    }


    final_str = "<span id='ext-styled-text'>"+final_str+"</span>"
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
    chrome.storage.sync.set({'popup_activated': false}, function() {
    });
 }
