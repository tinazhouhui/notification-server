-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_likeId_fkey";

-- CreateIndex
CREATE INDEX "Notification_likeId_commentId_idx" ON "Notification"("likeId", "commentId");
