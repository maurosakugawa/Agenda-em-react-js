// back/test/setup.js
import { beforeAll, afterAll } from 'vitest';
import { closeDb, getDb } from '../src/db/index.js';

beforeAll(async () => {
    await getDb();
});

afterAll(async () => {
    await closeDb();
});