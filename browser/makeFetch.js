let form = document.querySelector("form");
let input = document.querySelector("#fileType");
let isImageThere = false;

form.addEventListener("submit", ev => {
  ev.preventDefault();

  //let imageItem = input.value;
  let formData = new FormData();
  formData.append("profile", input.files[0]);

 fetch("images/upload", {
            method: "POST",
            body: formData
            })
  .then(res => res.json())
  .then(data => {

    console.log(data);
    if(!isImageThere){
      console.log("1");
      const imageElement = document.createElement("IMG");
      imageElement.setAttribute("src", "uploadedImages/" + data.file);
      document.body.append(imageElement)
      isImageThere = true;
    }
    else{
      console.log("2");
      const imageFound = document.querySelector("img");
      imageFound.setAttribute("src", "uploadedImages/" + data.file);
    }

      })
  .catch(err => console.warn(err))


})
