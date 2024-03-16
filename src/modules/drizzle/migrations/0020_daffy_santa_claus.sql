ALTER TABLE "buildings" ADD COLUMN "metadata" jsonb DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "campuses" ADD COLUMN "metadata" jsonb DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "image_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "owned_by" uuid;--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "metadata" jsonb DEFAULT '{}' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_owned_by_users_id_fk" FOREIGN KEY ("owned_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
