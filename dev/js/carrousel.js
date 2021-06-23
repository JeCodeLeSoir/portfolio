/* Carrousel */

class Carrousel {
    
    constructor(imgs, button_l, button_r) {     
        this.imgs = imgs;
        if (this.imgs.length > 0) {

            this.index = 0;
            this.min = 0;
            this.max = this.imgs.length - 1;
            this.intervalcache = setInterval(()=> this.Update(), 6000);

            this.Render();
          
            button_l.addEventListener('click',()=> this.ClickLeft());
            button_r.addEventListener('click',()=> this.ClickRight());
        }
    };

    static bind() {
        const imgs = document.querySelectorAll(".carrousel .imgs .item");
        const button_l = document.querySelector(".left");
        const button_r = document.querySelector(".right");
        new Carrousel(imgs, button_l, button_r);
    };

    Render() {
        this.imgs.forEach((e) => e.classList.remove('show'));
        this.imgs[this.index].classList.add('show');
    };

    ClickLeft() {
        if (this.index > this.min)
            this.index--;
        else
            this.index = this.max;

        this.Render();

        clearInterval(this.intervalcache);
        this.intervalcache = setInterval(()=> this.Update(), 6000);
    };

    ClickRight() {
        if (this.index < this.max)
            this.index++;
        else
            this.index = this.min;

        this.Render();

        clearInterval(this.intervalcache);
        this.intervalcache = setInterval(()=> this.Update(), 6000);
    };

    Update() {
        if (this.index < this.max)
            this.index++;
        else
            this.index = this.min;
        this.Render();
    };
};

Carrousel.bind();