const request = (endpoint, method, data = {}) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `http://localhost:3000/api/v1/${endpoint}`,
			type: method,
			contentType: 'application/json',
			data: data,
			// beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + $('#token').val()); },
			success: function (response) {
				resolve(response)
			},
			error: function (error) {
				alert('Error Connecting to Server!!!')
				reject(error);
			}
		});
	})
}

const makeListingCards = (listings) => {
	let listingHtml="";
	listings.forEach(element => {
		listingHtml += `
				<div class="col-lg-3 col-md-6">
		      	<div class="item">
		        <div class="position-absolute end-0 p-2"><i class="fa fa-heart fa-xl text-danger"></i></div>
		        <a href="property-details.html#${element._id}"><img src="public/img/property-01.jpg" alt=""></a>
		        <span class="category">Luxury Villa</span>
		        <h6>GH¢ ${element.pricePerNight}</h6>
		        <h4><a href="property-details.html">${element.title}</a></h4>
		        <ul>
		          <li>Bedrooms: <span>${element.bedrooms}</span></li>
		          <li>Bathrooms: <span>${element.bathrooms}</span></li>
		          <li>Area: <span>545m2</span></li>
		          <li>Floor: <span>3</span></li>
		          <li>Parking: <span>6 spots</span></li>
		        </ul>
		      </div>
		    </div>`
	});
	return listingHtml;
}

$(document).ready(async function () {
	// await request('listings', 'GET').then(data => {
	// 	$("#listings").html(makeListingCards(data));
	// }).catch(err => {
	// 	console.log(err)
	// })
});


(function ($) {

	"use strict";

	$("#saveFilterBtn").click(async function (e) {
		e.preventDefault();
		let filters = {
			"propertyType": $("#propertyType").val(),
			"bedrooms": $("#bedrooms").val(),
			"bathrooms": $("#bathrooms").val(),
			"minPrice": $("#minPrice").val()|| 0,
			"maxPrice": $("#maxPrice").val()|| 9999
		}

		await request('listings', 'GET', filters).then(data => {
			if (data.length < 1) {
				$("#listings").html("<p class='my-5 py-5 text-center h-75'>&nbsp;</p><p class='my-5 py-5 text-center h-75'>No listings match your request</p><p class='d-inline-block d-md-none my-5 py-5 text-center h-75'>&nbsp;</p>")
				return;
			}
			$("#listings").html(makeListingCards(data));
		}).catch(err => {
			console.log(err)
		})
	});

	$("#saveFilterFormBtn").click(async function (e) {
		e.preventDefault();
		// console.log("here")
		const filtersForm = document.forms["filtersForm"];
		const amenityList = filtersForm["amenities[]"];
		let amenities=[];
		for(let i=0;i<amenityList.length;i++){
			if(amenityList[i].checked)
				amenities.push(amenityList[i].value)
		}
		
		$("#minPrice").val(filtersForm["minPrice"].value)
		$("#maxPrice").val(filtersForm["maxPrice"].value)
		$("#bedrooms").val(filtersForm["nBedrooms"].value)
		$("#bathrooms").val(filtersForm["nBathrooms"].value)
		$("#propertyType").val(filtersForm["propType"].value)

		// console.log(filtersForm["amenities[]"]);
		let filters = {
			// "host": "",
			// "title": "",
			// "description": "",
			"propertyType": filtersForm["propType"].value,
			// "roomType": "",
			"bedrooms": filtersForm["nBedrooms"].value,
			"bathrooms": filtersForm["nBathrooms"].value,
			"minPrice": filtersForm["minPrice"].value||0,
			"maxPrice": filtersForm["maxPrice"].value||9999,
			"amenities": amenities,
			// "location": "",
			// "coordiantes": "",
			// "ghPostAddress": ""
		}
		console.log(filters)

		await request('listings', 'GET', filters).then(data => {
			if (data.length < 1) {
				$("#listings").html("<p class='my-5 py-5 text-center h-75'>&nbsp;</p><p class='my-5 py-5 text-center h-75'>No listings match your request</p><hr><p class='my-5 py-5 text-center h-75'>&nbsp;</p>")
				return;
			}
			$("#listings").html(makeListingCards(data));
		}).catch(err => {
			console.log(err)
		})

		$("#filtersModal").modal('hide');
	});

	// // Page loading animation
	// $(window).on('load', function () {
	// 	// $('#js-preloader').addClass('loaded');
	// 	$(document).ready(function() {
	// 		// $('.features').select2();
	// 		// $("#loginModal").modal('show');
	// 	});
	// });


	$(window).scroll(function () { // Scroll stuff
		const scroll = $(window).scrollTop();
		const box = $('.quick-links').height();
		const header = $('header').height();
		const biger = $('body').height();
		let properties = $('.properties').height();


		if (scroll >= box - header) {
			$("header").addClass("background-header");
		} else {

			$("header").removeClass("background-header");
		}
		if (properties > 2500) {
			properties += 250;
		}
		if (scroll >= biger - box - properties) {
			// console.log(scroll,properties,header)
			$(".filters").show();
		} else {
			$(".filters").hide();
		}
	})

	$('.owl-banner').owlCarousel({
		center: true,
		items: 1,
		loop: true,
		nav: true,
		dots: true,
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		margin: 30,
		responsive: {
			992: {
				items: 1
			},
			1200: {
				items: 1
			}
		}
	});

	var width = $(window).width();
	$(window).resize(function () {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.properties-box');
	const filtersElem = document.querySelector('.properties-filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.properties-items',
			layoutMode: 'masonry'
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function (event) {
				if (!matchesSelector(event.target, 'a')) {
					return;
				}
				const filterValue = event.target.getAttribute('data-filter');
				rdn_events_list.arrange({
					filter: filterValue
				});
				filtersElem.querySelector('.is_active').classList.remove('is_active');
				event.target.classList.add('is_active');
				event.preventDefault();
			});
		}
	}


	// Menu Dropdown Toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				var width = $(window).width();
				if (width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);
				}
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});


	// // Page loading animation
	// $(window).on('load', function () {
	// 	if ($('.cover').length) {
	// 		$('.cover').parallax({
	// 			imageSrc: $('.cover').data('image'),
	// 			zIndex: '1'
	// 		});
	// 	}

	// 	$("#preloader").animate({
	// 		'opacity': '0'
	// 	}, 600, function () {
	// 		setTimeout(function () {
	// 			$("#preloader").css("visibility", "hidden").fadeOut();
	// 		}, 300);
	// 	});
	// });



})(window.jQuery);