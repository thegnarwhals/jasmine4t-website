var root = document.documentElement;

// Select optimal integer scale for pixel art
const unscaled_window_w = 320;  // width of pixel art
const unscaled_window_h = 240;  // height of pixel art
const links_height = 40;  // height of links header
const min_scale = 1;  // minimum scale for pixel art
const max_scale = 4;  // maximum scale - very large monitors won't get more scaling than 4x
client_width = root.clientWidth;
client_height = root.clientHeight;

// songkick api url
const songkick_api_url = "https://api.songkick.com/api/3.0/artists/10294709/calendar.json?apikey=7hs7vOnhl6UjvHGX";

opt_scale_x = Math.floor(client_width / unscaled_window_w);
opt_scale_y = Math.floor(client_height / (unscaled_window_h + 2 * links_height));
opt_scale = Math.min(opt_scale_x, opt_scale_y);
console.log("opt_scale: ", opt_scale);
scale = Math.max(Math.min(opt_scale, max_scale), min_scale);
console.log("scale: ", scale);
root.style.setProperty('--scale', scale);


async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}


const place_name_abbreviations = {
  "Brecon Beacons": "Brecons",
  "Sixpenny Handley": "Larmer Tree",
  "Los Angeles (LA)": "LA",
}

async function createUpcomingTable() {
  let response = await fetchAsync(songkick_api_url);
  console.log("response: ", response);
  const events = response.resultsPage.results.event;
  console.log("events: ", events);
  var table = ""
  for (const event of events){
    const start_date = new Date(event.start.date);
    const date_short = start_date.toLocaleString('default', {day: "numeric", month: 'short'});
    var city = event.location.city.split(",")[0];
    if (city in place_name_abbreviations){
      city = place_name_abbreviations[city];
    }
    table += '<tr>\n                        <td class="align-left">' + date_short + '</td><td class="align-right">' + city + '</td>\n                    </tr>';
  }
  table += '<tr><td class="align-centre" colspan="2">(More...)</td></tr>';
  console.log(table)
  var table_element = document.getElementById("upcoming-table")
  table_element.innerHTML = table;
}


function createModal(id) {
  // Get the modal
  var modal = document.getElementById(id + "-page");

  // Get the button that opens the modal
  var btn = document.getElementById(id + "-button");

  // Get the element that closes the modal
  var close = document.getElementById(id + "-close");

  // When the user clicks on the button, open the modal
  btn.addEventListener("click",
    event => modal.style.display = "flex"
  );

  // When the user clicks on (x), close the modal
  close.addEventListener("click",
    event => modal.style.display = "none"
  );

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener("click",
    function(){if (event.target == modal) {
      modal.style.display = "none";
    };}
  );
}

createModal("contact")
createModal("upcoming")
createModal("presave")


async function setup() {
    createUpcomingTable();
    dust();
}

window.onload = setup;

const text_triggers = ["cap", "record", "shirt", "mug", "insta", "tiktok", "woman-video", "contact-button", "presave-button"]
for (let i = 0; i < text_triggers.length; i++) {
    document.getElementById(text_triggers[i]).addEventListener("mouseenter",
        event => document.getElementById(text_triggers[i] + "-text").style.display = "block"
    );
    document.getElementById(text_triggers[i]).addEventListener("mouseleave",
        event => document.getElementById(text_triggers[i] + "-text").style.display = "none"
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
  const elems = document.getElementsByClassName("dust");
  let x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let u = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let v = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 10; i++) {
    x[i] = 297 * Math.random();
    y[i] = 221 * Math.random();
  }
  clearInterval(id);
  id = setInterval(frame, 50);
  function frame() {
    for (let i = 0; i < 10; i++) {
        if (x[i] < 0 | x[i] > 297 | y[i] < 0 | y[i] > 221) {
            u[i] = 0;
            v[i] = 0;
            x[i] = 297 * Math.random();
            y[i] = 221 * Math.random();
        } else {
            u[i] += gaussianRandom(0, 0.01);
            v[i] += gaussianRandom(0, 0.01);
            x[i] += u[i];
            y[i] += v[i];
            elems[i].style.left = scale * x[i] + "px"; 
            elems[i].style.top = scale * y[i] + "px"; 
        }
    }
  }
}

