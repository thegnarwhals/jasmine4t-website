var root = document.documentElement;

const unscaled_window_w = 320;
const unscaled_window_h = 240;
opt_scale_x = Math.floor(root.clientWidth / unscaled_window_w);
opt_scale_y = Math.floor(root.clientHeight / unscaled_window_h);
scale = Math.min(opt_scale_x, opt_scale_y);
root.style.setProperty('--scale', scale);

document.getElementsByClassName("down-arrow")[0].addEventListener("click",
    event => document.getElementsByClassName("upcoming")[0].scrollBy({
        top:40,
        behavior: "smooth"
    })
)