;(function($,$w){

    var pix_game = function(content, config){
        //
        var that = this;
        //对象
        that.content = content;
        //
        that.__canvas   = document.getElementById(content)
        that.__cxt      = that.__canvas.getContext("2d");



        return that;
    }

    $w.pixGame = pix_game;

})(JQuery, window)
