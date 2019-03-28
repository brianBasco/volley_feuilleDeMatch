from flask import Flask
from flask import render_template
from flask import make_response
# from flask import request
# from flask import redirect, url_for

app = Flask(__name__)

capitaines = ["capitaine A", "capitaine B"]
entraineurs = ["entraineur A", "entraineur B"]


@app.route('/')
def hello_world():
    print("hello")
    return 'hello world'


@app.route('/canvas/')
def canvas():
    return render_template('canvas.html')


@app.route('/header/')
@app.route('/header/<name>')
def headers(name=None):
    resp = make_response(render_template('hello.html', name=name,
                         capitaines=capitaines, entraineurs=entraineurs))
    resp.set_cookie('utilisateur', 'seb')
    return resp


@app.route('/login/')
def login():
    # username = request.cookies.get('utilisateur')
    # use cookies.get(key) instead of cookies[key] to not get a
    # KeyError if the cookie is missing.
    # return 'bonjour {}'.format(username)
    # if(username == 'seb'):
    # return redirect(url_for('headers'))
    return render_template('login.html')


@app.route('/test/')
def test():
    return 'page de test'


@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id


@app.route('/reponse/')
def reponse():
    resp = make_response('4 Réponses', 200)
    resp.headers['unTest'] = "deux valeurs"
    return resp


@app.errorhandler(404)
def not_found(error):
    # resp = make_response(render_template('error.html'), 404)
    resp = make_response('error.html', 404)
    resp.headers['X-Something'] = 'A value'
    return resp
