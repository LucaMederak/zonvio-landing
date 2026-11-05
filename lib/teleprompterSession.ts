export type TeleprompterSessionState = {
  id: string;
  publicId: string;
  scriptId: string;
  scriptTitle: string;
  content: string;
  active: boolean;
  isPlaying: boolean;
  position: number;
  speed: number;
  fontSize: number;
  rotation: number;
  mirrorHorizontal: boolean;
  mirrorVertical: boolean;
  alignment: "left" | "center";
  updatedAt: string;
  expiresAt: string;
};
