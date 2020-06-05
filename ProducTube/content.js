// alert("grrr")

// chrome.runtime.onConnect.addListener(port => {
//     console.log('connected ', port);

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




    
    console.log(request)
    if (request.message == "send_matches"){
        const re = new RegExp('<h1 class=', 'gi')
        const matches = document.documentElement.innerHTML.match(re) //|| []
        document.documentElement.innerHTML.match(re)
        
        sendResponse({count: matches , divContent: `wowowo`})
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
        // var video = document.querySelector("video");
        var channelName = document.getElementById("channel-name").querySelector("a").innerHTML//alternatively: .querySelector("#text").getElementsByTagName("a")         //.getElementsByTagName("div")//.getElementById("text")//.getElementsByTagName("a").innerHTML;
        var title = document.querySelector("title") ;
        var titleString = document.querySelector("title").innerHTML ;
        console.log("testingtesting123 ")
        console.log(/*"video ", video,*/ "title", title, "titleString", titleString, "channelName:", channelName)
        
        console.log("new+tab here")
        sendResponse({vidTitle: titleString, channelName: channelName})
        // video.pause();
    }
    if (request.message == "print_test"){
        console.log("PRINTF: " , request.printMsg)
    }
    // alert(request)
    return Promise.resolve("Dummy response to keep the console quiet");
})

