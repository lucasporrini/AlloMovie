document.addEventListener("DOMContentLoaded",function(){if(window.jQuery){if($("div.details__bg").data("bg")){let a=$("div.details__bg").data("bg");$("div.details__bg").css({background:`linear-gradient(90deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,.8) 35%, rgba(0,212,255,0) 100%),                url(${a}) no-repeat center/cover`,height:"550px"})}$("#owl-carousel").owlCarousel({animateOut:"fadeOut",animateIn:"fadeIn",mouseDrag:!0,touchDrag:!0,responsive:{0:{items:2},600:{items:3},1000:{items:5}},loop:!1,autoplay:!1,nav:!0,dots:!1,smartSpeed:600,lazyLoad:!0}),$("#owl-carousel-cast").owlCarousel({animateOut:"fadeOut",animateIn:"fadeIn",mouseDrag:!0,touchDrag:!0,responsive:{0:{items:2},600:{items:3},1000:{items:4}},loop:!1,autoplay:!1,nav:!0,dots:!1,smartSpeed:600,lazyLoad:!0})}});
//# sourceMappingURL=owl.carousel-init.js.map
