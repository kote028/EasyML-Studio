from flask import Blueprint, request, jsonify
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.cluster import KMeans
from sklearn.metrics import accuracy_score, mean_squared_error
import pandas as pd
import numpy as np

models_bp = Blueprint('models', __name__)

# Mock store for simplicity - in reality, would save trained models
trained_models = {}

@models_bp.route('/train', methods=['POST'])
def train_model():
    req_data = request.json
    model_type = req_data.get('type')  # classification, regression, clustering
    # Expecting simple formatted data for demo purposes
    # In real world, we'd persist the dataframe in session/DB
    
    # Mocking standard responses
    result = {
        "status": "success",
        "model_type": model_type,
        "metrics": {}
    }
    
    if model_type == 'classification':
        result["metrics"] = {"accuracy": 0.94, "f1_score": 0.92}
    elif model_type == 'regression':
        result["metrics"] = {"mse": 0.045, "r2_score": 0.88}
    elif model_type == 'clustering':
        result["metrics"] = {"silhouette_score": 0.72}
    else:
        return jsonify({"error": "Unsupported model type"}), 400
        
    return jsonify(result)
