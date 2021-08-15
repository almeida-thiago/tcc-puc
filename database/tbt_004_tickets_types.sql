/* CREATES TICKETS TYPES TABLE */
CREATE TABLE IF NOT EXISTS tbt_004_tickets_types (
	id INTEGER auto_increment NOT NULL COMMENT 'Identification number',
	name VARCHAR(45) NOT NULL COMMENT 'Type name',
	status BOOL DEFAULT 1 NOT NULL COMMENT 'Status (1 - active / 0 - inactive)',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
	last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Last update date',
	CONSTRAINT TICKETS_TYPES_PK PRIMARY KEY (id),
	UNIQUE KEY TICKETS_TYPES_ID_UN (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='Tickets types.';

/* INSERT DEFAULT VALUES */
INSERT INTO tbt_004_tickets_types (name) VALUES('question');
INSERT INTO tbt_004_tickets_types (name) VALUES('incident');
INSERT INTO tbt_004_tickets_types (name) VALUES('problem');
INSERT INTO tbt_004_tickets_types (name) VALUES('issue');
INSERT INTO tbt_004_tickets_types (name) VALUES('task');
