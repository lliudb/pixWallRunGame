selector  = 'canvas_id'
config    = {
    width : 132px,  //宽度
    height: 321px,  //高度
    pix_w : 32,     //像素宽度
    pix_h : 32,     //像素高度
    pix_x : 400,    //横向像素数
    pix_y : 100,    //纵向像素数
}
p_b = {
    x: 12,       //横向位置
    y: 3,        //纵向位置
    color: [42, 32, 112, .5],   //颜色
    cover: [13, 12, 41, .3],    //覆盖
    line: 0x0F,     //边的显示
    select: true,     //选择状态
    show: true      //显示状态
    info: {
        text:'变凸了也变强了',    //文字
        fromId:234,              //来源ID
        imgUrl:'http://domain.com/ingff.jpg' //
    },
};
pixBlock = [
    [p_b0_0, p_b0_1, p_b0_2],
    [p_b1_0, p_b1_1, p_b1_2],
    [p_b2_0, p_b2_1, p_b2_2],
];