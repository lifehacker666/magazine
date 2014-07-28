$(function(){

    /* Переносим правый блок вправо */
    $('.floatblock.center-min,.floatblock.center-middle').before( $('.floatblock.right').show() );
    $('.padding-right').hide();
    /* /Переносим правый блок вправо */


    /* Активный пункт меню */
    $('.menu-top > li').click(function() {
        $(this).parent().find('.selected').removeClass("selected");
        $(this).addClass("selected");
    });
    /* /Активный пункт меню */


    /* Чтобы при активном пункте ПОДменю соответсвующий пункт МЕНЮ был неактивным */
    $('.catalog-menu li.selected ul li.selected').parent().parent().removeClass('selected');


    /* Стартуем слайдеры */
    if( $(".standart_slider").is(".index_slider") ){
        $.getScript( '/js/lib/jquery.standart.slider.js', function() {

            $('.index_slider').standart_slider({
                timeout:12000,
                time: 400,
                timer:1, /* Включение-выключение перелистывания */
                size:1, /* Количество отображаемых обьектов в окне показов */
                type: 'scroll_horiz'
            });

        });
    }
    if( $(".standart_slider").is(".tovar_slider") ){
        $.getScript( '/js/lib/jquery.standart.slider.js', function() {

            $('.tovar_slider').standart_slider({
                timeout:12000,
                time: 400,
                timer:1, /* Включение-выключение перелистывания */
                size:1, /* Количество отображаемых обьектов в окне показов */
                type: 'scroll_horiz'
            });

        });
    }
    /* /Стартуем слайдеры */


    /* placeholder */
    if( $('input').attr('placeholder') ||  $('textarea').attr('placeholder') ) {
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
    /* /Табы */


    /* uniform */
    if(  $('input[type=checkbox]')  ){ //checkbox
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.default.min.css'/>");
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.checkbox.css'/>"); //стили checkbox
        $.getScript( '/js/lib/jquery.uniform.min.js', function() {

            $('input[type=checkbox]').uniform();

        });
    }
    if(  $('input[type=radio]')  ){ //radio
//        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.default.min.css'/>");
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.radio.css'/>"); //стили radio
        $.getScript( '/js/lib/jquery.uniform.min.js', function() {

            $('input[type=radio]').uniform();

        });
    }
    if( $('select').is('.uniform') ){ //select
//        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.default.min.css'/>");
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.select.css'/>"); //стили select
        $.getScript( '/js/lib/jquery.uniform.min.js', function() {

            $('select.uniform').uniform();

        });
    }
    /* /uniform */


    /* selectik */
    if( $('select').is('.selectik') ){
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/selectik.css'/>");
        $.getScript( '/js/lib/jquery.mousewheel.js', function() {
            $.getScript( '/js/lib/jquery.selectik.min.js', function() {

                $('select.selectik').selectik({maxItems: 8, minScrollHeight: 20});

            });

        });
    }
    /* /selectik */


    /* Slider-range с возможностью вводить значения */
    /* НЕ ЗАБЫТЬ:
    подставить перед document.ready условия, проверяющие, заданы ли параметры слайдера range через php, либо подставляющие дефолтные значения
    ( они здесь находятся внизу файла) */
    if( $('div').is('.slider-range')  ){
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/jquery-ui.css'/>");
        $.getScript( '/js/lib/jquery-ui.min.js', function() {
            var slider_range, input_value_1, input_value_2;

            // параметры, задаваемые пользователем в инпутах
            input_value_1 = $( ".slider_range_input_values.input_value1" );
            input_value_2 = $( ".slider_range_input_values.input_value2" );
            if( input_value_1.val() != "" )
                slider_range_val1 = input_value_1.val();
            if(input_value_2.val() != "" )
                input_value_2 = input_value_2.val();

            slider_range = $( ".slider-range" ).slider({
                range: true,
                min: slider_range_min,
                max: slider_range_max,
                values: [ slider_range_val1, slider_range_val2 ],
                step: slider_range_step,
                slide: function( event, ui ) { //cобытие происходит на каждое движении мыши, при перетаскивании рукоятки ползунка

                    stepRange( parseInt(ui.values[ 0 ]),  parseInt(ui.values[ 1 ]), slider_range_max);
                },
                stop: function( event, ui ) { //событие происходит в момент завершения перетаскивания рукоятки ползунка.

                    stepRange( parseInt(ui.values[ 0 ]),  parseInt(ui.values[ 1 ]), slider_range_max);

                }
            });

            //дефолтные значения цены у input-ов
            input_value_1.val( slider_range_val1 );
            input_value_2.val( slider_range_val2 );

            inputRestriction(input_value_1);
            inputRestriction(input_value_2);

            // при вводе значения в инпут 1 проверять, боьше, либо равно оно значению в инпуте 2
            input_value_1.change(function(){

                var val1 = parseInt($(this).val());
                var val2 = parseInt(input_value_2.val());
                var stepRangeVal = Math.max(Math.round( slider_range_max * 0.05 ), 1); //вычисление минимального расстояния, которое остается между бегунками
                if( val2 - val1 < stepRangeVal ){
                    val2 = Math.min(val1 + stepRangeVal, slider_range_max);
                    val1 = val2 - stepRangeVal;
                    input_value_1.val(val1);
                    input_value_2.val(val2);
                }
                slider_range.slider({ values: [ val1, val2 ] });

            });

            // при вводе значения в инпут 2 проверять, меньше, либо равно оно значению в инпуте 1
            input_value_2.change(function(){

                var val1 = parseInt(input_value_1.val());
                var val2 = parseInt($(this).val());
                var stepRangeVal = Math.max(Math.round( slider_range_max * 0.05 ), 1); //вычисление минимального расстояния, которое остается между бегунками
                if( val2 - val1 < stepRangeVal ){
                    val1 = Math.max(val2 - stepRangeVal, 0);
                    val2 = val1 + stepRangeVal;
                    input_value_1.val(val1);
                    input_value_2.val(val2);
                }
                slider_range.slider({ values: [ val1, val2 ] });

            });

            //ф-я позволяющая вводить в инпут только цифры
            function inputRestriction (item){
                item.keypress(function(event){
                    if( (event.which >57 || event.which < 48) && event.which != 8 )
                        event.preventDefault();
                })
                    .change(function(){
                        input_value_1.val(input_value_1.val());
                        input_value_2.val(input_value_2.val());
                    });
            }

            function stepRange(val1, val2 ,max) {

                var stepRangeVal = Math.max(Math.round( max * 0.05 ), 1); //вычисление минимального расстояния, которое остается между бегунками

                if( val2 - val1 < stepRangeVal ){
                    val2 = Math.min( val1 + stepRangeVal, max );
                    val1 = val2 - stepRangeVal;
                }

                // записываются значения бегунков в input-ы цены "от ... до"
                input_value_1.val( val1 );
                input_value_2.val( val2 );
                slider_range.slider({ values: [ val1, val2 ] });
            }
        });
    }
    /* /Slider-range с возможностью вводить значения */


    /* scrollbar */
    if( $('div').is('.content-with-scroll') ){
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/jquery.scrollbar.css'/>");
        $.getScript( '/js/lib/jquery.scrollbar.min.js', function() {

            $('.content-with-scroll').scrollbar();

        });
    }
    /* /scrollbar */


    /* кнопка Наверх */
    $(function() {
        $('body').append('<div class="toTop">НАВЕРХ</div>');
        $(window).scroll(function() {
            if($(this).scrollTop() != 0) {
                $('.toTop').fadeIn();
            } else {
                $('.toTop').fadeOut();
            }
        });

        $('.toTop').click(function() {
            $('body,html').animate({scrollTop:0},500);

        });
    });
    /* /кнопка Наверх */


    /* свернуть-развенуть */
    $('.parametr.block').find('.checkbox-container').removeClass('expand').hide();
    $('.see-all').html('Показать всё');
//    по умолчанию показываем только 4 пункта у каждой характеристики


    $('.parametr.block').each(function(index) {
        for (var i = 0; i <= 3; i++) {
            $(this).find('.checkbox-container').eq(i).show();
        }
    });

    $('.see-all').click(function() {  // при клике на "Показать всё"
        if ( $(this).hasClass('expand')){
            $(this).parent().find('.checkbox-container').hide();
            for (var i = 0; i <= 3; i++) {
                $(this).parent().find('.checkbox-container').eq(i).show();
            }
            $(this).removeClass('expand');
            $(this).html('Показать всё');
        }else{
            $(this).parent().find('.checkbox-container').show();
            $(this).addClass('expand');
            $(this).html('Свернуть');
        }
    });
    /* /свернуть-развенуть */

});


/* условия, проверяющие, заданы ли параметры слайдера range через php, либо подставляющие дефолтные значения */
if( slider_range_val1 == null )
    var slider_range_val1 = 7500;

if( slider_range_val2 == null )
    var slider_range_val2 = 24000;

if( slider_range_min == null )
    var slider_range_min = 0;

if( slider_range_max == null )
    var slider_range_max = 32000;

if( slider_range_step == null )
    var slider_range_step = 50;
/* /условия, проверяющие, заданы ли параметры слайдера range через php, либо подставляющие дефолтные значения */