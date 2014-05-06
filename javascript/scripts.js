

function isScrolledIntoWindow (element){
	var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(element).offset().top;
    var elemBottom=$(element).offset().bottom;
    
    return ( elemTop <= docViewBottom);
}


function moveBackgroundsSeparetely() {
	var windowScrollPosition = $(window).scrollTop();
	var scrollSpeed = 3;
	var property ="left "+ windowScrollPosition*0.7 +"px ,"+ "right -" + windowScrollPosition*1.1+"px,"+ "center " + "center";
	$("#welcome-homepage").css("background-position", property);

}

function startProcessBar(){
		$(".process-flow").each ( function (){
			if(isScrolledIntoWindow($(this))){
				$(this).prev().addClass("active");
				$(this).addClass("display-content");
				
			}else if($(this).prev().hasClass("active")){
				$(this).prev().removeClass("active");
			}
			else if($(this).hasClass("display-content")){
				$(this).removeClass("display-content");
			}
		});
		
}

	

//   $(document).ready(function() {

// 	var element = $("#main-menu");
// 	var elementTopPosition = $("#main-menu").offset().top;

// 	function calculateAndAdd(){
// 	var windowScrollPosition = $(window).scrollTop();


// 	if ( windowScrollPosition > elementTopPosition){
// 		element.addClass("sticky");
// 	}else{
// 		element.removeClass("sticky");
// 	}

// }


// $(window).on( "scroll",  calculateAndAdd);
// });

	$(window).on( "scroll", startProcessBar);
	$(window).on( "scroll", moveBackgroundsSeparetely);
	

		
