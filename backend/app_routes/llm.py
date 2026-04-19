from flask import Blueprint, request, jsonify
# import openai
import os

llm_bp = Blueprint('llm', __name__)

@llm_bp.route('/generate', methods=['POST'])
def generate_text():
    req_data = request.json
    prompt = req_data.get('prompt')
    task = req_data.get('task') # e.g. summarize, q&a, sentiment
    
    # In production, call OpenAI or HuggingFace API here
    # openai.api_key = os.getenv("OPENAI_API_KEY")
    
    # Mock response
    mock_responses = {
        "summarize": f"This is a mocked summary of the text you provided. It is much shorter.",
        "qa": "Based on the prompt, the mocked answer to your question is 42.",
        "sentiment": "Positive (0.95)"
    }
    
    response_text = mock_responses.get(task, f"Generated response for: {prompt[:20]}...")
    
    return jsonify({
        "status": "success",
        "result": response_text
    })
