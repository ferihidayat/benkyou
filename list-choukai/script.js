$(document).ready(function () {
  // Mendapatkan id dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const inAccess = urlParams.get('access'); // Mengambil nilai parameter 'id' dari URL
  //  <a id="block-${item.id}" style="display: none;">Tutup</a>
  $.ajax({
    url: "https://raw.githubusercontent.com/ferihidayat/choukaifile/main/data.json", // Ubah sesuai dengan URL atau path file JSON Anda
    dataType: "json",
    beforeSend: function () {
      $(".spinner-border").css("display", "block");
    },
    success: function (data) {
      $(".spinner-border").css("display", "none");
      $.each(data.listChoukai, function (index, item) {
        $("#listchoukai").append(`
          <tr>
            <td>${item.nama}</td>
            <td>${item.tingkat}</td>
            <td>${item.jumlah}</td>
            <td class="table-action text-center">
              <a href="choukai/index.html?access=` + inAccess + `&id=${item.id}" id="accessbutton-${item.id}" style="display: none;" class="btn btn-primary">Buka</a>
              <a onclick="setFocusToInput()" href="javascript:void(0);" id="blockbutton-${item.id}" style="display: none;">Masukan Kode</a>
            </td>
          </tr>
        `);

        if (inAccess && (inAccess === "masteradmin" || inAccess === "user")) {
          $("#accessbutton-" + item.id).show();
          $("#blockbutton-" + item.id).hide();
        } else {
          $("#accessForm").show();
          $("#accessbutton-" + item.id).hide();
          $("#blockbutton-" + item.id).show();
        }
      });
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
    }
  });

});

// Daftar nama website untuk setiap halaman
const websiteNames = {
  index: "Feri Hidayat - List Choukai",
};

// Mendapatkan halaman saat ini
const currentPage = window.location.pathname.split("/").pop().replace(".html", "");

// Mengganti judul dan nama website sesuai dengan halaman saat ini
document.getElementById("website-title").textContent = websiteNames[currentPage];
document.getElementById("website-name").textContent = websiteNames[currentPage];