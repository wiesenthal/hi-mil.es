CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visits" (
	"user_id" integer,
	"visit_number" integer NOT NULL,
	"ip" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "visits_user_id_visit_number_pk" PRIMARY KEY("user_id","visit_number")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visits" ADD CONSTRAINT "visits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
CREATE OR REPLACE FUNCTION increment_visit_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.visit_number := COALESCE(
    (SELECT MAX(visit_number) FROM visits WHERE user_id = NEW.user_id),
    0
  ) + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--> statement-breakpoint
CREATE TRIGGER set_visit_number
BEFORE INSERT ON visits
FOR EACH ROW
EXECUTE FUNCTION increment_visit_number();
