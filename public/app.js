//get article json
$.getJSON("/articles", function(data){

	for (var i = 0; i < data.length; i++) {
		//for each article
		var p = $("<p>");
		var item = data[i];

		p.attr("data-id", item._id);
		p.append(item.title + "<br/>");
		p.append(item.link);

		$("#articles").append(p);
	}
});

//whenever a p tag is clicked
$(document).on("click", "p", function(){
	//empty notes
	$("#notes").empty();
	//store p tag ID
	var id = $(this).attr("data-id");

	$.ajax({
		method: "GET",
		url: "/articles/" + id
	}).done(function(data){
		console.log(data);

		//article title
		$("#notes").append("<h2>" + data.title + "</h2>");
		//note title
		$("#notes").append("<input id='titleinput' name='title'>");
		//text area
		$("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
		//submit button
		$("#notes").append("<button data-id'" + data._id + "' id='savenote'>Save Note</button>");

		//if note exists in article, place note title in input and body of note in body textarea
		if (data.note) {
			$("#titleinput").val(data.note.title);
			$("#bodyinput").val(data.note.body);
		}
	});
});

//when savenote button is clicked
$(document).on("click", "#savenote", function(){
	//get note ID
	var id = $(this).attr("data-id");

	//use POST request to change note
	$.ajax({
		method: "POST",
		url: "/articles/" + id,
		data: {
			title: $("#titleinput").val(),
			body: $("bodyinput").val()
		}
	}).done(function(data) {
		console.log(data);
		//empty notes after posting
		$("#notes").empty();
	});

	//removes title and input after posting
	$("#titleinput").val("");
	$("#bodyinput").val("");
});