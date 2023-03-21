import $ from "jquery";

function CollapseMenu(val) {
    document.getElementById("perwalianNav").classList.add("active");
    document.getElementById("perwalianOpen").classList.add("show");

    var minSc = window.matchMedia("(min-width: 1200px)");
    if (minSc.matches) {
        document.getElementById("chck1").checked = true;
    } else {
        document.getElementById("chck1").checked = false;
    }

    if (minSc.matches && val == "transkrip") {
        $("#menuKanan").addClass("hidden");
        $("#kontenKiri").removeClass("col-xl-9");
        $("#kontenKiri").addClass("col-xl-12");
        $("#iconQ").removeClass("fa-expand");
        $("#iconQ").addClass("fa-compress");
    }

    $("#toogleMenu").on("click", function () {
        var menu = $("#menuKanan");
        if (menu.hasClass("hidden")) {
            menu.removeClass("hidden");
            localStorage.setItem("menu", "open");
            $("#iconQ").addClass("fa-expand");
            $("#iconQ").removeClass("fa-compress");
        } else {
            menu.addClass("hidden");
            localStorage.setItem("menu", "close");
            $("#iconQ").removeClass("fa-expand");
            $("#iconQ").addClass("fa-compress");
        }

        var konten = $("#kontenKiri");
        if (konten.hasClass("col-xl-9")) {
            konten.removeClass("col-xl-9");
            konten.addClass("col-xl-12");
        } else {
            konten.removeClass("col-xl-12");
            konten.addClass("col-xl-9");
        }
    });

    if (localStorage.getItem("menu") == "close") {
        $("#menuKanan").addClass("hidden");
        $("#kontenKiri").removeClass("col-xl-9");
        $("#kontenKiri").addClass("col-xl-12");
        $("#iconQ").removeClass("fa-expand");
        $("#iconQ").addClass("fa-compress");
    } else if (val != "transkrip") {
        $("#menuKanan").removeClass("hidden");
        $("#kontenKiri").addClass("col-xl-9");
        $("#kontenKiri").removeClass("col-xl-12");
        $("#iconQ").addClass("fa-expand");
        $("#iconQ").removeClass("fa-compress");
    }
    return (
        null
    );
}

export default CollapseMenu;