import pytest
import sys
import os

# Add backend directory to sys path for imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend')))

from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    """Test the application health check endpoint."""
    rv = client.get('/api/health')
    assert rv.status_code == 200
    assert b'health' in rv.data

def test_model_training_mock(client):
    """Enterprise mock verification of ML endpoints."""
    rv = client.post('/api/models/train', json={'type': 'classification'})
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert json_data['status'] == 'success'
    assert 'accuracy' in json_data['metrics']
