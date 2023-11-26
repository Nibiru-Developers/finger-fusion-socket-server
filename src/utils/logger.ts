import winston from "winston";

const logger = winston.createLogger({
  level: "error", // Atur level log ke tingkat kesalahan
  format: winston.format.json(), // Format log dalam bentuk JSON
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.Console(), // Output log ke konsol juga
  ],
});

export function handleLog(when: string, error: unknown): void {
  if (error instanceof Error) {
    console.log(error.message);

    logger.error({ when, error: error.message });
  }
}

export default logger;
