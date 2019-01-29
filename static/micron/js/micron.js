$(function() {

    var recognition_lang = "en-US";

    var set_recog_en = function() {
        recognition_lang = "en-US";
        $("#recognition_language").val(recognition_lang);
        $("#micron_listening_for").html( "micron listening for English: " + ($("#recognition_language").val()) +  " | " + "Auto-translate: " +"<span class='mif-checkmark'></span>"  + "<br><small>[Note: This is a note]</small>");
    };
    var set_recog_fr = function() {
        recognition_lang = "fr-CA";
        $("#recognition_language").val(recognition_lang);
        $("#micron_listening_for").html( "micron écoute Français: " + ($("#recognition_language").val()) +  " | " + "Traduire automatiquement: " +"<span class='mif-checkmark'></span>"  + "<br><small>[Note: This is a note]</small>");
    };
    var recognize_speech = function() {
        if (window.hasOwnProperty('webkitSpeechRecognition')) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.lang = recognition_lang;
            recognition.start();

            recognition.onresult = function(e) {
                document.getElementById('transcript').value = e.results[0][0].transcript; // consider ca-na-da-dot-see-eh here
                recognition.stop();
                document.getElementById('micronfrm').submit();
            };

            recognition.onerror = function(e) {
                recognition.stop();
            }
        } else {
            $("#result_set").html("<div class='remark alert'><p><strong>micron is sorry...</strong> This page uses experimental voice recognition APIs.</p><p>It appears this browser doesnt support speech recognition. You might have more luck with <a href='https://www.google.com/chrome'>Chrome</a> or <a href='https://www.mozilla.org/firefox'>Firefox</a></p></div>");
        }
    };
   
    var qs_toggle = function() {
        $("#micron_loading").hide();
        $("#micron_question").hide();
        $("#micron_answer").hide();
    };
    var ask_q = function() {
        qs_toggle(); 
        $("#micron_question").show();
    };   
    var answer_q = function() {
        qs_toggle(); 
        $("#micron_answer").show();
    }; 
    var answer_and_get_next_q = function() { 
        micron_answer_text = $("#micron_a").val();
        micron_answer_qid = $("#micron_a_qid").val();

        var submission_q = { 
            'qid': micron_answer_qid
            ,'a': micron_answer_text
        }
        var str_q = JSON.stringify(submission_q, null, 2);

        alert("imma submit! " + str_q);
        ask_q();
    }
    
    $("#answer_q").on("click", answer_q );
    $("#submit_q").on("click", answer_and_get_next_q );
 
    $("#speech_icon_en").on("click", set_recog_en);
    $("#speech_icon_fr").on("click", set_recog_fr);
 
    $("#speech_icon").on("click", recognize_speech);

    ask_q();
 
 });


