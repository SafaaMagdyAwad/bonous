var x = document.getElementById("x");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, showError);
    } else {
        x.innerText = "Your browser dosent support geo location";
    }
};
function showLocation(pos) {
    var longitude = pos.coords.longitude;
    var latitude = pos.coords.latitude;
    getWeather(latitude, longitude);
}
function showError(error) {
    x.innerHTML = "cannot connect ";
}
function getWeather(lat, lon) {
    const apiKey = '0d539a3d82ba2371add72c372cff7e3a';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Weather Data:", data);
            // data.name===>location
            // data.main.temp===>temprature
            let temprature = data.main.temp;
            let image = document.createElement("img");
            if (temprature <= 36.4) {
                image.src = "svgimgs/johnny_automatic_snow_child.svg";
                x.appendChild(image);

            } else if (temprature <= 37.5 || temprature > 36.4) {
                image.src = "svgimgs/Machovka_Happy_fish.svg";
                x.appendChild(image);

            } else if (temprature <= 38.4 || temprature > 37.5) {
                image.src = "svgimgs/publicdomainq-hot.svg";
                x.appendChild(image);

            } else if (temprature <= 42.2 || temprature > 38.4) {
                image.src = "svgimgs/1536492760.svg";
                x.appendChild(image);

            } else {
                image.src = "svgimgs/dibujo-34-2.svg";
                x.appendChild(image);
            }
            // alert(`Current temperature in ${data.name}: ${data.main.temp}°C`);
        })
        .catch(err => console.error("Error fetching weather:", err));
}
function addUrl() {

    var locationUrl = document.getElementById("locationUrl");
    var locationtitle = document.getElementById("locationtitle");
    var location = locationUrl.value;

    console.log(location);
    //storing the location in local storage
    let locations = JSON.parse(localStorage.getItem("locations")) || [];
    locations.push({
        "title": locationtitle.value,
        "url": location,
    });
    localStorage.setItem("locations", JSON.stringify(locations));

}

function showfavplacss() {
    let locations = JSON.parse(localStorage.getItem("locations")) || [];
    let Mylocations = document.getElementById("Mylocations");
    locations.forEach(location => {
        let anchore = document.createElement("a");
        // console.log(location.url);
        anchore.href = location["url"];
        anchore.target = "_blank";
        anchore.innerText = location["title"];
        Mylocations.appendChild(anchore);

    });
}

function playGame() {
    let colors = ["red", "green", "blue","yellow","lightgreen","lightblue"];
    ///shuffle array
    // console.log(randomeColors);
    let playd = document.getElementById("play");
    let table = document.createElement("table");

    // ineed 2 rows
    let row = document.createElement("tr");
        // debugger;
        let randomeColors = shuffle([...colors]);
        //loop
        randomeColors.forEach(color => {
            let cell = document.createElement("td");

            let div = document.createElement("div");
            div.innerHTML="<p>?</p>";
            div.id = color;
            div.className = "game";
            div.draggable = "true";
            div.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("div", e.target.id);

            });
            div.addEventListener("dragover", (e) => {
                e.preventDefault();

            });
            div.addEventListener("drop", (e) => {
                var divdata = e.dataTransfer.getData("div");
                console.log(divdata);
                console.log(e.target.id);
                if(divdata==e.target.id){
                    e.target.style.color=e.target.id;
                    
                }
                var image = document.getElementById(imgId);
                // console.log(e.target);
                e.target.appendChild(image);
            });
            cell.appendChild(div);
            row.appendChild(cell);
        });
        table.appendChild(row);



        let row1 = document.createElement("tr");
        // debugger;
        let randomeColors1 = shuffle([...colors]);
        //loop
        randomeColors1.forEach(color => {
            let cell = document.createElement("td");

            let div = document.createElement("div");
            div.innerHTML="<p>?</p>";
            div.id = `${color}-container`;
            div.className = "game";
            div.draggable = "true";
            div.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("div", e.target.id);

            });
            div.addEventListener("dragover", (e) => {
                e.preventDefault();

            });
            div.addEventListener("drop", (e) => {
                var divdata = e.dataTransfer.getData("div");
                console.log(divdata);
                console.log(e.target.id);
                if(`${divdata}-container`==e.target.id ){
                    //e.target.id=redContainer
                    // divdata=red
                    document.getElementById(divdata).style.backgroundColor=divdata;
                    document.getElementById(divdata).innerHTML="";
                    e.target.style.backgroundColor=divdata;
                    e.target.innerHTML="";
                } else if( `${e.target.id}-container`==divdata){
                    //e.target.id=red
                    // divdata=redContainer
                    document.getElementById(divdata).style.backgroundColor=e.target.id;
                    document.getElementById(divdata).innerHTML="";
                    e.target.innerHTML="";
                    e.target.style.backgroundColor=e.target.id;
                }

                // console.log(e.target);
            });
            cell.appendChild(div);
            row1.appendChild(cell);
        });
        table.appendChild(row1);
    playd.appendChild(table);

}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap
    }
    return array;
}



// <!-- api key   0d539a3d82ba2371add72c372cff7e3a -->
