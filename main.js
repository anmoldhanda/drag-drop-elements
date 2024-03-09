const imagebox = document.querySelector(".imagebox");
const allwhitebox = document.getElementsByClassName("whitebox");

imagebox.addEventListener("dragstart", (event) => {
  // ============================================= start of dragging the element =============================================
  console.log("drag start");
  setTimeout(() => {
    // ================= timeout of 0 means it will fire the settimeout after all the exection of code is done =================
    imagebox.classList.add("hideimagebox");
  }, 0);
});

imagebox.addEventListener("dragend", (event) => {
  // ================================== end of dragging the element ==================================
  console.log("drag end");
  imagebox.classList.remove("hideimagebox");
});

for (whitebox of allwhitebox) {
  //   console.log(whitebox);
  whitebox.addEventListener("dragover", (event) => {
    event.preventDefault();
    // ================================== without changing the default behaviour of drag over event we can't use the drop event & we can't drop the child element into any parent element ==================================
    console.log("drag over");
  });
  whitebox.addEventListener("dragenter", (event) => {
    console.log("drag enter");
    event.target.classList.add("imageholdingactivetab");
  });
  whitebox.addEventListener("dragleave", (event) => {
    console.log("drag leave");
    event.target.classList.remove("imageholdingactivetab");
  });
  whitebox.addEventListener("drop", (event) => {
    console.log("drop");
    event.target.appendChild(imagebox);
  });
}

const inputimagefile = document.getElementById("inputimagefile");
const imagepreview_box = document.getElementById("imagepreview-box");

imagepreview_box.addEventListener("click", (event) => {
  // ================= as the imagepreviewbox div is clicked assume the input type file inputimagefile is also clicked =================
  inputimagefile.click();
});

inputimagefile.addEventListener("change", uploadimagefunction);
function uploadimagefunction() {
  // ================================== created a blob image url from the selected file as the file is selected from the input element as the change event occures ==================================
  let selectedfileurl = URL.createObjectURL(inputimagefile.files[0]);
  console.log(selectedfileurl);
  imagepreview_box.textContent = "";
  imagepreview_box.style.backgroundImage = `url(${selectedfileurl})`;
  imagepreview_box.classList.add("uploadedimage-adjustments");
}

imagepreview_box.addEventListener("dragover", (event) => {
  event.preventDefault();
});

imagepreview_box.addEventListener("drop", (event) => {
  event.preventDefault();
  const droppedfile = event.dataTransfer.files[0];
  if (droppedfile) {
    const droppedfileurl = URL.createObjectURL(droppedfile);
    inputimagefile.files[0] = droppedfile;
    uploadimagefunction();
  }
});
