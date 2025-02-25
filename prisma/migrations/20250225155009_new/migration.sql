-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "fName" TEXT NOT NULL,
    "lName" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "classSection" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_studentId_key" ON "students"("studentId");
