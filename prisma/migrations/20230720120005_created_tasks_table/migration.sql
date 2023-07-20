-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "time" TIMESTAMP(3) NOT NULL,
    "is_daily" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
