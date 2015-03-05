/**
 * @author A1exandr Belikh
 * @email zimovchanin@gmail.com
 * @description Простое всплывающее окно
 *
 * Создан 27.02.2014 Позволит создавать всплывающие окна для форм и т.п. ( 0JHQtdC70YvRhSDQkNC70LXQutGB0LDQvdC00YAg0KHQtdGA0LPQtdC10LLQuNGHIHppbW92Y2hhbmluQGdtYWlsLmNvbQ== )
 */
jQuery.fn.standart_window = function(options){
	var options = jQuery.extend({
		show_close:true,
		show_shadow:true,
		show:true,
		absolute:true /* Позволит спозиционировать абсолютно и реагировать на прокрутку, помогает избегать проблем с большими блоками */
	},options);

	return this.each(function() {
		var $this = jQuery(this);
		var $close = $this.find('.close');
		var $body = $this.find('.window_body'),
            $popupOverflower = $this.find('.window-popup-overflower');

		if( options.show ){
			$this.addClass('show');
		} else {
			$this.removeClass('show');
		}

		if( options.show_close ){
			$close.addClass('show');
		} else {
			$close.removeClass('show');
		}

		/* Сначала фиксируем блок вверх */
		$this.css( { position:"fixed" , left:0 , top:0 } );
		//$body.css( { "margin-top":0 } );

		/* Скрытие */
		$close.click(function(){
			$this.removeClass('show');
		});

        /* Скрытие при клике на темную область*/
        $popupOverflower.click(function(){
            $close.trigger('click');
        });

		/* Центрируем и позиционируем абсолютно */
		var resize_body = function(){
			var offset = $this.offset();
			var top_value = parseInt((jQuery(window).height()-$body.height())/2);
			if( top_value < 0 ){
				top_value = 20;
			}
			$this.animate( { "top":top_value } , 300 );
			//$body.animate( { "margin-top":parseInt((jQuery(window).height()-$body.height())/2) } , 300 );
			if( options.absolute ){
				setTimeout(function(){
					offset = $this.offset();
					$this.css( { position:"absolute" , left:offset.left , top:offset.top } );
				},350);
			}
		};
		resize_body();
	});
};
/* d5b8675f7f6f9cfa7c296c91eb970dd2 */