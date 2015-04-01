/**
 * @author Serega K.
 * @description Виджет сбора номера телефона и URL страницы, на которой находится клиент
 * version: 0.0.3
 *
 */
jQuery.fn.standart_widgetPhone = function(options){

	var options = jQuery.extend({
		popupTimer: 45000, // таймер ,по истечении которого автоматически вызовется попап
		widgetTimer: 4000, // таймер ,по истечении которого появится виджет
		cookieTimer: 1 // таймер действия куки (в сутках)
	},options);

	return this.each(function() {

        var widgetPhone = $(this), //виджет
            widgetPhonePopup = widgetPhone.find('.widget-phone-popup'), //контейнер с содержимым попапа
            widgetPopupOpenFlag = false; // определяет, был ли открыт попап хотя бы 1 раз

        //показываем виджет через 5 сек после загрузки страницы
        setTimeout(function(){
            widgetPhone.stop().fadeIn(450);
        },options.widgetTimer);

        //клик по виджету
        widgetPhone.click(function() {
            showWidgetPhonePopup(); //вызываем попап
        });

        //Если не установлена кука и попап еще не открывали вручную, то запускаем попап через 45 сек после загрузки страницы
        if( $.cookie('widget_phone_popup_show') != 'false' ){
            setTimeout(function(){

                if (!widgetPopupOpenFlag){
                    showWidgetPhonePopup(); //вызываем попап
                }

            },options.popupTimer);
        }

        //ф-я вызова попапа виджета
        function showWidgetPhonePopup(){
            widgetPopupOpenFlag = true;
            widgetPhone.stop().fadeOut(250);

            //устанавливаем куку, чтоб сутки не запускался больше попап авоматически
            $.cookie('widget_phone_popup_show', 'false', {
                expires: options.cookieTimer,
                path: '/' //чтобы кука была доступна на всем сайте
            });


            if($('.widget-phone-popup').size() > 0){
                //случай, когда виджет встраивается не средствами netcat

                Message('<div class="widget-phone-popup-container"></div>');
                $('.widget-phone-popup-container').append(widgetPhonePopup.clone().show());

                //устанавливаем значение скрытого инпута раваным урлу страницы
                $('.window.message input[name=url_page]').val(window.location.href);

                $('.window.message .close').bind( "click", function() {
                    widgetPhone.stop().fadeIn(450);
                });

            } else {
                //случай, когда виджет встраивается как компонент netcat
                $('body').standart_load({
                    force:1,
                    data:{
                        window:1,
                        url_page:window.location.href
                    },
                    url:'/json/widget-phone/',
                    func:function(data){/* Обработчик ответа */
                        var sc_ = '';
                        if(data['script']) {
                            sc_ = data['script'];
                            delete data['script'];
                        }
                        for( i in data ) {
                            jQuery(i).html(data[i]);
                        }
                        eval(sc_);
                        $('.window .close').bind( "click", function() {
                            widgetPhone.stop().fadeIn(450);
                        });
                    }
                });
            }

        }

	});
};
