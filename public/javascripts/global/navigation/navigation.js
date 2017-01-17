function burgerMenu() {                            // opens up the burgen menu when we click on the button present on navigation bar
    var a= document.querySelector("#nav > div > ul");
    if (a.className === " display-block") {
        a.className="";
        document.querySelector("#nav > div > ul > li > ul").className="display-none";
    }
    else {
        a.className = a.className + " display-block";
    }
}
function dropdown() {                                      //opens up the dropdown menu when we click on the manage device option in the burger menu
    var b = document.querySelector("#nav > div > ul > li > ul");
    if (b.className === "display-block") {
        b.className="display-none";
    }
    else {
        b.className="display-block";
    }
}
function callOnResize() {                                    // this function is called on window load and resize and inside this function all the events get attached
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if(w <= 480) {
        var x = document.querySelector("#nav > div > img");
        if(x.addEventListener)
            x.addEventListener("click", burgerMenu);


        else{
            if(x.attachEvent){                                    // for IE8
                x.attachEvent("onclick", burgerMenu);
            }
        }
        var c = document.querySelector("#nav > div > ul >li ~ li ~ li");

        if(c.addEventListener) {
            c.addEventListener("click", dropdown);
        }
        else{
            if(c.attachEvent){                                    // For IE8
                c.attachEvent("onclick", dropdown);
            }
        }
    }
    else{
        var b=document.querySelector("#nav > div > ul > li > ul");
        var a = document.querySelector("#nav > div > ul> li ~li ~li");
        a.removeEventListener("click",dropdown);
        b.className="display-none";
    }
}
if(window.addEventListener){
    window.addEventListener("load",callOnResize);
    window.addEventListener("resize",callOnResize);}
else{
    if(window.attachEvent){                                         // For IE8
        window.attachEvent("onload",callOnResize);
        window.attachEvent("onresize",callOnResize);
    }
}/**
 * Created by ssi238 on 12/23/2015.
 */
