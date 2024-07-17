from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import uuid
import hashlib

app = Flask(__name__)
CORS(app)  # 允许所有来源的跨域请求

# 定义存储JSON文件的目录
SAVE_DIR = 'bundle_saved_jsons'
if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)

def get_sha256_filename(data):
    """获取JSON数据的SHA-256哈希值作为文件名，格式为SHA256.json"""
    # data["url"] = data["url"].split("?")[0]
    json_str = json.dumps(data, sort_keys=True)  # 将JSON数据转换为字符串，并排序键以确保一致性
    sha256_hash = hashlib.sha256(json_str.encode()).hexdigest()
    return f"{sha256_hash}.json"

def get_random_filename():
    """获取一个随机的UUID文件名，格式为UUID.json"""
    return f"{uuid.uuid4()}.json"

@app.route('/savejson', methods=['POST'])
def save_json():
    if request.is_json:
        data = request.get_json()
        # filename = get_random_filename()
        filename = get_sha256_filename(data['url'])
        filepath = os.path.join(SAVE_DIR, filename)
        with open(filepath, 'w') as json_file:
            json.dump(data, json_file)
        return jsonify({"message": "JSON saved", "filename": filename}), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400

if __name__ == '__main__':
    app.run(debug=False)
