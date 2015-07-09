/*
 * functionalities of progress bar
 * author : Ray Huang
 * dependencies: jquery,jquer-ui
 */

(function($) {

	var progressBar = {
		/*
		 * initialize, load page functionalities
		 */
		init : function() {
			var self = this;
			//configurations
			self.defaultOpt = {
				cls : ".progress",
				valName : "data-value",
				swithEl : ".toolbar select",
				btnEl : ".toolbar input[type='button']",
				max : 100
			};
			
			self.progressBar = $(self.defaultOpt.cls);
			self.renderProgressBar();
			self.renderSwitch();
			self.renderButton();
		},
		/**
		 * render button objects
		 **/
		renderButton : function(){
			var self = this,
				btnEl = $("input[type='button']");
			
			if(btnEl.length == 0) {return;}
				
			btnEl.button();
			btnEl.on("click",function(){
				self.runProgress(this);
			});
		},
		/**
		 * render select component as switch
		 **/
		renderSwitch : function(){
			var self = this,
				swithEl = $(self.defaultOpt.swithEl);
				
			if(swithEl.length == 0) {return;}
		
			swithEl.selectmenu({
				appendTo: $("#overlay"),
				change: function() {
					var switcher = $(this);
					self.progressBar.removeClass("cur");
					self.progressBar.each(function(){
						if(switcher.val() == $(this).attr("id")){
							$(this).addClass("cur");
						}
					});
				}
			});
		},
		/**
		 * render progress bar
		 **/
		renderProgressBar : function() {
			var self = this,
				inital = function (el) {
					var obj = {};
					obj.curEl = $(el);
					obj.curLab = $(".progress-value",obj.curEl);
					obj.curLabVal = parseInt(obj.curLab.attr("data-value"))||0;
					return obj;
				}
			self.progressBar.progressbar({
				max : self.defaultOpt.max,
				create : function() {
					var obj = inital(this);
					obj.curEl.progressbar("value",obj.curLabVal);
				},
				change : function() {
					var obj = inital(this);
					obj.curEl.removeClass("completed");
					obj.curLab.text(parseInt(obj.curLabVal) + "%");
				},
				complete: function() {
					var obj = inital(this);
					obj.curEl.addClass("completed");
					obj.curLab.text(parseInt(obj.curLabVal) + "%");
				}
			});

		},
		/**
		 * operate progress bar
		 * @param, btn, current button
		 **/
		runProgress : function(btn) {
			var self = this,
				button = $(btn),
				curEl = button.closest(".progress-container").find(".progress.cur"),
				curLab = $(".progress-value",curEl),
				curVal = parseInt(curLab.attr("data-value")),
				plusVal = parseInt(button.val()),
				totalVal = curVal + plusVal >= 0 ? curVal + plusVal : 0;
				
			curLab.attr("data-value",totalVal);
			curEl.progressbar("value", totalVal);
		}
	}

	$(function() {
		progressBar.init();
	});
})(jQuery);
