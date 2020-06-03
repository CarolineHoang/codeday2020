// alert("grrr")


chrome.runtime.onMessage.addListener( function (request, sender, sendResponse ){
    

    const re = new RegExp('<h1 class=', 'gi')
    const matches = document.documentElement.innerHTML.match(re) //|| []
    document.documentElement.innerHTML.match(re)
    var video = document.querySelector("video");
    var title = document.querySelector("title") ;
    var titleString = document.querySelector("title").innerHTML ;
    console.log("testingtesting123 ")
    console.log("video ", video, "title", title, "titleString", titleString)
    sendResponse({count: matches , divContent: `wowowo`})
    console.log(request)
    if (request.message == "pause_video"){
        console.log("new+tab here")
        video.pause();
    }
    // alert(request)
})

