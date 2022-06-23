/*
  Warnings:

  - A unique constraint covering the columns `[commentId,userId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[likeId,userId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Notification_commentId_userId_key" ON "Notification"("commentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_likeId_userId_key" ON "Notification"("likeId", "userId");
