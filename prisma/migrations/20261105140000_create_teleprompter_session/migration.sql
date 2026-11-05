CREATE TABLE "TeleprompterSession" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "isPlaying" BOOLEAN NOT NULL DEFAULT false,
    "position" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "speed" DOUBLE PRECISION NOT NULL DEFAULT 36,
    "fontSize" INTEGER NOT NULL DEFAULT 54,
    "rotation" INTEGER NOT NULL DEFAULT 0,
    "mirrorHorizontal" BOOLEAN NOT NULL DEFAULT false,
    "mirrorVertical" BOOLEAN NOT NULL DEFAULT false,
    "alignment" TEXT NOT NULL DEFAULT 'left',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "scriptId" TEXT NOT NULL,
    CONSTRAINT "TeleprompterSession_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "TeleprompterSession_publicId_key" ON "TeleprompterSession"("publicId");
CREATE UNIQUE INDEX "TeleprompterSession_userId_key" ON "TeleprompterSession"("userId");
CREATE INDEX "TeleprompterSession_publicId_active_idx" ON "TeleprompterSession"("publicId", "active");
ALTER TABLE "TeleprompterSession" ADD CONSTRAINT "TeleprompterSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TeleprompterSession" ADD CONSTRAINT "TeleprompterSession_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "Script"("id") ON DELETE CASCADE ON UPDATE CASCADE;
