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
                classq += ((i==0) ? '' : ' ') + classes[i];   //todo нормальные имена
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

fixEvent = function(e) {
    e = e || window.event;

    if (!e.target) e.target = e.srcElement;

    if (e.pageX == null && e.clientX != null ) { // если нет pageX..
        var html = document.documentElement;
        var body = document.body;

        e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
        e.pageX -= html.clientLeft || 0;

        e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
        e.pageY -= html.clientTop || 0;
    }

    if (!e.which && e.button) {
        e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
    }

    return e;
}


function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}


if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /*, from*/)
    {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++)
        {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}


function makeUnselectable(node) {
    if (node.nodeType == 1) {
        node.setAttribute("unselectable", "on");
    }
    var child = node.firstChild;
    while (child) {
        makeUnselectable(child);
        child = child.nextSibling;
    }
}