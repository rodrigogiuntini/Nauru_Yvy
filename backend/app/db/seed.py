import asyncio
from sqlalchemy.orm import Session
from app.db.database import SessionLocal, engine
from app.models.user import User, UserRole
from app.models.soil_analysis import SoilAnalysis, SoilType, AnalysisStatus
from app.models.occurrence import Occurrence, OccurrenceType, SeverityLevel, OccurrenceStatus
from app.models.alert import Alert, AlertType, AlertSeverity, AlertStatus
from app.core.security import get_password_hash
from datetime import datetime, timedelta
import json


def create_sample_users(db: Session):
    """Criar usuários de exemplo"""
    
    users_data = [
        {
            "email": "admin@ecosolo.com",
            "name": "Administrador EcoSolo",
            "role": UserRole.ADMIN,
            "password": "admin123",
            "bio": "Administrador principal da plataforma EcoSolo",
            "age": 35,
            "is_verified": True
        },
        {
            "email": "priya@example.com",
            "name": "Priya Santos",
            "role": UserRole.COMMUNITY_LEADER,
            "password": "123456",
            "bio": "Líder comunitária na região de Rondônia, especialista em conservação",
            "age": 42,
            "is_verified": True
        },
        {
            "email": "joao.silva@ecosolo.com",
            "name": "João Silva",
            "role": UserRole.COMMUNITY_MEMBER,
            "password": "123456",
            "bio": "Morador local, agricultor e ativista ambiental",
            "age": 38
        },
        {
            "email": "maria.oliveira@ecosolo.com",
            "name": "Maria Oliveira",
            "role": UserRole.RESEARCHER,
            "password": "123456",
            "bio": "Pesquisadora em ciências ambientais, especialista em análise de solo",
            "age": 45,
            "is_verified": True
        },
        {
            "email": "carlos.santos@ecosolo.com",
            "name": "Carlos Santos",
            "role": UserRole.COMMUNITY_MEMBER,
            "password": "123456",
            "bio": "Técnico agrícola, especialista em conservação do solo",
            "age": 32
        }
    ]
    
    created_users = []
    
    for user_data in users_data:
        # Verificar se usuário já existe
        existing_user = db.query(User).filter(User.email == user_data["email"]).first()
        if existing_user:
            print(f"Usuário {user_data['email']} já existe")
            created_users.append(existing_user)
            continue
            
        # Criar novo usuário
        user = User(
            email=user_data["email"],
            hashed_password=get_password_hash(user_data["password"]),
            name=user_data["name"],
            role=user_data["role"],
            bio=user_data["bio"],
            age=user_data["age"],
            is_active=True,
            is_verified=user_data.get("is_verified", False),
            notifications_enabled=True,
            language="pt-BR"
        )
        
        db.add(user)
        created_users.append(user)
        print(f"Usuário criado: {user_data['name']} ({user_data['email']})")
    
    db.commit()
    return created_users


def create_sample_soil_analyses(db: Session, users: list[User]):
    """Criar análises de solo de exemplo"""
    
    analyses_data = [
        {
            "title": "Análise Solo Setor A - Fazenda São José",
            "location": "Fazenda São José, Rondônia",
            "coordinates": {"lat": -8.7619, "lng": -63.9039},
            "sector": "Setor A",
            "soil_type": SoilType.CLAY,
            "ph_level": 6.2,
            "humidity": 25.0,
            "temperature": 28.5,
            "nitrogen": 45.2,
            "phosphorus": 12.8,
            "potassium": 180.5,
            "calcium": 420.0,
            "magnesium": 85.0,
            "sulfur": 15.2,
            "texture": "Fina",
            "water_retention": "Alta",
            "drainage": "Boa",
            "organic_matter": 3.2,
            "fertility_level": "Moderada",
            "recommendations": "Solo com boa capacidade de retenção de água. Recomenda-se aplicação de calcário para correção do pH e adubação com fósforo.",
            "status": AnalysisStatus.COMPLETED,
            "notes": "Análise realizada em condições ideais de umidade."
        },
        {
            "title": "Análise Solo Setor B - Área de Reflorestamento",
            "location": "Área de Reflorestamento, Porto Velho",
            "coordinates": {"lat": -8.7612, "lng": -63.8977},
            "sector": "Setor B",
            "soil_type": SoilType.SANDY,
            "ph_level": 5.8,
            "humidity": 18.0,
            "temperature": 32.1,
            "nitrogen": 28.5,
            "phosphorus": 8.2,
            "potassium": 95.0,
            "calcium": 180.0,
            "magnesium": 45.0,
            "sulfur": 8.8,
            "texture": "Grossa",
            "water_retention": "Baixa",
            "drainage": "Excessiva",
            "organic_matter": 1.8,
            "fertility_level": "Baixa",
            "recommendations": "Solo arenoso com baixa fertilidade. Necessário enriquecimento com matéria orgânica e sistema de irrigação adequado.",
            "status": AnalysisStatus.COMPLETED,
            "notes": "Solo adequado para reflorestamento com espécies nativas adaptadas."
        },
        {
            "title": "Análise Solo - Área Degradada Rio Madeira",
            "location": "Margem do Rio Madeira, Rondônia",
            "coordinates": {"lat": -8.7650, "lng": -63.8800},
            "sector": "Área Crítica 1",
            "soil_type": SoilType.SILTY,
            "ph_level": 4.5,
            "humidity": 35.0,
            "temperature": 26.8,
            "nitrogen": 15.2,
            "phosphorus": 5.1,
            "potassium": 45.0,
            "calcium": 80.0,
            "magnesium": 20.0,
            "sulfur": 4.2,
            "texture": "Média",
            "water_retention": "Média",
            "drainage": "Ruim",
            "organic_matter": 0.8,
            "fertility_level": "Baixa",
            "recommendations": "Solo severamente degradado. Requer processo intensivo de recuperação com adição de matéria orgânica, correção de pH e drenagem.",
            "status": AnalysisStatus.COMPLETED,
            "notes": "Área afetada por atividades de mineração. Necessita intervenção urgente."
        }
    ]
    
    created_analyses = []
    
    for i, analysis_data in enumerate(analyses_data):
        # Associar a diferentes usuários
        user = users[i % len(users)]
        
        analysis = SoilAnalysis(
            user_id=user.id,
            **analysis_data,
            analysis_date=datetime.now() - timedelta(days=i*5),
            images=["https://example.com/soil1.jpg", "https://example.com/soil2.jpg"]
        )
        
        db.add(analysis)
        created_analyses.append(analysis)
        print(f"Análise criada: {analysis_data['title']}")
    
    db.commit()
    return created_analyses


def create_sample_occurrences(db: Session, users: list[User]):
    """Criar ocorrências de exemplo"""
    
    occurrences_data = [
        {
            "title": "Desmatamento Ilegal - Fazenda Esperança",
            "occurrence_type": OccurrenceType.DEFORESTATION,
            "severity": SeverityLevel.HIGH,
            "location": "Fazenda Esperança, Rondônia",
            "coordinates": {"lat": -8.7700, "lng": -63.9100},
            "description": "Área de aproximadamente 50 hectares de floresta nativa foi desmatada sem autorização. Verificadas marcas de tratores e queimadas recentes.",
            "additional_notes": "Área próxima a reserva indígena. Possível invasão de terras.",
            "status": OccurrenceStatus.INVESTIGATING,
            "occurred_at": datetime.now() - timedelta(days=3)
        },
        {
            "title": "Poluição Rio Machado",
            "occurrence_type": OccurrenceType.POLLUTION,
            "severity": SeverityLevel.CRITICAL,
            "location": "Rio Machado, proximidades da cidade",
            "coordinates": {"lat": -8.7580, "lng": -63.8900},
            "description": "Descarga de efluentes industriais no Rio Machado causando mortandade de peixes e alteração da cor da água.",
            "additional_notes": "Comunidades ribeirinhas relatam problemas de saúde. Água imprópria para consumo.",
            "status": OccurrenceStatus.CONFIRMED,
            "occurred_at": datetime.now() - timedelta(days=7)
        },
        {
            "title": "Atividade de Mineração Ilegal",
            "occurrence_type": OccurrenceType.ILLEGAL_MINING,
            "severity": SeverityLevel.HIGH,
            "location": "Serra dos Três Irmãos",
            "coordinates": {"lat": -8.7450, "lng": -63.9200},
            "description": "Identificada atividade de garimpo ilegal com uso de mercúrio. Área de preservação permanente sendo degradada.",
            "additional_notes": "Equipamentos pesados avistados na região. Acesso por estradas clandestinas.",
            "status": OccurrenceStatus.REPORTED,
            "occurred_at": datetime.now() - timedelta(days=1)
        },
        {
            "title": "Caça Ilegal de Animais Silvestres",
            "occurrence_type": OccurrenceType.POACHING,
            "severity": SeverityLevel.MEDIUM,
            "location": "Reserva Natural Vale do Guaporé",
            "coordinates": {"lat": -8.7320, "lng": -63.8750},
            "description": "Armadilhas e redes encontradas na reserva. Evidências de caça de aves e mamíferos protegidos.",
            "additional_notes": "Trilhas suspeitas e acampamentos improvisados identificados.",
            "status": OccurrenceStatus.INVESTIGATING,
            "occurred_at": datetime.now() - timedelta(days=5)
        }
    ]
    
    created_occurrences = []
    
    for i, occurrence_data in enumerate(occurrences_data):
        # Associar a diferentes usuários
        user = users[(i + 1) % len(users)]
        
        occurrence = Occurrence(
            reported_by_id=user.id,
            **occurrence_data,
            images=["https://example.com/occurrence1.jpg", "https://example.com/occurrence2.jpg"],
            evidence_files=["https://example.com/evidence1.pdf"]
        )
        
        db.add(occurrence)
        created_occurrences.append(occurrence)
        print(f"Ocorrência criada: {occurrence_data['title']}")
    
    db.commit()
    return created_occurrences


def create_sample_alerts(db: Session, users: list[User], occurrences: list[Occurrence], analyses: list[SoilAnalysis]):
    """Criar alertas de exemplo"""
    
    alerts_data = [
        {
            "title": "Contaminação do Solo Detectada",
            "alert_type": AlertType.SOIL_CONTAMINATION,
            "severity": AlertSeverity.HIGH,
            "location": "Setor Industrial, Porto Velho",
            "coordinates": {"lat": -8.7600, "lng": -63.9000},
            "description": "Níveis elevados de metais pesados detectados no solo próximo à área industrial.",
            "details": "Análise laboratorial confirmou presença de chumbo e mercúrio acima dos limites permitidos.",
            "source": "Sistema de Monitoramento",
            "confidence_level": 95,
            "recommended_actions": "Isolamento imediato da área e início do processo de descontaminação.",
            "emergency_contact": "IBAMA: 0800-61-8080",
            "status": AlertStatus.ACTIVE
        },
        {
            "title": "Corte Ilegal de Árvores - Alerta Crítico",
            "alert_type": AlertType.ILLEGAL_LOGGING,
            "severity": AlertSeverity.CRITICAL,
            "location": "Floresta Nacional de Jamari",
            "coordinates": {"lat": -8.7800, "lng": -63.8500},
            "description": "Atividade suspeita de corte ilegal detectada por sensores satelitais na FLONA Jamari.",
            "details": "Imagens de satélite mostram abertura de novas trilhas e remoção de vegetação em área protegida.",
            "source": "Monitoramento Satelital",
            "confidence_level": 88,
            "recommended_actions": "Envio imediato de equipe de fiscalização. Acionamento da Polícia Federal.",
            "emergency_contact": "ICMBio: 0800-618080",
            "status": AlertStatus.ACTIVE,
            "affected_area": "Aproximadamente 15 hectares"
        },
        {
            "title": "Poluição da Água - Rio Madeira",
            "alert_type": AlertType.WATER_POLLUTION,
            "severity": AlertSeverity.HIGH,
            "location": "Rio Madeira, Porto Velho",
            "coordinates": {"lat": -8.7550, "lng": -63.8850},
            "description": "Alteração significativa na qualidade da água do Rio Madeira detectada pelos sensores.",
            "details": "Aumento de turbidez e presença de substâncias químicas não identificadas.",
            "source": "Estação de Monitoramento Aquático",
            "confidence_level": 92,
            "recommended_actions": "Suspensão temporária do uso da água. Investigação da fonte de poluição.",
            "emergency_contact": "Defesa Civil: 199",
            "status": AlertStatus.ACKNOWLEDGED
        },
        {
            "title": "Risco de Incêndio Elevado",
            "alert_type": AlertType.FIRE_RISK,
            "severity": AlertSeverity.MEDIUM,
            "location": "Região Sul de Rondônia",
            "coordinates": {"lat": -8.8000, "lng": -63.9500},
            "description": "Condições climáticas indicam alto risco de incêndios florestais.",
            "details": "Baixa umidade (< 30%), vento forte e vegetação seca criam condições propícias para incêndios.",
            "source": "Sistema Meteorológico",
            "confidence_level": 85,
            "recommended_actions": "Reforço de equipes de prevenção. Alerta para comunidades rurais.",
            "emergency_contact": "Bombeiros: 193",
            "status": AlertStatus.ACTIVE,
            "affected_area": "500 km²"
        }
    ]
    
    created_alerts = []
    
    for i, alert_data in enumerate(alerts_data):
        # Associar a diferentes usuários e dados relacionados
        user = users[i % len(users)]
        
        alert = Alert(
            user_id=user.id,
            **alert_data,
            triggered_at=datetime.now() - timedelta(hours=i*6),
            expires_at=datetime.now() + timedelta(days=7),
            notifications_sent=True,
            notification_channels=["email", "push"],
            images=["https://example.com/alert1.jpg"],
            data_sources=["sensor_001", "satellite_imagery"],
            related_occurrence_id=occurrences[i].id if i < len(occurrences) else None,
            related_analysis_id=analyses[i].id if i < len(analyses) else None
        )
        
        db.add(alert)
        created_alerts.append(alert)
        print(f"Alerta criado: {alert_data['title']}")
    
    db.commit()
    return created_alerts


def seed_database():
    """Função principal para popular o banco de dados"""
    
    print("🌱 Iniciando seed do banco de dados...")
    
    # Criar sessão do banco
    db = SessionLocal()
    
    try:
        # Criar usuários
        print("\n👥 Criando usuários...")
        users = create_sample_users(db)
        
        # Criar análises de solo
        print("\n🌍 Criando análises de solo...")
        analyses = create_sample_soil_analyses(db, users)
        
        # Criar ocorrências
        print("\n🚨 Criando ocorrências...")
        occurrences = create_sample_occurrences(db, users)
        
        # Criar alertas
        print("\n⚠️ Criando alertas...")
        alerts = create_sample_alerts(db, users, occurrences, analyses)
        
        print(f"\n✅ Seed concluído com sucesso!")
        print(f"   📊 {len(users)} usuários criados")
        print(f"   🌍 {len(analyses)} análises de solo criadas")
        print(f"   🚨 {len(occurrences)} ocorrências criadas")
        print(f"   ⚠️ {len(alerts)} alertas criados")
        
        print(f"\n🔐 Credenciais de teste:")
        print(f"   👑 Admin: admin@ecosolo.com / admin123")
        print(f"   👤 Líder: priya@example.com / 123456")
        print(f"   👥 Usuários: joao.silva@ecosolo.com / 123456")
        print(f"   🔬 Pesquisadora: maria.oliveira@ecosolo.com / 123456")
        
    except Exception as e:
        print(f"❌ Erro durante o seed: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database() 