document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);


//Cloudinary Upload Widget

var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dmlqhwwfc',
  uploadPreset: 'umqopfpp'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    console.log('Done! Here is the image info: ', result.info);
    // send to tthe backend to the route /user/whatever
    // we send the secure url
    //import axios
    let profileImage = result.info.secure_url
    // axios.post("/user/:userId/profile-image", {
    axios.post("/user/5d7fbf04c8d199827b69ae68/profile-image", {
      profileImage
    })
  }
})

let uploadButton = document.getElementById("upload_widget")
if (uploadButton) {
  uploadButton.addEventListener("click", function () {
    myWidget.open();
  }, false);
}