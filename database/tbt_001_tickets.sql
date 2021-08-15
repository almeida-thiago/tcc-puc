/* CREATES TICKETS TABLE */
CREATE TABLE IF NOT EXISTS tbt_001_tickets (
	id VARCHAR(13) NOT NULL COMMENT 'Identification code',
	type_id INT NOT NULL COMMENT 'Type identification number',
	status_id INT NOT NULL COMMENT 'Status identification number',
	departament_id INT NULL COMMENT 'Departament identification number',
    channel_id INT NOT NULL COMMENT 'Channel identification number',
	owner_id VARCHAR(36) NOT NULL COMMENT 'Owner person identification hash',
	agent_id VARCHAR(36) NULL COMMENT 'Agent person identification hash',
	title VARCHAR(120) NOT NULL COMMENT 'Title',
	last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Last update date',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
	CONSTRAINT TICKETS_PK PRIMARY KEY (id),
  CONSTRAINT TICKETS_TYPES_FK FOREIGN KEY (type_id) REFERENCES tbt_004_tickets_types (id) ON DELETE RESTRICT,
  CONSTRAINT TICKETS_STATUS_FK FOREIGN KEY (status_id) REFERENCES tbt_003_tickets_status (id) ON DELETE RESTRICT,
  CONSTRAINT TICKETS_DEPARTAMENTS_FK FOREIGN KEY (departament_id) REFERENCES tbt_006_departaments (id) ON DELETE RESTRICT,
  CONSTRAINT TICKETS_CHANNELS_FK FOREIGN KEY (channel_id) REFERENCES tbt_007_channels (id) ON DELETE RESTRICT,
  CONSTRAINT TICKETS_OWNERS_FK FOREIGN KEY (owner_id) REFERENCES tbp_001_people (id) ON DELETE RESTRICT,
  CONSTRAINT TICKETS_AGENTS_FK FOREIGN KEY (agent_id) REFERENCES tbp_001_people (id) ON DELETE RESTRICT,
	UNIQUE KEY TIKETS_ID_UN (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='Tickets.';
