import $ from 'jquery';

function TriggerMode() {
    $(function () {
        var $body = $("body");
        var sidebar_classes = "sidebar-light sidebar-dark";
        var navbar_classes =
            "navbar-danger navbar-success navbar-warning navbar-dark navbar-light navbar-primary navbar-info navbar-pink";

        // jika dark mode 
        if (localStorage.getItem("conf") != 1) {

            document.documentElement.setAttribute("data-theme", "dark");

            // logo
            $("#lightlogo").addClass("sembunyi");
            $("#darklogo").removeClass("sembunyi");

            // sidebar
            $body.removeClass(sidebar_classes);
            $body.addClass("sidebar-dark");
            $(".sidebar-bg-options").removeClass("selected");
            $("#darkmode").addClass("selected");

            // navbar
            if (localStorage.getItem("confNav") == null) {
                $(".navbar").removeClass(navbar_classes);
                $(".navbar").addClass("navbar-dark");
                $(".tiles").removeClass("selected");
                $(".tiles.dark").addClass("selected");
            }

            // body 
            $("body").css("background-image", "none");
            $("body").css("background-color", "rgb(27, 26, 32)");

            // react-select 
            $(".css-b8ldur-Input").css("color", "white")
            $(".css-1u8z3se-control").attr("style", "background-color: rgb(27, 26, 32) !important; border: none !important")
        }

        // jika light mode 
        else {

            document.documentElement.setAttribute("data-theme", "light");

            // logo
            $("#darklogo").addClass("sembunyi");
            $("#lightlogo").removeClass("sembunyi");

            // jika navbar tidak dipilih 
            if (localStorage.getItem("confNav") == null) {
                $(".navbar").removeClass(navbar_classes);
                $(".navbar").css("background-color", "white");
                $(".tiles.default").addClass("selected");
            }

            // sidebar 
            $(".sidebar-bg-options").removeClass("selected");
            $("#lightmode").addClass("selected-light");

            // body 
            $("body").css("background-image", "none");
            $("body").css("background-color", "#fff");

            $(".css-1u8z3se-control").attr("style", "background-color: white !important;")
        }


        // navbar konfigurasi ----------------------------------------------->
        if (localStorage.getItem("confNav") == 2) {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-success");
            $(".tiles").removeClass("selected");
            $(".tiles.success").addClass("selected");
        }

        if (localStorage.getItem("confNav") == 3) {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-warning");
            $(".tiles").removeClass("selected");
            $(".tiles.warning").addClass("selected");
        }

        if (localStorage.getItem("confNav") == 4) {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-danger");
            $(".tiles").removeClass("selected");
            $(".tiles.danger").addClass("selected");
        }

        if (localStorage.getItem("confNav") == 1) {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-info");
            $(".tiles").removeClass("selected");
            $(".tiles.info").addClass("selected");
        }

        if (localStorage.getItem("confNav") == 6) {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-dark");
            $(".tiles").removeClass("selected");
            $(".tiles.dark").addClass("selected");
        }

        if (localStorage.getItem("confNav") == 5) {
            $(".navbar").removeClass(navbar_classes);
            $(".navbar").addClass("navbar-light");
            $(".tiles").removeClass("selected");
            $(".tiles.default").addClass("selected");
        }
    });

    return (
        null
    );
}

export default TriggerMode;