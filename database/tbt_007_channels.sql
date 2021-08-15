/* CREATES HELPDESK CHANNELS TABLE */
CREATE TABLE IF NOT EXISTS tbt_007_channels (
	id INTEGER auto_increment NOT NULL COMMENT 'Identification number',
	name VARCHAR(45) NOT NULL COMMENT 'Channel name',
	status BOOL DEFAULT 1 NOT NULL COMMENT 'Status (1 - active / 0 - inactive)',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Creation date',
	last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Last update date',
	CONSTRAINT HELPDESK_CHANNELS_PK PRIMARY KEY (id),
	UNIQUE KEY HELPDESK_CHANNELS_ID_UN (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci
COMMENT='Helpdesk channels.';

/* INSERT DEFAULT VALUES */
INSERT INTO tbt_007_channels (name) VALUES('email');
INSERT INTO tbt_007_channels (name) VALUES('phone');
INSERT INTO tbt_007_channels (name) VALUES('whatsapp');
