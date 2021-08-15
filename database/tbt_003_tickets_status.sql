/* CREATES TICKETS STATUS TABLE */
CREATE TABLE IF NOT EXISTS tbt_003_tickets_status (
	id INTEGER auto_increment NOT NULL COMMENT 'Identification number',
	name VARCHAR(45) NOT NULL COMMENT 'Status name',
	status BOOL DEFAULT 1 NOT NULL COMMENT 'Status (1 - active / 0 - inactive)',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
	last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Last update date',
	CONSTRAINT TICKETS_STATUS_PK PRIMARY KEY (id),
	UNIQUE KEY TICKETS_STATUS_ID_UN (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='Tickets status.';

/* INSERT DEFAULT VALUES */
INSERT INTO tbt_003_tickets_status (name) VALUES('open');
INSERT INTO tbt_003_tickets_status (name) VALUES('closed');
INSERT INTO tbt_003_tickets_status (name) VALUES('pending');
INSERT INTO tbt_003_tickets_status (name) VALUES('waiting');
INSERT INTO tbt_003_tickets_status (name) VALUES('expired');
