ALTER TABLE "logs" ALTER COLUMN "log" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "raw_info" jsonb DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "has_host" boolean DEFAULT false NOT NULL;