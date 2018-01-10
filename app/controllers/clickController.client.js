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
       
       
       function ajaxRequest (method, url, callback) {
       var xmlhttps = new XMLHttpRequest();

       xmlhttps.onreadystatechange = function () {
         if (xmlhttps.readyState === 4 && xmlhttps.status === 200) {
            callback(xmlhttps.response);
         }
       };

       xmlhttps.open(method, url, true);
       xmlhttps.send();
       }
   
   
      function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
      }
      
            
      ready(ajaxRequest('GET', apiUrl, updateClickCount));
      
      
      
      addButton.addEventListener('click', function () {

      ajaxRequest('POST', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount)
      });

      }, false);
      
      
      deleteButton.addEventListener('click', function () {

      ajaxRequest('DELETE', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);
   
   
   
   
})();