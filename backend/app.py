from flask import Flask, jsonify
from flask_cors import CORS
from app_routes.data import data_bp
from app_routes.models import models_bp
from app_routes.llm import llm_bp

def create_app():
    app = Flask(__name__)
    CORS(app) # Allow cross-origin for frontend

    # Register Blueprints
    app.register_blueprint(data_bp, url_prefix='/api/data')
    app.register_blueprint(models_bp, url_prefix='/api/models')
    app.register_blueprint(llm_bp, url_prefix='/api/llm')

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "healthy", "message": "NoCodeAI API is running."})

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
