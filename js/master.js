//check if there  local storage colors option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", mainColors )

    //Remove Active class from all colors list Item
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");
         //add active class on element with datacolor === local storage item
        if (element.dataset.color === mainColors) {

            //add active class
            element.classList.add("active");
        }


    })
}
//Random Background Option 
let backgroundOption = true;

//variable to control the background interval

let backgroundInterval;
// Check If There is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
//check if random background local storage is not empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === true) {
        backgroundOption = true
    }else{
        backgroundOption = false
    }
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    })
    if (backgroundLocalItem === true) {
        document.querySelector(".random-backgrounds .yes").classList.add("active")
    }else{
        document.querySelector(".random-backgrounds .no").classList.add("active")
    }

}



//toggle spin class on icon
let toggleSetting = document.querySelector(".toggle-setting i");
let settingBox = document.querySelector(".setting-box");

toggleSetting.onclick = function(){
    this.classList.toggle("fa-spin");
    settingBox.classList.toggle("open");
};


// حل الكود بطيقة أخرى 
// toggleSetting.addEventListener("click", toggleSettingBox);

//  function toggleSettingBox() {
//     this.classList.toggle("fa-spin");
//     settingBox.classList.toggle("open");
// };

//Switch Colors 

let colorsLi = document.querySelectorAll(".colors-list li");
// loop on All list item 
colorsLi.forEach(li => {
    //click on every list items
    li.addEventListener("click", (e) => {

        //set color on root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color )
        localStorage.setItem("color_option", e.target.dataset.color);
        //Function Handle Active
        HandleActive(e)
    })
})

//Switch background Colors 

let randomBackEl= document.querySelectorAll(".random-backgrounds span");
// loop on All spans 
randomBackEl.forEach(span => {
    //click on every span
    span.addEventListener("click", (e) => {

        HandleActive(e)

        // //Remove Active class from all spans
        // e.target.parentElement.querySelectorAll(".active").forEach(element => {
        //     element.classList.remove("active");
        // })
        // // add active class on Self span
        // e.target.classList.add("active");

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImages();
            localStorage.setItem("background_option", true)
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false)
        }
    })
})








// Select Landing Page element

let landingPage = document.querySelector('.landing-page');
// Get Arayy of Images
let images = [
    "backg1.jpg",
    "backg2.jpg",
    "backg3.jpg",
    "backg4.jpg"
];
function randomizeImages() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get Arayy of Images
            let randomNumber = Math.floor(Math.random()*images.length);
            // Change background Images URL
            landingPage.style.backgroundImage = 'url("images/' + images[randomNumber]+ ' ")';
        },10000);
    }
    
}


//select Skills selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function(){

    //Skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    //Skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window Height
    let windowHeight = this.innerHeight;

    // window ScrollTop
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
            
        })
    }

}


//create pop up with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        // create overlay element
        let overlay = document.createElement("div");
    
        // add class to overlay
        overlay.className = "popup-overlay";
        //append overlay to the body
    
        document.body.appendChild(overlay);
        // create the pop up box
        let popupBox = document.createElement("div");
        // Add class to the popup Box 
    
        popupBox.className = 'popup-box';

        

        if (img.alt !== null){
            // Create Heading
            imageHeading = document.createElement("h3");
            // Create Text
            imgText  = document.createTextNode(img.alt);
            //Append Text to the heading
            imageHeading.appendChild(imgText);
            //Append heading to the popupBox
            popupBox.appendChild(imageHeading);
        }


        // Create the Image

        let popupImage = document.createElement("img");

        // Set Image Source

        popupImage.src = img.src;

        //Add Image to popup Box
        popupBox.appendChild(popupImage);
        //Append the popup Box to body 
        document.body.appendChild(popupBox);

        // create the close span
        let closeButton = document.createElement("span");
        // create text to the close span
        let closeButtonText = document.createTextNode("X");
         //Append closeButtonText  to close Span
         closeButton.appendChild(closeButtonText);
         //add class to the close button
         closeButton.className ="close-button";
        //Add close span to popup Box
        popupBox.appendChild(closeButton);

        // Close Button
        document.addEventListener("click", (e) => {
            if (e.target.className == "close-button") {
            // Remove the current popup
            e.target.parentNode.remove();
            // remove overlay
            document.querySelector(".popup-overlay").remove();
            // popupBox.style.display = "none";
            // overlay.classList.remove(".popup-overlay")
            }
           
        })
        
        

        
    });
})

// popup = (e) => {
//     // create overlay element
//     let overlay = document.createElement("div");

//     // add class to overlay
//     overlay.className = "popup-overlay";
//     //append overlay to the body

//     document.body.appendChild("overlay");
// } 
    

// Go To Section  when click   مش شغال 
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
const links = document.querySelectorAll(".links");
function goToSection(elements) {
    elements.forEach(element => {
        element.addEventListener("click", (e) => {
           
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
             behavior: "smooth"
        });
    })
       
       
})
}

goToSection(allBullets);//مش شغال
goToSection(links);


/// Function handle Active State
function HandleActive(e){
    //Remove Active class from all spans
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    })
    // add active class on Self span
    e.target.classList.add("active");

}



let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletsLocalItem = localStorage.getItem("bullets-option");
if(bulletsLocalItem !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    })
    if (bulletsLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bulletsContainer.style.display = "none"
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span =>{
    span.addEventListener('click',(e)=>{
       

        if(span.dataset.display === "show"){
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets-option","block")
        }else{
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets-option","none")
        }
        HandleActive(e);
    })
})

//   reset-button 
const resetOption = document.querySelector('.reset-option');
resetOption.addEventListener('click', () => {
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option");
    window.location.reload();
})


// toggle Menu

let toogleBtn = document.querySelector(".toogle-menu");
let linksMenu = document.querySelector(".links");


toogleBtn.addEventListener('click', openMenu);
function openMenu(e) {
    e.stopPropagation();
    toogleBtn.classList.toggle('menu-active');
    linksMenu.classList.toggle('open');
}
document.addEventListener('click', (e) => {
    if( e.target !== toogleBtn && e.target !== linksMenu){
        if (linksMenu.classList.contains('open')) {
            toogleBtn.classList.toggle('menu-active');
            linksMenu.classList.toggle('open');
        }
    }
});


linksMenu.onclick = function (e) {
    e.stopPropagation();
}



// openMenu = ()=>{
//     linksMenu.display.classList.add = "show-menu"
// }













// allBullets.forEach(bullet => {
//     bullet.addEventListener("click", (e) => {
        
//         document.querySelector(e.target.dataset.section).scrollIntoView({behavior: 'smooth'})
//     });
// });



   
  