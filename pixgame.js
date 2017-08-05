;(function($w){


    var pix_game = function(selector, config, data, template){
        //
        var that = this;
        //对象选择器,模板选择器
        that.selector = selector;
        that.template = template;
        //pix数据
        that.__Data = data;
        that.__image;
        that.__imageData = [];

        that.__config   = {
            'image' : config.image_url,
            'width' : config.width,
            'height': config.height,
            'pix_x' : config.pix_x,
            'pix_y' : config.pix_y,
            'pix_w' : config.width / config.pix_x,
            'pix_h' : config.height / config.pix_y,
            'frames': config.frames || 60,
            'trans_v': config.trans_v || 255
        };

        var getBP  = function (x, y, info){
            return {
                x: x,       //横向位置
                y: y,        //纵向位置
                color: [42, 32, 112, .5],   //颜色
                cover: [13, 12, 41, .3],    //覆盖
                line: 0x00,     //边的显示
                select: false,     //选择状态
                show: true,      //显示状态
                info: info,
            };
        }

        that.init = function(){
            that.__canvas   = document.getElementById(that.selector)
            that.__cxt      = that.__canvas.getContext("2d");

            that.__canvas.width      = that.__config.width;
            that.__canvas.height     = that.__config.height;

            //获取图片内容
            getImageSrc();
            //渲染绘图区域
            startRender();

            return that;
        }

        var anplizeImageData = function(img, w, h){
            var temp = img.data;
            var x = that.__config.trans_v;
            for(var i = 0; i < h; i++){
                var line_data = [];
                if ( i%2 == 1){
                    continue;
                }
                for(var j = 0; j < w; j++) {
                    var index = i*4*w + j*4;
                    if ( j%2 == 1 ){
                        continue;
                    }
                    var llen = line_data.length;
                    line_data[llen] = {
                        r: temp[index],
                        g: temp[index+1],
                        b: temp[index+2],
                        a: (temp[index+3]/255)
                    };
                }
                var len = that.__imageData.length;
                that.__imageData[len] = line_data;
            }
            console.log(that.__imageData);
        }

        var getImageSrc = function(){
            that.__image = new Image();
            that.__image.src = that.__config.image;
            that.__image.onload = function(){
                that.__cxt.drawImage(that.__image, 0, 0)
                console.log(that.__image.width, that.__image.height);
                var data = that.__cxt.getImageData(0, 0, that.__image.width, that.__image.height);
                console.log(data.data, data.data.length, data.data[0]);
                anplizeImageData(data, that.__image.width, that.__image.height);
            };
        }

        /**
         * 开启帧刷新
         */
        var startRender = function(){
            that.frameRender = undefined;
            that.frameRender = setInterval(function(){
                that.render();
            }, 1000/that.__config.frames);
        }

        /**
         * 关闭帧刷新
         */
        var stopRender = function(){
            clearInterval(that.frameRender);
            console.log("已关闭帧刷新");
        }

        /**
         * 清空画布方法
         */
        var clearCanvas = function(){
            that.__cxt.clearRect(0, 0, that.__config.width, that.__config.height);
        }

        /**
         * 单帧渲染地图原件
         */
        that.i = 0;
        that.render = function(){
            //清空当前画布内容
            clearCanvas();
            that.i = (that.i+1)%60;
            //根据当前数据渲染绘制界面
            for(var j = 0; j < that.__imageData.length; j++){
                if (j%that.i == that.i-1){
                    continue;
                }
                var items = that.__imageData[j];
                for(var i = 0; i < items.length; i++){
                    var item = items[i];
                    if( i%that.i == that.i-1){
                        continue;
                    }
                    that.__cxt.beginPath(i*4, j*4);
                    that.__cxt.fillRect(i*4, j*4, 3, 3);
                    //that.__cxt.arc(i*4, j*4, 2, 0, Math.PI * 2, true);
                    that.__cxt.closePath();
                    that.__cxt.fillStyle = "rgba("+item.r+","+item.g+","+item.b+","+1+")";
                    that.__cxt.fill();
                }
            }
        }


        return that;
    }

    $w.pixGame = pix_game;

})( window)
