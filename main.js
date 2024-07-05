var root = document.documentElement;

// Select optimal integer scale for pixel art
const unscaled_window_w = 320;  // width of pixel art
const unscaled_window_h = 240;  // height of pixel art
const min_scale = 1;  // minimum scale for pixel art
const max_scale = 4;  // maximum scale - very large monitors won't get more scaling than 4x
client_width = root.clientWidth;
client_height = root.clientHeight;

opt_scale_x = Math.floor(client_width / unscaled_window_w);
opt_scale_y = Math.floor(client_height / unscaled_window_h);
opt_scale = Math.min(opt_scale_x, opt_scale_y);
console.log("opt_scale: ", opt_scale)
scale = Math.max(Math.min(opt_scale, max_scale), min_scale)
console.log("scale: ", scale)
root.style.setProperty('--scale', scale);


// Get the modal
var modal = document.getElementById("contact-page");

// Get the button that opens the modal
var btn = document.getElementById("contact-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


class SongkickWidgetProperties {
    constructor (iframe_scale_percentage, iframe_margin_top, upcoming_class_name) {
        this.iframe_scale_percentage = iframe_scale_percentage;
        this.iframe_margin_top = iframe_margin_top;  // Crop out songkick logo
        this.upcoming_class_name = upcoming_class_name;
    }
}


// Handtuned variables for various scales
songkick_scale_selector = {
    1: new SongkickWidgetProperties(80, -170, "upcoming-scale-1"),
    2: new SongkickWidgetProperties(80, -146, "upcoming-scale-2"),
    3: new SongkickWidgetProperties(80, -146, "upcoming-scale-3"),
    4: new SongkickWidgetProperties(100, -91, "upcoming-scale-4"),
}


function setup_upcoming() {
    songkick_iframe = document.querySelector('[id^=songkick-widget-]');
    console.log("songkick_iframe_id: ", songkick_iframe.id);
    properties = songkick_scale_selector[scale]
    songkick_iframe.style.setProperty('scale', properties.iframe_scale_percentage + "%");
    songkick_iframe.style.setProperty("margin-top", properties.iframe_margin_top + "px")
    document.getElementById("upcoming").classList.add(properties.upcoming_class_name)
}

window.onload = setup_upcoming;

document.getElementsByClassName("down-arrow")[0].addEventListener("click",
    event => document.getElementsByClassName("upcoming")[0].scrollBy({
        top:40,
        behavior: "smooth"
    })
)