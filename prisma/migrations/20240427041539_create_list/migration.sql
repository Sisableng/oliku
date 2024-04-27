-- CreateEnum
CREATE TYPE "Vehicle" AS ENUM ('CAR', 'MOTORCYCLE');

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cover" TEXT,
    "vehicle" "Vehicle" NOT NULL,
    "vehicleName" TEXT NOT NULL,
    "maxKm" INTEGER NOT NULL,
    "oilCount" INTEGER NOT NULL,
    "oilType" TEXT NOT NULL,
    "lastTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
