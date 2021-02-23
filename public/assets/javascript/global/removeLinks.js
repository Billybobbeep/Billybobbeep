$(document).ready(function() {
    const menuBtn = $('.menuButton');
    menuBtn.click(()=>{	
        setTimeout(()=>{
        removeHash();
        }, 30);
    });

    function removeHash(){
        history.replaceState('', document.title, window.location.origin + window.location.pathname + window.location.search);
    }
});
  
$(document).ready(function() {
    setTimeout(()=>{
        history.replaceState('', document.title, window.location.origin + window.location.pathname + window.location.search);
    }, 100)
});