$(function(){

    /* Переносим правый блок вправо */
    $('.floatblock.center-min,.floatblock.center-middle').before( $('.floatblock.right').show() );
    $('.padding-right').hide();
    /* /Переносим правый блок вправо */

    //активный пункт меню
    $('.menu-top > li').click(function() {
        $(this).parent().find('.selected').removeClass("selected");
        $(this).addClass("selected");
    });

    //чтобы при активном пункте ПОДменю соответсвующий пункт МЕНЮ был неактивным
    $('.catalog-menu li.selected ul li.selected').parent().parent().removeClass('selected');

    /* Стартуем слайдеры */
    if( $(".standart_slider").is(".index_slider") ){
        $.getScript( '/js/lib/jquery.standart_slider.js', function() {

            $('.index_slider').standart_slider({
                timeout:12000,
                time: 400,
                timer:1, /* Включение-выключение перелистывания */
                size:1 /* Количество отображаемых обьектов в окне показов */
            });

        });
    }
    if( $(".standart_slider").is(".tovar_slider") ){
        $.getScript( '/js/lib/jquery.standart_slider.js', function() {

            $('.tovar_slider').standart_slider({
                timeout:12000,
                time: 400,
                timer:1, /* Включение-выключение перелистывания */
                size:1 /* Количество отображаемых обьектов в окне показов */
            });

        });
    }
    /* /Стартуем слайдеры */

    /* placeholder */
    if( $('input[placeholder]', $('input[placeholder]'))  ){
        $.getScript( '/js/lib/jquery.placeholder.js', function() {

            $('input[placeholder], textarea[placeholder]').placeholder();

        });
    }
    /* /placeholder */

    /* Динамическое подключение fancybox */
    if( jQuery("a").is(".fancybox-thumb") ){
        jQuery('head').append("<link rel='stylesheet' type='text/css'  href='/css/fancybox/jquery.fancybox.css'/>"); /* Подключим стили */
        jQuery('head').append("<link rel='stylesheet' type='text/css'  href='/css/fancybox/helpers/jquery.fancybox-thumbs.css?v=1.0.7'/>"); /* Подключим стили */
        jQuery.getScript( '/js/lib/fancybox/jquery.fancybox.js?v=2.1.5', function() {/* Подключим скрипт */
        jQuery.getScript( '/js/lib/fancybox/helpers/jquery.fancybox-thumbs.js?v=1.0.7', function() {/* Подключим скрипт */

                /* Подрубаем галерею */
                jQuery(".fancybox-thumb").fancybox({
                    prevEffect	: 'none',
                    nextEffect	: 'none',
                    helpers	: {
                        title	: {
                            type: 'outside'
                        },
                        thumbs	: {
                            width	: 50,
                            height	: 50
                        }
                    }
                });

                /* Открываем автоматом по id через класс */
                var start_id = window.location.href.indexOf("#");
                if( start_id > 0 ){
                    var id = window.location.href.substring( start_id+1 );
                    jQuery('a.fancybox-thumb.id' + id ).click();
                }

            });
        });
    }
    /* /Динамическое подключение fancybox */

    /* Табы */
    $('.tabs .item').click(function() {
        tab = $(this);
        number_tab = $('.tabs .item').index(tab);

        $('.tabs .item').removeClass("active");
        tab.addClass("active");

        $('.tabs-container .tab').removeClass("active");
        $('.tabs-container .tab').eq(number_tab).addClass('active');
    });
    /* .Табы */

    /* uniform */
    if( $('input[type=checkbox]')  ){ //сделать норм подкл
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.default.min.css'/>");
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.select.css'/>"); //стили select
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.checkbox.css'/>"); //стили checkbox
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.radio.css'/>"); //стили radio
        $.getScript( '/js/lib/jquery.uniform.min.js', function() {

            $('input[type=checkbox]').uniform();
            $('input[type=radio]').uniform();
            $('select').uniform();

        });
    }
    /* /uniform */

});