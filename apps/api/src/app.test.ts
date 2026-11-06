import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from './app.js';
const valid = { name: 'Visitor', email: 'visitor@example.com', message: 'Hello Ishaan' };
test('validates requests, rejects spam, delivers messages, and limits submissions', async () => {
  let count = 0;
  const app = createApp(async () => { count++; });
  await request(app).post('/api/contact').send({}).expect(400);
  await request(app).post('/api/contact').send({ ...valid, website: 'spam' }).expect(400);
  await request(app).post('/api/contact').send(valid).expect(200);
  assert.equal(count, 1);
  await request(app).post('/api/contact').send(valid);
  await request(app).post('/api/contact').send(valid);
  await request(app).post('/api/contact').send(valid).expect(429);
});
test('reports delivery failure without exposing details', async () => {
  const app = createApp(async () => { throw new Error('secret'); });
  const response = await request(app).post('/api/contact').send(valid).expect(503);
  assert.ok(!response.text.includes('secret'));
});
