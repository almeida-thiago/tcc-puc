/* CREATES HELPDESK DEPARTAMENTS TABLE */
CREATE TABLE IF NOT EXISTS tbt_006_departaments (
	id INTEGER auto_increment NOT NULL COMMENT 'Identification number',
	name VARCHAR(45) NOT NULL COMMENT 'Departament name',
	status BOOL DEFAULT 1 NOT NULL COMMENT 'Status (1 - active / 0 - inactive)',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
	last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Last update date',
	CONSTRAINT HELPDESK_DEPARTAMENTS_PK PRIMARY KEY (id),
	UNIQUE KEY HELPDESK_DEPARTAMENTS_ID_UN (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='Helpdesk departaments.';

/* INSERT DEFAULT VALUES */
INSERT INTO tbt_006_departaments (name) VALUES('support');
INSERT INTO tbt_006_departaments (name) VALUES('customer success');
INSERT INTO tbt_006_departaments (name) VALUES('financial');
INSERT INTO tbt_006_departaments (name) VALUES('projects');
