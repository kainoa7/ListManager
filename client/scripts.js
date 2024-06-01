const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

async function GetList() {

  try {
    theList = await http.get("/api");
    ShowList();
  } catch (error) {
    console.error("Error getting list:", error);
  }

}

async function WriteList() {

  try {
    await http.post("/api", theList);
  } catch (error) {
    console.error("Error writing list:", error);
  }

}

/* Listener Functions */
async function httpPost(e) {

  e.preventDefault();
  const newItem = input.value.trim();
  if (newItem) {
    theList.push(newItem);
    input.value = "";
    await WriteList();
    ShowList();
  }

  
}

async function httpDelete(e) {
  e.preventDefault();
  if (theList.length > 0) {
    theList = [];
    await WriteList();
    ShowList();
  } else {
    console.warn("The list is already empty");
  }
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();