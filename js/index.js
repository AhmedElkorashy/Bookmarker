// waiting for the event
var submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", addWebsite);
// input name variable
var inputName = document.getElementById("inputName");
// input url variable
var inputURL = document.getElementById("inputURL");
// table body
var tableBody = document.getElementById("tableBody");
// searching
var inputSearch = document.getElementById("search");
//

// button flags to activate or deactivate the submit button
var nameStatus = false;
var urlStatus = false;
var currentIndex;
var arrayList = [];
if (localStorage.getItem("website") !== null) {
  arrayList = JSON.parse(localStorage.getItem("website"));
  display();
}
function addWebsite() {
  if (inputName.value && inputURL.value) {
    var websiteObject = {
      name: inputName.value.trim(),
      url: inputURL.value.trim(),
    };
    if (validationName() && ValidationURL()) {
      // anotherModel.classList.remove("modal-content");

      arrayList.push(websiteObject);
      pushingToLocalStorage();
      display();
      clearInputValues();

      // submitButton.setAttribute("data-bs-toggle", "modal");
      // submitButton.setAttribute("data-bs-target", "#staticBackdrop");
      nameStatus = false;
      urlStatus = false;
      toggleButton();
      staticBackdrop.classList.add("d-none");
    } else {
      staticBackdrop.classList.remove("d-none");
    }
  } else {
    staticBackdrop.classList.remove("d-none");
  }
}
function display() {
  var cartona = "";
  if (arrayList.length == 0) {
    cartona = `<tr class="text-center text-capitalize">
                  <td colspan="4" class="fw-bold">there is no websites.</td>
                </tr>`;
  } else {
    for (var i = 0; i < arrayList.length; i++) {
      cartona += createCols(i);
    }
  }
  tableBody.innerHTML = cartona;
}
function removeWebsite(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      arrayList.splice(index, 1);
      pushingToLocalStorage();
      display();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

function pushingToLocalStorage() {
  localStorage.setItem("website", JSON.stringify(arrayList));
}
function clearInputValues() {
  inputName.value = "";
  inputURL.value = "";
  clearValidation();
}

function searchFunction() {
  var input_text = inputSearch.value.trim();
  var cartona = "";
  var found = false;

  for (var i = 0; i < arrayList.length; i++) {
    if (arrayList[i].name.toLowerCase().includes(input_text.toLowerCase())) {
      cartona += createCols(i);
      found = true;
    }
  }

  // Check if any website was found
  if (found) {
    tableBody.innerHTML = cartona;
  } else {
    tableBody.innerHTML = `<tr class="text-center text-capitalize">
                             <td colspan="4" class="fw-bold">This website doesn't exist.</td>
                           </tr>`;
    //  this line in case he removed the the last element from the table
    if (arrayList.length == 0) {
      display();
    }
  }
}
function createCols(i) {
  var regex = new RegExp(inputSearch.value, "gi");
  return `<tr>
             <th>
                ${i + 1}
                </th>
                <th>
                ${arrayList[i].name.replace(
                  regex,
                  (match) => `<span class="text-danger">${match}</span>`
                )}
                </th>
                <th>
                   <button class="btn btn-visit text-capitalize fw-semibold text-black text-white" onclick="openWebsite('${
                     arrayList[i].url
                   }') ">
                 <i class="fa-solid fa-eye pe-2"></i> Visit
               </button>
                </th>
                <th>
                <button class="btn btn-remove text-capitalize fw-semibold text-black text-white" id="removing"onclick="removeWebsite(${i})" >
                <i class="fa-solid fa-trash-can"></i>
                Delete
                </button>
                </th>
                </tr>`;
}
function openWebsite(url) {
  window.open(url, "_blank"); // Open the URL in a new tab
}

function validationName() {
  var regex = /^[a-zA-Z]{3,}$/;
  var websiteNameRegex = inputName.value;
  if (regex.test(websiteNameRegex)) {
    inputName.nextElementSibling.classList.add("d-none");
    inputName.classList.remove("is-invalid");
    inputName.classList.add("is-valid");
    nameStatus = true;
    toggleButton();
    return true;
  } else {
    inputName.nextElementSibling.classList.remove("d-none");
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
    nameStatus = false;
    toggleButton();
    return false;
  }
}

function ValidationURL() {
  var regex = /^https?:\/\//g;
  var urlRegex = inputURL.value;
  if (regex.test(urlRegex)) {
    inputURL.nextElementSibling.classList.add("d-none");

    inputURL.classList.remove("is-invalid");
    inputURL.classList.add("is-valid");
    urlStatus = true;
    toggleButton();
    return true;
  } else {
    inputURL.nextElementSibling.classList.remove("d-none");
    inputURL.classList.remove("is-valid");
    inputURL.classList.add("is-invalid");
    urlStatus = false;
    toggleButton();
    return false;
  }
}
// this function is to toggle the activate of the submit button
function toggleButton() {
  if (nameStatus == true && urlStatus == true) {
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");
  } else {
    submitButton.setAttribute("data-bs-toggle", "modal");
    submitButton.setAttribute("data-bs-target", "#staticBackdrop");
  }
}

//clearing validation again
function clearValidation() {
  inputName.classList.remove("is-valid");
  inputURL.classList.remove("is-valid");
}
