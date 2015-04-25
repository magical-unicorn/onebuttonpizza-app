/*
call_pizzeria('Bob', '+33679889177', '+33678570233', '1 rue des Trinitaires, Metz', 'Margherita', function(r) {
	console.log('callback');
	console.log(r);
});
*/

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
