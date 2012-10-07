dPlot = function(id, options, func) {
    var that = this;
        that.obj = $(id);
        that.func = func;

    that.state = {
        a: 0,
        z: 0
    };

    for (i in options) that.state[i] = options[i];

    that.initSlider();
};


dPlot.prototype = {
    callback: function() {
        var that = this;
        alert(that.state.a + " " + that.state.z + ' ' +start);
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

        that.slider.style.left = $px(that.state.a);
        that.slider.style.width = $px(that.state.z - that.state.a);

        that.bindHandlers();
    },

    bindHandlers: function(){
        var that = this;
        that.slider.ondragstart = function() {
            return false;
        };

        that.slider.onmousedown = function(e){
            start = false;
            move = false;
            move_z = false;
            move_a = false;
            startX = 0;
            stopX = 0;
            left =  that.state.a;
            right =  that.state.z;

            e = fixEvent(e);
            if (e.target == that.handler_left) {
                start = true;
                move_a = true;
            }
            if (e.target == that.handler_right) {
                start = true;
                move_z = true;
            }
            if (e.target == that.slider) {
                start = true;
                move = true;
            }

            startX = e.pageX;
            if (!start) return;
            that.move();
        };
    },
    move: function(){
        var that = this;

        document.onmousemove = function(e){
            var e = fixEvent(e);
            newX = e.pageX;
            delta = startX - newX;

            newLeft = left - ((move_a || move) ? delta : 0);
            newRight = right - ((move_z || move) ? delta : 0);
            if (newLeft < 0) {
                that.state = {
                    a: 0,
                    z: newRight
                };
                return ;
            }
            if (newRight > 786) {
                that.state = {
                    a: newLeft,
                    z: 786
                };
                return ;
            }
            that.state = {
                a: newLeft,
                z: newRight
            };
            that.setPos();
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
        };

        that.slider.onclick = function(e){
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
        };
    },
    setPos: function(){
        var that = this;
        that.prepareData();
        that.slider.style.left = that.state.a + 'px';
        that.slider.style.width = that.state.z - that.state.a + 'px';
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
};