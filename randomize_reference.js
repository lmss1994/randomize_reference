// ████▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀████ • • • Other Scripts • • • ████▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀████

// ████▄▀▄▀▄▀▄▀▄▀▄▀████ • • Menu Opne close • • ████▄▀▄▀▄▀▄▀▄▀▄▀████

function openMenu() { document.getElementById("menu").style.height = "100%"; }
function closeMenu() { document.getElementById("menu").style.height = "0%"; }


// ████▄▀▄▀▄▀▄▀▄▀▄▀████ • • Columns amount • • ████▄▀▄▀▄▀▄▀▄▀▄▀████

const columnsAmount = document.getElementById('columns_amount');
const columns = document.querySelectorAll('.options_menu_columns ');
const columnsMain = document.querySelectorAll('.main_columns ');   

function showColumns() {
    for (let i = 0; i < columns.length; i++) {
        if (i < columnsAmount.value) { columns[i].style.display = "block"; }
        else { columns[i].style.display = "none"; }
    }
    for (let i = 0; i < columnsMain.length; i++) {
        if (i < columnsAmount.value) { columnsMain[i].style.display = "block"; }
        else { columnsMain[i].style.display = "none"; }
    }    
}
showColumns();


// ████▄▀▄▀▄▀▄▀▄▀▄▀████ • • Columns Width • • ████▄▀▄▀▄▀▄▀▄▀▄▀████

function widthChange() {
    const width_amount = document.getElementById("columns_width__controller").value;
    const width_target = document.getElementsByClassName("main_columns");

    for ( var i = 0; i < width_target.length; i++ ) {
        width_target[i].style.maxWidth = width_amount + "px" ;
        width_target[i].style.minWidth = width_amount + "px" ;
    }
}



// ████▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀████ • • • Slideshow Scripts • • • ████▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀████

// ████▄▀▄▀▄▀▄▀▄▀▄▀████ • • Create new Slide • • ████▄▀▄▀▄▀▄▀▄▀▄▀████

function upload(group) {
    var files = document.getElementById(`image_${group}`).files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var div = document.createElement('div'); div.classList.add(`Slide_${group}`);
        var div2 = document.createElement('div'); div2.classList.add('image');
        var Img = document.createElement('img');
        Img.src = window.URL.createObjectURL(file);
        div2.appendChild(Img); div.appendChild(div2);
        var deleteButton = document.createElement("div");
        deleteButton.onclick = function() { removeItem(group); };
        deleteButton.classList.add('delete_button');
        deleteButton.classList.add('buttons_effect');
        var trash = document.createElement("img");
        trash.classList.add('icon');
        trash.src = ("svg/trash.svg");
        deleteButton.appendChild(trash); div.appendChild(deleteButton);
        document.getElementById(`SlideShow_${group}`).appendChild(div);

        // ████▄▀▄▀▄▀████ • Move to the newly created slide • ████▄▀▄▀▄▀████
        // get all the slides
        const slides = document.querySelectorAll(`.Slide_${group}`);
        if (!Array.from(slides).some(e => e.classList.contains('active'))) {
            slides[0].classList.add('active');
        }
        // get the current slide index
        const currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
        // remove the active class from the current slide
        slides[currentSlideIndex].classList.remove('active');
        // add the active class to the next slide
            slides[(currentSlideIndex - currentSlideIndex - 1 + slides.length) % slides.length].classList.add('active');
    }
}
upload('A'); upload('B'); upload('C'); upload('D'); upload('E');


// ████▄▀▄▀▄▀▄▀▄▀▄▀████ • • Slide delete • • ████▄▀▄▀▄▀▄▀▄▀▄▀████

function removeItem(group) {
    // get all the slides
    const slides = document.querySelectorAll(`.Slide_${group}`);
    if (!Array.from(slides).some(e => e.classList.contains('active'))) {
        slides[0].classList.add('active');
    }
    // get the current slide index
    const currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    // remove the active class from the current slide
    slides[currentSlideIndex].classList.remove('active');
    // add the active class to the 1º slide
    setTimeout(function() {
        slides[(currentSlideIndex - 1 + slides.length) % slides.length].classList.add('active');
        slides[currentSlideIndex].remove();
    }, 500);
}
removeItem('A'); removeItem('B'); removeItem('C'); removeItem('D'); removeItem('E');


// ████▄▀▄▀▄▀▄▀▄▀▄▀████ • • Next Slide • • ████▄▀▄▀▄▀▄▀▄▀▄▀████

function nextSlide(group) {
    // get all the slides
    const slides = document.querySelectorAll(`.Slide_${group}`);
    if (!Array.from(slides).some(e => e.classList.contains('active'))) {
        slides[0].classList.add('active');
    }
    // get the current slide index
    const currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    // remove the active class from the current slide
    slides[currentSlideIndex].classList.remove('active');
    // add the active class to the next slide
    setTimeout(function() {
        slides[(currentSlideIndex + 1) % slides.length].classList.add('active');
    }, 500);
}
nextSlide('A'); nextSlide('B'); nextSlide('C'); nextSlide('D'); nextSlide('E');


// ████▄▀▄▀▄▀▄▀▄▀▄▀████ • • Random Slide • • ████▄▀▄▀▄▀▄▀▄▀▄▀████

function randomSlide(group) {
    // get all the slides
    const slides = document.querySelectorAll(`.Slide_${group}`);
    if (!Array.from(slides).some(e => e.classList.contains('active'))) {
        slides[0].classList.add('active');
    }
    // get a random slide index
    const randomSlideIndex = Math.floor(Math.random() * slides.length);
    // remove the active class from the current slide
    const currentSlide = document.querySelector(`.Slide_${group}.active`);
    currentSlide.classList.remove('active');
    // add the active class to the random slide exept slide 0
    setTimeout(function() {
    slides[randomSlideIndex].classList.add('active');
    }, 500);
}
randomSlide('A'); randomSlide('B'); randomSlide('C'); randomSlide('D'); randomSlide('E');


// ████▄▀▄▀▄▀▄▀▄▀▄▀████ • • no active Slide • • ████▄▀▄▀▄▀▄▀▄▀▄▀████

function noSlide(group) {
    // get all the slides
    const slides = document.querySelectorAll(`.Slide_${group}`);
    const currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    // remove the active class from the current slide
    slides[currentSlideIndex].classList.remove('active');
}
noSlide('A'); noSlide('B'); noSlide('C'); noSlide('D'); noSlide('E');