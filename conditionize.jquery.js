(function($) {
    $.fn.conditionize = function(options){

        var settings = $.extend({
            hideJS: false
        }, options );

        $.fn.showOrHide = function(listenTo, listenFor, listenType, optionType, $section) {
            var listenForitems = listenFor.toString().split(',');

            if (optionType == 'radio' || optionType == 'checkbox') {
                listenTo = listenTo + ':checked';
            }

            if (listenForitems.length > 0) {

                // We have multiple

                if (listenType == 'or') {
                    // Or
                    // Check if element is in array
                    if ($.inArray($(listenTo).val(), listenForitems)) {
                        $section.slideDown();
                    }
                    else {
                        $section.slideUp();
                    }

                } else if (listenType == 'equals') {
                    // Equals
                    // Check if all satisfy the condition
                    var equals = false;
                    listenForitems.forEach(function(entry) {

                        if ($(listenTo).val() == entry) {
                            equals = true;
                        } else {
                            equals = false;
                        }
                    });

                    if (equals) {
                        $section.slideDown();
                    }
                    else {
                        $section.slideUp();
                    }

                } else {

                    // Not equals

                    if ($.inArray($(listenTo).val(), listenForitems) === -1) {
                        $section.slideDown();
                    }
                    else {
                        $section.slideUp();
                    }
                }

            }

        }

        return this.each( function() {
            var $section = $(this);
            var listenTo = "[name='" + $section.data('cond-option') +"']";
            var optionType = $section.data('cond-option-type');
            var listenType = $section.data('cond-type');
            var listenFor = $section.data('cond-value');
            var selector = '';

            switch (optionType) {

                case 'checkbox':
                case 'text':
                case 'email':
                case 'number':
                case 'textarea':
                case 'select':
                case 'radio':
                    selector = '';
                    break;
            }

            //Set up event listener
            $(listenTo + selector).on('change', function() {
                $.fn.showOrHide(listenTo + selector, listenFor, listenType, optionType, $section);
            });
            //If setting was chosen, hide everything first...
            if (settings.hideJS) {
                $(this).hide();
            }
            //Show based on current value on page load
                $.fn.showOrHide(listenTo + selector, listenFor, listenType, optionType, $section);
        });
    }
}(jQuery));

$('.conditional-question').conditionize();
