const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector(".mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
};


function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    });

    tl.to(".anim-elem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    });

    tl.from("#hero-footer", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    });
};


var timer;
function CircleMovements() {
    //define default scale value

    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (dets) {

        clearTimeout(timer);
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);
        timer = setTimeout(function () {
            document.querySelector(".mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
};



circleMouseFollower();
CircleMovements();
firstPageAnim();

// teeno element ko sleect karo, uske baad teeno par ek mousemove lagao, 
// jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, 
// ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, 
// and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye.

document.querySelectorAll(".element").forEach(function (element) {

    var rotate = 0;
    var rotdiff = 0;
    element.addEventListener("mousemove", function (details) {
       var diff = details.clientY - element.getBoundingClientRect().top;
       rotdiff = details.clientX - rotate;
       rotate = details.clientX;
       
        gsap.to(element.querySelector("img") , {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: details.clientX,
        rotate: gsap.utils.clamp(-20,20,rotdiff*0.5)
    });
    });


    element.addEventListener("mouseleave", function (details) {
       
        gsap.to(element.querySelector("img") , {
        opacity: 0,
        ease: Power3,
        duration: 0.5
    });
    });

});

