import got from 'got';

const BASE = 'http://127.0.0.1:3000/health/';

describe('health routes', () => {
  test('app route', async () => {
    const r = await got.get(BASE + 'app', { json: true });

    expect(r.statusCode).toEqual(200);
    expect(r.body).toEqual({ result: 'App works' });
  });

  test('redis route', async () => {
    const r = await got.get(BASE + 'redis', { json: true });

    expect(r.statusCode).toEqual(200);
    expect(r.body).toEqual({ result: 'Redis works' });
  });

  test('mongo route', async () => {
    const r = await got.get(BASE + 'mongo', { json: true });

    expect(r.statusCode).toEqual(200);
    expect(r.body).toEqual({ result: 'MongoDB works' });
  });
});
