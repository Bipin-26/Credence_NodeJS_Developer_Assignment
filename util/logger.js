const fs = require("fs");
const jsZip = require("jszip");

const winston = require("winston");
require("winston-daily-rotate-file");

const { combine, timestamp, json } = winston.format;

const errorLogs = winston.format((info) => {
  return info.level === "error" ? info : false;
});

const fileRotate = new winston.transports.DailyRotateFile({
  level: "info",
  filename: "info-%DATE%.log",
  dirname: "logs/%DATE%",
  datePattern: "YYYY-MM-DD",
  maxFiles: "1d",
  // auditFile:'logs/',
  maxSize: "2m",
});

const errorFileRotate = new winston.transports.DailyRotateFile({
  level: "error",
  filename: "error-%DATE%.log",
  dirname: "logs/%DATE%",
  datePattern: "YYYY-MM-DD",
  maxFiles: "1d",
  maxSize: "2m",
  auditFile: false,
  format: combine(errorLogs(), timestamp(), json()),
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    fileRotate,
    errorFileRotate,
    // new winston.transports.File({ filename: "log_file.log" }),
  ],
});

module.exports = logger;
