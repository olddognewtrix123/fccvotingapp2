    // Load the current ‘clicks’ value when the page loads
    // When the CLICK ME button is clicked, make a POST request to the API and update the data value in the view
    // When the ‘RESET’ button is clicked, make a DELETE request to the API and update the data value in the view


'use strict';

(function () {  //wrap all ontroller code in what’s called an immediately invoked function express (IIFE)
                // any variables declared within this function will not conflict with other variables within the application
                
                
                // the document.querySelector(cssSelector) method returnS the first HTML element in the DOM that matches the value of the CSS selector argument
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   //var apiUrl = 'https://localhost:8080/api/clicks';
   var apiUrl = 'https://clementinetutorial1-olddognewtrix123.c9users.io/api/clicks';
   //var apiUrl = 'https://localhost/api/clicks';
// https://fcc-voting-application-txsrangers.c9users.io:8080/api/clicks

   
   
   
            // need to retrieve API data when page loads, so <span> element will reflect current database value: function checkS that DOM has loaded, then executeS other function
    function ready (fn) {  
        if (typeof fn !== 'function') {  // prevents elements like arrays and strings from being provided as arguments
         return;
        }

        if (document.readyState === 'complete') {
         return fn();                           // if complete, execute the function passed as an argument. This is done by adding the (); after returning the argument.
        }

        document.addEventListener('DOMContentLoaded', fn, false); // event listener if document has not yet loaded
    }
       
       // here we are defining 'ajaxRequest' which retrieves data from the API
    function ajaxRequest (method, url, callback) { // OK, the 'method' is going to be whatever HTTP request comes in from the browser: Get, Post, or Delete.
                                                   // 'url' is the url that 'ajaxRequest' is going to make the HTTP request to.
                                                   // 'callback' is whatever function that should be exectued after the data
                                                   // is retrieved from the API
       var xmlhttps = new XMLHttpRequest();

       xmlhttps.onreadystatechange = function () { // every time the readyState property of the XMLHttpRequest object CHANGES, 
                                                   // it will execute the function defined here.
                                                   // essentially, this function executes multiple times as the readyState 
                                                   // changes during the data retrieval process.
         if (xmlhttps.readyState === 4 && xmlhttps.status === 200) { // a readyState of 4 means the operation is completed and a status of 200 signals the request had no errors.
            callback(xmlhttps.response); // ok both conditions were met, now execute whatever callback function was provided as an argument when ajaxRequest was called.
                                         // and as an argument for that callback function, use 'xmlhttps.response'.
                                         // the 'response' property is the piece that contains the data from the AJAX request.
         }
       };



    // now, to the meat of the function...
        
       xmlhttps.open(method, url, true); // this initiates the request with a string for the method, the url from the ajaxRequest function, and a boolean value that specifies the request should be made asynchronously
       xmlhttps.send(); // executes the previously initiated request (from the open() method).
       }
   
   
        
    function updateClickCount (data) { // updates the HTML <span> element 'clickNbr'.
        var clicksObject = JSON.parse(data); // the AJAX request returns a string and that string needs to get turned into an object (remember that our data object from the API looks like: { 'clicks': 0 })
        clickNbr.innerHTML = clicksObject.clicks;
      }
      
            

   
   // finally, we need to determine a way to retrieve the 
   // current number of clicks when the page loads.
   // to this end, the ready function (which is set up to bind
   // an event listener to the 'DOMContentLoaded' event) gets
   // passes a function (fn) as an argument.
   // the function that gets passed to the ready function is 
   // ajaxRequest, which is in turn passed arguments for its 
   // three parameters
   ready(ajaxRequest('GET', apiUrl, updateClickCount));
   
   
   // define what to do when the Add button gets clicked
   addButton.addEventListener('click', function () {

      ajaxRequest('POST', apiUrl, function () { // makes a POST AJAX request that increments the number of clicks in the db
         ajaxRequest('GET', apiUrl, updateClickCount) // retrieves current number of clicks when the page re-loads
      });

   }, false);
   
   
   deleteButton.addEventListener('click', function () {

      ajaxRequest('DELETE', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);
   
   
   
})();