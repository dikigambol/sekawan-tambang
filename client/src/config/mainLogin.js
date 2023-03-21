import $ from 'jquery';

function MainLogin() {
    
    setTimeout(function () {
        var str = $(".form-control").val();
        if (str != null || str != "") {
            $(".form-group").addClass('field--not-empty');
        } else if (str === null) {
            $(".form-group").removeClass('field--not-empty');
        }
    }, 2200)

    var imageUrl = "loginbg.svg";
    $("body").css("background-image", "url(" + imageUrl + ")");

    $(function () {
        'use strict';
        $('.form-control').on('input', function () {
            var $field = $(this).closest('.form-group');
            if (this.value) {
                $field.addClass('field--not-empty');
            } else {
                $field.removeClass('field--not-empty');
            }
        });
    });

    return (
        null
    );
}

export default MainLogin;

