function restoreStoragePreferences() {

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  function setValueToDOM(res) {
    var checkSavedRadioElement = document.getElementById(res.integer || 3);
    checkSavedRadioElement.checked = true;
  }


  let getValueFromStorage = browser.storage.sync.get("integer");
  // Complete the promise
  getValueFromStorage.then(setValueToDOM, onError);
}

function savePreference(value) {
  if (!value) {
    value = 3;
  }

  browser.storage.sync.set({
    "integer": value
  });
}

document.querySelector("form").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        selectedValue = event.target.value;
        savePreference(selectedValue);
    }
});
document.addEventListener("DOMContentLoaded", restoreStoragePreferences);

