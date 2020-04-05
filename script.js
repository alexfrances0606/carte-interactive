// votre code JS

var mymap = L.map('mapid').setView([48.853, 2.35], 13);
var layerGroup = L.layerGroup().addTo(mymap);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg'

}).addTo(mymap);


var marker = L.marker([48.858370, 2.294481]).addTo(mymap);


var marker = L.marker([48.858370, 2.294481]).addTo(mymap);


var circle = L.circle([48.858370, 2.294481], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);









async function getData(query) {
if (query == undefined){
    query = "";
    
}


    let url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q="+ 
    query +
    "&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type"
	let response = await fetch(url)
    
  let data = await response.json()

  layerGroup.clearLayers();


  data.records.forEach(function(event) {
		// le titre de l'événement
    let title = event.fields.title

		// si jamais le champs latitude/longitude manque
		// on ignore cet événement
		if (!event.fields.lat_lon) {
			return;
    }

		// la latitude
		let latitude = event.fields.lat_lon[0]

		// la longitude
	  let longitude = event.fields.lat_lon[1]
        // on pourrait récupérer d'autres infos..
      let address_name = event.fields.address_name;

      let cover_url = event.fields.cover_url;

      let date_start = event.fields.date_start;

      let price_detail = event.fields.price_detail;


       
		// pour tester, on les affiche dans la console
        console.log(title + " " + latitude + " " + longitude)
        
        let marker = L.marker([latitude, longitude]).addTo(mymap);
   
        let popupContent = "Event : " + title + 
        "<br><div class='eventTitle'>" +
         address_name +
         "</div>"  + "<br>" +
         "<img src='" + cover_url + "'>" +
         "Date :" + date_start + "<br>" +
         "Price :" + price_detail ;

   marker.bindPopup(popupContent);

        marker.addTo(layerGroup);

		// .. mais ce serait mieux de les afficher sur la carte !
    })
}

getData()

function onFormSubmit(event) {
    event.preventDefault();
    getData(searchInput.value);
    
}

function onFormSubmit(concert) {
    concert.preventDefault();
    console.log(concert.value)
    getData(concert.value);
    
}