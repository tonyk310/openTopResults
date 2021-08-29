function saveOptions(e) {
  // Why are we calling prevent default?
  // What is preventDefault?
  e.preventDefault();
  // browser.storage.sync.set({
  //   "integer": document.querySelector("#integer").value
  // });
  // let integer = document.querySelector("#integer").value;
  // console.log(integer);
  // console.log(e);
  let integer = e.submitter.parentElement[0].value || 3;
  console.log("From the options page: " + integer); 
  browser.storage.sync.set({
    "integer": integer
  });


}

document.querySelector("form").addEventListener("submit", saveOptions);
// document.querySelector("form").addEventListener("submit", function(event) {
  // console.log("FORM HEARD!");
  // console.log(event);
// });
