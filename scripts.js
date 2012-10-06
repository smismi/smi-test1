dPlot = function(id, options) {
    var that = this;
        that.obj = $(id);
//        img = $(id + "_img");

    that.state = {
        a: 0,
        z: 0
    };
    // User defined options
    for (i in options) that.state[i] = options[i];

//    img.ondragstart = function() {
//        return false;
//    };

    that.initSlider();


};


dPlot.prototype = {
    callback: function() {
        var that = this;
        alert(that.state.a + " " + that.state.z);
    },
    initSlider: function() {
        var that = this;
        // Set starting position

        that.slider = document.createElement("div");
        that.obj.innerHTML = "";
        that.obj.appendChild(that.slider);
        addClass(that.slider, "stp");

        that.handler_right = document.createElement("div");
        that.handler_left = document.createElement("div");
        that.slider.appendChild(that.handler_right);
        that.slider.appendChild(that.handler_left);
        addClass(that.handler_right, "handler handler_right");
        addClass(that.handler_left, "handler handler_left");

        that.prepareData();

//        that.slider.innerHTML =  that.state.a + ' ' + that.state.z;
        that.slider.style.left = $px(that.state.a);
        that.slider.style.width = $px(that.state.z - that.state.a);

        that.bindHandlers();
    },

    bindHandlers: function(){
        var that = this;

        var dragObject = that.slider;
        var handler_left = that.handler_left;
        var handler_right = that.handler_right;

        var start = false;
        var move = false;
        var move_z = false;
        var move_a = false;

        var startX = 0;
        var stopX = 0;
        var left =  that.state.a;
        var right =  that.state.z;

        dragObject.ondragstart = function() {
            return false;
        };

        handler_left.ondragstart = function() {
            return false;
        };

        handler_right.ondragstart = function() {
            return false;
        };

        handler_right.ondragstart = function() {
            return false;
        };




        dragObject.onmousedown = function(e){


            e = fixEvent(e);

            if (e.target == handler_left) {
                start = true;
                move_a = true;

            }

            if (e.target == handler_right) {
                start = true;
                move_z = true;

            }
            if (e.target == dragObject) {
                start = true;
                move = true;

            }

            startX = e.pageX;

        };
        document.onmousemove = function(e){
            e = fixEvent(e);
            if (!start) return;



            newX = e.pageX;
            delta = startX - newX;
//            newLeft = left -  (move_a || move) ? delta : 0;
//            newRight = right - (move_z || move) ? delta : 0;

            newLeft = left - ((move_a || move) ? delta : 0);
            newRight = right - ((move_z || move) ? delta : 0);

            that.state = {
                a: newLeft,
                z: newRight
            };
//            that._log(that.state.a + '__' + delta + '___' + that.state.z);
            that.setPos();
//            dragObject.innerHTML =  that.state.a + ' ' + that.state.z;

        };

        document.onmouseup = function(e){
            e = fixEvent(e);
            if (!start) return;
            start = false;
            startX = 0;
            stopX = 0;
            left =  that.state.a;
            right =  that.state.z;
            that.setPos();
            move = false;
            move_z = false;
            move_a = false;
            that.callback();
//            dragObject.innerHTML =  that.state.a + ' ' + that.state.z;
        };
        document.onclick = function(e){
            e = fixEvent(e);
            if (!start) return;
            start = false;
            startX = 0;
            stopX = 0;
            left =  that.state.a;
            right =  that.state.z;
            that.setPos();
            move = false;
            move_z = false;
            move_a = false;
            that.callback();
//            e.stopPropagation()
        };
        //todo prevent selection

    },
    getPos: function(obj){
        var that = this;
        console.log(obj.offsetLeft);

            return { top: 0 , left:obj.offsetLeft};
    },

    setPos: function(){
        var that = this;
            that.slider.style.left = that.state.a + 'px';
            that.slider.style.width = that.state.z - that.state.a + 'px';
//            that.slider.style.width = that.state.z - that.state.a + 'px';
    },

























    prepareData: function() {
        var that = this;
        _a = Math.min(that.a,that.z);
        _z = Math.max(that.a,that.z);
        that.a = _a;
        that.z = _z;
    },



























    _log:function (text) {
        var logs = document.createElement("div");
        logs.innerHTML = text;
        document.getElementById("log").appendChild(logs);
    }
}