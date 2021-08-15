/* CREATES USERS PERMISSIONS TABLE */
CREATE TABLE IF NOT EXISTS tbu_002_users_permissions (
	id INTEGER auto_increment NOT NULL COMMENT 'Identification number',
	name VARCHAR(45) NOT NULL COMMENT 'Permission name',
	level int(1) DEFAULT 5 NOT NULL COMMENT 'Permission restriction level (0 - none to 9 - self only))',
	status BOOL DEFAULT 1 NOT NULL COMMENT 'Status (1 - active / 0 - inactive)',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
	last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Last update date',
	CONSTRAINT USERS_permissions_PK PRIMARY KEY (id),
	UNIQUE KEY USERS_PERMISSIONS_ID_UN (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='Users permissions.';

/* INSERT DEFAULT VALUES */
INSERT INTO tbu_002_users_permissions (name, level) VALUES('master', 0);
INSERT INTO tbu_002_users_permissions (name, level) VALUES('admin', 1);
INSERT INTO tbu_002_users_permissions (name, level) VALUES('manager', 5);
INSERT INTO tbu_002_users_permissions (name, level) VALUES('operator', 9);
INSERT INTO tbu_002_users_permissions (name, level) VALUES('user', 9);
