dChart = function(id, options, callback) {
    var obj = $(id);
//        img = $(id + "_img");

    var state = {
        a: 0,
        z: 0
    };
    // User defined options
    for (i in options) state[i] = options[i];

//    img.ondragstart = function() {
//        return false;
//    };

    initSlider();



    function initSlider() {

        var slider = document.createElement("div");

        obj.appendChild(slider);
        addClass(slider, "stp");

        handler_right = document.createElement("div");
        handler_left = document.createElement("div");
        slider.appendChild(handler_right);
        slider.appendChild(handler_left);
        addClass(handler_right, "handler handler_right");
        addClass(handler_left, "handler handler_left");

        prepareData();

//        that.slider.innerHTML =  that.state.a + ' ' + that.state.z;
        slider.style.left = $px(state.a);
        slider.style.width = $px(state.z - state.a);

        bindHandlers();
    };
    function bindHandlers(){

        var dragObject = slider;
        var handler_left = handler_left;
        var handler_right = handler_right;

        var start = false;
        var move = false;
        var move_z = false;
        var move_a = false;

        var startX = 0;
        var stopX = 0;
        var left =  state.a;
        var right =  state.z;

//        dragObject.ondragstart = function() {
//            return false;
//        };
//
//        handler_left.ondragstart = function() {
//            return false;
//        };
//
//        handler_right.ondragstart = function() {
//            return false;
//        };
//
//        handler_right.ondragstart = function() {
//            return false;
//        };




        document.onmousedown = function(e){
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

            state = {
                a: newLeft,
                z: newRight
            };
//            that._log(that.state.a + '__' + delta + '___' + that.state.z);
            setPos();
//            dragObject.innerHTML =  that.state.a + ' ' + that.state.z;

        };

        document.onmouseup = function(e){
            e = fixEvent(e);
            if (!start) return;
            start = false;
            startX = 0;
            stopX = 0;
            left =  state.a;
            right = state.z;
            setPos();
            move = false;
            move_z = false;
            move_a = false;
//            dragObject.innerHTML =  that.state.a + ' ' + that.state.z;
        };
        document.onclick = function(e){
            e = fixEvent(e);
            if (!start) return;
            start = false;
            startX = 0;
            stopX = 0;
            left =  state.a;
            right =  state.z;
            setPos();
            move = false;
            move_z = false;
            move_a = false;
//            e.stopPropagation()
        };
        //todo prevent selection

    }

    function setPos(){
        slider.style.left = state.a + 'px';
        slider.style.width = state.z - state.a + 'px';
//            that.slider.style.width = that.state.z - that.state.a + 'px';
    }

























     function prepareData() {
        var that = this;
        _a = Math.min(that.a,that.z);
        _z = Math.max(that.a,that.z);
        that.a = _a;
        that.z = _z;
    }



























     function _log(text) {
        var logs = document.createElement("div");
        logs.innerHTML = text;
        document.getElementById("log").appendChild(logs);
    }

};