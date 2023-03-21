import $ from 'jquery'

function SettingsMode() {

    $(function () {

        $(".nav-settings").on("click", function () {
            $("#right-sidebar").toggleClass("open");
        });

        $(".settings-close").on("click", function () {
            $("#right-sidebar,#theme-settings").removeClass("open");
        });

        //background constants
        var navbar_classes = "navbar-danger navbar-success navbar-warning navbar-dark navbar-light navbar-primary navbar-info navbar-pink";
        var sidebar_classes = "sidebar-light sidebar-dark";
        var $body = $("body");

        // light mode 
        $("#lightmode").on("click", function () {

            $("#lightLoader").removeClass("sembunyi");
            $("#right-sidebar,#theme-settings").removeClass("open");
            $(".tiles").removeClass("selected");
            $("#lightmode").addClass("selected-light");

            setTimeout(function () {

                document.documentElement.setAttribute("data-theme", "light");

                // jika navbar tidak dipilih 
                $(".navbar").removeClass(navbar_classes);
                $(".navbar").css("background-color", "white");
                $(".tiles.default").addClass("selected");

                // sidebar 
                $body.removeClass(sidebar_classes);
                $body.addClass("sidebar-light");

                // logo
                $("#darklogo").addClass("sembunyi");
                $("#lightlogo").removeClass("sembunyi");

                // body 
                $("body").css("background-color", "#fff");
                $("body").css("background-image", "none");

                // datatables
                $(".dataTables_length select").css("background-color", "white");
                $(".dataTables_length select").css("outline", "1px solid #CED4DA");
                $(".dataTables_length select").css("color", "#CED4DA");
                $(".dataTables_filter input").css("background-color", "white");
                $(".dataTables_filter input").css("border", "1px solid #CED4DA");
                $(".dataTables_filter input").css("color", "black");

                // ikon date 
                $("<style type='text/css'> .form-control::-webkit-calendar-picker-indicator {filter: none}</style>").appendTo("head");

                // react-select 
                // $(".css-1u8z3se-control").attr("style", "background-color: white !important;")

            }, 1000)

            setTimeout(function () {
                localStorage.setItem('conf', 1);
                localStorage.removeItem('confNav');
                $("#lightLoader").addClass("sembunyi");
            }, 2000)
        });

        // dark-mode 
        $("#darkmode").on("click", function () {
            
            $("#lightmode").removeClass("selected-light");
            $("#darkmode").addClass("selected");
            $("#right-sidebar,#theme-settings").removeClass("open");

            setTimeout(function () {
                // config dark mode --------------------------------->

                document.documentElement.setAttribute("data-theme", "dark");

                // sidebar 
                localStorage.setItem('conf', 2)
                $body.removeClass(sidebar_classes);
                $body.addClass("sidebar-dark");

                // navbar 
                localStorage.setItem('confNav', 6)
                $(".navbar").removeClass(navbar_classes);
                $(".navbar").addClass("navbar-dark");
                $(".tiles").removeClass("selected");
                $(".tiles.dark").addClass("selected");

                // logo
                $("#lightlogo").addClass("sembunyi");
                $("#darklogo").removeClass("sembunyi");

                // body 
                $("body").css("background-color", "rgb(27, 26, 32)",);

                // menu icon 
                $('input[type="date"]::-webkit-calendar-picker-indicator ').css("filter", "invert(1)")

                // ikon date 
                $("<style type='text/css'> .form-control::-webkit-calendar-picker-indicator {filter: invert(0.8)}</style>").appendTo("head");

                // react-select 
                // $(".css-b8ldur-Input").css("color", "white")
                // $(".css-1u8z3se-control").attr("style", "background-color: rgb(27, 26, 32) !important; border: none !important")

            }, 1000);
        });

        $(".tiles.success").on("click", function () {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-success");
            $(".tiles").removeClass("selected");
            $(this).addClass("selected");
            localStorage.setItem('confNav', 2)
        });

        $(".tiles.warning").on("click", function () {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-warning");
            $(".tiles").removeClass("selected");
            $(this).addClass("selected");
            localStorage.setItem('confNav', 3)
        });

        $(".tiles.danger").on("click", function () {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-danger");
            $(".tiles").removeClass("selected");
            $(this).addClass("selected");
            localStorage.setItem('confNav', 4)
        });

        $(".tiles.info").on("click", function () {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-info");
            $(".tiles").removeClass("selected");
            $(this).addClass("selected");
            localStorage.setItem('confNav', 1)
        });

        $(".tiles.dark").on("click", function () {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-dark");
            $(".tiles").removeClass("selected");
            $(this).addClass("selected");
            localStorage.setItem('confNav', 6)
        });

        $(".tiles.default").on("click", function () {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-light");
            $(".tiles").removeClass("selected");
            $(this).addClass("selected");
            localStorage.setItem('confNav', 5)
        });
    });

    return (
        null
    );
}

export default SettingsMode;