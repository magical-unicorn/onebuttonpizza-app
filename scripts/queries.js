
/*
call_pizzeria('Bob', '+33679889177', '+33678570233', '1 rue des Trinitaires, Metz', 'Margherita', function(r) {
	console.log('callback');
	console.log(r);
});
*/


var ref = new Firebase(firebaseEndpoint);
var geoFire = new GeoFire(ref);

//GeoFire.distance(location1, location2)

function userCoords(address, callback)
{
	var url = "http://api.tiles.mapbox.com/v4/geocode/mapbox.places/"+encodeURI(address)+".json?access_token="+mapboxAPIKey;

	$.ajax({
			type: 'GET',
			url: url, 
			success: function (response) {
				callback(response.features[0].geometry.coordinates);
			}, 
			error: function(xhr, type, error){
    			console.log('Ajax error!' + error + type);
  			}
  	}); 
}


function findNearestPizzeria(customer_address) 
{
	userCoords(customer_address, function(coords) {
		console.log(coords);
		ref.on("value", function(snapshot) {
			var boutiques = snapshot.val();
			// on recherche la boutique la plus proche
			var curDist = Number.MAX_SAFE_INTEGER;
			var nearest;

			for (var i in boutiques) {
				// on ne considère que les boutiques ouvertes
				var boutique = boutiques[i];
				if (isOpenNow(boutique)) {
					var pos = [];
					pos.push(boutique.adress.location.lat);
					pos.push(boutique.adress.location.lng);
					var distance = GeoFire.distance(coords, pos);
					if (distance < curDist) {
						curDist = distance;
						nearest = JSON.parse(JSON.stringify(boutique));
					}					
				}
			}
			//boutiques.sort(function(a, b) {return a.distance - b.distance;})
			console.log(nearest);
		});
	});
}

function isOpenNow(boutique) {
	var d = new Date();
	var n = d.getDay();

	var now = d.getHours()*100 + d.getMinutes();

	var periods = boutique.opening_hours.periods;
	for (var i in periods) {
		var p = periods[i];

		if (p.open.day !== n) {
			continue;
		}
		var open = parseInt(p.open.time);
		var close = parseInt(p.close.time);

		if (open < now && now < close) {
			return true;
		}

	}
	return false;
}


function call_pizzeria(customer_name, customer_phone, pizzeria_phone, customer_address, pizza, callback) {
	var url = 'http://obp.sous-anneau.org/voice.php';
	var params = { 'customer_name': customer_name, 'customer_phone': customer_phone, 'pizzeria_phone': pizzeria_phone, 'customer_address': customer_address, 'pizza': pizza};
	$.ajax({
			type: 'POST',
			url: url,
			data: JSON.stringify(params), 
			contentType: 'application/json',
			dataType: 'text', 
			success: function (data) {
				call_ack_poll(data, callback);
			}, 
			error: function(xhr, type, error){
    			console.log('Ajax error!' + error + type);
  			}
  	});
}


function call_ack_poll(id, callback) {
	var url = 'http://obp.sous-anneau.org/data/'+id;

	var idpoll = setInterval(function() {
		$.ajax({
				type: 'GET',
				url: url, 
				dataType: 'json', 
				contentType: 'application/json',
				success: function (response) {
					if (response.status != 'progress') {
						clearInterval(idpoll);
						callback(response);
					} 
				}, 
				error: function(xhr, type, error){
	    			console.log('Ajax error!' + error + type);
	  			}
	  	});
	}, 5000);
	
} 
