ALTER TABLE "visits" ALTER COLUMN "visit_number" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "visits" ADD COLUMN "url" text;