/*
Renatex Form APP
*/


function init(page, target){
	var user_id = localStorage.getItem("user_id");

	if ( !user_id ){
		(function start(){
			var page = "pages/start.html";
			app_nav(page);
		})();
	} else {
		(function start(){
			get_user();
			$("nav, header, footer").fadeIn(500);

			app_nav(page, target);			
		})();
	}
}





function app_nav(page, target) {
	$("#loading").fadeIn(200);
	$.ajax({
	    url: page,
	    success: function (data) {
	    	if (!target) {
	    		$('body').append(data).hide().fadeIn(500);
	    		$("#loading").fadeOut(200);
	    	}
	    	 else {
	    	 	$(target).empty();
	    	 	$(target).append(data).hide().fadeIn(500);
	    	 	$("#loading").delay(200).fadeOut(200);
	    	 }
		},
	    dataType: 'html'
	});
}





// Set the timestamp
$( "input[name='data']" ).val(getTimeStamp());
function getTimeStamp(id) {
	var now = new Date();
	return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + "_" + now.getHours() + ':'
		+ ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
			.getSeconds()) : (now.getSeconds())));
}




// Set geolocation
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Geolocation is not supported by this browser");
	}
};

function showPosition(position) {
	$( "input[name='latitude']" ).val(position.coords.latitude);
	$( "input[name='longitude']" ).val(position.coords.longitude);
};













function processForm(form_id, local_key, timestamp) {
	// Save Form on LocalStorage
	storeMessage(form_id, local_key, timestamp);

	// Send using PHP
	/*
		$.post( $(form_id).attr("action"), $(form_id+" :input").serializeArray(), function(data){
			console.log("Data sent");
			//clearInput();
			return false
		});
	*/
};
 








 
function clearInput() {
	$("#form :input").each( function() {
	   $(this).val('');
	});
}








// Have Local Storage
function isLocalStorageSupported(){
	if(typeof(Storage) !== "undefined" && window['localStorage'] != null ) {
		return true;
	} else {
		return false;
	}
}




function saveimg(id, form_id) {

	var image_true = $(form_id+" #files ").length;

	if( !image_true) {
		return false
	}

	var files = document.getElementById("files").files;
	var imgCounter = 0;

	// Loop through the FileList and render image files as thumbnails.
	for (var i = 0, f; f = files[i]; i++) {

	  // Only process image files.
	  if (!f.type.match('image.*')) {
		continue;
	  }

	  var reader = new FileReader();

	  // Closure to capture the file information.
	  reader.onload = (function(theFile) {
		return function(e) {

			// Save on locaStorage
			var imgID = id + "_"+ imgCounter;
			localStorage.setItem(imgID, e.target.result);
			imgCounter ++;

		};
	  })(f);

	  // Read in the image file as a data URL.
	  reader.readAsDataURL(f);
	}

};




function check_imgs() {

// Check and automaticaly open localstorage images
  if(localStorage.img) {

			var span = document.createElement('span');
			span.innerHTML = ['<img class="thumb" src="', e.target.result,
								'" title="', escape(theFile.name), '"/>'].join('');

			$("body").append(span, null);
	}
}



function openimg(id, target) {
	var imgURL = localStorage.getItem(id);

	if (imgURL) {

		var span = document.createElement('span');
		span.innerHTML += ['<img class="thumb" src="', imgURL,
					'" title="test"/>'].join('');
		$(target).append(span, null);
	}
}



// Save on Local Storage
function storeMessage(form_id, local_key, timestamp){
	if(isLocalStorageSupported){
		
		if (!timestamp) {
			var local_key = local_key + new Date().getTime();	
		}
		var local_storage = JSON.stringify($(form_id).serializeObject());
		localStorage.setItem(local_key, local_storage);
		console.log(local_key+" ok");

		var local_key = local_key.split('_');

		saveimg("img_"+local_key[1], form_id);
	}
	else {
		console.log("No local storage :(")
	}
}




function get_user() {
	var retrievedObject = localStorage.getItem("user_id");
	
	if (retrievedObject) {
		var data = JSON.parse(retrievedObject);
		$('h1#user_name').html(data.name+"<span>"+data.age+"<span>");
	} else {
		return false
	}
}





// Read Any LocalStorage by ID
function getMessage(id) {
	console.log(id);
	var retrievedObject = localStorage.getItem(id);
	console.log( JSON.parse(retrievedObject) );
}






// Print the username on H1 element
function readName() {
	$.each( localStorage, function( key, value ) {
		var data = JSON.parse(value);
		var container = $("<ul class=report/>");
		$('h1#user_name').html(data.name);
	});
}







// Check if user have data sent
function user_have_data() {
	var data
	$.each( localStorage, function( key, value ) {

		if (key.indexOf('formapp_') > -1) {
			
		}
		return false
	});


}







// List all LocalStorage Items
function getLocalItems() {
	$.each( localStorage, function( key, value ) {
		var container = $("<ul class=report/>");
		var key = key.replace("formapp_","");
		var key = key.split('_');
		$("<li><span>"+ key[0] + "</span> " + key[1] + "</li>").appendTo(container);
		$('body').prepend(container);
	});

}







function getLocalData(target) {

	var counter_report = 0;
	$(target).empty();
	$.each( localStorage, function( key, value ) {

		if (key.indexOf('formapp') > -1) {

			var key_data = key.split('_');
			var key = key_data[1];
			var date = new Date(key * 1000)

			//var counter = 0;

			var data = JSON.parse(value);
			var container = $("<ul class=report_"+counter_report+"><li class=title>"+date+"</li></ul>");
			
			$.each(data, function(k, v) {
				$("<li><span>"+ k + ":</span> " + v + "</li>").appendTo(container);
				$(target).prepend(container);
			});

			$(target).find( "li" ).eq( 1 ).remove();
			$(target).find( "li" ).eq( 1 ).remove();


			for ( var i = 0; i < 5; i++ ) {
				var img_id = "img_"+key_data[1]+"_"+i;
				var img_target = ".report_"+counter_report
				console.log(img_id, img_target);
				openimg(img_id, img_target);
			}


			counter_report ++;
			
		}


	});
}








function loadRegisters(target) {
		var url = "http://notfound.com.br/off/formapp/get.php";
		$.ajax({
		url: url,	
		type:'GET',
		dataType:'json',
		success:function(data) {
			buildData(data, target);
		},
		error: function(data) {
			console.log("error");
		}
	});
}

function buildData(data, target) {
	$.each(data, function() {
		var container = $("<ul class=report/>");
		$.each(this, function(k, v) {	
			$("<li><span>"+ k + ":</span> " + v + "</li>").appendTo(container);
			$(target).prepend(container);
		});
	});
}








// Test internet 
function doesConnectionExist() {
	var xhr = new XMLHttpRequest();
	var file = "http://notfound.com.br/off/formapp/test.php";
	var randomNum = Math.round(Math.random() * 10000);
	 
	xhr.open('HEAD', file + "?rand=" + randomNum, false);
	 
	try {
		xhr.send();
		 
		if (xhr.status >= 200 && xhr.status < 304) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
}
















$.fn.serializeObject = function()
{
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};