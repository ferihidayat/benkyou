// Mendapatkan id dari URL
const urlParams = new URLSearchParams(window.location.search);
const idFromUrl = urlParams.get('id'); // Mengambil nilai parameter 'id' dari URL
var inAccess = localStorage.getItem("inAccess");
if (idFromUrl == null || inAccess == null) {
  window.location.href = "../index.html";
}

// Mengambil data dari localStorage
if (inAccess === "masteradmin" || inAccess === "user") {
  $(document).ready(function () {

    $.ajax({
      url: "https://raw.githubusercontent.com/ferihidayat/choukaifile/main/data.json",
      dataType: "json",
      beforeSend: function () {
        $(".spinner-border").css("display", "block");
      },
      success: function (data) {
        $(".spinner-border").css("display", "none");

        data.listChoukai.forEach(function (list) {
          if (list.id === idFromUrl) {
            list.soal.forEach(function (choukai) {
              // Mengambil audio
              if (list.access === true) {
                if (inAccess === "masteradmin") {
                  $('#result').append(`<script> var index = "${list.nama}";</script>
                  <div class="col-12">
                    <div class="card d-block">
                      <div class="card-body position-relative">
                        <div class="row mb-0">
                          <div class="col-1">
                            <h3 class="mt-0 ml-2 text-center">${choukai.id}</h3>
                          </div>
                          <div class="col-11">
                            <audio style="width: 100%;" controls>
                              <source src="${choukai.audio}" type="audio/mpeg">
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        </div>
                      </div>
                      <ul class="nav nav-tabs nav-bordered mb-3">
                            <li class="nav-item">
                              <a href="#mondaiJP${choukai.id}" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                Gambar
                              </a>
                            </li>
                            <li class="nav-item">
                              <a href="#pembahasanJP${choukai.id}" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                Pembahasan
                              </a>
                            </li>
                          </ul> <!-- end nav-->
                          <div class="tab-content">
                            <div class="tab-pane show active" id="mondaiJP${choukai.id}">
                            <a href="${choukai.mondai}"><img class="card-img-top" src="${choukai.mondai}" alt="Choukai Image"></a>
                            </div> <!-- end preview-->

                            <div class="tab-pane p-3" id="pembahasanJP${choukai.id}">
                            <h5 style="font-family:Calibri,sans-serif"><span
                          style="font-family:&quot;Yu Gothic Medium&quot;,sans-serif">${choukai.text}</span></h5>
                            <strong>Kosakata</strong><br>
                              <h5 style="font-family:Calibri,sans-serif"><span
                          style="font-family:&quot;Yu Gothic Medium&quot;,sans-serif">${choukai.kotoba}</span></h5>
                            <strong style="font-family:Calibri,sans-serif"><span
                          style="font-family:&quot;Yu Gothic Medium&quot;,sans-serif">Jawaban : ${choukai.jawaban}</span></strong>
                            </div> 
                          </div> 
                    
                    
                    </div>
                  </div>
              `);
                } else if (inAccess === "user") {
                  $('#result').append(`<script> var index = "${list.nama}";</script>
                 <div class="col-12">
                  <div class="card d-block">
                    <div class="card-body position-relative">
                      <div class="row mb-0">
                        <div class="col-1">
                          <h3 class="mt-0 ml-2 text-center">${choukai.id}</h3>
                        </div>
                        <div class="col-11">
                          Audio dibatasi admin
                        </div>
                      </div>
                    </div>
                    <a href="${choukai.mondai}"><img class="card-img-top" src="${choukai.mondai}" alt="Choukai Image"></a> 
                  </div>
                </div>
              `);
                } else if (inAccess === null) {
                  window.location.href = "../index.html";
                }
              } else {
                window.location.href = "../index.html";

              }
            });
          }
        });
      },
      error: function (xhr, status, error) {
        console.log("Error: " + error);
      }
    });
  });
} else {
  window.location.href = "../index.html";
}