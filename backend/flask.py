from flask import Flask, request, jsonify
from your_module import generate_cfg_from_python_code

app = Flask(__name__)

@app.route('/generate-cfg', methods=['POST'])
def generate_cfg():
    python_code = request.json.get('pythonCode')
    cfg = generate_cfg_from_python_code(python_code)
    return jsonify(cfg)

if __name__ == '__main__':
    app.run(debug=True)

# from flask import Flask, request, jsonify
# import pycfg
# import base64

# app = Flask(__name__)

# @app.route('/generate-cfg', methods=['POST'])
# def generate_cfg():
#     python_script = request.json['pythonScript']
#     cfg = pycfg.generate_cfg(python_script)
#     cfg_image = pycfg.visualize_cfg(cfg)
#     cfg_image_base64 = base64.b64encode(cfg_image).decode('utf-8')
#     return jsonify({'cfgImage': cfg_image_base64})

# if __name__ == '__main__':
#     app.run(debug=True)
