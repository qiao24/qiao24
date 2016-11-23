$(function() {

	//获取歌曲列表
	var player = new Player();
	getMusicData();
	$(".next img").on("click", function() {
		player.nextPlay();
	});
	$(".pre img").on("click", function() {
		player.prePlay();
	});
	$(".stop img").on("click", function() {
		player.changePlay();
	});
	$(".range").mousedown(function() {
		player.flag = false;
	});
	$(".range").mouseup(function() {
		player.flag = true;
	});
	/*进度条显示*/
	player.rangeFollow();
	/*player.changeRange();*/
	var slide = window.slide || {};
	slide = {
		touch: function(option) {
			var defaul = {
				page_box: "",
				page_slide: ""
			}
			$.extend(defaul, option);

			var page_box = defaul.page_box;
			var page_slide = defaul.page_slide;

			var touchStartX, touchEndX, moveX;
			var num = 0;
			var page_slide_size = $(page_slide).size();
			$(page_box).on("touchstart", page_slide, function(e) {
				touchStartX = e.touches[0].clientX;
			}).on("touchmove", page_slide, function(e) {
				touchEndX = e.touches[0].clientX;
				moveX = touchEndX - touchStartX;
			}).on("touchend", page_slide, function() {
				var _this = $(this);
				console.log(_this)
				if (moveX > 0) {
					if (touchStartX < 100) {
						if (_this.prev(page_slide).hasClass("toLeft")) {
							_this.prev(page_slide).removeClass("toLeft").addClass("toRight").removeClass("hide")

							_this.on("webkitAnimationEnd", function() {
								_this.off("webkitAnimationEnd");
							})
						} else {
							_this.prev(page_slide).addClass("toRight").removeClass("hide")

							_this.on("webkitAnimationEnd", function() {
								_this.off("webkitAnimationEnd");
							})
						}
					}


				} else if (moveX < 0) {
					if (_this.prev(page_slide).hasClass("toRight")) {
						_this.prev(page_slide).removeClass("toRight").addClass("toLeft")
						_this.on("webkitAnimationEnd", function() {
							_this.off("webkitAnimationEnd");
						})
					}

				}


			})
		}
	}

	//调用传参
	slide.touch({
		page_box: ".page_box",
		page_slide: ".page_slide"
	})


	function getMusicData() {
			//alert("0000")
			$.getJSON("pbl.json", function(data) {
				$("#musicList").html("");
				var p = new Player();
				var musicNum = data.length;
				$("#musicNum").html(musicNum);
				for (var i = 0; i < musicNum; i++) {
					var $li = $("<li data-icon=" + data[i].img + ">");
					if (i == 0) {
						$li = $li.addClass("active");
					}

					$li.unbind("click").bind("click", function() {
						//siblings() 方法返回被选元素的所有同级元素。
						$(this).removeClass("active").addClass("active").siblings().removeClass("active");
						p.autoplay($(this));
					})

					var $span = $("<span data-href='" + data[i].src + "'>" + data[i].musicName + "&nbsp;" + data[i].name + "</span>");

					p.autoplay($(".musicList li.active"));

					$li.append($span);
					$(".page_slide2 ul").append($li);
				}
			})
		}
		/* 1、获取audio对象this.audio
		   2、自动播放this.aotuPlay
		   3、下一首this.nextPlay
		   4、上一首this.prePlay
		   5、改变图片this.changeImg
		   6、改变滑块位置this.rangeFollow
		   7、显示播放时间this.showTime
		   9、boolean变量this.flag = true;*/
})

function Player() {
		this.audio = $(".music");
		this.autoplay;
		this.nextPlay;
		this.prePlay;
		this.changeImg;
		//this.delMusic;
		this.rangeFollow;
		this.showTime;
		this.flag = true;
	}
	Player.prototype = {
		//自动播放
		autoplay: function($li) {
			this.li = $li;
			$li.addClass('active').siblings().removeClass('active');
			var _this = this;
			this.url = $li.children("span:first-child").data("href");
			this.audio.attr("src", this.url);
			this.audio[0].load();
			this.audio[0].play();
			var imgs = $li.data("icon"); //图片
			$('.peoImg img').attr("src", imgs)
		},
		prePlay: function(e) {
			var li = $("#musicList li.active");
			if (li.index() == 0) {
				li = $("#musicList li").last();
			} else {
				li = li.prev();
			}

			this.autoplay(li);
		},
		nextPlay: function(e) {
			var li = $("#musicList li.active");
			if (li.index() == 9) {
				li = $("#musicList li").first();
			} else {
				li = li.next();
			}
			this.autoplay(li);
		},
		changePlay: function(flag) {
			if (this.audio[0].paused) {
				this.audio[0].play();
				$(".stop img").attr("src", "img/left/stop.png")
			} else {
				this.audio[0].pause();
				$(".stop img").attr("src", "img/play.png");
			}
		},
		rangeFollow: function(flag) {
			var This = this;
			this.audio[0].ontimeupdate = function() {
				if (This.flag) {
					$(".range").attr("max", This.audio[0].duration);
					if (parseInt(this.duration) == parseInt(this.currentTime)) {
						This.nextPlay();
					}
					var t = this.currentTime;
					This.showTime(t);
				}
			}
		},
		showTime: function(time) {
			$(".range").val(time);
			$("#showTime").text(check(parseInt(time / 60 % 60)) + ":" + check(parseInt(time) % 60));
		}/*,
		changeRange: function() {
			var This = this;
			$(".range").change(function() {
				This.audio[0].currentTime = this.value;
				This.showTime($(this).val());
			})
		}*/
	}

	function check(t) {
		if (t < 10) return t = "0" + t;
		else return t;
	}