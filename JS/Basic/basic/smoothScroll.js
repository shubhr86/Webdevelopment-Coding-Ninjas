// select all anchor text within nav Menu

var navMenuAnchorTags= document.querySelectorAll('.nav-menu a ');
for (var i=0; i< navMenuAnchorTags.length ;i++){
    navMenuAnchorTags[i].addEventListener('click', function(event){ // to prevent default function, collect the event
        event.preventDefault();
       // fetch using content
        var targetSectionID= this.textContent.trim().toLowerCase();
        var targetSection= document.getElementById(targetSectionID);
        // coordinates
        
        var interval= setInterval(function(){
            var targetSectionCoordinates= targetSection.getBoundingClientRect();
            if (targetSectionCoordinates.top <=0){
            clearInterval(interval);
            return;
           }

            window.scrollBy(0,50);
        }, 20);


    });
}