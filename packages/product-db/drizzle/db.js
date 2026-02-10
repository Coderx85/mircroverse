"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.DATABASE_URL = void 0;
var serverless_1 = require("@neondatabase/serverless");
var neon_http_1 = require("drizzle-orm/neon-http");
var schema = require("./schema");
exports.DATABASE_URL = process.env.DATABASE_URL || "";
var sql = (0, serverless_1.neon)(exports.DATABASE_URL);
exports.db = (0, neon_http_1.drizzle)(sql, { schema: schema });
