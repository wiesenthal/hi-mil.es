CREATE TABLE IF NOT EXISTS "messages" (
	"user_id" integer,
	"visit_id" integer,
	"message_number" integer DEFAULT 1 NOT NULL,
	"content" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "messages_user_id_visit_id_message_number_pk" PRIMARY KEY("user_id","visit_id","message_number")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_visit_id_user_id_visits_visit_number_user_id_fk" FOREIGN KEY ("visit_id","user_id") REFERENCES "public"."visits"("visit_number","user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
CREATE OR REPLACE FUNCTION increment_message_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.message_number := COALESCE(
    (SELECT MAX(message_number) FROM messages WHERE user_id = NEW.user_id AND visit_id = NEW.visit_id),
    0
  ) + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--> statement-breakpoint
CREATE TRIGGER set_message_number
BEFORE INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION increment_message_number();
