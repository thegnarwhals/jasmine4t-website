document.getElementsByClassName("down-arrow")[0].addEventListener("click",
    event => document.getElementsByClassName("upcoming")[0].scrollBy({
        top:40,
        behavior: "smooth"
    })
)