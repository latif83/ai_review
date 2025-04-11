/*
  Warnings:

  - You are about to drop the column `teacherId` on the `ClassSections` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassSections" DROP CONSTRAINT "ClassSections_teacherId_fkey";

-- AlterTable
ALTER TABLE "ClassSections" DROP COLUMN "teacherId";

-- AlterTable
ALTER TABLE "Classes" ADD COLUMN     "teacherId" TEXT,
ADD COLUMN     "teachersId" TEXT;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_teachersId_fkey" FOREIGN KEY ("teachersId") REFERENCES "Teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
