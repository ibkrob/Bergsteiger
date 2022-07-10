/*  Beispiel */
var map = L.map('map').setView([45.4518, 7.6025], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.control.timelineSlider({
//     timelineItems: ["Day 1", "The Next Day", "Amazing Event", "1776", "12/22/63", "1984"],
//     extraChangeMapParams: {greeting: "Hello World!"}, 
//     changeMap: changeMapFunction })
// .addTo(mymap);

L.marker([44.1736000,5.2787900]).addTo(map)
    .bindPopup('Mont Ventoux im Jahr 1336')
    .openPopup();

 L.marker([44.841793,5.552223]).addTo(map)
    .bindPopup('Erstbesteigung des Mont Aiguille im Jahr 1492')
    .openPopup();

L.marker([45.89345978,7.25323710]).addTo(map)
    .bindPopup('Im Jahr 1779: Murith bestieg den Mont Vélan (3731 m ü NN.)')
    .openPopup();
    
L.marker([45.83089911 ,  6.86511039,]).addTo(map)
    .bindPopup('Erstbesteigung des Mont Blanc')
    .openPopup();

L.marker([46.5367, 7.9626]).addTo(map)
    .bindPopup('1811: Erstbesteigung der Jungfrau (4158 m. ü. NN.)    ')
    .openPopup();

L.marker([46.5899, 8.1182,]).addTo(map)
    .bindPopup('Die Goldenen Jahre des Alpinismus    ')
    .openPopup();

L.marker([45.004722, 6.308611,]).addTo(map)
    .bindPopup('Die Silbernen Jahre des Alpinismus    ')
    .openPopup();


// Maßstab hinzu
L.control.scale({
    imperial: false
}).addTo(map);

// Fullscreen control
L.control.fullscreen().addTo(map);


// Mini-Map
let miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("Esri.WorldImagery"), {
        toggleDisplay: true
    }
).addTo(map);

// // GPX Track Layer beim Laden anzeigen
// overlays.gpx.addTo(map);

// // GPX Track Layer implementieren
// let gpxTrack = new L.GPX("./data/stadtfuehrung.gpx", {
//     async: true,
//     marker_options: {
//         startIconUrl: 'icons/start.png',
//         endIconUrl: 'icons/mountain.png',
//         shadowUrl: null,
//         iconSize: [32, 37],
//         iconAnchor: [16, 37],
//     },
//     polyline_options: {
//         color: "black",
//         dashArray: [5, 4],
//     }

// }).addTo(overlays.gpx);



// gpxTrack.on("loaded", function (evt) {
//     //console.log ("loaded gpx event: ", evt);
//     map.fitBounds(evt.target.getBounds())


//     let gpxLayer = evt.target;
//     map.fitBounds(gpxLayer.getBounds());



//     new L.GPX(gpx, {
//         async: true
//     }).on('loaded', function (e) {
//         map.fitBounds(e.target.getBounds());
//     }).addTo(map);


//     let popup = `
// <h1> Live-Webcam of Hintereisferner: </h1>
// <ul>
// <img src="https://www.foto-webcam.eu/webcam/hintereisferner1/current/180.jpg" href="https://www.foto-webcam.eu/webcam/hintereisferner1/" style="width:170px; border:2px solid silver;" alt="Webcam">
//     <br>
//     <h2> Stadtführung Hard-Facts: </h2>
//     <li>Distance: ${gpxLayer.get_distance().toFixed()/1000} Kilometers </li>
//     <li>Highest Point: ${gpxLayer.get_elevation_max().toFixed()} m. a. Z.</li>
//     <li>Lowest Point: ${gpxLayer.get_elevation_min().toFixed()} m. a. Z.</li>
//     <br>
//     <li>Meters Uphill: ${gpxLayer.get_elevation_gain().toFixed()} Meters </li>
//     <li>Meters Downhill: ${gpxLayer.get_elevation_loss().toFixed()} Meters </li>

// </ul>
// `;


//     // Print
//     L.control.bigImage({
//         position: 'topleft'
//     }).addTo(map);



//     // Rainviewer
//     L.control.rainviewer({
//         position: 'bottomleft',
//         nextButtonText: '>',
//         playStopButtonText: 'Play/Stop',
//         prevButtonText: '<',
//         positionSliderLabelText: "Hour:",
//         opacitySliderLabelText: "Opacity:",
//         animationInterval: 500,
//         opacity: 0.5
//     }).addTo(map);

//     gpxLayer.bindPopup(popup);
// });

// let elevationControl = L.control.elevation({
//     time: false,
//     theme: "trekking",
//     elevationDIV: "#profile",
//     height: 300,
//     downloadLink: 'link',
//     url: "./data/stadtfuehrung.gpx",
//     options: {
//         preferCanvas: true,
//         collapsed: false,
//         detached: true,
//         useLeafletMarker: true,
//         summary: 'points',
//         hotline: false,
//     }



// }).addTo(map);



// gpxTrack.on("addline", function (evt) {

//     elevationControl.addData(evt.line);
// });