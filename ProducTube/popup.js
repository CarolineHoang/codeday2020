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
    // Toogle Block
    $('.middleBlock').css('display', 'none');
    $('#' + block_name + '').css('display', 'block');
  
    // Change Title Color
    $('.menu').removeClass('active');
    $(title).addClass('active');
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

  /*COPIED CODE*/
var x = 0;
var array = Array();

function add_element_to_array()
{
 array[x] = document.getElementById("text1").value;
 alert("Keyword: " + array[x] + " added");
 x++;
 document.getElementById("text1").value = "";
}

function display_array()
{
   var e = "<hr/>";   
    
   for (var y=0; y<array.length; y++)
   {
     e += "" + (y+1) + ". " + array[y] + "<br/>";
   }
   document.getElementById("Result").innerHTML = e;
}

document.getElementById("button1").addEventListener("click", add_element_to_array);
document.getElementById("button1").addEventListener("click", display_array);
// document.getElementById("button2").addEventListener("click", display_array);
/* 
function myFunction(){
  console.log('asd');
} */