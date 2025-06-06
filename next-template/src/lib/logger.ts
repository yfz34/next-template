import pino from "pino";

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
  },
  pino.transport({
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
      {
        target: "pino-roll",
        options: {
          file: "logs/app.log",
          frequency: "daily",
          mkdir: true,
          size: "10M", // 每個日誌文件大小上限
          // compact: true, // 啟用壓縮
          keep: 14, // 保留最近 14 個日誌文件
          // symlink: true, // 創建符號鏈接
        },
        level: process.env.LOG_LEVEL || "info",
      },
    ],
  })
);
