/*
  Warnings:

  - A unique constraint covering the columns `[guid]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tasks_guid_key" ON "tasks"("guid");
