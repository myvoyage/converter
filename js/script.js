       $(function () {

			$("body").removeClass('no-js');
			$(document).ready(function() {
				var ifont = $("select#ifont").val();

				if(ifont == 'ay'){
				$("textarea#input").css("font-family","Ayar");
				$("div#ascii-controls").addClass('hide-ascii-controls');
				}
				if(ifont == 'zg'){
				$("textarea#input").css("font-family","Zawgyi-One");
				$("div#ascii-controls").addClass('hide-ascii-controls');
				}
				if(ifont == 'uni'){
				$("textarea#input").css("font-family","Padauk, MyanmarText, Tharlon, Myanmar3");
				$("div#ascii-controls").addClass('hide-ascii-controls');
				}
				if(ifont == 'win'){
				$("textarea#input").css("font-family","Win Innwa");
				$("div#ascii-controls").removeClass('hide-ascii-controls');
				}
			});
			$("select#ifont").change(function() {
				var ifont = $("select#ifont").val();

				if(ifont == 'ay'){
				$("textarea#input").css("font-family","Ayar");
				$("div#ascii-controls").addClass('hide-ascii-controls');
				}
				if(ifont == 'zg'){
				$("textarea#input").css("font-family","Zawgyi-One");
				$("div#ascii-controls").addClass('hide-ascii-controls');
				}
				if(ifont == 'uni'){
				$("textarea#input").css("font-family","Padauk, MyanmarText, Tharlon, Myanmar3");
				$("div#ascii-controls").addClass('hide-ascii-controls');
				}
				if(ifont == 'win'){
				$("textarea#input").css("font-family","Win Innwa");
				$("div#ascii-controls").removeClass('hide-ascii-controls');
				}
			});

			$("select#ofont").change(function() {
				var ofont = $("select#ofont").val();
				//alert(ofont);
				if(ofont == 'ay'){
				$("#output").css("font-family","Ayar");
				}
				if(ofont == 'zg'){
				$("#output").css("font-family","Zawgyi-One");
				}
				if(ofont == 'uni'){
				$("#output").css("font-family","Padauk, MyanmarText, Tharlon, Myanmar3");
				}
			});

			$("form#converter").submit(function(){
				$("#output").empty();
			});

			//$("input#inputfile").remove();

/*
			    $('#inputfile').fileupload({
			    	url: 'ajax.php',
			        dataType: 'json',
			        add: function (e, data) {
			            data.context = $("#submit")
			                .click(function () {
			                    data.context = $('#progress').text('Uploading...');
			                    data.submit();
			                });
			        },
			        progressall: function (e, data) {
				        var progress = parseInt(data.loaded / data.total * 100, 10);
				        $('#progress .bar').css(
				            'width',
				            progress + '%'
				        );
				    },
			        done: function (e, data) {
			            $('#progress').text('Upload finished.');
			        }
			    });
			    */
            $('form#converter').submit(function(e) {
	                $.ajax({
                    type: 'post',
                    url: 'ajax.php',
                    data: $('form#converter').serialize(),
                    dataType: 'json',
                    success: function (data) {
                    	//{"ofont_family":"Padauk, MyanmarText, Tharlon, Myanmar3","ochecked":"uni","ifont_family":"Ayar","ichecked":"ay","output_text":"asdf"}
                        output_text = data.output_text;
                        if(data.output_text){
                        $('#output').text(data.output_text);
                        $('#ajax_output').text(data.output_text);
						}
                        $("#output").css("font-family",data.ofont_family);
                        $("#ajax_output").css("font-family",data.ofont_family);
                        $("textarea#input").css("font-family",data.ifont_family);
                        if(data.ochecked == 'uni'){
                        	$("#ofont #uni").attr('selected');
                        }
                        if(data.ochecked == 'ay'){
                        	$("#ofont #ay").attr('selected');
                        }
                        if(data.ochecked == 'zg'){
                        	$("#ofont #zg").attr('selected');
                        }
                        if(data.ichecked == 'uni'){
                        	$("#ifont #uni").attr('selected');
                        }
                        if(data.ichecked == 'ay'){
                        	$("#ifont #ay").attr('selected');
                        }
                        if(data.ichecked == 'zg'){
                        	$("#ifont #zg").attr('selected');
                        }
                        if(data.ichecked == 'auto'){
                        	$("#ifont #auto").attr('selected');
                        }

                        if(data.error_message || data.time || data.type_error){
							$('#message').text(data.error_message);
							$('#message').text('<br>');
							$('#message').text(data.type_error);
							$('#message').text('<br>');
							$('#message').text(data.time);
							$('#myModal').modal('show');
						}
						//alert(output);
                    }
                });

                e.preventDefault();
            });
				$('#myTabContent a[href="#home"]').tab('show');
				$('#myTabContent a[href="#uploadsect"]').tab('show');
				$('#myTabContent a[href="#about"]').tab('show');
				$('#myTabContent a[href="#help"]').tab('show');
/*
				$('#ajax_output').focus(function() {
					textarea['ajax_output'].document.execCommand('copy', false, null);
				});
*/
				var inputHeight = $('textarea#input').css('height');
				$('#output').css('height',inputHeight);
				$('#ajax_output').css('height',inputHeight);
        });
