"""
Main entry point for the FastAPI application on Render
"""
import sys
import os

# Add the backend directory to Python path
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_path)

# Import the FastAPI app from backend
try:
    from app.main import app
except ImportError:
    # Fallback import
    from backend.app.main import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000))) 