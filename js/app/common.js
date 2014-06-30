$(function(){

    //активный пункт меню
    $('.menu-top > li').click(function() {
        $(this).parent().find('.selected').removeClass("selected");
        $(this).addClass("selected");
    });

    /* Стартуем слайдеры */
    if( $(".standart_slider").is(".catalog_slider") ){
        $.getScript( '/js/lib/jquery.standart_slider.js', function() {

            $('.catalog_slider').standart_slider({
                viewport: 'viewport',
                item: 'item',
                timeout:12000,
                time: 400,
                timer:1, /* Включение-выключение перелистывания */
                size:1 /* Количество отображаемых обьектов в окне показов */
            });

        });
    }
    /* /Стартуем слайдеры */

});