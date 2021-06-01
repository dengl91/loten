// custom script

(function($) {
    $(document).ready(function() {

        // data-events

        $('[data-toggle]').on('click', function() {
            $(this).toggleClass('active');
        });

        $('[data-control]').on('click', function() {
            let target = $(this).data('control');
            $('.' + target).toggleClass('active');
        });

        $('[data-nav]').hover(function() {
            $('.megamenu').addClass('active');
            let index = $(this).index();
            $('.megamenu__content').eq(index).addClass('active').siblings().removeClass('active');
        }, function() {
            $('.megamenu').removeClass('active');
        });

        $('[data-bg]').each(function() {
            let bg_img = $(this).data('bg');
            $(this).css('background-image', 'url(' + bg_img + ')');
        });

        $('.menu-btn').on('click', function() {
            $('body').toggleClass('unscroll');
        });

        $('.megamenu__mobile').on('click', function() {
            let index = $(this).index();
            $('.megamenu__content').eq(index).addClass('active').siblings().removeClass('active');
        });

        // Lazy and counters

        $(window).scroll( function() {
            $('[data-count]').each(function () {
                let target = $(this);
                if ( isOnScreen(target) && !target.hasClass('counted') ) {
                    countUp(target);
                    target.addClass('counted');
                }
            });
            $('[data-width]').each(function () {
                let target = $(this);
                if ( isOnScreen(target) && !target.hasClass('counted') ) {
                    setWidth(target);
                    target.addClass('counted');
                }
            });
            $('[data-src]').each(function () {
                let target = $(this);
                if ( isOnScreen(target) && !target.hasClass('counted') ) {
                    let src = $(this).data('src');
                    $(this).attr('src', src);
                    target.addClass('counted');
                }
            });
        });

        function countUp(target) {
            let defaultCount = parseFloat(target.text());
            let totalCount = target.data('count');
            let increaser = Math.floor(totalCount / 20);
            defaultCount = defaultCount + increaser;
            if ( totalCount >= defaultCount ) {
                target.text(parseFloat(defaultCount).toFixed());
                setTimeout(() => {
                    countUp(target);
                }, 100);
            } else {
                return;
            }
        }

        // Animation

        let keywords = {
            ac: "active",
            fi: "animate__fadeIn",
            bi: "animate__bounceIn",
            fir: "animate__fadeInRight",
            fiu: "animate__fadeInUp",
            fil: "animate__fadeInLeft",
            fid: "animate__fadeInDown",
            ri: "animate__rotateIn",
            riur: "animate__rotateInUpRight",
            sid: "animate__slideInDown",
            sil: "animate__slideInLeft",
            sir: "animate__slideInRight",
            siu: "animate__slideInUp",
            zi: "animate__zoomIn",
            jitb: "animate__jackInTheBox",
        };

        $(window).scroll( function() {
            $('.animate__animated').each(function () {
                let target = $(this);
                for (const key in keywords) {
                    if ( isOnScreen(target) && target.hasClass(key)) {
                        target.addClass(keywords[key]);
                    }
                }
            });
        });

        function isOnScreen(elem) {
            if ( elem.length == 0 ) {
                return;
            }
            var $window = $(window)
            var viewport_top = $window.scrollTop()
            var viewport_height = $window.height()
            var viewport_bottom = ( viewport_top + viewport_height ) * 1.1
            var $elem = $(elem)
            var top = $elem.offset().top
            var height = $elem.height()
            var bottom = top + height
        
            return (top >= viewport_top && top < viewport_bottom) ||
            (bottom > viewport_top && bottom <= viewport_bottom) ||
            (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
        }

    });
})( jQuery );