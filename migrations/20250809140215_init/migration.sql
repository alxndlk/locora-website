-- CreateEnum
CREATE TYPE "public"."PlanName" AS ENUM ('basic', 'pro', 'one_time', 'one_time_editing');

-- CreateTable
CREATE TABLE "public"."user_profiles" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "avatar" VARCHAR(500),
    "auth_providers" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login_at" TIMESTAMP(3),
    "preferences" JSONB,
    "home_location" JSONB,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."visited_cities" (
    "id" TEXT NOT NULL,
    "json_name" VARCHAR(255),
    "achieved_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "visited_cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."visited_countries" (
    "id" TEXT NOT NULL,
    "json_name" VARCHAR(255),
    "achieved_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "visited_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."achievements" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "achieved_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."plans" (
    "id" TEXT NOT NULL,
    "name" "public"."PlanName" NOT NULL,
    "connected_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_email_key" ON "public"."user_profiles"("email");

-- CreateIndex
CREATE INDEX "visited_cities_user_id_idx" ON "public"."visited_cities"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "visited_cities_user_id_json_name_key" ON "public"."visited_cities"("user_id", "json_name");

-- CreateIndex
CREATE INDEX "visited_countries_user_id_idx" ON "public"."visited_countries"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "visited_countries_user_id_json_name_key" ON "public"."visited_countries"("user_id", "json_name");

-- CreateIndex
CREATE INDEX "achievements_user_id_idx" ON "public"."achievements"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "achievements_user_id_key_key" ON "public"."achievements"("user_id", "key");

-- CreateIndex
CREATE UNIQUE INDEX "plans_user_id_key" ON "public"."plans"("user_id");

-- AddForeignKey
ALTER TABLE "public"."visited_cities" ADD CONSTRAINT "visited_cities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."visited_countries" ADD CONSTRAINT "visited_countries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."achievements" ADD CONSTRAINT "achievements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plans" ADD CONSTRAINT "plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
