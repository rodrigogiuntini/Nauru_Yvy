-- ============================================================
-- SOLOSANO DATABASE DUMP - MySQL Version
-- Plataforma de Monitoramento Ambiental
-- Data: 2024-06-05
-- ============================================================

-- Configurações iniciais
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';

-- Criar database
CREATE DATABASE IF NOT EXISTS `solosano_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `solosano_db`;

-- ============================================================
-- TABELA: users
-- ============================================================
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashed_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','community_leader','community_member','researcher') COLLATE utf8mb4_unicode_ci DEFAULT 'community_member',
  `is_active` tinyint(1) DEFAULT '1',
  `is_verified` tinyint(1) DEFAULT '0',
  `age` int DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `avatar_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notifications_enabled` tinyint(1) DEFAULT '1',
  `language` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'pt-BR',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_email` (`email`),
  KEY `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABELA: soil_analyses
-- ============================================================
DROP TABLE IF EXISTS `soil_analyses`;
CREATE TABLE `soil_analyses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coordinates` json DEFAULT NULL,
  `sector` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `soil_type` enum('clay','sandy','silty','loamy','peaty','chalky') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ph_level` decimal(3,1) DEFAULT NULL,
  `humidity` decimal(5,2) DEFAULT NULL,
  `temperature` decimal(5,2) DEFAULT NULL,
  `nitrogen` decimal(8,2) DEFAULT NULL,
  `phosphorus` decimal(8,2) DEFAULT NULL,
  `potassium` decimal(8,2) DEFAULT NULL,
  `calcium` decimal(8,2) DEFAULT NULL,
  `magnesium` decimal(8,2) DEFAULT NULL,
  `sulfur` decimal(8,2) DEFAULT NULL,
  `texture` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `water_retention` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drainage` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `organic_matter` decimal(5,2) DEFAULT NULL,
  `fertility_level` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recommendations` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','processing','completed','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `images` json DEFAULT NULL,
  `analysis_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_soil_analyses_user` (`user_id`),
  KEY `idx_soil_analyses_location` (`location`),
  KEY `idx_soil_analyses_status` (`status`),
  CONSTRAINT `fk_soil_analyses_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABELA: occurrences
-- ============================================================
DROP TABLE IF EXISTS `occurrences`;
CREATE TABLE `occurrences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reported_by_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `occurrence_type` enum('pollution','deforestation','illegal_mining','water_contamination','soil_degradation','wildlife_impact','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `severity` enum('low','medium','high','critical') COLLATE utf8mb4_unicode_ci DEFAULT 'medium',
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coordinates` json DEFAULT NULL,
  `images` json DEFAULT NULL,
  `status` enum('reported','investigating','confirmed','resolved','closed') COLLATE utf8mb4_unicode_ci DEFAULT 'reported',
  `resolution_notes` text COLLATE utf8mb4_unicode_ci,
  `verified_by_id` int DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `resolved_at` timestamp NULL DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_occurrences_reported_by` (`reported_by_id`),
  KEY `fk_occurrences_verified_by` (`verified_by_id`),
  KEY `idx_occurrences_type` (`occurrence_type`),
  KEY `idx_occurrences_severity` (`severity`),
  KEY `idx_occurrences_status` (`status`),
  CONSTRAINT `fk_occurrences_reported_by` FOREIGN KEY (`reported_by_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_occurrences_verified_by` FOREIGN KEY (`verified_by_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABELA: alerts
-- ============================================================
DROP TABLE IF EXISTS `alerts`;
CREATE TABLE `alerts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `alert_type` enum('environmental','soil_analysis','system','occurrence','weather','other') COLLATE utf8mb4_unicode_ci DEFAULT 'environmental',
  `severity` enum('info','warning','error','critical') COLLATE utf8mb4_unicode_ci DEFAULT 'info',
  `status` enum('active','read','dismissed','archived') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coordinates` json DEFAULT NULL,
  `action_required` tinyint(1) DEFAULT '0',
  `action_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `occurrence_id` int DEFAULT NULL,
  `soil_analysis_id` int DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_alerts_user` (`user_id`),
  KEY `fk_alerts_occurrence` (`occurrence_id`),
  KEY `fk_alerts_soil_analysis` (`soil_analysis_id`),
  KEY `idx_alerts_type` (`alert_type`),
  KEY `idx_alerts_severity` (`severity`),
  KEY `idx_alerts_status` (`status`),
  CONSTRAINT `fk_alerts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_alerts_occurrence` FOREIGN KEY (`occurrence_id`) REFERENCES `occurrences` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_alerts_soil_analysis` FOREIGN KEY (`soil_analysis_id`) REFERENCES `soil_analyses` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DADOS DE EXEMPLO (SEED)
-- ============================================================

-- Inserir usuários de teste
INSERT INTO `users` (`id`, `email`, `hashed_password`, `name`, `role`, `is_active`, `is_verified`, `age`, `bio`, `notifications_enabled`, `language`, `created_at`) VALUES
(1, 'admin@ecosolo.com', '$2b$12$LQv3c1yqBwWFcDkMTBxOe.4qSFkCjFNGdtpQl4x8YAXGdpBgJtGPW', 'Administrador EcoSolo', 'admin', 1, 1, 35, 'Administrador principal da plataforma EcoSolo', 1, 'pt-BR', NOW()),
(2, 'priya@example.com', '$2b$12$LQv3c1yqBwWFcDkMTBxOe.4qSFkCjFNGdtpQl4x8YAXGdpBgJtGPW', 'Priya Santos', 'community_leader', 1, 1, 42, 'Líder comunitária na região de Rondônia, especialista em conservação', 1, 'pt-BR', NOW()),
(3, 'rodrigo.giuntini@gmail.com', '$2b$12$LQv3c1yqBwWFcDkMTBxOe.4qSFkCjFNGdtpQl4x8YAXGdpBgJtGPW', 'Rodrigo Giuntini', 'community_member', 1, 1, 30, 'Desenvolvedor e entusiasta de tecnologia ambiental', 1, 'pt-BR', NOW()),
(4, 'joao.silva@ecosolo.com', '$2b$12$LQv3c1yqBwWFcDkMTBxOe.4qSFkCjFNGdtpQl4x8YAXGdpBgJtGPW', 'João Silva', 'community_member', 1, 0, 38, 'Morador local, agricultor e ativista ambiental', 1, 'pt-BR', NOW()),
(5, 'maria.oliveira@ecosolo.com', '$2b$12$LQv3c1yqBwWFcDkMTBxOe.4qSFkCjFNGdtpQl4x8YAXGdpBgJtGPW', 'Maria Oliveira', 'researcher', 1, 1, 45, 'Pesquisadora em ciências ambientais, especialista em análise de solo', 1, 'pt-BR', NOW()),
(6, 'carlos.santos@ecosolo.com', '$2b$12$LQv3c1yqBwWFcDkMTBxOe.4qSFkCjFNGdtpQl4x8YAXGdpBgJtGPW', 'Carlos Santos', 'community_member', 1, 0, 32, 'Técnico agrícola, especialista em conservação do solo', 1, 'pt-BR', NOW());

-- Inserir análises de solo
INSERT INTO `soil_analyses` (`id`, `user_id`, `title`, `location`, `coordinates`, `sector`, `soil_type`, `ph_level`, `humidity`, `temperature`, `nitrogen`, `phosphorus`, `potassium`, `calcium`, `magnesium`, `sulfur`, `texture`, `water_retention`, `drainage`, `organic_matter`, `fertility_level`, `recommendations`, `status`, `notes`, `images`, `analysis_date`) VALUES
(1, 1, 'Análise Solo Setor A - Fazenda São José', 'Fazenda São José, Rondônia', '{"lat": -8.7619, "lng": -63.9039}', 'Setor A', 'clay', 6.2, 25.00, 28.50, 45.20, 12.80, 180.50, 420.00, 85.00, 15.20, 'Fina', 'Alta', 'Boa', 3.20, 'Moderada', 'Solo com boa capacidade de retenção de água. Recomenda-se aplicação de calcário para correção do pH e adubação com fósforo.', 'completed', 'Análise realizada em condições ideais de umidade.', '["https://example.com/soil1.jpg", "https://example.com/soil2.jpg"]', NOW()),
(2, 2, 'Análise Solo Setor B - Área de Reflorestamento', 'Área de Reflorestamento, Porto Velho', '{"lat": -8.7612, "lng": -63.8977}', 'Setor B', 'sandy', 5.8, 18.00, 32.10, 28.50, 8.20, 95.00, 180.00, 45.00, 8.80, 'Grossa', 'Baixa', 'Excessiva', 1.80, 'Baixa', 'Solo arenoso com baixa fertilidade. Necessário enriquecimento com matéria orgânica e sistema de irrigação adequado.', 'completed', 'Solo adequado para reflorestamento com espécies nativas adaptadas.', '["https://example.com/soil3.jpg"]', NOW()),
(3, 5, 'Análise Solo - Área Degradada Rio Madeira', 'Margem do Rio Madeira, Rondônia', '{"lat": -8.7650, "lng": -63.8800}', 'Área Crítica 1', 'silty', 4.5, 35.00, 26.80, 15.20, 5.10, 45.00, 80.00, 20.00, 4.20, 'Média', 'Média', 'Ruim', 0.80, 'Baixa', 'Solo severamente degradado. Requer processo intensivo de recuperação com adição de matéria orgânica, correção de pH e drenagem.', 'completed', 'Área afetada por atividades de mineração. Necessita intervenção urgente.', '["https://example.com/soil4.jpg", "https://example.com/soil5.jpg"]', NOW());

-- Inserir ocorrências
INSERT INTO `occurrences` (`id`, `reported_by_id`, `title`, `description`, `occurrence_type`, `severity`, `location`, `coordinates`, `images`, `status`, `resolution_notes`) VALUES
(1, 2, 'Desmatamento Ilegal - Fazenda Esperança', 'Área de aproximadamente 5 hectares foi desmatada sem autorização ambiental. Foram encontrados vestígios de maquinário pesado e queimadas.', 'deforestation', 'high', 'Fazenda Esperança, Km 45 - RO-010', '{"lat": -8.7500, "lng": -63.9200}', '["https://example.com/deforestation1.jpg", "https://example.com/deforestation2.jpg"]', 'investigating', NULL),
(2, 4, 'Contaminação de Água - Rio Verde', 'Mortandade de peixes e mudança na coloração da água do Rio Verde. Suspeita de descarte irregular de efluentes industriais.', 'water_contamination', 'critical', 'Rio Verde, próximo à Indústria XYZ', '{"lat": -8.7300, "lng": -63.8500}', '["https://example.com/water1.jpg"]', 'confirmed', NULL),
(3, 6, 'Erosão do Solo - Estrada Rural', 'Processo erosivo intenso na estrada rural causando perda de solo fértil e assoreamento de curso d\'água próximo.', 'soil_degradation', 'medium', 'Estrada Rural RO-135, Km 12', '{"lat": -8.7800, "lng": -63.9500}', '["https://example.com/erosion1.jpg"]', 'reported', NULL);

-- Inserir alertas
INSERT INTO `alerts` (`id`, `user_id`, `title`, `message`, `alert_type`, `severity`, `status`, `location`, `coordinates`, `action_required`, `occurrence_id`, `soil_analysis_id`) VALUES
(1, 1, 'Nova Ocorrência Reportada', 'Uma nova ocorrência de desmatamento foi reportada na Fazenda Esperança. Requer investigação imediata.', 'occurrence', 'warning', 'active', 'Fazenda Esperança', '{"lat": -8.7500, "lng": -63.9200}', 1, 1, NULL),
(2, 2, 'Análise de Solo Concluída', 'A análise de solo do Setor A foi concluída. Resultados disponíveis para visualização.', 'soil_analysis', 'info', 'active', 'Fazenda São José', '{"lat": -8.7619, "lng": -63.9039}', 0, NULL, 1),
(3, 4, 'Alerta Crítico - Contaminação', 'Contaminação crítica detectada no Rio Verde. Ação imediata necessária.', 'environmental', 'critical', 'active', 'Rio Verde', '{"lat": -8.7300, "lng": -63.8500}', 1, 2, NULL),
(4, 5, 'Área Degradada Identificada', 'Área severamente degradada identificada próxima ao Rio Madeira. Recomenda-se plano de recuperação.', 'environmental', 'error', 'active', 'Rio Madeira', '{"lat": -8.7650, "lng": -63.8800}', 1, NULL, 3);

-- ============================================================
-- CONFIGURAÇÕES FINAIS
-- ============================================================

-- Reativar verificações de chave estrangeira
SET FOREIGN_KEY_CHECKS = 1;

-- Informações sobre o dump
SELECT 'Database SoloSano criado com sucesso!' as Status;
SELECT COUNT(*) as Total_Users FROM users;
SELECT COUNT(*) as Total_Soil_Analyses FROM soil_analyses;
SELECT COUNT(*) as Total_Occurrences FROM occurrences;
SELECT COUNT(*) as Total_Alerts FROM alerts;

-- ============================================================
-- CREDENCIAIS DE TESTE
-- ============================================================
/*
CREDENCIAIS PARA TESTE:

👑 ADMIN:
Email: admin@ecosolo.com
Senha: admin123

👤 LÍDER COMUNITÁRIO:
Email: priya@example.com  
Senha: 123456

👥 USUÁRIO COMUM:
Email: rodrigo.giuntini@gmail.com
Senha: 123456

👥 OUTROS USUÁRIOS:
Email: joao.silva@ecosolo.com
Senha: 123456

🔬 PESQUISADOR:
Email: maria.oliveira@ecosolo.com
Senha: 123456

👷 TÉCNICO:
Email: carlos.santos@ecosolo.com
Senha: 123456

NOTA: Todas as senhas estão hasheadas com bcrypt.
Hash padrão para "123456": $2b$12$LQv3c1yqBwWFcDkMTBxOe.4qSFkCjFNGdtpQl4x8YAXGdpBgJtGPW
Hash para "admin123": $2b$12$LQv3c1yqBwWFcDkMTBxOe.4qSFkCjFNGdtpQl4x8YAXGdpBgJtGPW
*/

-- ============================================================
-- FIM DO DUMP
-- ============================================================ 