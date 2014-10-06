/**
 * @author Alexandr Belikh
 * @email zimovchanin@gmail.com
 */
jQuery.fn.standart_slider = function(options){
	var options = jQuery.extend({
        viewport: 'viewport', /* Окно показа слайдов */
		list: 'overflower', /* Лист слайдов */
		item: 'item', /* Сами слайды */
		to_left: 'to_left', /* Кнопка в лево */
		to_right: 'to_right', /* Кнопка в право */
		show_hide_block: 'show_hide_block', /* (Блок для акций и т.п.) Открывать этот блок в случае если в слайде есть скрытое поле options.show_hide_checker со значением 1 */
		show_hide_checker: 'show_hide_checker', /* Включатель скрытого блока */
		buttons:'buttons', /* Блок для кнопок */
		button:'btn', /* Кнопки */
		selected:'selected', /* Каким классом выделять кнопки */
		time: 400, /* Время на перелистывание в милисекундах */
		timeout:10000, /* Время между перелистыванием */
		timer:1, /* Включение-выключение перелистывания */
		size:1, /* Количество отображаемых обьектов в окне показов */
        type: 'scroll_horiz', /* тип анимации слайдера (scroll_horiz - горизонатальная прокрутка, fade - затухание) */
        action: 'click', /*по какому событию будут срабатывать кнопки перелистывания (напр,'click, mouseover') */
        resize: 0 /*резиновый слайдер*/
	},options);

	return this.each(function() { /* Пробегаемся по каждому слайдеру */
		var $this = $(this),
            current_item = 1,
            $viewport = $this.find('.' + options.viewport);

		/* Фиксируем размер листа */
		var $button = $this.find('.' + options.buttons + ' .' + options.button),
            $list = $this.find('.' + options.list),
            $item = $list.find('.' + options.item),
            item_cnt = $item.size(),
            sigma_indents = parseInt($item.css('marginRight'), 10) + parseInt($item.css('marginLeft'), 10) + parseInt($item.css('paddingRight'), 10) + parseInt($item.css('paddingLeft'), 10),
            item_width = ($viewport.width() - (options.size - 1) * sigma_indents ) / (options.size);

        $item.width(item_width);
        $list.width((item_width + sigma_indents)*(item_cnt+1));

		/* Убираем / Показываем специальный слой */
		var $block = $this.find('.' + options.show_hide_block),
            $first_block_checker = $item.first().find('.' + options.show_hide_checker);

        //для резинового слайдера пересчитываем величины
        if ( options.resize == 1) {
            $( window ).resize(function() {
                //item_width = $item.width() + parseInt($item.css('marginRight'), 10) + parseInt($item.css('marginLeft'), 10) + parseInt($item.css('paddingRight'), 10) + parseInt($item.css('paddingLeft'), 10);
                item_width = ($viewport.width() - (options.size - 1) * sigma_indents ) / (options.size);
                $item.width(item_width);
                $list.width((item_width + sigma_indents)*(item_cnt+1));
                $list.css('left', -(current_item - 1) * (item_width + sigma_indents));
            });
        }

        //ф-я выбора анимации
        function animateType(){
            if ( options.type == 'scroll_horiz') {
                $list.animate({left: -(current_item - 1) * (item_width + sigma_indents)}, options.time);
            } else if ( options.type == 'fade' ) {
                $list.find('.' + options.item + '.' + options.selected).removeClass(options.selected).animate({opacity: 0}, options.time);
                $item.eq(current_item-1).addClass(options.selected).animate({opacity: 1}, options.time);
            }
        }

        animateType();
        // для нормальной анимации в ie8
        if ( options.type == 'fade' ){
            $item.css('opacity', 0);
        }

		if( $first_block_checker.val() == 1 ){
			$block.show();
		} else {
			$block.hide();
		}
		/* перемотка */
		var $left = $this.find('.' + options.to_left);
		var $right = $this.find('.' + options.to_right);
		
		/* Выделяем первый */
		$button.removeClass(options.selected);
		$button.first().addClass(options.selected);
		
		$left.click(function(event){
			if( options.timer )
				clearInterval(cicle);
			
			event.preventDefault();
			if( current_item == 1 ){
				current_item = item_cnt-options.size+1;// Зацикливаем
			} else {
				current_item--; // 
			}
			
			$button.removeClass(options.selected);
			jQuery($button.eq(current_item-1)).addClass(options.selected);

            animateType();

			if( $item.eq(current_item-1).find('.' + options.show_hide_checker).val() == 1 ){
				$block.show();
			} else {
				$block.hide();
			}
			
			if( options.timer )
				cicle = setInterval( interval ,options.timeout);
		});
		$right.click(function(event){
			if( options.timer )
				clearInterval(cicle);
		
			event.preventDefault();
			if( current_item == item_cnt-options.size+1 ){
				current_item = 1;// Зацикливаем
			} else {
				current_item++; // 
			}
			
			$button.removeClass(options.selected);
			jQuery($button.eq(current_item-1)).addClass(options.selected);

            animateType();

			if( $item.eq(current_item-1).find('.' + options.show_hide_checker).val() == 1 ){
				$block.show();
			} else {
				$block.hide();
			}
			
			if( options.timer )
				cicle = setInterval( interval ,options.timeout);
		});
		
		var interval = function(){
			if( current_item == item_cnt-options.size+1 ){
				current_item = 1;// Зацикливаем
			} else {
				current_item++; // 
			}
			$button.removeClass(options.selected);
			jQuery($button.eq(current_item-1)).addClass(options.selected);

            animateType();
		};
		
		var cicle;
		if( options.timer )
			cicle = setInterval( interval ,options.timeout);

        $button.bind(options.action, function(e){
            if( options.timer )
                clearInterval(cicle);
            current_item = $button.index(this)+1;
            $button.removeClass(options.selected);
            jQuery($button.eq(current_item-1)).addClass(options.selected);

            $list.stop();
            animateType();

            if( options.timer )
                cicle = setInterval( interval ,options.timeout );
        });
		
	});
};