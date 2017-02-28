$(document).ready(function(){
	console.log("coucou");
	$.ajax({
		type : "GET",
		url : "data/crm.json",
		
		success : function(data){
			console.log(data)
			
			var client=data.customers;
			for(var i=0; i< client.length; i++){
				client[i];
				console.log(data.customers[i]);


				var customer = client[i].first_name+'<br>'+ client[i].last_name+'<br>'+ client[i].phone +'<br>'+ client[i].email+'<br>'+ client[i].description;
				$('#app').append("client" +'<br>'+ customer);
			}
		},

		error: function(xhr, status){
			console.log("erreur");
		}
	})
	

});