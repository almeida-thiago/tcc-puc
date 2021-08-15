/* CREATES PEOPLE PHONE NUMBERS TABLE */
CREATE TABLE IF NOT EXISTS tbp_003_people_phone_numbers (
	id INTEGER auto_increment NOT NULL COMMENT 'Identification number',
	phone_number VARCHAR(15) NOT NULL COMMENT 'Phone number',
	person_id VARCHAR(36) NOT NULL COMMENT 'Person identification hash',
	is_primary BOOL DEFAULT 0 NOT NULL COMMENT 'Is primary phone number (1 - yes / 0 - no)',
	status BOOL DEFAULT 1 NOT NULL COMMENT 'Status (1 - active / 0 - inactive)',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
	last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Last update date',
	CONSTRAINT PEOPLE_PK PRIMARY KEY (phone_number),
	CONSTRAINT USERS_PEOPLE_TELEPHONES_FK FOREIGN KEY (person_id) REFERENCES tbp_001_people (id) ON DELETE RESTRICT,
	UNIQUE KEY PEOPLE_ID_UN (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='People phone numbers.';
