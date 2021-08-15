/* CREATES PEOPLE TABLE */
CREATE TABLE IF NOT EXISTS tbp_001_people (
	id VARCHAR(36) NOT NULL COMMENT 'Identification hash',
	name VARCHAR(250) NOT NULL COMMENT 'Name',
	status BOOL DEFAULT 1 NOT NULL COMMENT 'Status (1 - active / 0 - inactive)',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
  last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Last update date',
	CONSTRAINT PEOPLE_PK PRIMARY KEY (id),
  UNIQUE KEY PEOPLE_ID_UN (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='People.';

/* SELECT PEOPLE WITH PRIMARY EMAIL AND TELEPHONE */
SELECT 
	people.id AS id, 
	people.name AS name, 
	people_emails.email AS email,
	people_telephones.phone_number AS phone_number,
	people.last_updated_at AS status,
	people.created_at AS created_at,
	people.last_updated_at AS last_updated_at
FROM 
	tbp_001_people AS people, 
	tbp_002_people_emails AS people_emails, 
	tbp_003_people_telephones AS people_telephones 
WHERE 
	people_emails.person_id = people.id 
	AND people_emails.is_primary = 1
	AND people_telephones.person_id = people.id
	AND people_telephones.is_primary = 1;
	