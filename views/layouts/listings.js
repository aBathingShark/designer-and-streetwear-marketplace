function search_listing() {
    alert("hi");
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('listing');
    console.log(x);
    for (i = 0; i < x.length; i++) {
        if (!x[i].firstElementChild.innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "list-item";
        }
    }
} 