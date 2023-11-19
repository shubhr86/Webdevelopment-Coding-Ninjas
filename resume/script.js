var progressBars= document.querySelectorAll('.skill-progress > div');
var skillsContainer = document.getElementById('skills-container');
window.addEventListener('scroll', checkScroll);
var animationDone= false;
// this function let the bars to 0
function initailiseBars(){
    for (let bar of progressBars){
        bar.style.width =0+'%';
    }
}
initailiseBars();
function fillBars(){
    for (let bar of progressBars){
        let targetwidth = bar.getAttribute('data-bar-width');
        let currentwidth=0;
        let interval=setInterval(function(){
            if (currentwidth > targetwidth){
                clearInterval(interval);
                return;
            }
            currentwidth++;
            bar.style.width =currentwidth +'%';
        },8);
    }
}

function checkScroll(){
    // check whether skill container is visible.
    var coordinates= skillsContainer.getBoundingClientRect();
    if (!animationDone && coordinates.top < window.innerHeight){
        // takecare of animation for only 1 time.
        animationDone= true;
        fillBars();
    }else if ( coordinates.top >window.innerHeight){
        animationDone=false;
        initailiseBars();
    }



}