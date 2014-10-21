/*
Renatex Form APP
*/



function app_navigation(page, target) {
	console.log(page, target);
	$( target ).empty().hide();
		$('#'+target).load(page,function(responseTxt,statusTxt,xhr) {
			if(statusTxt=="success")
				$( "#main" ).fadeIn(500);
				console.log("External content loaded successfully!");
			if(statusTxt=="error")
				console.log("Error: "+xhr.status+": "+xhr.statusText);
	});
}



function app_nav(page, target) {
	$.ajax({
	    url: page,
	    success: function (data) {
	    	if (!target) {
	    		$('body').append(data).hide().fadeIn(500);
	    	}
	    	 else {
	    	 	$(target).empty();
	    	 	$(target).append(data).hide().fadeIn(500);
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
$('#get_position').click (function () {
	getLocation();
});



$('#result').click (function () {
	$('#result').slideToggle("fast");
});












$('#show').click (function (event) {
	event.preventDefault();

	var text = $(this).html();
	if (text == "show") {
		loadRegisters();
		$(this).html("hide");
	} else {
		$(this).html("show");
		$( "#view" ).empty();
	}
	$("#view").slideToggle("fast")
});






function processForm(form_id, local_key, timestamp) {
	
	// Save Form on LocalStorage
	storeMessage(form_id, local_key, timestamp);

	// Send using PHP
	$.post( $(form_id).attr("action"), $(form_id+" :input").serializeArray(), function(data){
		console.log("Data sent");
		return false
	});
	//clearInput();
	//$( "header" ).show();
	//$( ".level1, .level2" ).hide();
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

	if( $(form_id+" label ").length ) {
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

		  // Render thumbnail.
		  var span = document.createElement('span');
		  span.innerHTML = ['<img class="thumb" src="', e.target.result,
							'" title="', escape(theFile.name), '"/>'].join('');

		  document.getElementById('list').insertBefore(span, null);

		  
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






// Check and automaticaly open localstorage images
  if(localStorage.img) { 
		 var span = document.createElement('span');
		  span.innerHTML += ['<img class="thumb" src="', localStorage.img,
							'" title="test"/>'].join('');
		  document.getElementById('list').insertBefore(span, null);
	}




function openimg(id) {
	var imgURL = localStorage.getItem(id);

	 var span = document.createElement('span');
	  span.innerHTML += ['<img class="thumb" src="', imgURL,
						'" title="test"/>'].join('');
	  document.getElementById('list').insertBefore(span, null);

	$('body').prepend(imgURL);

}



// Save on Local Storage
function storeMessage(form_id, local_key, timestamp){
	if(isLocalStorageSupported){
		console.log(timestamp);
		if (!timestamp) {
			var local_key = local_key + new Date().getTime();	
		}
		var local_storage = JSON.stringify($(form_id).serializeObject());
		localStorage.setItem(local_key, local_storage);
		console.log(local_key+" ok");
		saveimg("img_"+local_key, form_id);
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










function readName() {
	$.each( localStorage, function( key, value ) {
		var data = JSON.parse(value);
		var container = $("<ul class=report/>");
		$('h1#user_name').html(data.name);
	});
}



// List all LocalStorage Items
function getLocalItems() {
	$.each( localStorage, function( key, value ) {
	var container = $("<ul class=report/>");
	var key = key.replace("form_app_","");
	var key = key.split('_');
	$("<li><span>"+ key[0] + "</span> " + key[1] + "</li>").appendTo(container);
	$('body').prepend(container);

	});

}




function getLocalImg() {
	$.each( localStorage, function( key, value ) {

	//var n = key.indexOf("i");
	console.log(key);
	str1 = key;
	str2 = "img_form_app_";

	if(str1.indexOf(str2) != -1){
		alert(str2 + " found");
	}

	});
}




function getLocalData() {
	$.each( localStorage, function( key, value ) {
		var data = JSON.parse(value);
		var container = $("<ul class=report/>");
		$.each(data, function(k, v) {	
			$("<li><span>"+ k + ":</span> " + v + "</li>").appendTo(container);
			$('body').prepend(container);
		});
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






$( document ).ready(function() {

	if (isLocalStorageSupported()) {
		if (doesConnectionExist()){
			$("#send").show();
			$("#save").hide();
		} else {
			$("#send").hide();
			$("#save").show();
		}
	} else {
		alert("Our browser do not support localStorage :(")
	}
  
});










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