(function ($) {

    $.fn.groupCollapse = function (options) {
        options = options || {};
        var el = this;
        var settings = $.extend({
            expanded: true,
            target: '',
            iconTarget: '',
        }, el.data(), options);

        var targetElement = $(settings.target);
        var iconTargetElement = $(settings.iconTarget);

        init();

        el.click(function() {
            toggle();
            return false;
        });

        function init() {
            if (settings.expanded) {
                targetElement.animate({
                    height: 'show',
                    opacity: 'show'
                }, {
                    duration: 0
                });
                iconTargetElement.removeClass('fa-rotate-90');
            } else {
                targetElement.animate({
                    height: 'hide',
                    opacity: 'hide'
                }, {
                    duration: 0
                });
                iconTargetElement.addClass('fa-rotate-90');
            }
        }

        function toggle() {
            if (settings.expanded) {
                close();
            } else {
                open();
            }
            settings.expanded = !settings.expanded;
        }

        function open() {
            targetElement.animate({
                height: 'show',
                opacity: 'show'
            }, {
                duration: 'fast'
            });
            iconTargetElement.removeClass('fa-rotate-90');
        }

        function close() {
            targetElement.animate({
                height: 'hide',
                opacity: 'hide'
            }, {
                duration: 'fast'
            });
            iconTargetElement.addClass('fa-rotate-90');
        }

    };

    $('[data-toggle="group-collapse"]').groupCollapse();

}(jQuery));