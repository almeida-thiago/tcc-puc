/* CREATES USERS TABLE */
CREATE TABLE IF NOT EXISTS tbu_001_users (
	username VARCHAR(45) NOT NULL COMMENT 'Username',
  password MEDIUMTEXT NULL COMMENT 'Password hash',
	person_id VARCHAR(36) NOT NULL COMMENT 'Person identification hash',
	permission_id INTEGER NOT NULL COMMENT 'Permission identification',
  google_id MEDIUMTEXT NULL COMMENT 'Google id',
  login_tries INTEGER(1) DEFAULT 0 NOT NULL COMMENT 'Login tries',
	secret_code MEDIUMTEXT NULL COMMENT 'Secret code',
	status BOOL DEFAULT 1 NOT NULL COMMENT 'Status (1 - active / 0 - inactive)',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
	last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Last update date',
	CONSTRAINT USERS_PK PRIMARY KEY (username),
  CONSTRAINT USERS_PEOPLE_FK FOREIGN KEY (person_id) REFERENCES tbp_001_people (id) ON DELETE RESTRICT,
	CONSTRAINT USERS_PERMISSION_FK FOREIGN KEY (permission_id) REFERENCES tbu_002_users_permissions (id) ON DELETE RESTRICT,
  UNIQUE KEY USERNAME_ID_UN (username)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='Users.';

/* SELECT USERS WITH PEOPLE, PRIMARY EMAIL AND TELEPHONE */
SELECT 
	users.username AS username,
	users.password AS password_hash,
	users.permission_id AS permission_id,
	users_permissions.name AS permission, 
	users.facebook_id AS facebook_id,
	users.google_id AS google_id,
	users.login_tries AS login_tries,
	users.secret_code AS secret_code,
	users.person_id AS person_id,
	people.name AS name, 
	people_emails.email AS email,
	people_telephones.phone_number AS phone_number,
	users.status AS status,
	users.created_at AS created_at,
	users.last_updated_at AS last_updated_at
FROM 
	tbu_001_users AS users, 
	tbu_002_users_permissions AS users_permissions,
	tbp_001_people AS people, 
	tbp_002_people_emails AS people_emails, 
	tbp_003_people_telephones AS people_telephones 
WHERE 
	people.id = users.person_id
	AND users.permission_id = users_permissions.id
	AND people_emails.person_id = people.id 
	AND people_emails.is_primary = 1
	AND people_telephones.person_id = people.id
	AND people_telephones.is_primary = 1;
	