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
var x = 0;
var block_words = new Array();
var visited = {}; 

var visited = {   "Musical":{
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
    }
}; 

chrome.storage.sync.get(['session_block'], function (val) {
    if (val.session_block.length > 0){
        block_words = val.session_block;
        x = val.session_block.length
        show_list()
    }
    
    console.log("val.words :" + val.session_block);
    //displaying the old items
    // display_array()
})

function add_element_to_array()
{
    
    var key = document.getElementById("text1").value;

    if(key == "")
    {
        alert("No text entered!");

    }
    else{
        block_words.push(key); 
        alert("Keyword: " + key + " added");
        console.log(key+ " added");
        x++;
        document.getElementById("text1").value = "";
        chrome.storage.sync.set({
            'session_block': block_words
        })
        var list = document.getElementById("keys-list");

        addUI(list, key)    
    }

}
function show_list(){
    for (var i = 0; i < block_words.length;i++){
        document.getElementById("text1").value = "";
        var old_list = document.getElementById("keys-list");
        addUI(old_list, block_words[i])  
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
    }
    


    function removeItem(itemIndex) {
        console.log("Removed word");
        chrome.storage.sync.get(['session_block'], function (val) {
            block_words = val.words;
            block_words.splice(itemIndex, 1);
            console.log("updated list", block_words)

            chrome.storage.sync.set({
                'session_block': block_words
            })

        })

    }

/* 
WORKING
function add_element_to_array()
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
        add_element_to_array();
        // display_array();
      }
})

document.getElementById("add").addEventListener("click", add_element_to_array);
// document.getElementById("add").addEventListener("click", display_array);

/*Building out Frequency List*/ 
chrome.storage.sync.set({
    "keywords": {   "Musical":{
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
        }
    },

}, function() {
    console.log('Filler');
  });
  /* console.log(allwords)
  console.log("testing") */
  chrome.storage.sync.get(['keywords'], function (val) {
    if (val.keywords.length > 0){
        visited = val.keywords;
        show_freqlist()
        consolee.log("Values are set")
    }
    
    console.log("val.freqwords :" + val.keywords);
    //displaying the old items
    // display_array()
})
show_freqlist()

  function show_freqlist(){
    var freq_list = document.getElementById("freq-list");

    for(let key in visited){

        if(visited.hasOwnProperty(key))
        {
            var li = document.createElement("li");
            $("li").addClass("flist-group");
            info = visited[key];
            // console.log(key,info);
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