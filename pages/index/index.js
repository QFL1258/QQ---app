 //index.js
//获取应用实例
Page({
    /*最新上架*/
    getroostlist:function(){
      var roostlist=this.data.roostlist;
      var that=this;
       /*加载动画*/
      wx.showLoading({
        title: '加载数据中......', 
      });
      setTimeout(function(){
        //卸载加载动画效果
        wx.hideLoading();
        /*像服务器请求数据*/
        wx.request({
          url: 'http://127.0.0.1:3000/roost',
          success: (res) => {
            //  console.log(res);
            that.setData({
              roostlist: res.data
            })
          }
        })
      }, 500);
    },
    /*本月热销*/
    getsell:function(){
      var sell=this.data.sell;
      wx.request({
        url: 'http://127.0.0.1:3000/sell',
        success:(res)=>{
          // console.log(res)
         this.setData({
           sell:res.data
         })
        }
      })
    },
    /*热销总榜*/
    getwell:function(){
      //加载下一页数据
      //1:获取二个数值 pno pageSize
     
      var pageCount=this.data.pageCount;
      var pno = this.data.pno + 1;
      var pageSize = this.data.pageSize;
      var well=this.data.well;
     
      wx.request({
        url: 'http://127.0.0.1:3000/well?',
        data: { pno, pageSize },
        success:(res)=>{
          var rows = this.data.well.concat(res.data.data);
          this.setData({
            well:rows,
            pno:pno,
            pageCount:res.data.pageCount,
          });
            if(pno>pageCount){
              wx.showLoading({
                title: '没有更多数据了',
              })
              setTimeout(function(){
                wx.hideLoading();
              },1000)
              return;
            }
            //显示加载动画效果
            wx.showLoading({
              title: '加载数据中......',
            });
            //卸载加载动画效果
            setTimeout(function () {
              wx.hideLoading();
            }, 500);
        }
      })
    },
    /*活动说明*/
    point:function(){
      wx.showModal({
        title: 'QQ音乐',
        content: `1、小程序内购买的数字专辑奖计入数字专辑总销量;
                  2、数字专辑虚弥商品，购买后不支持退款退货；
                  3、因微信小程序平台支付规范限制，暂不支持ios用户在小程序内购买数字专辑等虚弥物品，请前往QQ音乐APP购买并赠送;`,
        showCancel:false,
      })
    },
    /*跳转页面*/ 
    skip:function(){
      wx.navigateTo({
        url: '/pages/skip/skip',
      })
    },
    /*播放音乐*/
    play_music:function(e){
     var nid=e.currentTarget.dataset.nid;
     console.log(nid)
      var isp=this.data.isPlaying;
      if(isp){
        wx.pauseBackgroundAudio();
        this.setData({isPlaying:false})
      }else{
        wx.playBackgroundAudio({
          dataUrl:`http://127.0.0.1:3000/img/最新上架/${nid}.mp3`,
        })
        this.setData({isPlaying:true})
      } 
    },
    handle1: function (e) {
      console.log(e.currentTarget.dataset.id)
      var id = e.currentTarget.dataset.id
      //console.log(id)
      wx.navigateTo({
        url: '/pages/general/general?id='+id,
      })
    },
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    roostlist:[],
    sell:[],
    well:[],
    pno: 0,//页码
    pageCount:1,
    pageSize: 5,//页大小
    isPlaying:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*轮播图*/ 
    wx.request({
      url: 'http://127.0.0.1:3000/imagelist',
      success: (res) => {
        // console.log(result);
       this.setData({
         list:res.data
       })
      }
    })
    this.getroostlist();
    this.getsell();
    this.getwell();
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