CREATE TABLE IF NOT EXISTS "requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"method" text,
	"url" text,
	"headers" jsonb,
	"destination" text,
	"referrer" text,
	"referrer_policy" text,
	"mode" text,
	"credentials" text,
	"cache" text,
	"redirect" text,
	"integrity" text,
	"keepalive" boolean DEFAULT false,
	"ip" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now()
);
