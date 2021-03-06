(function(){
	var gallery = function() {
		var expandPolaroid = function(e){
			//if not loaded, load larger photo
			if (e.type == 'mouseenter'){
				$(this).css({'position':'absolute','top':'0', 'z-index':1});
				$(this).animate({'height':400});
			} else {
			//	$(this).css({'z-index':0});
				$(this).animate({'height':216}, function(){$(this).removeAttr('style');});
			}
		},
		removePhotos = function(){
				$('.clone, .clone2').fadeOut();
				removeCover();
				$('.photoTag').remove();
		},
		addPolaroid = function(e){
				$(this).addClass('expanded');
				var img = $(this).clone(),
				img2 = img.clone(),
				imgText = "<div class='before'>Before</div>",
				img2Text = "<div class='after'>After</div>";
				img2.attr('src',img.attr('src').replace('.png','old.png'));
				$('body').append(img).append(img2);
				img.click(removePhotos);
				img2.click(removePhotos);
				img.css({'left':($(document).width()/2)+25,
								 'top': $('#logo').height()
				}).addClass('clone');
				img2.css({'left':($(document).width()/2)-579,/*img.width()*/
								  'top': $('#logo').height()
				}).addClass('clone2');
				$(this).data('clone1',img);
				$(this).data('clone2',img2);
		},
		showBeforeText = function(){
			var left = $('img.clone2').css('left');
			var top = $('img.clone2').css('top');
			$('<div style="left:' + left + '; top:' + top + ';" id="cloneBefore" class="photoTag">Before</div>').prependTo($('body'));
		},
		showAfterText = function(){
			var left = $('img.clone').css('left');
			var top = $('img.clone').css('top');
			$('<div style="left:' + left + '; top:' + top + ';" id="cloneAfter" class="photoTag">After</div>').prependTo($('body'));
		},
		showPhotos = function(){
			addCover();
			$(this).data('clone1').fadeIn('slow', showAfterText);
			$(this).data('clone2').fadeIn('slow', showBeforeText);
		},
		addCover = function(){
			$('body').append('<div id="bodyCover" style="width:' + screen.width + 'px;height:' + screen.height + 'px;"></div>');
			$('#bodyCover').css('opacity',0.5);
			$('#bodyCover').click(removePhotos);
		},
		removeCover = function(){
			$('#bodyCover').remove();
		},
    init = function(){
    	$('#photoGallery img').each(addPolaroid);
			$('#photoGallery img').live('click', showPhotos);
    };
    init();
    return { };
  };
  hades.register({'Modules.gallery' : gallery});
}());