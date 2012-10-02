function $(el) {
    return document.getElementById(el);
}
function $px(x) {
    return x + 'px';
}

var addEvent, removeEvent;

if (document.addEventListener) {
    addEvent = function(el, type, handler) {
        el.addEventListener(type, handler, false)
    }
    removeEvent = function(el, type, handler) {
        el.removeEventListener(type, handler, false)
    }
} else {
    addEvent = function(el, type, handler) {
        el.attachEvent("on" + type, handler)
    }
    removeEvent = function(el, type, handler) {
        el.detachEvent("on" + type, handler)
    }
}

var addClass, removeClass

addClass = function (el, clss) {
    classes = getClasses(el);
    if(classes.indexOf(clss) == -1) {
        el.className += (' ' + clss);
    }

};
removeClass = function (el, clss) {
    classes = getClasses(el);
    var ine = classes.indexOf(clss);
    if (ine == -1) {

    } else {
        var classq = '';
        for (i=0; i< classes.length; i++) {
            if (i != ine) {
                classq += ((i==0) ? '' : ' ') + classes[i];
            }
        }
        el.className = classq;
    }

    console.log(el.className);
};
getClasses = function (el) {
   var classes = el.className.split(" ");

    return classes;
};