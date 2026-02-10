CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"slug" varchar(64) NOT NULL,
	CONSTRAINT "category_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"short_description" varchar(255),
	"description" text,
	"price" integer NOT NULL,
	"sizes" varchar[] NOT NULL,
	"colors" varchar[] NOT NULL,
	"images" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"category_slug" varchar(64) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_category_slug_category_slug_fk" FOREIGN KEY ("category_slug") REFERENCES "public"."category"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_id_idx" ON "product" USING btree ("id");--> statement-breakpoint
CREATE INDEX "product_category_slug_idx" ON "product" USING btree ("category_slug");--> statement-breakpoint
CREATE INDEX "product_price_idx" ON "product" USING btree ("price");