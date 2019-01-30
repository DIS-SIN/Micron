$(function() { 
/*jq*/ 
var micron = {

    debug_mode: false,
    survey_index: 0,
    question_index: 0,
    recognition_lang: "en-US",
    recognition_lang_en: "en-US",
    recognition_lang_fr: "fr-CA",
    lang_terms: {},
    lang_terms_file: "",
    lang_terms_en: "/static/data/can-live/micron-en.json",
    lang_terms_fr: "/static/data/can-live/micron-fr.json",
    surveys: [],
    survey_file: "",
    surveys_en: "/static/data/can-live/micron-surveys-en.json",
    surveys_fr: "/static/data/can-live/micron-surveys-fr.json",

    start_load_chain: function() {
        if(micron.debug_mode == true) { console.log("fxn: start_load_chain"); }
        micron.set_init_recog();
        micron.getlang_json();
    },
    getlang_json: function() {
        if(micron.debug_mode == true) { console.log("fxn: getlang_json"); }
        var jsonload = micron.lang_terms_file;
        $.getJSON(jsonload, function(json) {
            //alert(JSON.stringify(json));
            micron.lang_terms = json;
            if(micron.debug_mode == true) { console.log("LANG FILE LOADED"); }
            //console.log(json);
            micron.getsurvey_json();
        });
    },
    getsurvey_json: function() {
        if(micron.debug_mode == true) { console.log("fxn: getsurvey_json"); }
        var jsonload = micron.survey_file;
        $.getJSON(jsonload, function(json) {
            micron.surveys = json;
            if(micron.debug_mode == true) { console.log("SURVEYS FILE LOADED"); }
            //console.log(json);
            micron.post_json_load();
        });        
    },
    post_json_load: function() {
        if(micron.debug_mode == true) { console.log("fxn: post_json_load"); }
        micron.init_button_ctrl();
        micron.languify();
        micron.load_survey();
        micron.ask_q();
    },
    languify_term: function(target, langterm) {
        $("#" + target).text(langterm);
        if(micron.debug_mode == true) { 
            console.log("fxn: languify_term");
            console.log("" + target + " " + langterm);
        }
    },
    languify: function() {

        if(micron.debug_mode == true) { console.log("fxn: languify"); }
        var lts = [
            "lts_appname", "lts_appver", 
            "lts_micronlisten", "lts_splashtext", "lts_footersplash", 
            "lts_footermore", "lts_loading_msg", "lts_question_prompt", 
            "lts_question_btn_prompt", "lts_answer_prompt", "lts_answer_btn_prompt",
            "lts_thank_you"
        ];
        if(micron.debug_mode == true) { 
            console.log("LANG");
            console.log(micron.lang_terms); // this will show the info it in firebug console
        }
        for(var i = 0; i < lts.length; i++) {
            micron.languify_term(lts[i], micron.lang_terms[lts[i]]);
        }

        var sels = ["survey", "survey_desc", "survey_q"];
        //in survey_q:
        var qels = ["qid", "qt", "qb", "a"];
                
        if(micron.debug_mode == true) { 
            console.log("SURVEYS");
            console.log(micron.surveys); // this will show the info it in firebug console
        }
        var survey = micron.surveys[micron.survey_index]; // only one for now, 
        var sname = survey['survey_name'];
        var sdesc = survey['survey_desc'];
        var questions = survey['survey_q'];

        $("#survey_title").text( sname );
        $("#survey_desc").text( sdesc );
        
        //micron.load_survey();    
    },
    load_survey: function() {
        if(micron.debug_mode == true) { console.log("fxn: load_survey"); }
        //micron.ask_q();
    },
    answer_q: function() {
        if(micron.debug_mode == true) { console.log("fxn: answer_q"); }
        micron.qs_toggle(); 
        $("#micron_answer").show();
    },
    ask_q: function() {
        if(micron.debug_mode == true) { console.log("fxn: ask_q"); }
        if(micron.surveys[micron.survey_index]['survey_q'].length > micron.question_index) {
            micron.qs_toggle(); 
            micron.load_question();
            $("#micron_question").show();
        } else {
            if(micron.debug_mode == true) { console.log("MAX"); }
            micron.thanks();
        }
    },
    thanks: function() {
        if(micron.debug_mode == true) { console.log("fxn: thanks"); }
        micron.qs_toggle(); 
        $("#micron_thanks").show();
        $("#micron_answer").hide();
    },
    answer_and_get_next_q: function() { 
        if(micron.debug_mode == true) { console.log("fxn: answer_and_get_next_q"); }

        micron_answer_text = $("#micron_a").val();
        micron_answer_qid = $("#micron_qid").val();

        var submission_q = [{ 
            'qid': micron_answer_qid
            ,'a': micron_answer_text
        }];
        //var str_q = JSON.stringify(submission_q, null, 2);
        var str_q = submission_q;
        //
        $.post( "/feedback", str_q)
        .done(function( data ) {
            if(micron.debug_mode == true) { console.log("imma submit! " + JSON.stringify(str_q)); }
            // do end result from POST
        });

        micron.question_index++;
        
        micron.ask_q();
    },
    load_question: function() {
        
        if(micron.debug_mode == true) { 
            console.log("fxn: load_question [s: " + micron.survey_index + " q: " + micron.question_index +"]");
        }
        var survey = micron.surveys[micron.survey_index]; // only one for now, 

        var sname = survey['survey_name'];
        var sdesc = survey['survey_desc'];
        var questions = survey['survey_q'];


        $("#survey_title").text( sname );
        $("#survey_desc").text( sdesc );

        $("#micron_at").text( questions[micron.question_index].qt );
        $("#micron_qt").text( questions[micron.question_index].qt );

        $("#micron_qb").text( questions[micron.question_index].qb );
        $("#micron_a_qb").text( questions[micron.question_index].qb );

        $("#micron_q_qid_disp").text( questions[micron.question_index].qid );

        $("#micron_qid").val( questions[micron.question_index].qid );
        $("#micron_a").val( ""/*questions[micron.question_index].a */);        
        
    },
    init_button_ctrl: function() {
        if(micron.debug_mode == true) { console.log("fxn: init_button_ctrl"); }
        $("#answer_q").off("click").on("click", micron.answer_q );
        $("#submit_q").off("click").on("click", micron.answer_and_get_next_q );
     
        $("#speech_icon_en").off("click").on("click", micron.set_recog_en);
        $("#speech_icon_fr").off("click").on("click", micron.set_recog_fr);
     
        $("#speech_icon").off("click").on("click", micron.recognize_speech);
    },
    qs_toggle: function() {
        if(micron.debug_mode == true) { console.log("fxn: qs_toggle"); }
        $("#micron_thanks").hide();
        $("#micron_loading").hide();
        $("#micron_question").hide();
        $("#micron_answer").hide();
    },
    set_init_recog: function() {
        if(micron.debug_mode == true) { 
            console.log("fxn: set_init_recog");
            console.log("Recognize");
        }
        if( micron.recognition_lang == micron.recognition_lang_en) {
            micron.lang_terms_file = micron.lang_terms_en;
            micron.survey_file = micron.surveys_en;
        } else if( micron.recognition_lang == micron.recognition_lang_fr) {
            micron.lang_terms_file = micron.lang_terms_fr;
            micron.survey_file = micron.surveys_fr;
        } else {
            micron.lang_terms_file = micron.lang_terms_en;
            micron.survey_file = micron.surveys_en;            
        }
    },    
    set_recog_en: function() {
        if(micron.debug_mode == true) { console.log("fxn: set_recog_en"); }
        micron.recognition_lang = micron.recognition_lang_en;
        $("#recognition_language").val(micron.recognition_lang);
        $("#micron_listening_for").html( "micron listening in English: " +  $("#recognition_language").val() );
        micron.init_gui();
    },
    set_recog_fr: function() {
        if(micron.debug_mode == true) { console.log("fxn: set_recog_fr"); }
        micron.recognition_lang = micron.recognition_lang_fr;
        $("#recognition_language").val(micron.recognition_lang);
        $("#micron_listening_for").html( "micron écoute Français: " + $("#recognition_language").val() );
        micron.init_gui();
    },
    recognize_speech: function() {
        if(micron.debug_mode == true) { console.log("fxn: recognize_speech"); }
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
    },
    init_gui: function() {
        if(micron.debug_mode == true) { console.log("fxn: initgui"); }
        micron.start_load_chain();
    },
    initmicron: function() {
        if(micron.debug_mode == true) { console.log("fxn: initmicron"); }
        micron.survey_index = 0;
        micron.question_index = 0;
        micron.init_gui();
    }
};

micron.initmicron(); 
/*endjq*/ });


