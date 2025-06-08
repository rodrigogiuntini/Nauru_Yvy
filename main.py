"""
Main entry point for the FastAPI application on Render
"""
import os
import sys

# Ensure we can import from backend
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Import the app
from app.main import app

# This is what Render will use
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 