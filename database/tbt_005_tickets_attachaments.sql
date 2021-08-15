/* CREATES TICKETS ATTACHAMENTS TABLE */
CREATE TABLE IF NOT EXISTS tbt_005_tickets_attachaments (
	id INTEGER auto_increment NOT NULL COMMENT 'Identification number',
	ticket_id VARCHAR(20) NOT NULL COMMENT 'Ticket identification number',
	message_id INTEGER NOT NULL COMMENT 'Message identification number',
	name VARCHAR(45) NOT NULL COMMENT 'Attachament name',
  link VARCHAR(120) NOT NULL COMMENT 'Attachament link',
	size INTEGER NOT NULL COMMENT 'Attachament size',
	extention VARCHAR(5) NOT NULL COMMENT 'Attachament extention',
	status BOOL DEFAULT 1 NOT NULL COMMENT 'Status (1 - active / 0 - inactive)',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
	CONSTRAINT TICKETS_ATTACHAMENTS_PK PRIMARY KEY (id),
	CONSTRAINT ATTACHAMENTS_TICKETS_FK FOREIGN KEY (ticket_id) REFERENCES tbt_001_tickets (id) ON DELETE RESTRICT,
  CONSTRAINT ATTACHAMENTS_MESSAGES_FK FOREIGN KEY (message_id) REFERENCES tbt_002_tickets_messages (id) ON DELETE RESTRICT,
	UNIQUE KEY TICKETS_ATTACHAMENTS_ID_UN (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='Tickets attachaments.';
