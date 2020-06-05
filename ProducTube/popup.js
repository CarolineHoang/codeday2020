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

/* for(let key in sessionStorageKeys){

    if(sessionStorageKeys.hasOwnProperty(key))
    {
        info = sessionStorageKeys[key];
        // console.log(key,info);
        let word_info = "<" +key + ">"
        for(let key in info){
            if(info.hasOwnProperty(key)){
                value = info[key];
                word_info += "" +key + ": " + value + " | ";
                //console.log(key,value);
            }
            
        }        

    }
} */


function show_list(){
    var list = document.getElementById("keys-list");
        for(let key in storageKeys){
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
            
        }
    /* for(let key in storageKeys){
        document.getElementById("text1").value = "";
        var old_list = document.getElementById("keys-list");
        if(storageKeys.hasOwnProperty(key))
        {
            info = storageKeys[key];
            // console.log(key,info);
            let word_info = "<" +key + ">"
            for(let key in info){
                if(info.hasOwnProperty(key)){
                    value = info[key];
                    word_info += "" +key + ": " + value + " | ";
                    console.log(key,value);
                }
                
            }        
    
        }
        addUI(old_list, key)

     for (var i = 0; i < storageKeys.length;i++){
        document.getElementById("text1").value = "";
        var old_list = document.getElementById("keys-list");
        console.log("Showing List index "+ storageKeys[i] )
        addUI(old_list, storageKeys[i])  
    }  
    
} */
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

            console.log(index);
            var div = this.parentElement;
            div.style.display = "none";
            removeItem(index);
            $(".close").eq(index).remove();
            //CALL OTHER FUNCTION

        })
    }
    
    function removeItem(itemIndex) {
        console.log("Attempt to work");
        chrome.storage.sync.get(['keywords'], function (val) {
            storageKeys = val.keywords;
            var rmvkey = Object.keys(storageKeys)[itemIndex]; 
            delete storageKeys.rmvkey; 
            console.log("updated list", storageKeys)

            chrome.storage.sync.set({
                'keywords': storageKeys
            })
            /* storageKeys = val.keywords;
            storageKeys.splice(itemIndex, 1);
            console.log("updated list", storageKeys)

            chrome.storage.sync.set({
                'keywords': storageKeys
            }) */

        })

    }

/* 
WORKING
function add_block()
{
    key_words[x] = document.getElementById("text1").value;
    if(document.getElementById("text1").value == "")
    {
        alert("No text entered!");

    }
    else{
        alert("Keyword: " + key_words[x] + " added");
        x++;
        document.getElementById("text1").value = "";
        chrome.storage.sync.set({
            'words': key_words
        })

    }
    
}

function display_array()
{
   var e = "<hr/>";   
    
   for (var y=0; y<key_words.length; y++)
   {
     e += "" + (y+1) + ". " + key_words[y] + "<br/>";
   }
   document.getElementById("Result").innerHTML = e;
} */
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        add_block();
        // display_array();
      }
})

document.getElementById("add").addEventListener("click", add_block);
// document.getElementById("add").addEventListener("click", display_array);

/*Building out Frequency List*/ 

  /* console.log(allwords)
  console.log("testing") */

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
            console.log(key,info);
            let word_info = "<" +key + ">"
            for(let key in info){
                if(info.hasOwnProperty(key)){
                    value = info[key];
                    word_info += "" +key + ": " + value + " | ";
                    console.log(key,value);
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

    // for(int i =0; i<keys.lengt(); ++i){
    //     var freq_list = document.getElementById("freq-list");
    //     addfreqUI(freq_list, allwords.getString(keys))
    //     console.log("In here")
    // }
    
}
  

/* function show_list(){
    for (var i = 0; i < key_words.length;i++){
        document.getElementById("text1").value = "";
        var old_list = document.getElementById("keys-list");
        addUI(old_list, key_words[i])  
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

            console.log(index);
            var div = this.parentElement;
            div.style.display = "none";
            removeItem(index);
            $(".close").eq(index).remove();
            //CALL OTHER FUNCTION

        })
    } */