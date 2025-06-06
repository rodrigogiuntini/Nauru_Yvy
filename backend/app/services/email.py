import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
from app.core.config import settings


def send_reset_password_email(email_to: str, username: str, token: str) -> bool:
    """
    Enviar email de reset de senha
    Placeholder - implementação futura
    """
    print(f"📧 Email de reset de senha para {email_to}")
    print(f"👤 Usuário: {username}")
    print(f"🔐 Token: {token}")
    print("📝 Link: http://localhost:3000/reset-password?token=" + token)
    
    # TODO: Implementar envio real de email usando SMTP
    # if settings.SMTP_HOST:
    #     try:
    #         # Configurar servidor SMTP
    #         server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
    #         server.starttls()
    #         server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
    #         
    #         # Criar mensagem
    #         msg = MIMEMultipart()
    #         msg['From'] = settings.EMAILS_FROM_EMAIL
    #         msg['To'] = email_to
    #         msg['Subject'] = "Reset de Senha - EcoSolo"
    #         
    #         body = f"""
    #         Olá {username},
    #         
    #         Você solicitou um reset de senha para sua conta no EcoSolo.
    #         
    #         Clique no link abaixo para redefinir sua senha:
    #         http://localhost:3000/reset-password?token={token}
    #         
    #         Este link expira em 1 hora.
    #         
    #         Se você não solicitou este reset, ignore este email.
    #         
    #         Atenciosamente,
    #         Equipe EcoSolo
    #         """
    #         
    #         msg.attach(MIMEText(body, 'plain'))
    #         
    #         # Enviar email
    #         text = msg.as_string()
    #         server.sendmail(settings.EMAILS_FROM_EMAIL, email_to, text)
    #         server.quit()
    #         
    #         return True
    #     except Exception as e:
    #         print(f"Erro ao enviar email: {e}")
    #         return False
    
    return True  # Simular sucesso por enquanto


def send_welcome_email(email_to: str, username: str) -> bool:
    """
    Enviar email de boas-vindas
    Placeholder - implementação futura
    """
    print(f"📧 Email de boas-vindas para {email_to}")
    print(f"👤 Usuário: {username}")
    
    # TODO: Implementar email de boas-vindas
    return True


def send_notification_email(
    email_to: str, 
    username: str, 
    alert_title: str, 
    alert_description: str
) -> bool:
    """
    Enviar email de notificação de alerta
    Placeholder - implementação futura
    """
    print(f"📧 Email de notificação para {email_to}")
    print(f"👤 Usuário: {username}")
    print(f"🚨 Alerta: {alert_title}")
    print(f"📝 Descrição: {alert_description}")
    
    # TODO: Implementar email de notificação
    return True 