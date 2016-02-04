(function($) {
    $.fn.clearForm = function() {
        return this.each(function() {
            var type = this.type, tag = this.tagName.toLowerCase();
            if (type == 'text' || type == 'password' || tag == 'textarea')
                this.value = '';
            else if (type == 'checkbox' || type == 'radio')
                this.checked = false;
            else if (tag == 'select')
                this.selectedIndex = -1;
        });
    };

    $.fn.conditionize = function(){

        $.fn.showOrHide = function(listenTo, listenFor, listenType, optionType, $section) {

            var listenForItems = listenFor.toString().split(',');
            var listenToItems = listenTo.toString().split(',');

            if (listenType == 'or') {
                // Or
                // Check if element is in array
                var equals = false;
                listenToItems.forEach(function(listenToItem) {
                    if ($.inArray($(listenToItem).val(), listenForItems) !== -1) {
                        equals = true;
                    }
                });

                if (equals) {
                    $section.slideDown();
                }
                else {
                    $section.slideUp();
                    $section.find(':input').clearForm();
                }

            } else if (listenType == 'equals') {
                // Equals
                // Check if all satisfy the condition
                var equals = true;
                listenToItems.forEach(function(listenToItem) {

                    listenForItems.forEach(function(entry) {

                        if ($(listenToItem).val() == entry && equals) {
                            equals = true;
                        } else {
                            equals = false;
                        }
                    });

                });


                if (equals) {
                    $section.slideDown();
                }
                else {
                    $section.slideUp();
                    $section.find(':input').clearForm();
                }

            } else {

                // Not equals
                // If element is in array - hide
                // Vice versa for OR functionality
                var equals = true;
                listenToItems.forEach(function(listenToItem) {

                    if ($.inArray($(listenToItem).val(), listenForItems) !== -1 && equals) {
                        equals = true;
                    } else {
                        equals = false;
                    }
                });

                if (equals) {
                    $section.find(':input').clearForm();
                    $section.slideUp();
                }
                else {
                    $section.slideDown();
                }

            }

        }

        return this.each( function() {
            var $section = $(this);
            var listenTo = $section.data('cond-option');
            var optionType = $section.data('cond-option-type'); // type, selectbox, checkbox, etc..
            var listenType = $section.data('cond-type'); // or, equals or not_equals
            var listenFor = $section.data('cond-value'); // the value needed

            // listen for all changes
            var listenToALL = listenTo.split(":checked").join("");

            //Set up event listener
            $(document).on('change load', listenToALL, function() {
                $.fn.showOrHide(listenTo, listenFor, listenType, optionType, $section);
            });

            $.fn.showOrHide(listenTo, listenFor, listenType, optionType, $section);
        });
    }
}(jQuery));

