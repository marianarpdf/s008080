var chatNav = function() {
    var mainSections = TalkChat.mainSections,
        untilTablet = UtilFuncs.untilTablet;

    $(function navInit() {
        var $heyThereIntro = $('.heyThere-intro'),
            $nav = $('#chat-nav'),
            baffleBg = baffle("#btn-bg"),
            baffleTh = baffle("#btn-th"),
            bafflePr = baffle("#btn-pr");

        baffleBg
            .start()
            .text(currentText => mainSections[0]);

        baffleTh
            .start()
            .text(currentText => mainSections[1]);

        bafflePr
            .start()
            .text(currentText => mainSections[2]);


        (function showNav() {
            if($heyThereIntro.css('opacity') > "0.9") { //wtf iphone6, why the fuck you return 0.9999989867210388 on console.
                $('#chat, #theory, #background, #practice').removeClass('jsLoading');
                baffleBg.reveal(400, 750);
                baffleTh.reveal(400, 250);
                bafflePr.reveal(400, 500);
            } else {
                setTimeout(function () {
                    showNav();
                }, 500);
            }
        })();

        function navTranslate(thisId) {
            var navWidth = untilTablet ? 0 : 34, //padding
                padd = 16;
                thisId = thisId || null;

            $nav.children().each(function() {
                if (thisId && $(this).attr('id') == thisId) {
                    return;
                }

                navWidth = untilTablet ? navWidth : navWidth + 24;
                $(this).css({'transform': 'translateX('+navWidth+'px)'});
                navWidth += $(this).width();
            });
        }

        $(document).on('click', '.chatSection.jsOnNav', function(){
            navTranslate( $(this).attr('id') );

            $(this).css({'transform': 'translate(0, 0)'});
            $(this).removeClass('jsOnNav');
            $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                $(this).insertBefore('#chat-nav');
            });
        });

        setTimeout(function () {
            navTranslate();
        }, 1000);
    });
}();
