$(function() {

    var recognition_lang = "en-US";
    var recognition_lang_en = "en-US";
    var recognition_lang_fr = "fr-CA";

    var lang_terms = {};
    var lang_terms_en = "/static/data/can-live/micron-en.json";
    var lang_terms_fr = "/static/data/can-live/micron-fr.json";

    var set_recog_en = function() {
        recognition_lang = recognition_lang_en;
        lang_terms = lang_terms_en;
        $("#recognition_language").val(recognition_lang);
        $("#micron_listening_for").html( "micron listening in English: " +  $("#recognition_language").val() );
        languify();
    };
    var set_recog_fr = function() {
        recognition_lang = recognition_lang_fr;
        lang_terms = lang_terms_fr;
        $("#recognition_language").val(recognition_lang);
        $("#micron_listening_for").html( "micron écoute Français: " + $("#recognition_language").val() );
        languify();
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
    
    var languify_term = function(target, langterm) {
        $("#" + target).text(langterm);
        console.log("" + target + " " + langterm);
    };

    var languify = function() {
        lang_terms_file = ""
        if( recognition_lang == recognition_lang_en) {
            lang_terms_file = lang_terms_en;
        } else if( recognition_lang == recognition_lang_fr) {
            lang_terms_file = lang_terms_fr;
        } else {
            set_recog_en();
            lang_terms_file = lang_terms_en;
        }

        $.getJSON(lang_terms_file, function(json) {
            lang_terms = json;
            var lts = [
                "lts_appname", "lts_appver", 
                "lts_micronlisten", "lts_splashtext", "lts_footersplash", 
                "lts_footermore", "lts_loading_msg", "lts_question_prompt", 
                "lts_question_btn_prompt", "lts_answer_prompt", "lts_answer_btn_prompt"
            ];
            console.log(lang_terms); // this will show the info it in firebug console
            for(var i = 0; i < lts.length; i++) {
                languify_term(lts[i], lang_terms[lts[i]]);
            }
        });
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

        var submission_q = [{ 
            'qid': micron_answer_qid
            ,'a': micron_answer_text
        }]
        var str_q = JSON.stringify(submission_q, null, 2);

        alert("imma submit! " + str_q);
        ask_q();
    };

    var init_gui = function() {
    
        $("#answer_q").on("click", answer_q );
        $("#submit_q").on("click", answer_and_get_next_q );
     
        $("#speech_icon_en").on("click", set_recog_en);
        $("#speech_icon_fr").on("click", set_recog_fr);
     
        $("#speech_icon").on("click", recognize_speech);

        languify();
        ask_q();

    };

    init_gui();
 });


