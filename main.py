"""
Main entry point for the FastAPI application on Render
"""
import os
import sys

# Ensure we can import from backend
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

print("🚀 Iniciando aplicação...")
print(f"Python path: {sys.path}")
print(f"Current directory: {os.getcwd()}")
print(f"PORT env: {os.environ.get('PORT', 'NOT_SET')}")

try:
    # Import the app
    from app.main import app
    print("✅ App importado com sucesso")
except Exception as e:
    print(f"❌ Erro ao importar app: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# This is what Render will use
if __name__ == "__main__":
    try:
        import uvicorn
        port = int(os.environ.get("PORT", 8000))
        print(f"🌐 Iniciando servidor na porta {port}")
        uvicorn.run(app, host="0.0.0.0", port=port)
    except Exception as e:
        print(f"❌ Erro ao iniciar servidor: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1) 