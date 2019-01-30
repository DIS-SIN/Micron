from flask import (Flask, render_template, request)

# ULTRABASIC TEMPLATE RENDERER
# So the UI guy can build somewhat useable templates
# from the get go. Easier to integrate afterwards

app_set_debug_mode = 0  # 0=none,1=entry,2=entry/exit,3=all
app = Flask(__name__)   # just create a basic app for testing templates
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


# serve this up on port 5000
@app.route('/')
def test_ui(runtype="manual-run"):
    rendered = ""
    with app.app_context():
        # pass in some basic context info for the render
        context = { \
            'testname': 'ui' \
                ,'lts': { \
                    'pagetitle':'alpha | micron | Helping CSPS provide the best learning experiences possible.' \
                } \
        }
        rendered = render_template('micron/micron.html', **context)
    return rendered

@app.route('/feedback', methods = ('GET', 'POST'))
def test_feedback():
    return "success"
    
# annnd run it
if __name__ == '__main__':
    app.run()

