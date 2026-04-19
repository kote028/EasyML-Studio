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

@llm_bp.route('/chat', methods=['POST'])
def chat_bot():
    req_data = request.json
    message = req_data.get('message', '').lower()
    
    # Simple simulated intelligence for free usage
    response = "That's an interesting data problem! Need more help? I'm currently using simulated intelligence to stay free."
    
    if "house" in message or "price" in message or "stock" in message or "continuous" in message:
        response = "It sounds like predicting a continuous numerical value. You should use a **Regression** model! Head over to the Models tab to try it."
    elif "spam" in message or "category" in message or "dog or cat" in message or "patient" in message:
        response = "You are trying to predict specific categories or labels. A **Classification** model is perfect for this. I recommend uploading your data and trying out Classification!"
    elif "customer" in message or "group" in message or "segment" in message or "unlabeled" in message:
        response = "Since you want to find hidden patterns without specific target labels, you should use **Clustering**. This will group similar data points together."
    elif "upload" in message or "csv" in message:
        response = "Head over to the **Data** tab to upload your CSV file! The platform will automatically show you a preview so you know your columns."
    elif "what is machine learning" in message:
        response = "Machine Learning empowers computers to find patterns in data and make predictions without being explicitly programmed. We have tools that do all the coding for you!"
    
    return jsonify({
        "status": "success",
        "result": response
    })
