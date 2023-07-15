$(document).ready(function () {
  $.getJSON("https://raw.githubusercontent.com/darkgray1981/kanjiquizbot/master/quizzes/jlpt_n5.json",
    function (data) {
      var questions = data.deck;
      var answeredQuestions = []; // Menyimpan indeks pertanyaan yang sudah dijawab
      var score = 0; // Skor jawaban

      function getRandomQuestion() {
        var randomIndex = Math.floor(Math.random() * questions.length);
        // Memastikan pertanyaan yang sama tidak ditampilkan kembali
        while (answeredQuestions.includes(randomIndex)) {
          randomIndex = Math.floor(Math.random() * questions.length);
        }
        answeredQuestions.push(randomIndex);
        return questions[randomIndex];
      }

      function displayQuestion() {
        var questionData = getRandomQuestion();
        var question = questionData.question; // Pertanyaan saat ini
        $('#question').text(question); // Menampilkan pertanyaan
      }

      function translateQuestion(comment) {
        var apiUrl = "https://api.mymemory.translated.net/get?q=" + comment +
          "&langpair=en|id";
        $.ajax({
          url: apiUrl,
          type: 'GET',
          dataType: 'json',
          success: function (data) {
            if (data && data.responseData && data.responseData.translatedText) {
              var translatedComment = data.responseData.translatedText;
              $('#comment-list').prepend('<li><h4 class="m-2">' +
                translatedComment +
                '</h4></li> <hr class="m-0">');
              scrollToBottom(); // Scroll ke bawah
            } else {
              $('#comment-list').prepend(
                '<h4 class="m-2"><li>Pertanyaan tidak tersedia</li></h4>');
            }
          },
          error: function () {
            $('#comment-list').prepend('<h4 class="m-2"><li>Pertanyaan tidak tersedia</li></h4>');
          }
        });
      }

      function processAnswer() {
        var userAnswer = $('#answer-input').val();
        var questionData = questions[answeredQuestions[answeredQuestions.length - 1]];
        var correctAnswer = questionData.answers[0];

        // Periksa jawaban pengguna dan perbarui skor
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
          score++;
          var comment = questionData.comment;
          translateQuestion(comment);
          nextQuestion(); // Pindah ke pertanyaan berikutnya
        } else {
          var incorrectComment = "Jawaban Anda salah. Silakan coba lagi.";
          $('#comment-list').prepend('<h4 class="m-2"><li>' + incorrectComment + '</li></h4>');
          scrollToBottom(); // Scroll ke bawah
        }

        $('#answer-input').val(''); // Mengosongkan input
      }

      function nextQuestion() {
        if (answeredQuestions.length < questions.length) {
          displayQuestion(); // Tampilkan pertanyaan berikutnya
        } else {
          // Menampilkan hasil akhir jika sudah tidak ada pertanyaan lagi
          $('#question-container').html('<h2>Skor Akhir: ' + score + '</h2>');
          $('#answer-input').hide();
        }
      }

      // Tampilkan pertanyaan pertama saat halaman dimuat
      displayQuestion();

      // Tangani peristiwa ketika tombol "Enter" ditekan pada input jawaban
      $('#answer-input').keypress(function (e) {
        if (e.keyCode === 13) {
          processAnswer();
        }
      });
    });
});