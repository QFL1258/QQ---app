// pages/bd/bd.js
Page({
  gd: function () {
    var height = this.data.height;
    var qw = this.data.qw;
    //console.log(this.data.qw)
    if (this.data.qw == "展开全文") {
      this.setData({
        height: null,
        qw: "收起全文",
      })
    } else {
      this.setData({
        height: 150,
        qw: "展开全文",
      })
    }
  },
  getzb: function () {
    var pid = this.data.id;
    //console.log(pid)
    wx.request({
      url: 'http://127.0.0.1:3000/zb?',
      data: { pid },
      success: (res) => {
        //console.log(res.data)
        this.setData({
          list: res.data,
        })
      }
    })
  },
  getcx: function () {
    var nid = this.data.id;
    wx.request({
      url: 'http://127.0.0.1:3000/cx?',
      data: { nid },
      success: (res) => {
        //console.log(res.data)
        this.setData({
          cx: res.data,
        })
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    cx: [],
    id: "",
    qw: "展开全文",
    height:150,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id)
    var id = options.id;
    //console.log(id)
    this.setData({
      id: id
    })
    this.getzb();
    this.getcx();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})