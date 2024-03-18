ALTER TABLE "hosts" ADD COLUMN "admin_id" uuid;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "status" text DEFAULT 'offline';--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "vpn_config" jsonb DEFAULT 'null'::jsonb;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hosts" ADD CONSTRAINT "hosts_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
