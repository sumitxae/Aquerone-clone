function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}

locoScroll();

function pageOne(){
    gsap.to(".rhp",{
        width: "100%",
        borderRadius:"50px",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            scrub:0.5,
            // markers:true,
            start:"top -5%",
            end:"top -14%"
        }
    })
}

function pageFour(){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 100,
        navigation: {
            nextEl: ".button-next",
            prevEl: ".button-prev",
          },
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
}

pageOne();
pageFour();


var imgcon = [
    "https://uploads-ssl.webflow.com/60995478590a43cbebbd2ae9/6399a5c33f88482437f0a621_cbd-focus-energy-cbd-morning-matin-min.jpg",
    "https://uploads-ssl.webflow.com/60995478590a43cbebbd2ae9/6399a5b05d047988026246a4_cbd-for-sleep-sommeil-calm-relaxting-cbd-min.jpg",
    "https://uploads-ssl.webflow.com/60995478590a43cbebbd2ae9/6399a60c4483b50a2ad2da82_cbd-pain-douleurs-relief-inflammation-min.jpg",
    "https://uploads-ssl.webflow.com/60995478590a43cbebbd2ae9/6399a5dc8b947fb6b0a6d624_cbd-pleasure-libido-mood-boost-plaisir-humeur-min.jpg",
]
let i = 0;
var smallcon = document.querySelectorAll(".small-imgcon");
smallcon.forEach(element => {
    element.style.backgroundImage = `url(${imgcon[i]})`
    i++;
});