ALTER TABLE "buildings" ALTER COLUMN "metadata" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "campuses" ALTER COLUMN "metadata" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "metadata" SET DEFAULT '{}'::jsonb;