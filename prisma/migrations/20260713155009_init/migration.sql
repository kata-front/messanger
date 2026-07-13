/*
  Warnings:

  - You are about to drop the `ChatParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ChatParticipant";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_ChatParticipant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ChatParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ChatParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatParticipant_AB_unique" ON "_ChatParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatParticipant_B_index" ON "_ChatParticipant"("B");
