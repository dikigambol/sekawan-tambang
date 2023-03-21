import $ from 'jquery';

function AktifMenu() {

    // add active class 
    var sidebar = $('.sidebar');

    function addActiveClass(element) {
        var current = window.location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
        if (current === "") {
            $(".nav-item").removeClass("active");
            $(".nav-link").attr("aria-expanded", "false")
            $('.collapse').removeClass('show');
        } else {
            if (element.attr('href').indexOf(current) !== -1) {
                $(".nav-item").removeClass("active");
                $(".nav-link").attr("aria-expanded", "false")
                $('.collapse').removeClass('show');
                element.parents('.nav-item').last().addClass('active');
                element.closest('.collapse').addClass('show');
            }
        }
    }

    $('.nav li a', sidebar).each(function () {
        var $this = $(this);
        addActiveClass($this);
    })
    // end element add active class

    sidebar.on('show.bs.collapse', '.collapse', function () {
        sidebar.find('.collapse.show').collapse('hide');
    });

    return (
        null
    );
}

export default AktifMenu;