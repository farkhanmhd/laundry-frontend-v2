import { SQL } from "bun";

export const db = new SQL({
  // Connection details (adapter is auto-detected as PostgreSQL)
  url: process.env.DATABASE_URL,

  // Connection pool settings
  max: 50, // Maximum connections in pool
  idleTimeout: 30, // Close idle connections after 30s
  maxLifetime: 3600, // Connection lifetime in seconds (0 = forever)
  connectionTimeout: 10, // Timeout when establishing new connections

  // SSL/TLS options
  // tls: process.env.NODE_ENV === "production",
});
