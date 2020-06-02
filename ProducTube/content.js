// alert("grrr")


chrome.runtime.onMessage.addListener( function (request, sender, sendResponse ){
    const re = new RegExp('<h1 class=', 'gi')
    const matches = document.documentElement.innerHTML.match(re) //|| []
    document.documentElement.innerHTML.match(re)
    sendResponse({count: matches })
    // alert(request)
})