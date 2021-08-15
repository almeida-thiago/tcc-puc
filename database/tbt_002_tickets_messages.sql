/* CREATES TICKETS MESSAGES TABLE */
CREATE TABLE IF NOT EXISTS tbt_002_tickets_messages (
	id INTEGER auto_increment NOT NULL COMMENT 'Identification number',
  ticket_id VARCHAR(20) NOT NULL COMMENT 'Ticket identification number',
	person_id VARCHAR(36) NOT NULL COMMENT 'Person identification number',
	message LONGTEXT NOT NULL COMMENT 'message',
	status BOOL DEFAULT 0 NOT NULL COMMENT 'Status (1 - readed / 0 - unread)',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
	CONSTRAINT TICKETS_MESSAGES_PK PRIMARY KEY (id),
	UNIQUE KEY TICKETS_MESSAGES_ID_UN (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='Tickets messages.';

/* SELECT MESSAGE WITH PERSON NAME */
SELECT 
	tickets_messages.id AS id,
  tickets_messages.ticket_id AS ticket_id,
	tickets_messages.person_id AS person_id,
	people.name AS name,
	tickets_messages.message AS message,
	tickets_messages.status AS status,
	tickets_messages.created_at AS created_at
FROM 
	tbp_001_people AS people, 
	tbt_002_tickets_messages AS tickets_messages
WHERE 
	tickets_messages.person_id = people.id;
	