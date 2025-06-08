from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.api.v1.endpoints import auth, users
from app.api.v1 import auth as oracle_auth, occurrences

# Criar aplicação FastAPI
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="API Backend para o MVP EcoSolo - Plataforma de Monitoramento Ambiental",
    openapi_url=f"{settings.API_V1_STR}/openapi.json" if settings.DEBUG else None,
    docs_url=f"{settings.API_V1_STR}/docs" if settings.DEBUG else None,
    redoc_url=f"{settings.API_V1_STR}/redoc" if settings.DEBUG else None,
)

# Configurar CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    # Para desenvolvimento, permitir todas as origens
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Adicionar middleware de segurança para hosts confiáveis
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["localhost", "127.0.0.1", "192.168.0.24", "*.cainvest.com", "*.vercel.app", "*.onrender.com", "*"]
)


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """
    Handler personalizado para HTTPExceptions
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "message": exc.detail,
            "status_code": exc.status_code
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """
    Handler para exceções gerais
    """
    return JSONResponse(
        status_code=500,
        content={
            "error": True,
            "message": "Erro interno do servidor",
            "status_code": 500
        }
    )


# Endpoints de saúde e informações
@app.get("/")
async def root():
    """
    Endpoint raiz com informações da API
    """
    return {
        "message": f"Bem-vindo à {settings.APP_NAME}",
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "docs": f"{settings.API_V1_STR}/docs" if settings.DEBUG else "Documentação disponível apenas em desenvolvimento"
    }


@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT
    }


# Incluir rotas da API v1
# app.include_router(
#     auth.router,
#     prefix=f"{settings.API_V1_STR}/auth",
#     tags=["Autenticação PostgreSQL"]
# )

app.include_router(
    oracle_auth.router,
    prefix=f"{settings.API_V1_STR}",
    tags=["Autenticação Oracle"]
)

app.include_router(
    users.router,
    prefix=f"{settings.API_V1_STR}/users",
    tags=["Usuários"]
)

app.include_router(
    occurrences.router,
    prefix=f"{settings.API_V1_STR}",
    tags=["Ocorrências"]
)


# Eventos de inicialização e finalização
@app.on_event("startup")
async def startup_event():
    """
    Executado na inicialização da aplicação
    """
    print(f"🚀 {settings.APP_NAME} v{settings.APP_VERSION} iniciada!")
    print(f"📍 Ambiente: {settings.ENVIRONMENT}")
    if settings.DEBUG:
        print(f"📖 Documentação: http://localhost:8000{settings.API_V1_STR}/docs")


@app.on_event("shutdown")
async def shutdown_event():
    """
    Executado na finalização da aplicação
    """
    print(f"🛑 {settings.APP_NAME} finalizada!")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=settings.DEBUG
    ) 