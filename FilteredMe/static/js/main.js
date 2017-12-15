window.onload = function(){
      // window.setInterval(AddBubble(), 600);
      AddBubble();
};
sessionStorage.clear();

function AddBubble()
{
    var random = Math.random() + 1;
    var x = Math.floor((Math.random() * document.documentElement.clientWidth) + 1);;
    var iDiv = document.createElement('div');
    iDiv.className = 'bubble b1';
    iDiv.style.left = x+"px";
    iDiv.style.transform = "scale("+random+")";
    document.getElementsByClassName('bubbles')[0].appendChild(iDiv);  
    setTimeout(AddBubble, 5000);
    
}
function changebgColor()
{
  var bx = event.clientY; 
  document.body.style.background = "linear-gradient("+bx+"deg, #00d2ff , #3a7bd5)";
}