document.addEventListener('DOMContentLoaded', function(){
    // document.querySelector('button').addEventListener('click', onclick, false)
    // document.getElementsByTagName('button').addEventListener('click', onclick, false)

    articles = document.getElementsByTagName('button');
    for (var i = 0; i < articles.length; i++) {
        articles[i].addEventListener('click',onclick,false);
    }

    function onclick(event){
        // e = e || window.event;
        // var target = e.target || e.srcElement, text = target.textContent || target.innerText; 


        chrome.tabs.query({currentWindow: true, active:true },
        function( tabs ){
            // chrome.tabs.sendMessage(tabs[0].id, 'test', setCount )


            chrome.tabs.sendMessage(tabs[0].id, {"message": "print_test", "printMsg": event.target.id}  ) //sends info to content.js and prints whatever 'this' is
            chrome.tabs.sendMessage(tabs[0].id, {"message": "print_test", "printMsg": "[" +event.target.id+"] || [start_timer]:" }  )
            // chrome.tabs.sendMessage(tabs[0].id, {"message": "print_test", "printMsg": "[" +event.target.id+"] || [start_timer]:"+event.target.id=="start_timer" }  )
            chrome.tabs.sendMessage(tabs[0].id, {"message": "print_test", "printMsg": event.target.id=="start_timer" }  )

            switch (event.target.id){
                case "add_new_keyword":
                    chrome.runtime.sendMessage({"message": "ADD_KEYWORD", "keyword": "cats"} , tester2 ) //sends keyword to background.js to add to the keyword list
                    //this might be able to be accomplished right here actually

                    var string = "HELLO HAPPY DAY"; //STRING FROM INPUT FIELD
                    var strArr =  string.toUpperCase().split(" ").filter(Boolean);
                    chrome.storage.sync.get(['keywords', 'session_keywords', 'max_wordID' ], function(result) {
                        var storageKeys = result.keywords
                        var sessionStorageKeys = result.session_keywords
                        var new_max_wordID = result.max_wordID
                        strArr.forEach(function(term){
                            var currDateTime = Date.now()
                            if(!(term in storageKeys)){
                                // console.log("STORAGEKEY freq:", term, storageKeys[term])
                                
                                if(!(term in sessionStorageKeys)){
                                    storageKeys[term].total_freq = 1
                                    storageKeys[term].session_freq = 0
                                    storageKeys[term].first_occur = currDateTime
                                    storageKeys[term].lastest_occur = null
                                    storageKeys[term].wordID = new_max_wordID++
                                }
                                else{
                                    storageKeys[term].total_freq = sessionStorageKeys[term].total_freq
                                    storageKeys[term].session_freq = sessionStorageKeys[term].session_freq
                                    storageKeys[term].first_occur = sessionStorageKeys[term].first_occur
                                    storageKeys[term].lastest_occur = sessionStorageKeys[term].lastest_occur
                                    storageKeys[term].wordID = sessionStorageKeys[term].wordID

                                }

                            }
        
                        });
                        chrome.storage.sync.set({ 'keywords': storageKeys, 'max_wordID': new_max_wordID }, function() {
                            // console.log('Values changed to 1: ' , storageKeys);
                            // console.log('Values changed to 2: ' , sessionStorageKeys);
                            // console.log('Values changed to 3: ' , new_max_wordID);
                            // console.log('Values changed to 4: ' , currUrl);
                            // console.log('Values changed to 5: ' , block_sites);
                        });
        
        
                        // pauseVideo(tabID, currUrl)
                    });


                    chrome.storage.sync.set({keywords: [["cat".toUpperCase , Date.now(), 1 ]] }, function() {
                        console.log('Value is set to ' + value);
                      });
                    break;
                case "delete_keyword":
                    chrome.runtime.sendMessage({"message": "DELETE_KEYWORD", "keyword": "cats" } , tester2 ) //sends keyword to background.js to delete from the keyword list
                    //this might be able to be accomplished right here actually
                    break;
                case "start_timer":
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
                case "stop_timer":
                    chrome.runtime.sendMessage({"message": "STOP_TIMER" } , tester2 ) 
                    chrome.alarms.clear("PRODUCTIVITY_MODE");
                    window.close();
                    chrome.storage.sync.set({'mode':'LEISURE'}, function() {
                        // console.log('Value is set to ' + value);
                    });
                    //this 1) clears ALL alarms (not refined further rn) and 2) changes the storage value for whether we're in productivity mode or not to false (value used for reference if we will pause video )
                    break;
            }

            chrome.tabs.sendMessage(tabs[0].id, {"message": "send_matches"} , setCount ) //sends info to content.js
            chrome.runtime.sendMessage({"message": "test"} , tester ) //sends info to background.js
        })
    }
    function setCount (res) {
        const div = document.createElement('div')
        div.textContent = `${res.count} instances:: ${res.divContent}`
        document.body.appendChild(div)
    }
    function tester (res) {
        console.log("clicking")
        const div = document.createElement('div')
        div.textContent = ` hidiho ${res.testVal} |||  ${res.divContent}`
        document.body.appendChild(div)
    }
    function tester2 (res) {
        console.log("adding new keyword.......")
    }
}, false)