jQuery(document).ready(function(){

    var $container = $('.tetris');
    var delim = 4;
    if(Modernizr.mq('screen and (max-width: 770px)')) {
        delim = 3;
    }
    if (Modernizr.mq('screen and (max-width: 440px)')){
        delim = 2;
    }

    $container.isotope({
        layoutMode: 'packery',
        itemSelector: '.tetris__item',
        packery: {
            columnWidth: $container.width() / delim
        }
    });

    var wwidth = $('html').width();

    var t = moment();
    var time = t.tz("Europe/Warsaw").format("H:mm");
    var tel = $(".map__block__time span");
    tel.text(time);

    setInterval(function(){
        var time = moment().tz("Europe/Warsaw").format("H:mm");
        tel.text(time);
    },10000);

    localStorage.clear();

    $('.mfi').on("click",function () {
        var el = $(this);
        var d = el.find('.tetrisQuestions__item__popup').html();
        console.log(d);
        $.magnificPopup.open({
            items: {
                src: d,
                type: 'inline'
            },
            type: 'inline',
            closeBtnInside: true,
            removalDelay: 300,
            mainClass: 'zoom-in'
        })
    });

    $('.js-work').on("click",function(e){
        e.preventDefault();
        var current = $('.curr');
        if(!$(".work").hasClass('curr')) {
            $('.work').addClass('curr');

            if($('.mobile__overlay').hasClass('opened')) {
                $('.mobile__overlay').removeClass('opened')
            }

            current.stop().fadeOut(400, function () {
                $('.loaderGal').stop().fadeIn(400, function () {
                    $(".work").show();
                    $container.isotope('layout');
                    $(window).trigger("resize");
                    $('.wFooter').show();
                    setTimeout(function(){
                        $('.loaderGal').stop().fadeOut();
                    },400);
                });

            });
            current.removeClass('curr');
        }
    });

    $('.js-about').on("click",function(e){
        e.preventDefault();
        var current = $('.curr');
        if(!$(".about").hasClass('curr')) {
            $('.about').addClass('curr');

            if($('.mobile__overlay').hasClass('opened')) {
                $('.mobile__overlay').removeClass('opened')
            }

            current.stop().fadeOut(400, function () {
                $('.loaderGal').stop().fadeIn(400, function () {
                    $(".about").show();
                    $('.wFooter').show();
                    setTimeout(function(){
                        $('.loaderGal').stop().fadeOut();
                    },400);
                });

            });
            current.removeClass('curr');
        }
    });

    $('.js-contacts').on("click",function(e){
        e.preventDefault();
        if(!$(".map").hasClass('curr')) {
            $('.map').addClass('curr');
            $('.wFooter').hide();

            if($('.mobile__overlay').hasClass('opened')) {
                $('.mobile__overlay').removeClass('opened')
            }

            $(".work").fadeOut(400,function(){
                $('.loaderGal').stop().fadeIn(400,function(){
                    $(".map").show();

                    if($("#map").length){
                        initMap();
                        codeAddress();

                    }
                    setTimeout(function(){
                        $('.loaderGal').stop().fadeOut();
                    },400);
                });
            });
            $('.work').removeClass("curr");
        }
    });

    $('.js-dropdown').on("click",function(){
        var el = $(this);

        if($('.js-dropdown').not(this).hasClass("droped")) {
            var el2 = $('.js-dropdown.droped');
            if(el != el2) {
                el2.children(".js-list").stop().fadeOut();
                el2.removeClass("droped");
            }
        }

        if(el.hasClass('droped')) {
            el.children(".js-list").stop().fadeOut();
            el.removeClass("droped");
        } else{
            el.children(".js-list").stop().fadeIn();
            el.addClass("droped");
        }
    });

    $('.js-burger').on('click',function(){
        $('.mobile__overlay').addClass("opened");
    });
    $('.js-menu-close').on("click",function(){
        $('.mobile__overlay').removeClass("opened");
    });
    $('.js-contact-form').on('click',function(){
        $('.contactform').addClass("opened");
        $('.mobile__overlay').removeClass("opened");
    });
    $('.js-contform-close').on("click",function(){
        $('.contactform').removeClass("opened");
    });


    $(window).resize(function(){
        wwidth = $('html').width();

        var $container = $('.tetris');
        delim = 4;
        if(Modernizr.mq('screen and (max-width: 770px)')) {
            delim = 3;
        }
        if (Modernizr.mq('screen and (max-width: 440px)')){
            delim = 2;
        }

        $container.isotope({
            packery: {
                columnWidth: $container.width() / delim
            }
        });
        setTimeout(function () {
            $container.isotope('layout');
        },150);
    });

    $(".loader").addClass("anim");
    $(".loaderLogo").addClass("anim");
    var ajax = false;

    // $(window).on("scroll",function(){
    //     var gallery = $(".loaderGallery").is(':visible');
    //
    //     if(!gallery) {
    //         var winH = $(window).height();
    //         var tet = $('.tetris');
    //
    //         var offset = tet.offset();
    //         var top = offset.top;
    //         var bottom = top + tet.outerHeight();
    //         var pos = $(document).scrollTop();
    //
    //         if((pos+winH + 50 > bottom) && !ajax) {
    //             ajax = true;
    //             var $newItems = $('<div class="tetris__item tetris__vertical"><img src="images/image2.jpg"><span>This is Sparta!!!</span></div>');
    //             $container.append( $newItems ).isotope( 'appended', $newItems );
    //             //ajax = false;
    //         }
    //     }
    // });

    $('.map__block__form__row input, .map__block__form__row textarea').on('blur',function(){
        var el = $(this);

        if(el.val().length > 0) {
            el.addClass("upper");
        } else{
            el.removeClass("upper");
        }

    });

    function correct(el){
        el.addClass("correct");
        el.removeClass("error");
        el.next().next("b").html("&#10004;");
        el.next().next("b").removeAttr("style");
    }

    function error(el){
        el.addClass("error");
        el.removeClass("correct");
        el.next().next("b").html("!");
        el.next().next("b").css("fontWeight",700);
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $("body").on('keyup',".js-mask-name",function(){
        var el = $(this);
        if ( el.val().match('^[a-zA-Z]{3,16}$') ) {
            correct(el);
        } else {
            error(el);
        }
    });

    $("body").on('keyup',".js-mask-length",function(){
        var el = $(this);
        var count = parseInt(el.data('length'));
        if ( el.val().match('^.{'+count+',}$') ) {
            correct(el);
        } else {
            error(el);
        }
    });

    $("body").on('keyup',".js-mask-email",function(){
        var el = $(this);
        if ( validateEmail(el.val()) ) {
            correct(el);
        } else {
            error(el);
        }
    });

    $("body").on("click",".js-submit",function(){
        var el = $(this);
        var form = el.closest('.js-form');
        form.find('input,textarea').trigger("keyup");
        var errs = 0;

        $.each(form.find('input,textarea'),function(index,el){
            if ($(el).hasClass("error")) errs++;
        });

        if(errs == 0) {
            console.log('ajax');
        } else{
            console.log('errs');
        }
    });

    $('.map__block__form input + span,.map__block__form textarea + span').on('click',function(){
        var el = $(this);
        el.prev('input,textarea').trigger("focus");
    });

    $(window).load(function(){
        $(window).trigger("resize");
        setTimeout(function() { $(".loaderbg").fadeOut(); }, 400);
        $(".tetris").lightGallery({
            autoplay:false,
            zoom:false,
            download:false
        });
    });


});