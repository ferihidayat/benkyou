$(document).ready(function () {
    $.getJSON('https://raw.githubusercontent.com/ferihidayat/choukaifile/main/app.json', function (data) {
        var app = data.app[0];
        var carousel = $('#carouseldata');
        var kategoriList = $('#kategoriList');
        var fiturList = $('#fiturList');
        var fiturCard = $('#fiturCard');
        var designer = $('#designer');
        var webtitle = $('#web-title');
        var web = $('#website-title');
        var deskripsi = $('#deskripsi');
        var copyright = $('#copyright');

        copyright.append(`©` + new Date().getFullYear() + ` ${app.nama}.Design and coded by ${app.author}`);
        deskripsi.append(`${app.deskripsi}`);
        web.append(`${app.nama} ` + `- ` + index);
        webtitle.append(` <a class="navbar-brand" href="${app.link}">${app.nama}</a>`);
        designer.append(` <div class="col-3">
                <div class="img-fluid text-center">
                  <img class="img-fluid profile-img" src="${app.icon}" alt="">
                </div>
              </div>
              <div class="col-9">
                <div class="profile"> <a class="profile" href="#">${app.author}.</a> </div>
                <div class="frelance">
                  Content Creator, Web Developer, UI / UX Designer
                </div>
                <div class="btn-group mb-1"> <a href="${app.youtube}" class="btn btn-primary light px-3" target="_blank"><i class="fab fa-youtube"></i></a>
                  <a href="${app.facebook}" class="btn btn-primary light px-3" target="_blank"><i
                      class="fab fa-facebook"></i></a>
                  <a href="${app.instagram}" class="btn btn-primary light px-3" target="_blank"><i
                      class="fab fa-instagram"></i></a>
                  <a href="${app.github}" class="btn btn-primary light px-3" target="_blank"><i
                      class="fab fa-github"></i></a>
                  <a href="${app.github}" class="btn btn-primary light px-3"><i
                      class="fa fa-user"></i></a>
                </div>
              </div>`);

        $.ajax({
            url: "https://raw.githubusercontent.com/ferihidayat/choukaifile/main/app.json", // Ubah sesuai dengan URL atau path file JSON Anda
            dataType: "json",
            success: function (data) {
                $.each(app.carousel, function (index, item) {
                    carousel.append(`
                    <div class="carousel-item ${item.active}">
                        <img class="d-block carousel-img-filter img-fluid img-fill" src="${item.gambar}"
                            alt="First slide">
                        <div class="carousel-caption d-block d-md-block">
                            <a href="#" type="button" class="btn btn-primary">学ぼう</a>
                        </div>
                        </div>
                `);

                });
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
            }
        });
        $.ajax({
            url: "https://raw.githubusercontent.com/ferihidayat/choukaifile/main/app.json", // Ubah sesuai dengan URL atau path file JSON Anda
            dataType: "json",
            beforeSend: function () {
                $(".spinner-border").css("display", "block");
            },
            success: function (data) {
                $(".spinner-border").css("display", "none");
                $.each(app.fitur, function (index, item) {
                    fiturCard.append(`
                   <div class="col">
                        <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">${item.nama}</h5>
                        </div>
                        <div class="card-body">
                            <img class="border-radius-1 img-fluid" src="${item.icon}" alt="Card image cap">
                        </div>
                        <div class="card-footer d-sm-flex justify-content-between align-items-center">
                            <div class="card-footer-link mb-1 mb-sm-0">
                            <p class="card-text text-dark d-inline">
                                <td class="py-2"><span class="badge badge-warning">Proses<span
                                    class="ms-1 fa fa-check"></span></span> </td>
                            </p>
                            </div>
                            <a href="${item.link}" class="btn btn-primary">Go</a>
                        </div>
                        </div>
                    </div>
                `);

                });
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
            }
        });
        $.ajax({
            url: "https://raw.githubusercontent.com/ferihidayat/choukaifile/main/app.json", // Ubah sesuai dengan URL atau path file JSON Anda
            dataType: "json",
            beforeSend: function () {
                $(".spinner-border").css("display", "block");
            },
            success: function (data) {
                $(".spinner-border").css("display", "none");
                $.each(app.fitur, function (index, item) {
                    fiturList.append(`
                    <tr class="btn-reveal-trigger">
                    <td class="py-2">${item.id}</td>
                    <td class="py-2">${item.nama}</td>
                    <td class="py-2"><span class="badge badge-warning">Proses<span class="ms-1 fa fa-check"></span></span></td>
                    <td class="py-2 text-end">
                        <a href="${item.link}" class="btn btn-primary light me-1 px-3">
                        <i class="fa fa-eye m-0"></i>
                        </a>
                    </td>
                    </tr>
                `);

                });
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
            }
        });

        $.ajax({
            url: "https://raw.githubusercontent.com/ferihidayat/choukaifile/main/app.json", // Ubah sesuai dengan URL atau path file JSON Anda
            dataType: "json",
            beforeSend: function () {
                $(".spinner-border").css("display", "block");
            },
            success: function (data) {
                $(".spinner-border").css("display", "none");
                $.each(app.kategori, function (index, item) {
                    kategoriList.append(`<a href="${item.link}" class="btn btn-outline-primary m-1">${item.nama}</a>`);

                });
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
            }
        });

    });
});