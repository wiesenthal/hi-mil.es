DO $$ BEGIN
 CREATE TYPE "public"."content_type" AS ENUM('blog', 'quote');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "likes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"content_type" "content_type" NOT NULL,
	"content_slug" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "likes_user_id_content_type_content_slug_unique" UNIQUE("user_id","content_type","content_slug")
);
--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT IF EXISTS "messages_visit_id_user_id_visits_user_id_visit_number_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_visit_id_user_id_visits_visit_number_user_id_fk" FOREIGN KEY ("visit_id","user_id") REFERENCES "public"."visits"("visit_number","user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
