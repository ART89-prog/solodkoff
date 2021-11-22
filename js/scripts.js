$(() => {

	$('.open-books-popup').click(function(e) {
		e.preventDefault()
		
		$.fancybox.open({
			src  : "#modal_book",
			type : 'inline',
			opts : {
				touch: false,
				speed: 300,
				autoFocus : false,
				i18n : {
					'en' : {
						CLOSE : 'Закрыть'
					}
				}
			}
		})
	});


	// Копирование промокода
	const clipboard = new ClipboardJS('.copy_btn')

	clipboard.on('success', (e) => {
		$(e.trigger).addClass('copied')

		setTimeout(() => {
			$(e.trigger).removeClass('copied')
		}, 3000)

		e.clearSelection()
	})


	new ClipboardJS(".js-btn-clipboard").on("success", function(e) {

	});

	$(".js-btn-clipboard").click(function(e) {
		var val = $(this).data("after-text");
		$(this).text(val);
		$(this).addClass("btn-success").removeClass("btn-red");
	});


	// Моб. меню
	$('header .menu_btn').click((e) => {
		e.preventDefault()

		$('header .menu_btn').toggleClass('active')
		$('header .menu_modal').toggleClass('show')
	})


	$('body').on( "click", '.like_btn:not(.active)', function(e) {
		e.preventDefault();
		if($('.dislike_btn').hasClass("active"))
		{
			return false;
		}
		id = $(this).data("id");
		counts = Number($(this).find("span").text())+1;

		var rating = {
		  'id': id,
		  'type' : 0
		};		
		
		iterator = true;
		if($.cookie('ratings'))
		{
			var ratings =  JSON.parse($.cookie('ratings'));		
			ratings.forEach(function(item, i, ratings) {
				if(item.id==rating.id)
				{					
					item.type = 0;
					iterator = false;
				}
			});					
			
			if(iterator)
			{
				ratings.push(rating);
			}

			var json_ratings = JSON.stringify(ratings);
			$.cookie('ratings', json_ratings, { expires: 360, path: '/' });
		}
		else
		{
			var ratings = [];		
			ratings.push(rating);
			var json_ratings = JSON.stringify(ratings);
			$.cookie('ratings', json_ratings, { expires: 360, path: '/' });
		}	

		$(this).find("span").text(counts);
		$(".dislike_btn").removeClass("active");
		$(this).addClass("active");

		// обновление произвольного поля AJAX

		var dataForAjax="action=my_action3&count="+counts+"&id="+id;
		var addressForAjax = myajax.url;	

		$.ajax({
			type:'POST',
			data:dataForAjax,
			url:addressForAjax,
			success: function(response){				
					
			}		
		});


	})


	$('body').on( "click", '.dislike_btn:not(.active)', function(e) {
		e.preventDefault();
		if($('.like_btn').hasClass("active"))
		{
			return false;
		}
		id = $(this).data("id");
		counts = Number($(this).find("span").text())+1;

		var rating = {
		  'id': id,
		  'type' : 1
		};
		
		iterator = true;
		if($.cookie('ratings'))
		{
			var ratings =  JSON.parse($.cookie('ratings'));		
			ratings.forEach(function(item, i, ratings) {
				if(item.id==rating.id)
				{					
					item.type = 1;
					iterator = false;
				}
			});					
			
			if(iterator)
			{
				ratings.push(rating);
			}

			var json_ratings = JSON.stringify(ratings);
			$.cookie('ratings', json_ratings, { expires: 360, path: '/' });
		}
		else
		{
			var ratings = [];		
			ratings.push(rating);
			var json_ratings = JSON.stringify(ratings);
			$.cookie('ratings', json_ratings, { expires: 360, path: '/' });
		}	

		$(this).find("span").text(counts);
		$(".like_btn").removeClass("active");
		$(this).addClass("active");

		// обновление произвольного поля AJAX
		var dataForAjax="action=my_action4&count="+counts+"&id="+id;
		var addressForAjax = myajax.url;	

		$.ajax({
			type:'POST',
			data:dataForAjax,
			url:addressForAjax,
			success: function(response){				
					
			}		
		});
	})



})

function changeFunc(i) {
	    if(i==1)
	    {
	    	console.log(i);
	    }
	}

function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
}