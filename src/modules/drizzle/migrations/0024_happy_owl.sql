ALTER TABLE "hosts" ALTER COLUMN "ip_address" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "hosts" ALTER COLUMN "ip_address" DROP NOT NULL;