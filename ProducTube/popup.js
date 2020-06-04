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
var key_words = new Array();

chrome.storage.sync.get(['words'], function (val) {
    if (val.words.length > 0){
        key_words = val.words;
        x = val.words.length
        show_list()
    }
    
    console.log("val.words :" + val.words);
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
        key_words.push(key); 
        alert("Keyword: " + key + " added");
        console.log(key+ " added");
        x++;
        document.getElementById("text1").value = "";
        chrome.storage.sync.set({
            'words': key_words
        })
        var list = document.getElementById("keys-list");

        addUI(list, key)    
    }

}
function show_list(){
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

        })
    }

    function removeItem(itemIndex) {
        console.log("Removed word");
        chrome.storage.sync.get(['words'], function (val) {
            key_words = val.words;
            key_words.splice(itemIndex, 1);
            console.log("updated list", key_words)

            chrome.storage.sync.set({
                'words': key_words
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

