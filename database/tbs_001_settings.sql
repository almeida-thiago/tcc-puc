/* CREATES SETTINGS TABLE */
CREATE TABLE IF NOT EXISTS tbs_001_settings (
	id INTEGER auto_increment NOT NULL COMMENT 'Settings dentification number',
	email_user VARCHAR(250) NOT NULL COMMENT 'E-mail user name',
  email_password VARCHAR(120) NOT NULL COMMENT 'E-mail password',
  email_imap_host VARCHAR(250) NOT NULL COMMENT 'E-mail imap host',
  email_imap_port VARCHAR(5) NOT NULL COMMENT 'E-mail imap port',
	email_smtp_host VARCHAR(250) NOT NULL COMMENT 'E-mail smtp host',
  email_smtp_port VARCHAR(5) NOT NULL COMMENT 'E-mail smtp port',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
	last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Last update date',
	CONSTRAINT SETTINGS_PK PRIMARY KEY (id),
	UNIQUE KEY SETTINGS_ID_UN (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='Application settings.';
