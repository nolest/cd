//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    word: ['金', '蝉', '脱', '壳'],
    empty: 1,
    choose: ['虫', '禅', '蜂', '蛹', '蚕', '水', '经', '银', '蝉', '合', '豆', '鸡', '婵', '龙', '鸡'],
    correct : 8,
    show_wrong_fade : 0
  },
  //事件处理函数
  onLoad: function () {
    let that = this;
    app.get_window_info(this, { pic_cal: [750, 422] });
    that.random_3();
    return
    app.ready(
      function (res) {
        //本地缓存sessionId

        //that.fetch();
        console.log(res);
      },
      function (res) {
        //报错
      });
  },
  random_3() {
    let that = this;
    let vector = [];
    vector.push(that.random_color(that.data.choose.length));
    vector.push(that.random_color(that.data.choose.length));
    vector.push(that.random_color(that.data.choose.length));
    that.setData({
      vector: vector
    })
  },
  random_color(x,index) {
    let that = this;
    let count = x;
    let color = [];
    for (let i = 0; i < count; i++) {
      color.push(Math.floor(Math.random() * 255))
    }
    return color
  },
  fetch() {
    let that = this;
    wx.showLoading({
      title: '发送中',
    })
    app.util.xh_request({
      url: app.globalData.domain + app.globalData.version + '/type/wechat/all',
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          fetch: res.data
        })
      },
      fail: function (res) {
        console.log(res);

      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  choose(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    console.log(e);
    if (that.data.correct != index){
      that.setData({
        show_wrong_fade : 1
      })
    }
    else{
      wx.showModal({
        title: 'yes!',
        content: '岩左！',
        showCancel : false
      })
    }
  },
  close(){
    let that = this;
    that.setData({
      show_wrong_fade: 0
    })
  }
})
