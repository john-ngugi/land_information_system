var map = L.map('map').setView([-4.09, 39.505], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);




const menuButton = document.getElementById("menu-button");
const popupWindow = document.getElementById('sidebar-popup');
const buttonSubmit = document.getElementById('button-submit');
const searchInputLocation = document.getElementById('search-location-input-top-map');
const paymentLink = document.getElementById('payment-link');
const moveLink = document.getElementById('move-link');
const payForm = document.getElementById('pay-form');
const cancelBtn = document.getElementById('cancle-pay-button');
const content = document.getElementById('content')



menuButton.addEventListener('click', () => {

    if (popupWindow.style.display == 'flex') {
        popupWindow.style.display = 'none';
        menuButton.innerHTML = `<i class="fa-solid fa-bars fa-xl"></i>`;


    } else {
        popupWindow.style.display = 'flex';
        popupWindow.style.flexDirection = 'column';
        menuButton.innerHTML = `<i class="fa-solid fa-xmark fa-xl"></i>`;

    }

})

function getLocationData(location) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=4f46346cace64259af5195730221407&q=${location}&aqi=yes`)
        .then(res => res.json()).then(
            data => {
                var lat = data.location.lat;
                var long = data.location.lon;
                console.log(lat, long)
                map.setView([lat, long], 15, { animate: true });
            }
        )
}


buttonSubmit.addEventListener('click', (e) => {
    console.log('searching')
    e.preventDefault();
    var location = searchInputLocation.value;
    getLocationData(location);
    e.preventDefault();
})

paymentLink.addEventListener('click', (e) => {
    console.log('clicked')
    e.preventDefault();
    if (payForm.style.display == 'flex') {
        // payForm.style.display == 'none';
        popupWindow.style.display = 'none';
    } else {
        payForm.style.display = 'flex';
    }
})


moveLink.addEventListener('click', (e) => {
    console.log('clicked move');
    content.innerHTML = `
  
    <div class=" mt-1 ps-2 pe-2 mb-3">
        <label for="parcel-no" class=" form-label">Enter Coordinates or location</label>
        <input type="text" class=" form-control" id="parcel-no" placeholder="enter parcel-no">
    </div>

`;
    e.preventDefault();
    if (payForm.style.display == 'flex') {
        // payForm.style.display == 'none';
        popupWindow.style.display = 'none';
    } else {
        payForm.style.display = 'flex';
    }
})


cancelBtn.addEventListener('click', () => {
    payForm.style.display = 'none';
})