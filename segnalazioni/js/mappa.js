var map = L.map('map', {
	revealOSMControl: true,
	revealOSMControlOptions: {
		queryTemplate: '[out:json];(node(around:{radius},{lat},{lng})[name];way(around:{radius},{lat},{lng})[name][highway];);out body qt 1;'
	},
	zoomControl: true
}).setView([42.6297405,13.2896061], 16);

var osm=L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a> powered by @piersoft'}).addTo(map);
var esi = L.tileLayer.wms("http://mapwarper.net/maps/wms/15512?request=GetCapabilities&service=WMS&version=1.1.1?", {
	layers: 'rv1',
	format: 'image/jpeg',attribution: '<a href="http://mapwarper.net/maps/15512#Preview_Map_tab" target="_blank">MapWraper with image uploaded by Napo from ESI<b>after</b> the earthquake</a> | <a href="http://openstreetmap.org">OSM</a> powered by @piersoft'});
var realvista = L.tileLayer.wms("http://213.215.135.196/reflector/open/service?", {
	layers: 'rv1',
	format: 'image/jpeg',attribution: '<a href="http://www.realvista.it/website/Joomla/" target="_blank">RealVista &copy; CC-BY Tiles</a> | <a href="http://openstreetmap.org">OSM</a> contr.s'
});


myIcon = L.icon({
	iconUrl: 'pinverde.png',
	iconSize: [32,32]
});


var marker = L.marker([42.6297405,13.2896061],
	{draggable: true, icon:myIcon}   );
marker.on('dragend', function(event){
	var marker = event.target;
	var position = marker.getLatLng();
	var addr='https://nominatim.openstreetmap.org/reverse?format=json&email=terremotocentroita@gmail.com&lat='+position.lat+'&lon=' + position.lng+'&zoom=18&addressdetails=1';

	//  addr_search(position.lat,position.lng);
	$.getJSON(addr, function(data) {
		document.getElementById("us3-address").value = data.display_name;
		document.getElementById("us3-lat").value = position.lat;
		document.getElementById("us3-lon").value = position.lng;
	});
});
map.addLayer(marker);


var layerControl = new L.Control.Layers({
	'OSM Humanitarian': osm,
	'Satellite pre terremoto': realvista,
	'Satellite post terremoto': esi
}, null, {position: 'topright'});

layerControl.addTo(map);

var geocoder = L.Control.geocoder({collapsed:false,placeholder:"Cerca...",
	defaultMarkGeocode: false, geocodingQueryParams: { countrycodes: "it" },
})
	.on('markgeocode', function(e) {
		var latlon=e.geocode.center;
		marker.setLatLng(latlon);
		map.setView([latlon.lat,latlon.lng], 16);

		document.getElementById("us3-address").value = e.geocode.name;
		document.getElementById("us3-lat").value = latlon.lat;
		document.getElementById("us3-lon").value = latlon.lng;
		revgeocoder = L.Control.Geocoder.nominatim({collapsed:false,placeholder:"Cerca...",
			defaultMarkGeocode: false, geocodingQueryParams: { countrycodes: "it" },
		})
		revgeocoder.reverse(latlon, map.options.crs.scale(map.getZoom()), function(results) {
			var r = results[0];
			if (r) {
				document.getElementById("us3-address").value = r.name;
			}
		})
	})
	.addTo(map);

