from pycfg.pycfg import CFGBuilder
from pycfg.ast import PyCFG

def generate_cfg_from_python_code(code):
    cfg = CFGBuilder().generate_cfg(PyCFG().ast_parse(code))
    return str(cfg)
# import pycfg
# from flask import Flask, request, render_template

# app = Flask(__name__)

# @app.route('/', methods=['GET', 'POST'])
# def generate_cfg():
#     if request.method == 'POST':
#         python_script = request.form['python_script']
#         cfg = pycfg.generate_cfg(python_script)
#         cfg_image = pycfg.visualize_cfg(cfg)
#         return render_template('index.html', cfg_image=cfg_image)
#     return render_template('index.html')

# if __name__ == '__main__':
#     app.run(debug=True)