/*Chrome Extension Tutorial Code*/
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('button').addEventListener('click', onclick, false)

    function onclick(){
        chrome.tabs.query({currentWindow: true, active:true },
        function( tabs ){
            chrome.tabs.sendMessage(tabs[0].id, 'hi', setCount )
        })
    }
    function setCount (res) {
        const div = document.createElement('div')
        div.textContent = `${res.count} instances`
        document.body.appendChild(div)
    }
}, false)
/*Toggle Content and Navbar Color Changing Code*/
var display = function(block_name, title) {
    // Toogle Middle Block Content 
    $('.middleBlock').css('display', 'none');
    
    $('#' + block_name + '').css('display', 'block');
  
  }
  
  $('#timer').on('click', function() {
    display('timeBlock', $(this));
  });
  
  $('#list').on('click', function() {
    display('listBlock', $(this));
  });
  
  $('#freq').on('click', function() {
    display('freqBlock', $(this));
  });

  $('.color_change').click(function(e){
    $('.color_change').css("background-color", "#ffe5e5");
    $('.color_change').css("color", "black");
    $(this).css("background-color", "#ff6666");
    $(this).css("color", "white");
});

/*Add Keywords*/
//Setting up storage --> TEMP FOR TESTING, CAN REMOVE SINCE SETUP IN BACKGROUND.JS 


  

console.log("testest")

var x = 0;
var storageKeys = {};
var sessionStorageKeys =  {}; 

chrome.storage.sync.get(['keywords', 'session_keywords' , 'max_wordID', 'session_block'], function(val) {
    storageKeys = val.keywords; 
    sessionStorageKeys = val.session_keywords;
    x = val.keywords.length; 
    var new_max_wordID = val.max_wordID
    var block_sites = val.session_block
    show_list()
    show_freqlist()
    
   

console.log("Beginning Synced Value:" + val.keywords);
console.log("Chrome Sync Stored Frequency :" + val.session_keywords);
//displaying the old items
// display_array()
});
console.log('Current values stored in sync' , storageKeys);
console.log('CHECK IF STORED');

console.log("Local Stored Frequency :" + sessionStorageKeys);

function add_block()
{
       
    var key = document.getElementById("text1").value;

    
    if(key == "")
    {
        alert("No text entered!");

    }
    else{
        //need to check to see if already in sessionStorageKeys, settings change accordingly 
        key.trim();
        x++;
        chrome.storage.sync.get(['keywords', 'session_keywords' , 'max_wordID', 'session_block'], function(val) {
            storageKeys = val.keywords; 
            sessionStorageKeys = val.session_keywords;
            x = val.keywords.length; 
            var new_max_wordID = val.max_wordID
            var block_sites = val.session_block
            
                var currDateTime = Date.now()
    
                if (key in storageKeys){
                    console.log("This is already on your blocked list!")
                }
                else{
                    console.log("NEW STORAGEKEY freq:", key)
                    storageKeys[key] = {
                            "first_occur": currDateTime,
                            "lastest_occur": null,
                            "session_freq": 1,
                            "total_freq": 1,
                            "wordID": new_max_wordID++
                    }
                    console.log("NEW SESSIONSTORAGEKEY freq:", key, storageKeys[key])
                }
            
            chrome.storage.sync.set({'keywords': storageKeys, 'session_keywords': sessionStorageKeys , 'max_wordID': new_max_wordID}, function() {
                console.log('Values changed to 1: ' , storageKeys);
                console.log('Values changed to 2: ' , sessionStorageKeys);
                console.log('Values changed to 3: ' , new_max_wordID);
            });
    
        console.log("Current Stored Keywords :" + val.keywords);
        //displaying the old items
        // display_array()
    });

        
        var list = document.getElementById("keys-list");
       /*  for(let key in storageKeys){
            console.log("Keyword: " + key)
            if(storageKeys.hasOwnProperty(key))
            {
                
                info = storageKeys[key];
                // console.log(key,info);
                let word_info = "<" +key + ">"
                for(let key in info){
                    if(info.hasOwnProperty(key)){
                        value = info[key];
                        word_info += "" +key + ": " + value + " | ";
                        console.log("Property: "+ key,value);
                    }
                    
                }
                
            }
            addUI(list, key)
            
        } */
        alert("You added "+ key);
        addUI(list, key)
        

        console.log("Print words!" + storageKeys[key])
        // console.log("updated list" + keywords)
        
       
        /* storageKeys.push(key); 
        alert("Keyword: " + key + " added");
        console.log(key+ " added");
        x++;
        document.getElementById("text1").value = "";
        chrome.storage.sync.set({
            'keywords': storageKeys
        })
        var list = document.getElementById("keys-list");

        addUI(list, key)   */  
    }

}

function show_list(){
    var list = document.getElementById("keys-list");
        for(let key in storageKeys){
            //console.log("Keyword: " + key)
            if(storageKeys.hasOwnProperty(key))
            {
                
                info = storageKeys[key];
                // console.log(key,info);
                let word_info = "<" +key + ">"
                for(let key in info){
                    if(info.hasOwnProperty(key)){
                        value = info[key];
                        word_info += "" +key + ": " + value + " | ";
                        //console.log("Property: "+ key,value);
                    }
                    
                }
                
            }
            addUI(list, key)
            
        }
    
}
function addUI(ul, value) {
    var li = document.createElement("li");
    $("li").addClass("list-group-item");
    li.appendChild(document.createTextNode(value));

    if (value === '') {
        //do nothing
        //alert("You must write something!");
    } else {
        ul.appendChild(li);
    }
    var span = document.createElement("SPAN");
    // span.style.fontSize = "0.75rem";
    var txt = document.createTextNode("\u00D7");
    
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        $(".close").click(function () {
            var index = $(this).index(".close");

            //console.log(index);
            var div = this.parentElement;
            div.style.display = "none";
            //console.log("Value here" + value);
            removeItem(value)
            $(".close").eq(index).remove();
            //CALL OTHER FUNCTION

        })
    }
    
    function removeItem(key) {
        
        //console.log("Attempt to remove");
        chrome.storage.sync.get(['keywords','session_keywords','max_wordID'], function (val) {
            storageKeys = val.keywords;
            sessionStorageKeys = val.session_keywords
            var new_max_wordID = val.max_wordID 
            if(key in storageKeys){
                delete storageKeys[key]; 
                //console.log("Deleted", storageKeys)
                chrome.storage.sync.set({'keywords': storageKeys, 'max_wordID': new_max_wordID})
                //console.log("Key is here")
            }
            else{
                //console.log("key is not here")
            }

        })

    }

document.addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {
       
        add_block();
      }
})

document.getElementById("add").addEventListener("click", add_block);

/*Building out Frequency List*/ 

  function show_freqlist(){
    var freq_list = document.getElementById("freq-list");
    //TO DO: NEED TO CHANGE OR AFTER FREQUENCY IS SET, IT GETS/UPDATES show-freqlist()
    sessionStorageKeys = {   "Musical":{
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
}

    for(let key in sessionStorageKeys){

        if(sessionStorageKeys.hasOwnProperty(key))
        {
            var li = document.createElement("li");
            $("li").addClass("flist-group");
            info = sessionStorageKeys[key];
            //console.log(key,info);
            let word_info = "<" +key + ">"
            for(let key in info){
                if(info.hasOwnProperty(key)){
                    value = info[key];
                    word_info += "" +key + ": " + value + " | ";
                    //console.log(key,value);
                }
                
            }
            li.appendChild(document.createTextNode(word_info));

            if (word_info === '') {
                //do nothing
                //alert("You must write something!");
            } else {
                freq_list.appendChild(li);
            }

            

        }
    }

   
}
  /*TIMER FUNCTIONALITY*/ 
  //ATTEMPT 2
  var pause = false; 
  var reset = false; 
  document.getElementById("start_timer").addEventListener("click",
  function startTimer() {
    
    let start =  document.querySelector("#start_timer")
    let starter =  document.querySelector("#time_setup")
    var interval 
    /* let pause=  document.querySelector("#pause_timer")
    let res=  document.querySelector("#resume_timer")
    pause.style.display ="block"
    res.style.display ="block" */

    start.style.display = "none"
    starter.style.display = "none"
    var now = new Date().getTime(); 
    //upon submit 
    var hr = document.getElementById("hour_time").value;
    if(hr == "")
    {
        hr = parseInt("0")
    }

    var min = document.getElementById("min_time").value;
    if(min == "")
    {
        min = parseInt("0")
    }
    var sec = document.getElementById("sec_time").value;
    if(sec == "")
    {
        sec = parseInt("0")
    }
    total_minutes = (60*parseInt(hr)) + parseInt(min) + ((1/60)*parseInt(sec)) 
    var deadline = new Date();
    deadline.setHours(deadline.getHours()+parseInt(hr));
    deadline.setMinutes(deadline.getMinutes()+parseInt(min))
    deadline.setSeconds(deadline.getSeconds()+parseInt(sec))

    interval = setInterval(function(){
    if(reset){
        //This is not working 
    }
    if(!pause && !reset ){
        now = new Date().getTime(); 
        var difference = deadline - now; 
        console.log("NOW: " + now + "DEADLINE: " + deadline + "Difference: " + difference)
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(difference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((difference % (1000 * 60)) / 1000);
        document.getElementById("focus_text").innerHTML = "Let's get this bread!"
        document.getElementById("time").innerHTML =days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";    
        // If the count down is over, write some text 
    if (difference <= 0) {
        clearInterval(interval);
        document.getElementById("time").innerHTML = "0d 0h 0m 0s";
        alert("Productive time over, huzzah!")
    }
        
    }

    


}, 1000);

    }


    )

    document.getElementById('pause_timer').addEventListener('click', function () {
        pause = true;
    });
    
    document.getElementById('resume_timer').addEventListener('click', function () {
        pause = false;
    });
    document.getElementById('reset_timer').addEventListener('click', function () {
        reset = true;
    });
    
    
  

    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes*60000);
    }


  //ATTEMPT 1
  /* var paused = false; 
  var time_left; 
  document.getElementById("start_timer").addEventListener("click",
  
  function startTimer() {
    let start =  document.querySelector("#start_timer")
    let starter =  document.querySelector("#time_setup")
    start.style.display = "none"
    starter.style.display = "none"
  //$('.start_timer').css('display', 'none');
    
        
    var min = document.getElementById("min_time").value;
    if(min == "")
    {
        min = parseInt("0")
    }
    var sec = document.getElementById("sec_time").value;
    if(sec == "")
    {
        sec = parseInt("0")
    }
    
    var duration = (60*parseInt(min)) + parseInt(sec) 
    time_left =duration
    var currInterval; 
    document.getElementById('pause_timer').onclick = pause_clock(currInterval)
    
    console.log(duration)
    
    // remtime =  document.querySelector('#time');
    clearInterval(currInterval);
    if(paused==true){
        console.log("Paused")
        clearInterval(currInterval);
    }
    else{
        console.log("Not paused")
    }
    currInterval = setInterval(function () {
        console.log("Interval set")
        minute = Math.floor(duration/60)
        second =  Math.floor(duration%60)
        minutes = minute < 10 ? "0" + minute.toFixed(0) : minute.toFixed(0);
        seconds = second < 10 ? "0" + second.toFixed(0) : second.toFixed(0);
        document.getElementById("focus_text").innerHTML = "Let's get this bread!"
        document.getElementById("time").innerHTML = minutes + ": " +seconds;
        //--duration
        time_left =duration  
        if(parseInt(--duration)<=0){
            clearInterval(currInterval)
            document.getElementById("time").innerHTML = "00 : 00";
            alert("Productive time over, huzzah!")
        }
        
    }, 1000);
    
    //alert("Time needs to be set")
    
  }
  


    
  )
  function pause_clock(currInterval){
    if(!paused){
        paused = true;
        clearInterval(currInterval); // stop the clock
        console.log("Trying to pause")
    }
}
function resume_clock(){
    if(paused){
        paused = false;
        document.getElementById("min_time").value =Math.floor(time_left/60)
        document.getElementById("sec_time").value =Math.floor(time_left%60)
        startTimer()
        console.log("Trying to resume")
    }
    console.log("Resume click recognized")
}
document.getElementById("pause_timer").addEventListener("click",pause_clock());

document.getElementById("resume_timer").addEventListener("click",resume_clock()); */



