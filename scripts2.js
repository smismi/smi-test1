testtest = function(id, options, callback) {
    var _id = id;
    var _callback = callback;

    var idd = bindHandlers($(_id));

    function bindHandlers(obj_id) {
        obj_id.onclick = function(e){
            e = fixEvent(e);
            callback();
//            e.stopPropagation()
        };

    }
    function _log(text) {
        var logs = document.createElement("div");
        logs.innerHTML = text;
        document.getElementById("log").appendChild(logs);
    };

    function callback() {
        alert(this.state.a + " " + this.state.z);
    };
};