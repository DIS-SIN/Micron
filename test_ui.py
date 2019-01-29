from flask import (Flask, render_template)

# ULTRABASIC TEMPLATE RENDERER
# So the UI guy can build somewhat useable templates
# from the get go. Easier to integrate afterwards

app_set_debug_mode = 0  # 0=none,1=entry,2=entry/exit,3=all
app = Flask(__name__)   # just create a basic app for testing templates

# serve this up on port 5000
@app.route('/')
def test_ui(runtype="manual-run"):
    rendered = ""
    with app.app_context():
        # pass in some basic context info for the render
        context = { \
            'testname': 'ui' \
            ,'q': [{ \
                'qid': 'qaz1q2w3e4r5t6y7u8i9o0pnbnvsd3' \
                ,'qt': 'Helpful Materials' \
                ,'qb': 'What TOPICS, MATERIALS, and ACTIVITIES did you find to be the most helpful?' \
                ,'a': '' \
            }] \
            ,'lts': { \
                'app_name':'micron' \
                ,'loading_msg': 'Loading Micron...' \
                ,'question_prompt': 'Question:' \
                ,'question_btn_prompt': 'Provide Feedback' \
                ,'answer_prompt': 'Feedback:' \
                ,'answer_btn_prompt': 'Submit Feedback' \
            } \
        }
        rendered = render_template('micron/micron.html', **context)
    return rendered

# annnd run it
if __name__ == '__main__':
    app.run()

