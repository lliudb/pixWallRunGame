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

        that.__config   = {
            'image' : config.image_url,
            'width' : config.width,
            'height': config.height,
            'pix_x' : config.pix_x,
            'pix_y' : config.pix_y,
            'pix_w' : config.width / config.pix_x,
            'pix_h' : config.height / config.pix_y,
            'frames': config.frames || 60,
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
            //startRender();

            return that;
        }


        var getImageSrc = function(){
            that.__image = new Image();
            that.__image.src = that.__config.image;
            that.__image.onload = function(){
                console.log(that.__cxt.drawImage(that.__image, 0, 0));
                var data = that.__cxt.getImageData(0, 0, that.__image.width, that.__image.height);

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
        that.render = function(){
            //清空当前画布内容
            clearCanvas();
            //根据当前数据渲染绘制界面
            for(var x = 0; x < that.__Data.length; x++){
                var x_items = that.__Data[x];
                for(var y = 0; y < x_items.length; y++){

                }
            }
        }


        return that;
    }

    $w.pixGame = pix_game;

})( window)
