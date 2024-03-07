ALTER TABLE "antivirus" DROP CONSTRAINT "antivirus_host_hosts_id_fk";
--> statement-breakpoint
ALTER TABLE "logs" DROP CONSTRAINT "logs_host_hosts_id_fk";
--> statement-breakpoint
ALTER TABLE "scans" DROP CONSTRAINT "scans_host_hosts_id_fk";
--> statement-breakpoint
ALTER TABLE "antivirus" ADD COLUMN "hostId" uuid;--> statement-breakpoint
ALTER TABLE "logs" ADD COLUMN "hostId" uuid;--> statement-breakpoint
ALTER TABLE "scans" ADD COLUMN "hostId" uuid;--> statement-breakpoint
ALTER TABLE "vulnerabilities" ADD COLUMN "hostId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "antivirus" ADD CONSTRAINT "antivirus_hostId_hosts_id_fk" FOREIGN KEY ("hostId") REFERENCES "hosts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "logs" ADD CONSTRAINT "logs_hostId_hosts_id_fk" FOREIGN KEY ("hostId") REFERENCES "hosts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scans" ADD CONSTRAINT "scans_hostId_hosts_id_fk" FOREIGN KEY ("hostId") REFERENCES "hosts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "antivirus" DROP COLUMN IF EXISTS "host";--> statement-breakpoint
ALTER TABLE "logs" DROP COLUMN IF EXISTS "host";--> statement-breakpoint
ALTER TABLE "scans" DROP COLUMN IF EXISTS "host";--> statement-breakpoint
ALTER TABLE "vulnerabilities" DROP COLUMN IF EXISTS "target";