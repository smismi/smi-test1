dChart = function(id, options, callback) {
    this.obj = $(id);
    this.options = {
        a: 0
        , z: 0
        , h: 0
        , n: 0
        , r: 0
    };

    // User defined options
    for (i in options) this.options[i] = options[i];

    // Set starting position
    this.a = this.options.a;
    this.z = this.options.z;
    this.initSlider();


};


dChart.prototype = {
    initSlider: function() {
        that = this;
        that.slider = document.createElement("div");
        that.obj.appendChild(that.slider);
        addClass(that.slider, "stp");


        that.handler_right = document.createElement("div");
        that.handler_left = document.createElement("div");
        that.slider.appendChild(that.handler_right);
        that.slider.appendChild(that.handler_left);
        addClass(that.handler_right, "handler handler_right");
        addClass(that.handler_left, "handler handler_left");


        that.prepareData();

        that.slider.style.left = $px(that.a);
        that.slider.style.width = $px(that.z - that.a);


        that.bindHandler();
    },


    bindHandler: function(){
        that = this;
        var wrapper = that.obj;
        var dragObject = that.slider;
//        dragObject.onmousedown = function(e){
//            e = fixEvent(e);
//
//
//
//            that._log(getCoords(slider).top + ' ' + getCoords(slider).left);
//            that.startX = getCoords(slider).left;
//        }
        var start = false;
        var startX = 0;
        var stopX = 0;
        var cu = 0;
        var newLeft = 0;



        dragObject.onmousedown = function(e){
            e = fixEvent(e);
            start = true;
            startX = e.pageX;
        };

        dragObject.onmousemove = function(e){
            e = fixEvent(e);
            if (!start) return;
            newX = e.pageX;

            newLeft = cu - (startX - newX);
            that._log(cu + ' ' + (startX - newX));
            dragObject.style.left = newLeft + 'px';











            dragObject.innerHTML =  dragObject.style.left;

        };
        dragObject.onmouseup = function(e){
            e = fixEvent(e);

            stopX = e.pageX;
            if (start) {that._log(stopX + '---'); start = false}
            cu = newLeft;
//            var newLeft = getCoords(dragObject).left++;
//            that._log(e.pageX);
//            dragObject.style.left =e.pageX - getCoords(dragObject).left + 'px';
        };


//        that.handler_right;

//        that.handler_left;
//
//        addEvent(that.handler_right, "mousedown", function(e) {
//            that._log("mousedown");
//
//        });
//        addEvent(document, "mouseup", function(e) {
//            that._log("up");
//
//        });
//        addEvent(document, "mousemove",  function(e) {egfweg(e)
//        });
//        var egfweg = function(event) {
//            that._log(event.clientX, event.clientY);
//        }
        //todo prevent selection
    },
    getPos: function(obj){
        that = this;
        console.log(obj.offsetLeft);

            return { top: 0 , left:obj.offsetLeft};
    },

























    prepareData: function() {
        that = this;
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