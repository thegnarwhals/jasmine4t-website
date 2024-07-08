var root = document.documentElement;

// Select optimal integer scale for pixel art
const unscaled_window_w = 320;  // width of pixel art
const unscaled_window_h = 240;  // height of pixel art
const links_height = 40;  // height of links header
const min_scale = 1;  // minimum scale for pixel art
const max_scale = 4;  // maximum scale - very large monitors won't get more scaling than 4x
client_width = root.clientWidth;
client_height = root.clientHeight;

opt_scale_x = Math.floor(client_width / unscaled_window_w);
opt_scale_y = Math.floor(client_height / (unscaled_window_h + 2 * links_height));
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


function setup() {
    songkick_iframe = document.querySelector('[id^=songkick-widget-]');
    console.log("songkick_iframe_id: ", songkick_iframe.id);
    properties = songkick_scale_selector[scale]
    songkick_iframe.style.setProperty('scale', properties.iframe_scale_percentage + "%");
    songkick_iframe.style.setProperty("margin-top", properties.iframe_margin_top + "px");
    document.getElementById("upcoming").classList.add(properties.upcoming_class_name);
    dust();
}

window.onload = setup;

document.getElementsByClassName("down-arrow")[0].addEventListener("click",
    event => document.getElementById("upcoming").scrollBy({
        top:40,
        behavior: "smooth"
    })
);

const merch = ["cap", "record", "shirt"]
for (let i = 0; i < merch.length; i++) {
    document.getElementById(merch[i]).addEventListener("mouseenter",
        event => document.getElementById(merch[i] + "-text").style.display = "block"
    );
    document.getElementById(merch[i]).addEventListener("mouseleave",
        event => document.getElementById(merch[i] + "-text").style.display = "none"
    );
}

const out_of_stock = document.getElementsByClassName("pulse-contact-button")
for (let i = 0; i < out_of_stock.length; i++) {
    out_of_stock[i].addEventListener("mouseenter",
        event => document.getElementById("contact-button").classList.add("pulse")
    );
    out_of_stock[i].addEventListener("mouseleave",
        event => document.getElementById("contact-button").classList.remove("pulse")
    );
}


// Standard Normal variate using Box-Muller transform.
function gaussianRandom(mean=0, stdev=1) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

function dust() {
  let id = null;
  const elem = document.getElementById("dust");
  let x = 100;
  let y = 100;
  let u = 0;
  let v = 0;
  clearInterval(id);
  id = setInterval(frame, 50);
  function frame() {
    if (x < 0 | x > 297 | y < 0 | y > 221) {
      u = 0;
      v = 0;
      x = 100;
      y = 100;
    } else {
      u += gaussianRandom(0, 0.01);
      v += gaussianRandom(0, 0.01);
      x += u;
      y += v;
      elem.style.left = scale * x + "px"; 
      elem.style.top = scale * y + "px"; 
    }
  }
}

