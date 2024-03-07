ALTER TABLE "vulnerabilities" DROP CONSTRAINT "vulnerabilities_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "vulnerabilities" DROP COLUMN IF EXISTS "organization_id";