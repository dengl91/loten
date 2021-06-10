// custom script

(function($) {
    $(document).ready(function() {

        // data-events

        $('[data-toggle]').on('click', function() {
            $(this).toggleClass('active');
        });

        $('[data-active]').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
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

        $('.tab__item').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
            let index = $(this).index();
            $('.tab__content').removeClass('active');
            $('.tab__content').eq(index).addClass('active');
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
            $('[data-src]').each(function () {
                let target = $(this);
                if ( isOnScreen(target) && !target.hasClass('counted') ) {
                    let src = $(this).data('src');
                    $(this).attr('src', src);
                    target.addClass('counted');
                }
            });
        });

        // custom select

        $('.filter__title').on('click', function() {
            $('.filter__items').not($(this).next()).removeClass('active');
            $(this).next('.filter__items').toggleClass('active');
        });

        $('body').mousedown( function(e) {
            if ( $(e.target).closest('.filter__item').length ) return;
            $('.filter__items').removeClass('active');
        });

        $('.filter__wrapper').on('input', '.filter-range', function() {
            var range = $(this).closest('.filter__item').find('.filter-range').val().split(',');
            $(this).closest('.filter__item').find('.low-value').val(range[0]);
            $(this).closest('.filter__item').find('.high-value').val(range[1]);
        });

        $('[data-modify]').change(function() {
            if ( $('[data-modify]:checked').length == 1 ) {
                let height     = $(this).data('height').split('-');
                let step       = $(this).data('step');
                $('input[name=height]').remove();
                $('[data-for=height]').append('<input type="range" name="height" class="filter-range" multiple value="' + height[0] + ',' + height[1] + '" min="' + height[0] + '" max="' + height[1] + '" step="' + step + '">');
                multirange(document.querySelector('input[name=height]'));
                $('.filter__wrapper').find('.filter-range').trigger('input');
            } else {
                $('input[name=height]').remove();
                $('[data-for=height]').append('<input type="range" name="height" class="filter-range" multiple value="180,2000" min="180" max="2000" step="10">');
                multirange(document.querySelector('input[name=height]'));
                $('.filter__wrapper').find('.filter-range').trigger('input');
            }
        });

        // modal

        $('.modal').mousedown( function(e) {
            if (e.target !== this) return;
            $(this).removeClass('active');
        });

        $('.modal__close').on('click', function() {
            $(this).closest('.modal').removeClass('active');
        });

        // slider
        
        $('.product__gallery').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
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