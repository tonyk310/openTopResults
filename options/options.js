function restoreStoragePreferences() {

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  function setValueToDOM(res) {
    // var form = document.querySelector("form");
    // var inputSet = form.querySelectorAll("input");
    // for (var i = 0; i < inputSet.length; i++) {
    //   if (inputSet[i].id === res.integer) {
    //     inputSet[i].checked = true;
    //   }
    // }

    var checkSavedRadioElement = document.getElementById(res.integer);
    checkSavedRadioElement.checked = true;
  }


  let getValueFromStorage = browser.storage.sync.get("integer");
  // Complete the promise
  getValueFromStorage.then(setValueToDOM, onError);
}



// function saveOptions(selectedValue) {
//   // Why are we calling prevent default?
//   // What is preventDefault?
//   event.preventDefault();
//   // browser.storage.sync.set({
//   //   "integer": document.querySelector("#integer").value
//   // });
//   // let integer = document.querySelector("#integer").value;
//   // console.log(integer);
//   // console.log("event inside of saveOptions in options.js" + event);
  
//   // let integer = event.submitter.parentElement[0].value || 3;
//   let integer = 3;
//   // Get collection of all inputs from the preferences page
//   // let inputSet = event.submitter.parentElement.querySelectorAll('input');

//   // Grab the form element
//   let formElement = event.submitter.parentElement;
//   // Grab the inputSet within the form
//   let inputSet = formElement.querySelectorAll('input');
//   // Determine which input is `checked` by the user.
//   for (var i = 0; i < inputSet.length; i++) {
//     if (inputSet[i].checked === true) {
//       integer = inputSet[i].value;
//     }
//   }
//   // pass object into sync storage that contains the key value pair to be set in storage for this extension.
//   browser.storage.sync.set({
//     "integer": integer
//   });
// }

function savePreference(value) {
  if (!value) {
    value = 3;
  }

  browser.storage.sync.set({
    "integer": value
  });
}

// var selectedValue = 3;
// var radios = document.forms["tabs-form"].elements["number-of-tabs-to-open"];
// for (var i = 0; i < radios.length; i++) {
//   radios[i].addEventListener('click', function(e) {
//     selectedValue = e.target.value;
//     // console.log(selectedValue);
//     savePreference(selectedValue);
//   });
// }

document.querySelector("form").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        // console.log("second " + event.target.value);
        selectedValue = event.target.value;
        // console.log(selectedValue);
        savePreference(selectedValue);
    }
});




// document.querySelector("form").addEventListener("submit", saveOptions);



document.addEventListener("DOMContentLoaded", restoreStoragePreferences);

