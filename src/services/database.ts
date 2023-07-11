import { PrismaClient } from "@prisma/client";

let database: PrismaClient;

declare global {
    var __database: PrismaClient | undefined;
}

if (!global.__database) {
    global.__database = new PrismaClient();
}

database = global.__database;

export { database }