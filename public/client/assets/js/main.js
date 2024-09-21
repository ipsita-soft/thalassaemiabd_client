/*
Template Name: MediGrids - Medical & Hospital HTML Template.
Author: GrayGrids
*/

(function () {
    //===== Prealoder

    window.onload = function () {
        window.setTimeout(fadeout, 500);
    };
    
    function fadeout() {
        var preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.display = 'none';
        }
    }
    


    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        if (header_navbar) {
            var sticky = header_navbar.offsetTop;
    
            if (window.pageYOffset > sticky) {
                header_navbar.classList.add("sticky");
            } else {
                header_navbar.classList.remove("sticky");
            }
        }
    
        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (backToTo) {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                backToTo.style.display = "flex";
            } else {
                backToTo.style.display = "none";
            }
        }
    };
    


    // WOW active
    new WOW().init();

    let filterButtons = document.querySelectorAll('.event-btn-wrapper button');
    filterButtons.forEach(e =>
        e.addEventListener('click', () => {

            let filterValue = event.target.getAttribute('data-filter');
            iso.arrange({
                filter: filterValue
            });
        })
    );

    var elements = document.getElementsByClassName("event-btn");
    for (var i = 0; i < elements.length; i++) {
        elements[i].onclick = function () {
            var el = elements[0];
            while (el) {
                if (el.tagName === "BUTTON") {
                    el.classList.remove("active");
                }
                el = el.nextSibling;
            }
            this.classList.add("active");
        };
    };




    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');

    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });

    //===== mobile-menu-btn
    let navbarToggler = document.querySelector(".mobile-menu-btn");
    navbarToggler.addEventListener('click', function () {
        navbarToggler.classList.toggle("active");
    });




    //===== Gallery
        /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let galleryContainer = select('.gallery-container');
        if (galleryContainer) {
        let galleryIsotope = new Isotope(galleryContainer, {
            itemSelector: '.gallery-item',
            layoutMode: 'fitRows'
        });

        let galleryFilters = select('#gallery-flters li', true);

        on('click', '#gallery-flters li', function(e) {
            e.preventDefault();
            galleryFilters.forEach(function(el) {
            el.classList.remove('filter-active');
            });
            this.classList.add('filter-active');

            galleryIsotope.arrange({
            filter: this.getAttribute('data-filter')
            });
            aos_init();
        }, true);
        }

    });

    /**
     * Initiate gallery lightbox 
     */
    const galleryLightbox = GLightbox({
        selector: '.portfokio-lightbox'
      });







})();





    