"""Initial migration - Create all tables

Revision ID: 001
Revises: 
Create Date: 2024-01-15 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create enum types
    op.execute("CREATE TYPE userrole AS ENUM ('admin', 'community_leader', 'community_member', 'researcher')")
    op.execute("CREATE TYPE soiltype AS ENUM ('clay', 'sandy', 'loamy', 'silty', 'peat', 'chalky')")
    op.execute("CREATE TYPE analysisstatus AS ENUM ('pending', 'processing', 'completed', 'failed')")
    op.execute("CREATE TYPE occurrencetype AS ENUM ('deforestation', 'illegal_mining', 'poaching', 'pollution', 'fire', 'erosion', 'contamination')")
    op.execute("CREATE TYPE severitylevel AS ENUM ('low', 'medium', 'high', 'critical')")
    op.execute("CREATE TYPE occurrencestatus AS ENUM ('reported', 'investigating', 'confirmed', 'resolved', 'dismissed')")
    op.execute("CREATE TYPE alerttype AS ENUM ('soil_contamination', 'water_pollution', 'air_quality', 'deforestation', 'illegal_logging', 'illegal_mining', 'poaching', 'fire_risk', 'flood_risk', 'drought', 'pest_outbreak', 'disease_outbreak')")
    op.execute("CREATE TYPE alertseverity AS ENUM ('low', 'medium', 'high', 'critical')")
    op.execute("CREATE TYPE alertstatus AS ENUM ('active', 'acknowledged', 'resolved', 'dismissed')")

    # Create users table
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('role', postgresql.ENUM('admin', 'community_leader', 'community_member', 'researcher', name='userrole'), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.Column('is_verified', sa.Boolean(), nullable=True),
        sa.Column('age', sa.Integer(), nullable=True),
        sa.Column('bio', sa.Text(), nullable=True),
        sa.Column('avatar_url', sa.String(), nullable=True),
        sa.Column('notifications_enabled', sa.Boolean(), nullable=True),
        sa.Column('language', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('last_login', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)

    # Create soil_analyses table
    op.create_table('soil_analyses',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('location', sa.String(), nullable=False),
        sa.Column('coordinates', sa.JSON(), nullable=True),
        sa.Column('sector', sa.String(), nullable=True),
        sa.Column('status', postgresql.ENUM('pending', 'processing', 'completed', 'failed', name='analysisstatus'), nullable=True),
        sa.Column('analysis_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('soil_type', postgresql.ENUM('clay', 'sandy', 'loamy', 'silty', 'peat', 'chalky', name='soiltype'), nullable=True),
        sa.Column('ph_level', sa.Float(), nullable=True),
        sa.Column('humidity', sa.Float(), nullable=True),
        sa.Column('temperature', sa.Float(), nullable=True),
        sa.Column('nitrogen', sa.Float(), nullable=True),
        sa.Column('phosphorus', sa.Float(), nullable=True),
        sa.Column('potassium', sa.Float(), nullable=True),
        sa.Column('calcium', sa.Float(), nullable=True),
        sa.Column('magnesium', sa.Float(), nullable=True),
        sa.Column('sulfur', sa.Float(), nullable=True),
        sa.Column('texture', sa.String(), nullable=True),
        sa.Column('water_retention', sa.String(), nullable=True),
        sa.Column('drainage', sa.String(), nullable=True),
        sa.Column('organic_matter', sa.Float(), nullable=True),
        sa.Column('fertility_level', sa.String(), nullable=True),
        sa.Column('recommendations', sa.Text(), nullable=True),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('images', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create occurrences table
    op.create_table('occurrences',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('occurrence_type', postgresql.ENUM('deforestation', 'illegal_mining', 'poaching', 'pollution', 'fire', 'erosion', 'contamination', name='occurrencetype'), nullable=False),
        sa.Column('severity', postgresql.ENUM('low', 'medium', 'high', 'critical', name='severitylevel'), nullable=False),
        sa.Column('status', postgresql.ENUM('reported', 'investigating', 'confirmed', 'resolved', 'dismissed', name='occurrencestatus'), nullable=True),
        sa.Column('location', sa.String(), nullable=False),
        sa.Column('coordinates', sa.JSON(), nullable=True),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('additional_notes', sa.Text(), nullable=True),
        sa.Column('images', sa.JSON(), nullable=True),
        sa.Column('evidence_files', sa.JSON(), nullable=True),
        sa.Column('occurred_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('investigation_notes', sa.Text(), nullable=True),
        sa.Column('resolution_notes', sa.Text(), nullable=True),
        sa.Column('resolved_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('reported_by_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['reported_by_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create alerts table
    op.create_table('alerts',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('alert_type', postgresql.ENUM('soil_contamination', 'water_pollution', 'air_quality', 'deforestation', 'illegal_logging', 'illegal_mining', 'poaching', 'fire_risk', 'flood_risk', 'drought', 'pest_outbreak', 'disease_outbreak', name='alerttype'), nullable=False),
        sa.Column('severity', postgresql.ENUM('low', 'medium', 'high', 'critical', name='alertseverity'), nullable=False),
        sa.Column('status', postgresql.ENUM('active', 'acknowledged', 'resolved', 'dismissed', name='alertstatus'), nullable=True),
        sa.Column('location', sa.String(), nullable=True),
        sa.Column('coordinates', sa.JSON(), nullable=True),
        sa.Column('affected_area', sa.String(), nullable=True),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('details', sa.Text(), nullable=True),
        sa.Column('source', sa.String(), nullable=True),
        sa.Column('confidence_level', sa.Integer(), nullable=True),
        sa.Column('recommended_actions', sa.Text(), nullable=True),
        sa.Column('emergency_contact', sa.String(), nullable=True),
        sa.Column('triggered_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('acknowledged_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('resolved_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('notifications_sent', sa.Boolean(), nullable=True),
        sa.Column('notification_channels', sa.JSON(), nullable=True),
        sa.Column('images', sa.JSON(), nullable=True),
        sa.Column('data_sources', sa.JSON(), nullable=True),
        sa.Column('related_occurrence_id', sa.Integer(), nullable=True),
        sa.Column('related_analysis_id', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['related_analysis_id'], ['soil_analyses.id'], ),
        sa.ForeignKeyConstraint(['related_occurrence_id'], ['occurrences.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    # Drop tables
    op.drop_table('alerts')
    op.drop_table('occurrences')
    op.drop_table('soil_analyses')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    
    # Drop enum types
    op.execute("DROP TYPE IF EXISTS alertstatus")
    op.execute("DROP TYPE IF EXISTS alertseverity")
    op.execute("DROP TYPE IF EXISTS alerttype")
    op.execute("DROP TYPE IF EXISTS occurrencestatus")
    op.execute("DROP TYPE IF EXISTS severitylevel")
    op.execute("DROP TYPE IF EXISTS occurrencetype")
    op.execute("DROP TYPE IF EXISTS analysisstatus")
    op.execute("DROP TYPE IF EXISTS soiltype")
    op.execute("DROP TYPE IF EXISTS userrole") 