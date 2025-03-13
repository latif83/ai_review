-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "academicYr" TEXT,
    "academicTerm" TEXT,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;
