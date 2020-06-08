/*Chrome Extension Tutorial Code*/
document.addEventListener('DOMContentLoaded', function(){
    
    //flip the check box depending on the current mode // default initialization should be leisure
    chrome.storage.sync.get( ['mode'], function(val) {
        
        var currMode = val.mode
        console.log("WHAT IS THE CURRENT STATE? ", currMode )
        if (currMode == "PRODUCTIVITY"){
            $("#focusSwitch").prop( "checked", true );
            var dad = $("#focusSwitch").parent()
            dad.addClass('switch3-checked');
        }
        else{
            $("#focusSwitch").prop( "checked", false);
            var dad = $("#focusSwitch").parent()
            dad.removeClass('switch3-checked');
        }
        // show_list()
        // show_freqlist()
        
    });
    
    show_list()
    // show_freqlist()
    articles = document.getElementsByTagName('button');
    for (var i = 0; i < articles.length; i++) {
        articles[i].addEventListener('click',onclick,false);
    }

    function onclick(event){
        // e = e || window.event;
        // var target = e.target || e.srcElement, text = target.textContent || target.innerText; 

        console.log("clickety click click")
        chrome.tabs.query({currentWindow: true, active:true },
        function( tabs ){
            // chrome.tabs.sendMessage(tabs[0].id, 'test', setCount )


            chrome.tabs.sendMessage(tabs[0].id, {"message": "print_test", "printMsg": event.target.id}  ) //sends info to content.js and prints whatever 'this' is
            chrome.tabs.sendMessage(tabs[0].id, {"message": "print_test", "printMsg": "[" +event.target.id+"] || [start_timer]:" }  )
            // chrome.tabs.sendMessage(tabs[0].id, {"message": "print_test", "printMsg": "[" +event.target.id+"] || [start_timer]:"+event.target.id=="start_timer" }  )
            chrome.tabs.sendMessage(tabs[0].id, {"message": "print_test", "printMsg": event.target.id=="start_timer" }  )

            switch (event.target.id){
                case "add_new_keyword":
                    // alert("clickety click click")
                    // chrome.runtime.sendMessage({"message": "ADD_KEYWORD", "keyword": "cats"} , tester2 ) //sends keyword to background.js to add to the keyword list
                    //this might be able to be accomplished right here actually

                    var string = document.getElementById("text1").value;//"HELLO HAPPY DAY"; //STRING FROM INPUT FIELD
                    var strArr =  string.toUpperCase().split(" ").filter(Boolean);
                    chrome.storage.sync.get(['keywords', 'session_keywords', 'max_wordID' ], function(result) {
                        var storageKeys = result.keywords
                        var sessionStorageKeys = result.session_keywords
                        var new_max_wordID = result.max_wordID
                        console.log("strArr:", strArr)
                        strArr.forEach(function(term){
                            var currDateTime = Date.now()
                            if(!(term in storageKeys)){
                                // console.log("STORAGEKEY freq:", term, storageKeys[term])
                                
                                if(!(term in sessionStorageKeys)){
                                    storageKeys[term] ={
                                        "first_occur": currDateTime,
                                        "lastest_occur": null,
                                        "session_freq": 1,
                                        "total_freq": 1,
                                        "wordID": new_max_wordID++
                                    }
                                    // storageKeys[term].total_freq = 1
                                    // storageKeys[term].session_freq = 0
                                    // storageKeys[term].first_occur = currDateTime
                                    // storageKeys[term].lastest_occur = null
                                    // storageKeys[term].wordID = new_max_wordID++
                                    var list = document.getElementById("keys-list");
                                    // alert("You added 1", term, storageKeys);
                                    addUI(list, term, storageKeys[term], "NoNoWord")
                                }
                                else{
                                    storageKeys[term] ={
                                        "first_occur": sessionStorageKeys[term].first_occur,
                                        "lastest_occur": sessionStorageKeys[term].lastest_occur,
                                        "session_freq": sessionStorageKeys[term].session_freq,
                                        "total_freq": sessionStorageKeys[term].total_freq,
                                        "wordID": sessionStorageKeys[term].wordID
                                    }
                                    var list = document.getElementById("keys-list");
                                    // alert("You added 2"+ term);
                                    addUI(list, term, storageKeys[term], "NoNoWord")
                                }
                            }
                        });
                        chrome.storage.sync.set({ 'keywords': storageKeys, 'max_wordID': new_max_wordID }, function() {
                            document.getElementById("text1").value = ''
                            console.log("NEW ADDED VAL: " , storageKeys)
                        });
                    });
                    break;
                case "delete_keyword": //changed to not need to be based off one button (obviously) do it's found in a function below
                    chrome.runtime.sendMessage({"message": "DELETE_KEYWORD", "keyword": "cats" } , tester2 ) //sends keyword to background.js to delete from the keyword list
                    //this might be able to be accomplished right here actually
                    break;
                case "start_timer": //timer UI is not implmented at the moment 
                    chrome.runtime.sendMessage({"message": "START_TIMER", "duration": 1, "alarm_name": "PRODUCTIVE_MODE" } , tester2 ) 
                    chrome.tabs.sendMessage(tabs[0].id, {"message": "print_test", "printMsg": "set the alarm1"}  )
                    chrome.alarms.create( "PRODUCTIVITY_MODE", { delayInMinutes: 0.25 //, periodInMinutes: 0.1 
                    });
                    window.close();
                    chrome.tabs.sendMessage(tabs[0].id, {"message": "print_test", "printMsg": "set the alarm2"}  )
                    chrome.storage.sync.set({'mode':'PRODUCTIVITY'}, function() {
                        // console.log('Value is set to ' + value);
                    });
                    
                    //this 1) sets the alarm and 2) changes the storage value for whether we're in productivity mode or not to true (value used for reference if we will pause video )
                    break;
                case "stop_timer": //timer UI is not implmented at the moment 
                    chrome.runtime.sendMessage({"message": "STOP_TIMER" } , tester2 ) 
                    chrome.alarms.clear("PRODUCTIVITY_MODE");
                    window.close();
                    chrome.storage.sync.set({'mode':'LEISURE'}, function() {
                        // console.log('Value is set to ' + value);
                    });
                    //this 1) clears ALL alarms (not refined further rn) and 2) changes the storage value for whether we're in productivity mode or not to false (value used for reference if we will pause video )
                    break;
            }
            //THESE TWO FUNCTIONS ARE TO APPEND VALUES TO THE PAGE
            // chrome.tabs.sendMessage(tabs[0].id, {"message": "send_matches"} , setCount ) //sends info to content.js
            // chrome.runtime.sendMessage({"message": "test"} , tester ) //sends info to background.js
        })
    }
    function setCount (res) {
        const div = document.createElement('div')
        div.textContent = `${res.count} instances:: ${res.divContent}`
        document.body.appendChild(div)
    }
    function tester (res) { //this function allows us to append to the page
        console.log("clicking")
        const div = document.createElement('div')
        div.textContent = ` hidiho ${res.testVal} |||  ${res.divContent}`
        document.body.appendChild(div)
    }
    function tester2 (res) {
        console.log("adding new keyword.......")
    }
}, false)


document.getElementById("closingButton").addEventListener('click',function(){
    console.log("CLICKIE")
    var footerMenu = document.getElementById("keywordSummaryWrapper")
    var footerMenuSpacer = document.getElementById("blankFooterSpace")
    // $('#delete').click(function (e) {
        // .classList.contains(class);
        // $("#keywordSummaryWrapper").removeClass('animateIn');
        // $("#keywordSummaryWrapper").addClass('animateOut');
        if (document.getElementById("cheveron").classList.contains("cheveronFlip")){
            document.getElementById("cheveron").classList.remove("cheveronFlip")
        }
        else{
            document.getElementById("cheveron").classList.add("cheveronFlip")
        }
        // document.getElementById("cheveron").classList.remove("cheveronFlip")
        // document.getElementById("cheveron").classList.remove("cheveronFlip")
        // document.getElementById("cheveron").classList.add("cheveåronFlipLeft")
        if ($("#keywordSummaryWrapper").hasClass('animateOut')){
            $("#keywordSummaryWrapper").removeClass('animateOut');
            $("#keywordSummaryWrapper").addClass('animateIn');
        }
        else if ($("#keywordSummaryWrapper").hasClass('animateIn')){
            $("#keywordSummaryWrapper").addClass('animateOut');
            $("#keywordSummaryWrapper").removeClass('animateIn');
        }
        // else if ($("#keywordSummaryWrapper").hasClass('animateInFirstEntrance')){
        //     $("#keywordSummaryWrapper").removeClass('animateInFirstEntrance')
        //     $("#keywordSummaryWrapper").removeClass('animateOut');
        // }
        // else{
        //     $("#keywordSummaryWrapper").addClass('animateOut');
        // }
        // $("#keywordSummaryWrapper").addClass('animateOut');
    // });

    // if (footerMenu!= null && (footerMenu.style.display == "" || footerMenu.style.display == "block")){
    //     // console.log("IT'S NONE!!!")
    //     footerMenu.style.display = "none"   
    // }
    // if (footerMenuSpacer!= null && (footerMenuSpacer.style.display == "" || footerMenuSpacer.style.display == "block")){
    //     // console.log("IT'S NONE!!!")
    //     footerMenuSpacer.style.display = "none"   
    // }


    // if (document.getElementById("keywordSummaryWrapper")!= null && document.getElementById("keywordSummaryWrapper").style.display == "block"){
    //     // console.log("IT'S NONE!!!")
    //     document.getElementById("keywordSummaryWrapper").style.display = "none"
    // }

},false);


// $('#keywordSummaryWrapper').on('transitionend', function(e){
//     $("#keywordSummaryWrapper").css('display', 'none');
//     $("#keywordSummaryWrapper").removeClass('animate');
//     // $(e.target).remove()
// });






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

    $('.navButtons').click(function(e){
        console.log("clicking navs")
    $('.navButtons').removeClass("color_change")
    $(this).addClass("color_change")
});
//   $('.color_change').click(function(e){
//     $('.color_change').css("background-color", "#ffe5e5");
//     $('.color_change').css("color", "black");
//     $(this).css("background-color", "#ff6666");
//     $(this).css("color", "white");
// });

/*Add Keywords*/
//Setting up storage --> TEMP FOR TESTING, CAN REMOVE SINCE SETUP IN BACKGROUND.JS 


  

console.log("testest")

// var x = 0;
// var storageKeys = {};
// var sessionStorageKeys =  {}; 

// chrome.storage.sync.get(['keywords', 'session_keywords' , 'max_wordID', 'session_block'], function(val) {
//     storageKeys = val.keywords; 
//     sessionStorageKeys = val.session_keywords;
//     x = val.keywords.length; 
//     var new_max_wordID = val.max_wordID
//     var block_sites = val.session_block
//     show_list()
//     show_freqlist()
    
// });

var keyStoreVals = ['keywords', 'session_keywords' , 'max_wordID', 'session_block' ]
// chrome.storage.sync.get( keyStoreVals, function(val) {
//     storageKeys = val.keywords; 
//     sessionStorageKeys = val.session_keywords;
//     x = val.keywords.length; 
//     var new_max_wordID = val.max_wordID
//     var block_sites = val.session_block
//     show_list()
//     show_freqlist()
    
// });


// console.log('Current values stored in sync' , storageKeys);
// console.log('CHECK IF STORED');

// console.log("Local Stored Frequency :" + sessionStorageKeys);




// document.getElementById("add").addEventListener("click", add_block);

// function add_block()
// {
//     var key = document.getElementById("text1").value;
//     if(key == "")
//     {
//         alert("No text entered!");

//     }
//     else{
//         //need to check to see if already in sessionStorageKeys, settings change accordingly 
//         key.trim();
//         x++;
//         chrome.storage.sync.get(['keywords', 'session_keywords' , 'max_wordID', 'session_block'], function(val) {
//             storageKeys = val.keywords; 
//             sessionStorageKeys = val.session_keywords;
//             x = val.keywords.length; 
//             var new_max_wordID = val.max_wordID
//             var block_sites = val.session_block
            
//                 var currDateTime = Date.now()
    
//                 if (key in storageKeys){
//                     console.log("This is already on your blocked list!")
//                 }
//                 else{
//                     console.log("NEW STORAGEKEY freq:", key)
//                     storageKeys[key] = {
//                             "first_occur": currDateTime,
//                             "lastest_occur": null,
//                             "session_freq": 1,
//                             "total_freq": 1,
//                             "wordID": new_max_wordID++
//                     }
//                     console.log("NEW SESSIONSTORAGEKEY freq:", key, storageKeys[key])
//                 }
            
//             chrome.storage.sync.set({'keywords': storageKeys, 'session_keywords': sessionStorageKeys , 'max_wordID': new_max_wordID}, function() {
//                 console.log('Values changed to 1: ' , storageKeys);
//                 console.log('Values changed to 2: ' , sessionStorageKeys);
//                 console.log('Values changed to 3: ' , new_max_wordID);
//             });
    
//         console.log("Current Stored Keywords :" + val.keywords);
//         //displaying the old items
//         // display_array()
//     });

        
//         var list = document.getElementById("keys-list");

//         alert("You added "+ key);
//         addUI(list, key)
        

//         console.log("Print words!" + storageKeys[key])
//     }

// }

function show_list(){
    var list = document.getElementById("keys-list");
    var freq_list = document.getElementById("freq-list");
    chrome.storage.sync.get( keyStoreVals, function(val) {
        var storageKeys = val.keywords; 
        var sessionStorageKeys = val.session_keywords;
        var x = val.keywords.length; 
        var new_max_wordID = val.max_wordID
        var block_sites = val.session_block

        var sortedStorageKeysArr = sortByNonDecreasingFreq(storageKeys)
        var sortedSessionStorageKeysArr = sortByNonDecreasingFreq(sessionStorageKeys)
        for (index = 0; index < sortedStorageKeysArr.length; index++) { 
        // for(let term in storageKeys){
            term = sortedStorageKeysArr[index][0]
            console.log("Keyword: " + term)
            addUI(list, term, storageKeys[term], "NoNoWord")
            // addUI(freq_list, term, sessionStorageKeys[term], "FrequentWord")
            
        }
        for (index = 0; index < sortedSessionStorageKeysArr.length; index++) { 
        // for(let term in sessionStorageKeys){
            term = sortedSessionStorageKeysArr[index][0]
            console.log("Keyword: " + term)
            addUI(freq_list, term, sessionStorageKeys[term], "FrequentWord")
            
        }
        // show_list()
        // show_freqlist()
        
    });
  
}

// function show_list1(){
//     var list = document.getElementById("keys-list");
//     chrome.storage.sync.get( keyStoreVals, function(val) {
//         var storageKeys = val.keywords; 
//         var sessionStorageKeys = val.session_keywords;
//         var x = val.keywords.length; 
//         var new_max_wordID = val.max_wordID
//         var block_sites = val.session_block

//         for(let key in storageKeys){
//             console.log("Keyword: " + key)
//             // if(storageKeys.hasOwnProperty(key))
//             // {
                
//             //     info = storageKeys[key];
//             //     // console.log(key,info);
//             //     let word_info = "<" +key + ">"
//             //     for(let key in info){
//             //         if(info.hasOwnProperty(key)){
//             //             value = info[key];
//             //             word_info += "" +key + ": " + value + " | ";
//             //             console.log("Property: "+ key,value);
//             //         }
                    
//             //     }
                
//             // }
//             addUI(list, key)
            
//         }
//         // show_list()
//         // show_freqlist()
        
//     });
  
// }







function addUI(ul, value, keywordInfo, keywordType ) {


if (keywordInfo!= undefined){
    var freqType = null;
    if ( keywordType=="NoNoWord" ){
        freqType="total_freq"
    }
    else if ( keywordType=="FrequentWord" ){
        freqType="session_freq"
    }

    var li = document.createElement("li");
    li.classList.add("list-group-item")

    var infoDiv = document.createElement("div");
    infoDiv.classList.add("info-container")
    li.appendChild(infoDiv);
    // $("li").addClass("list-group-item");

    // li.appendChild(document.createTextNode(value));

    if (freqType in keywordInfo){
        infoDiv.innerHTML =     "<div class='list-item-name' >"+
                                    value+
                                "</div>"+
                                "<div class='list-item-freq' >"+
                                    "("+keywordInfo[freqType]+")"
                                "</div>"
        }

    if (value != '') {
        ul.appendChild(li);
    }
    var span = document.createElement("SPAN");
    // span.style.fontSize = "0.75rem";
    var txt = document.createTextNode("\u00D7");
    
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    // $(".close").click(function () {

    span.addEventListener('click', function(event){
        // var index = $(this).index(".close");
        // console.log(index);
        var div = this.parentElement;
        console.log("PARENT DIV: ", div , "CHILD:" ,this)
        this.remove()
        if (div){
            console.log( "PARENT VAL", div.firstChild.firstChild.innerHTML )
            removeKeyword(div.firstChild.firstChild.innerHTML, keywordType)
            div.remove()
        }
    },false);
    
    infoDiv.addEventListener('click', function(event){
        console.log(event.currentTarget.firstChild)
        fillKeywordInfo(event.currentTarget.firstChild, keywordType)
        console.log("CLICK!!!", document.getElementById("keywordSummaryWrapper"),document.getElementById("keywordSummaryWrapper").style )
        var footerMenu = document.getElementById("keywordSummaryWrapper")
        var footerMenuSpacer = document.getElementById("blankFooterSpace")

        // document.getElementById("cheveron").classList.remove("cheveronFlip")
        // document.getElementById("cheveron").classList.add("cheveronFlipLeft")
        if (footerMenu!= null && (footerMenu.style.display == "" || footerMenu.style.display == "none")){
            console.log("IT'S NONE!!!")
            // footerMenu.style.display = "block" 
            footerMenu.classList.add("animateIn") 
            document.getElementById("cheveron").classList.add("cheveronFlip")
            
            // footerMenu.classList.add("animateInFirstEntrance")   
        }
        if (footerMenuSpacer!= null && (footerMenuSpacer.style.display == "" || footerMenuSpacer.style.display == "none")){
            console.log("IT'S NONE!!!")
            footerMenuSpacer.style.display = "block"   
        }
    },false);
    // li.addEventListener('click', function(event){
    //     console.log(event.currentTarget.firstChild)
    //     fillKeywordInfo(event.currentTarget.firstChild, keywordType)
    // },false);
    // document.getElementById("list-item-name").addEventListener('click', function(event){
    //     console.log(event.currentTarget.firstChild)
    //     fillKeywordInfo(event.currentTarget.firstChild, keywordType)
    // },false);
    // document.getElementById("list-item-freq").addEventListener('click', function(event){
    //     console.log(event.currentTarget.firstChild)
    //     fillKeywordInfo(event.currentTarget.firstChild, keywordType)
    // },false);
}
    // })
}
    
function fillKeywordInfo(clickedKeyword, keywordType) {

    chrome.storage.sync.get( keyStoreVals, function(val) {
        var storageKeys = val.keywords; 
        var sessionStorageKeys = val.session_keywords;
        var x = val.keywords.length; 
        var new_max_wordID = val.max_wordID
        var block_sites = val.session_block

        var keys = null;
        if ( keywordType=="NoNoWord" ){
            keys=storageKeys
        }
        else if ( keywordType=="FrequentWord" ){
            keys=sessionStorageKeys
        }

        var currKeyword = clickedKeyword.innerHTML 
        var currKeywordDate = null;
        if (currKeyword in keys){
            if (keys[currKeyword]["lastest_occur"] != null){
                currKeywordDate = keys[currKeyword]["lastest_occur"]
            }   
            else{
                currKeywordDate = keys[currKeyword]["first_occur"]
            }
            // const date = new Date('2010-08-05')
            const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric' }) 
            const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute },,{ value: second }] = dateTimeFormat.formatToParts(currKeywordDate ) 

            // console.log(`${day}-${month}-${year }`)
            console.log(day+"-"+month+"-"+year)
            // console.log(`${day}👠${month}👢${year}`) // just for fun


            document.getElementById("keywordSummary-keyword").innerHTML= currKeyword
            document.getElementById("keywordSummary-date").innerHTML= day+"-"+month+"-"+year+"-"+hour+":"+minute+":"+second
            document.getElementById("keywordSummary-freq-total-value").innerHTML = keys[currKeyword]["total_freq"]
            document.getElementById("keywordSummary-freq-last-value").innerHTML = keys[currKeyword]["session_freq"] 
        }
    })




}

    function removeKeyword(kw, keywordType) {
        chrome.storage.sync.get( keyStoreVals, function(val) {
            var storageKeys = val.keywords; 
            var sessionStorageKeys = val.session_keywords;
            var x = val.keywords.length; 
            var new_max_wordID = val.max_wordID
            var block_sites = val.session_block

            if ( keywordType== "NoNoWord" && kw in storageKeys ){
                delete storageKeys[kw]
            }
            else if (keywordType== "FrequentWord" && kw in sessionStorageKeys){
                delete sessionStorageKeys[kw]
            }

            //removing the keyword from the list attached to every blocked url it was in
            for (url in block_sites){
                console.log("URL: ", block_sites[url] )
                if (kw in block_sites[url]["keywords"]){
                    delete block_sites[url]["keywords"][kw]
                    console.log("DELETED KEYWORD: "+ kw+ "    from: "+ url )
                }
                if (Object.keys(block_sites[url]["keywords"])<1){
                    delete block_sites[url]
                    console.log("DELETED: "+ url)
                }
                console.log("URL: ", block_sites[url] )
            }
            


            chrome.storage.sync.set({ 'keywords': storageKeys, 'session_keywords': sessionStorageKeys, 'session_block': block_sites }, function() {
                console.log("VALS LEFT AFTER DELETION: " , storageKeys)
            });
    
            // for(let key in storageKeys){
            //     console.log("Keyword: " + key)
            //     if(storageKeys.hasOwnProperty(key))
            //     {
                    
            //         info = storageKeys[key];
            //         // console.log(key,info);
            //         let word_info = "<" +key + ">"
            //         for(let key in info){
            //             if(info.hasOwnProperty(key)){
            //                 value = info[key];
            //                 word_info += "" +key + ": " + value + " | ";
            //                 console.log("Property: "+ key,value);
            //             }
                        
            //         }
                    
            //     }
            //     addUI(list, key)
                
            // }
            // show_list()
            // show_freqlist()
            
        });
        
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

        })

    }


document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && e.target.id == 'text1' ) {
        document.getElementById("add_new_keyword").click();
        // add_block();
        // display_array();
      }
})


// document.getElementById("add").addEventListener("click", display_array);

/*Building out Frequency List*/ 

  /* console.log(allwords)
  console.log("testing") */


  function sortByNonDecreasingFreq(keysObject){
      console.log("in sorting function: " , keysObject)
    // chrome.storage.sync.get( keyStoreVals, function(val) {
        // var storageKeys = val.keywords; 
        // var sessionStorageKeys = val.session_keywords;
        // var x = val.keywords.length; 
        // var new_max_wordID = val.max_wordID
        // var block_sites = val.session_block

        var keys = keysObject;
        // var keys = null;
        // if ( keywordType=="NoNoWord" ){
        //     keys=storageKeys
        // }
        // else if ( keywordType=="FrequentWord" ){
        //     keys=sessionStorageKeys
        // }


        var sortable = [];


        for (var term in keys) {
            if(keys.hasOwnProperty(term)){
                sortable.push([term, keys[term]["session_freq"]]);
            } 
        }

        sortable.sort(function(a, b) {
            return parseInt(b[1])-parseInt(a[1]);
        });
        console.log("New array: ",sortable )


        // for (index = 0; index < sortable.length; index++) { 
        //     console.log(sortable[index]); 

        // }
        console.log("exitingsorting function: " , sortable)
        return sortable
        
    // });

  }

//   function sortByNonDecreasingFreq(keywordType){
//     chrome.storage.sync.get( keyStoreVals, function(val) {
//         var storageKeys = val.keywords; 
//         var sessionStorageKeys = val.session_keywords;
//         var x = val.keywords.length; 
//         var new_max_wordID = val.max_wordID
//         var block_sites = val.session_block

//         var keys = null;
//         if ( keywordType=="NoNoWord" ){
//             keys=storageKeys
//         }
//         else if ( keywordType=="FrequentWord" ){
//             keys=sessionStorageKeys
//         }


//         var sortable = [];


//         for (var term in keys) {
//             if(keys.hasOwnProperty(term)){
//                 sortable.push([term, keys[term]["session_freq"]]);
//             } 
//         }

//         sortable.sort(function(a, b) {
//             return parseInt(b[1])-parseInt(a[1]);
//         });
//         console.log("New array: ",sortable )


//         // for (index = 0; index < sortable.length; index++) { 
//         //     console.log(sortable[index]); 

//         // }
//         return sortable
        
//     });

//   }

  function show_freqlist(){
    var freq_list = document.getElementById("freq-list");

    chrome.storage.sync.get( keyStoreVals, function(val) {
        var storageKeys = val.keywords; 
        var sessionStorageKeys = val.session_keywords;
        var x = val.keywords.length; 
        var new_max_wordID = val.max_wordID
        var block_sites = val.session_block


        var sortable = [];


        for (var term in sessionStorageKeys) {
            if(sessionStorageKeys.hasOwnProperty(term)){
                sortable.push([term, sessionStorageKeys[term]["session_freq"]]);
            } 
        }

        sortable.sort(function(a, b) {
            return parseInt(b[1])-parseInt(a[1]);
        });
        console.log("New array: ",sortable )


        for (index = 0; index < sortable.length; index++) { 
            console.log(sortable[index]); 
        // } 

        // for(let key in sessionStorageKeys){

            // if(sessionStorageKeys.hasOwnProperty(key))
            // {
                var li = document.createElement("li");
                $("li").addClass("flist-group");
                info = sessionStorageKeys[sortable[index][0]];
                console.log(sortable[index],info);
                let word_info = "<" +sortable[index] + ">"
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
            // }
        }

        // for(let key in sessionStorageKeys){

        //     if(sessionStorageKeys.hasOwnProperty(key))
        //     {
        //         var li = document.createElement("li");
        //         $("li").addClass("flist-group");
        //         info = sessionStorageKeys[key];
        //         console.log(key,info);
        //         let word_info = "<" +key + ">"
        //         for(let key in info){
        //             if(info.hasOwnProperty(key)){
        //                 value = info[key];
        //                 word_info += "" +key + ": " + value + " | ";
        //                 console.log(key,value);
        //             }
                    
        //         }
        //         li.appendChild(document.createTextNode(word_info));
    
        //         if (word_info === '') {
        //             //do nothing
        //             //alert("You must write something!");
        //         } else {
        //             freq_list.appendChild(li);
        //         }
        //     }
        // }
        // show_list()
        // show_freqlist()
        
    });
    //TO DO: NEED TO CHANGE OR AFTER FREQUENCY IS SET, IT GETS/UPDATES show-freqlist()
//     sessionStorageKeys = {   "Musical":{
//         "total_freq": 1,
//         "session_freq": 0,
//         "first_occur": Date.now(),
//         "lastest_occur": null,
//         "wordID":0
//         },
// "really":{
//         "total_freq": 1,
//         "session_freq": 0,
//         "first_occur": Date.now(),
//         "lastest_occur": null,
//         "wordID":1
//         },
// }

   
}


// found on a Codepen by Joel César (sweet switch!)
$('.switch3 input').on('change', function(){
    var dad = $(this).parent();
    if($(this).is(':checked')){
        dad.addClass('switch3-checked');
        chrome.storage.sync.set({'mode':'PRODUCTIVITY', "session_keywords": {}, "session_block": {} }, function() {
            console.log("PRODUCTIVE TIME NEW SESSION")
          // console.log('Value is set to ' + value);
        });
    }
    else{
        dad.removeClass('switch3-checked');
        chrome.storage.sync.set({'mode':'LEISURE'}, function() {
            console.log("LEISURE TIME")
          // console.log('Value is set to ' + value);
        });
    }
  });