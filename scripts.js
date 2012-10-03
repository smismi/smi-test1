dChart = function(id, options, callback) {
    var that = this;
    that.obj = $(id);
    that.options = {
        a: 0
        , z: 0
        , h: 0
        , n: 0
        , r: 0
    };

    // User defined options
    for (i in options) that.options[i] = options[i];


    that.initSlider();


};


dChart.prototype = {
    initSlider: function() {
        that = this;
        that.start = false;
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

        that.slider.style.left = $px(that.options.a);
        that.slider.style.width = $px(that.options.z - that.options.a);


        that.bindHandler();
    },


    bindHandler: function(){
        that = this;

//        that.handler_right;

//        that.handler_left;

        addEvent(that.handler_right, "mousedown", function(e) {
            that._log("mousedown");

        });
        addEvent(document, "mouseup", function(e) {
            that._log("up");

        });
        addEvent(document, "mousemove",  function(e) {egfweg(e)
        });
        var egfweg = function(event) {
            that._log(event.clientX, event.clientY);
        }
        //todo prevent selection
    },
    getMPos: function(event){
        that = this;

    },

























    prepareData: function() {
        that = this;
        _a = Math.min(that.options.a,that.options.z);
        _z = Math.max(that.options.a,that.options.z);
        that.options.a = _a;
        that.options.z = _z;
    },



























    _log:function (text) {
        var logs = document.createElement("div");
        logs.innerHTML = text;
        document.getElementById("log").appendChild(logs);
    },
}