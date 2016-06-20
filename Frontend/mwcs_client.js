(function(){
         $.getJSON("/wages_months_list", function(data){
         	// clear the current content of the select
        	$('#month-list').html('');
        	$('#month-list').append("<option disabled selected>" + "Select month"+ "</option>");
        	//set available months in select box.
            $.each(data, function(index, item){
                $('#month-list').append("<option val ="+item+">" + item + "</option>");
            });
        });

         $('#month-list').on('change', function(){
         	var selectedMonth = this.options[this.selectedIndex].value;
         	$('#selected-month').text(selectedMonth);
         	var month = selectedMonth.split('/')[0];
         	var year = selectedMonth.split('/')[1];
         	// get wages list and display
         	$.getJSON('/wages/'+month+'/'+year, function(data){
         		var text = "<ol>";
         		for(var w in data){
         			text += "<li>"+ "&emsp;"+w+",&emsp;$"+ data[w].toFixed(2) + "</li>";
				}
				text += "</ol>";
				$('#wages').append(text);
        	});	
         });
})();