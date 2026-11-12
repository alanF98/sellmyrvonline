-- Contact requests from the myCROI site (POST /api/contact).
-- The worker also creates this table on first use, so applying this file is optional.
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT,
  business TEXT,
  email TEXT,
  phone TEXT,
  trade TEXT,
  plan TEXT,
  message TEXT,
  sms INTEGER DEFAULT 0
);
