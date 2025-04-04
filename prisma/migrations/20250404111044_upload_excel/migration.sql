-- CreateTable
CREATE TABLE "UploadExcel" (
    "id" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "academicTerm" TEXT NOT NULL,
    "academicYr" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UploadExcel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UploadExcel" ADD CONSTRAINT "UploadExcel_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
