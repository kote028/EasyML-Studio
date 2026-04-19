import pandas as pd
from flask import Blueprint, request, jsonify
import io

data_bp = Blueprint('data', __name__)

@data_bp.route('/upload', methods=['POST'])
def upload_data():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    try:
        df = pd.read_csv(file)
        # return basic stats and head
        summary = {
            "columns": list(df.columns),
            "rows": len(df),
            "head": df.head(5).to_dict(orient='records'),
            "dtypes": df.dtypes.astype(str).to_dict()
        }
        return jsonify({"message": "File processed successfully", "data": summary})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
