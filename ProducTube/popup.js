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

var display = function(block_name, title) {
    // Toogle Middle Block Content 
    $('.middleBlock').css('display', 'none');
    $('#' + block_name + '').css('display', 'block');
  
    /* // Change Title Color
    $('.navbar').removeClass('active');
    $(title).addClass('active'); */
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
  
  /* var menu_change = function(menu_name, title) {
    // Toogle Menu
    $('.topnav').css('background-color', '#ffe5e5');   
    $('#' + menu_name + '' +' .a').css('background-color', '#ff6666');
  }
  
  $('#timer').on('click', function() {
    menu_change('timer', $(this));
  });
  
  $('#list').on('click', function() {
    menu_change('list', $(this));
  });
  
  $('#freq').on('click', function() {
    menu_change('freq', $(this));
  }); */

/*Add Keywords*/
var x = 0;
var key_words = new Array();
chrome.storage.sync.get(['words'], function (val) {
    if (val.words.length > 0){
        key_words = val.words;
        x = val.words.length
    }
        
    
    console.log("val.words :" + val.words);
    //displaying the old items
    display_array()
})

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
}
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        add_element_to_array();
        display_array();
      }
})

document.getElementById("add").addEventListener("click", add_element_to_array);
document.getElementById("add").addEventListener("click", display_array);

/* chrome.storage.local.get({keyWords: []}, function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    var userKeyIds = result.keyWords;
    userKeyIds.push({keyPairId: keyPairId, HasBeenUploadedYet: false});
    // set the new array value to the same key
    chrome.storage.local.set({userKeyIds: userKeyIds}, function () {
        // you can use strings instead of objects
        // if you don't  want to define default values
        chrome.storage.local.get('userKeyIds', function (result) {
            console.log(result.userKeyIds)
        });
    });
}); */


// document.getElementById("button2").addEventListener("click", display_array);
/* 
function myFunction(){
  console.log('asd');
} */