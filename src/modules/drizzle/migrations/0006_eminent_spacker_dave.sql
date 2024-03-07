CREATE TABLE IF NOT EXISTS "campuses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"organization_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"host" uuid,
	"status" text NOT NULL,
	"scan_type" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "buildings" DROP CONSTRAINT "buildings_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "logs" DROP CONSTRAINT "logs_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "logs" DROP CONSTRAINT "logs_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "antivirus" ADD COLUMN "host" uuid;--> statement-breakpoint
ALTER TABLE "antivirus" ADD COLUMN "db_version" text NOT NULL;--> statement-breakpoint
ALTER TABLE "antivirus" ADD COLUMN "last_update" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "antivirus" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "antivirus" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "buildings" ADD COLUMN "campus_id" uuid;--> statement-breakpoint
ALTER TABLE "buildings" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "buildings" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "room_id" uuid;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "cpu" text NOT NULL;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "memory" text NOT NULL;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "gpu" text NOT NULL;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "hard_disk" text NOT NULL;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "os" text NOT NULL;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "model" text NOT NULL;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "ip_address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "logs" ADD COLUMN "host" uuid;--> statement-breakpoint
ALTER TABLE "logs" ADD COLUMN "log" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_types" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_types" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_types" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "antivirus" ADD CONSTRAINT "antivirus_host_hosts_id_fk" FOREIGN KEY ("host") REFERENCES "hosts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "buildings" ADD CONSTRAINT "buildings_campus_id_campuses_id_fk" FOREIGN KEY ("campus_id") REFERENCES "campuses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hosts" ADD CONSTRAINT "hosts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hosts" ADD CONSTRAINT "hosts_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "logs" ADD CONSTRAINT "logs_host_hosts_id_fk" FOREIGN KEY ("host") REFERENCES "hosts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "buildings" DROP COLUMN IF EXISTS "organization_id";--> statement-breakpoint
ALTER TABLE "logs" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "logs" DROP COLUMN IF EXISTS "organization_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campuses" ADD CONSTRAINT "campuses_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scans" ADD CONSTRAINT "scans_host_hosts_id_fk" FOREIGN KEY ("host") REFERENCES "hosts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scans" ADD CONSTRAINT "scans_scan_type_scan_types_id_fk" FOREIGN KEY ("scan_type") REFERENCES "scan_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
