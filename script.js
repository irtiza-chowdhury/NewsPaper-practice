const mainContainer = document.getElementById("mainContainer");
const myTask = document.getElementById("myTask");

// sidebar
const sideBar = document.getElementById("sideBar");
const paperName = document.querySelector(".paper-name");
const newsInfo = document.querySelector(".news-info");
const newsDate = document.querySelector(".news-date");
const textTitle = document.getElementById("textTitle");
const categoryTitle = document.getElementById("categoryTitle");
const listTitle = document.getElementById("listTitle");
const listTitleType2 = document.getElementById("listTitleType2");

// contents
const paperContent = document.getElementById("paperContent");
const paperContent2 = document.getElementById("paperContent2");
const paperTitle = document.querySelector(".title");
const paperIntro = document.querySelector(".intro");
const image = document.querySelector(".image");
const editedBy = document.querySelector(".editedBy");
const cardItem = document.querySelector(".card-item");
const text = document.getElementById("text");
const cardContent = document.getElementById("cardContent");
const listUlElement = document.getElementById("listUlElement");
const mainCategory = document.querySelector(".main-Category");
const textUlElement = document.getElementById("textUlElement");

// buttons
const rearrangeBtn = document.getElementById("rearrange");
const applyCssBtn = document.getElementById("applyCss");
const changePictureBtn = document.getElementById("changePicture");
const moreBtn = document.getElementById("moreBtn");

// rearrange function
function rearrangeContainer() {
  mainContainer.classList.toggle("row");
  sideBar.classList.toggle("col-md-3");
  paperContent.classList.toggle("col-md-9");
}

// toggle functions
function toggleClass(elem, ...args) {
  args.map((items) => elem.classList.toggle(items));
}

// apply css
function addCssClassToElement(e) {
  toggleClass(myTask, "fs-4", "text-secondary", "my-task");

  sideBar.classList.toggle("pt-4");

  toggleClass(paperName, "fs-4", "text-gradient");
  toggleClass(newsInfo, "small", "text-secondary", "py-2");
  toggleClass(newsDate, "small", "text-secondary");
  toggleClass(paperContent, "mt-5", "mt-md-0");
  toggleClass(paperContent2, "fs-5", "py-2");
  toggleClass(paperTitle, "fs-1", "text-bold");
  toggleClass(paperIntro, "fs-5", "py-5");

  image.classList.toggle("rounded");

  toggleClass(editedBy, "mt-2", "text-end", "fs-6", "text-secondary");

  toggleClass(cardItem, "card", "my-5", "p-3", "shadow-sm", "fs-6");

  toggleClass(
    moreBtn,
    "fs-6",

    "more-button",
    "d-flex",
    "justify-content-end"
  );

  textTitle.classList.toggle("text-title");
  categoryTitle.classList.toggle("category-title");
  listTitle.classList.toggle("list-title");
  listTitleType2.classList.toggle("list-title");

  document.body.classList.toggle("background");

  let innerText = e.target.innerText;

  e.target.innerText = innerText === "Apply Css" ? "Remove Css" : "Apply Css";
}

// function add more task
function addMoretask() {
  const textCont = text.innerText;
  if (cardContent.children.length === 3) {
    for (let i = 3; i < 7; i++) {
      const paragraph = document.createElement("p");
      paragraph.textContent = textCont;
      cardContent.append(paragraph);
    }
    showCompleteListOfText();

    moreBtn.textContent = "Read less";
  } else {
    for (let i = cardContent.children.length - 2; i >= 2; i--) {
      cardContent.removeChild(cardContent.children[i]);
      moreBtn.textContent = "Read more";
    }
    showDefaultListOfText();
  }
  addRemoveCategory();
}

// Event Listeners
rearrangeBtn.addEventListener("click", rearrangeContainer);
applyCssBtn.addEventListener("click", addCssClassToElement);
moreBtn.addEventListener("click", addMoretask);

// change picture functionality tyo select picture from device
changePictureBtn.onchange = function (e) {
  let targetImage = e.target;
  let files = targetImage.files;

  if (!files) {
    return;
  }

  // FileReader support
  if (FileReader && files && files.length) {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      image.src = fileReader.result;
    };
    fileReader.readAsDataURL(files[0]);
  }
};

// declaring array
let arrayOfNumber = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

// add and remove category start
let ulElement = document.createElement("ul");
let textItem = `Category`;

function showDefaultCategory() {
  for (let i = 1; i < 4; i++) {
    let listItem = document.createElement("li");
    listItem.innerText = `${textItem}- ${arrayOfNumber[i - 1]}`;
    ulElement.append(listItem);
  }

  mainCategory.appendChild(ulElement);
}

// add and remove category
function addRemoveCategory() {
  if (ulElement.children.length === 3) {
    increaseCategory();

    for (let i = arrayOfNumber.length - 6; i < arrayOfNumber.length; i++) {
      listUlElement.children[i].hidden = false;
    }
    moreBtn.textContent = "Read less";
  } else {
    for (let i = ulElement.children.length - 1; i >= 3; i--) {
      ulElement.removeChild(ulElement.children[i]);
      addNumberInExistingLi();

      moreBtn.textContent = "Read more";
    }
  }
}

// increase and decrease category function
function increaseCategory() {
  if (ulElement.children.length === 3) {
    for (let i = 4; i <= arrayOfNumber.length; i++) {
      let listItem = document.createElement("li");
      listItem.innerText = `${textItem}- ${arrayOfNumber[i - 1]}`;
      ulElement.append(listItem);
    }
  }
  mainCategory.appendChild(ulElement);
}

// Function add Numbers in existing list item
function addNumberInExistingLi() {
  for (let i = 0; i < arrayOfNumber.length; i++) {
    listUlElement.children[i].textContent = `List - ${i + 1}`;
  }
  for (let i = arrayOfNumber.length - 6; i < arrayOfNumber.length; i++) {
    listUlElement.children[i].hidden = true;
  }
}

// show fixed lists 4 of text in the display on first load
function showDefaultListOfText() {
  for (let i = arrayOfNumber.length - 6; i < arrayOfNumber.length; i++) {
    textUlElement.children[i].hidden = true;
  }
}
// show fixed lists 4 of text in the display on first load
function showCompleteListOfText() {
  for (let i = arrayOfNumber.length - 6; i < arrayOfNumber.length; i++) {
    textUlElement.children[i].hidden = false;
  }
}

// on load or when browser refresh
showDefaultCategory();
addNumberInExistingLi();
showDefaultListOfText();
