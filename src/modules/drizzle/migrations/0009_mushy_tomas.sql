ALTER TABLE "antivirus" ALTER COLUMN "last_update" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "vulnerabilities" ADD COLUMN "severity" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vulnerabilities" ADD COLUMN "description" text;