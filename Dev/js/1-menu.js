/* Menu */

const button = document.querySelector(".button");
const menu = document.querySelector(".menu");

button.addEventListener('click', () => {
    menu.classList.toggle("show");
});

window.addEventListener('load', ()=>{
    const ElementMenu = document.querySelector("#menu");
    const ElementFocus = document.querySelector("[go-focus]");
    
    if(ElementFocus !== undefined){
      setTimeout(()=>{ 
          ElementFocus.focus();
          window.scroll({
            top: ElementMenu.offsetTop, 
            left: 0, 
            behavior: 'smooth'
          });
      }, 100);
    };
});