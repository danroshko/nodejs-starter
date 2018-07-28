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

  test('post route', async () => {
    const r = await got.post(BASE + 'body', { json: true, body: { n: 42 } });

    expect(r.statusCode).toEqual(201);
    expect(r.body).toEqual({ result: 'Body parser works' });
  });
});

describe('error status codes', () => {
  test('404', async () => {
    expect.assertions(1);

    try {
      await got.get(BASE + 'asdfgh');
    } catch (error) {
      expect(error.response.statusCode).toEqual(404);
    }
  });

  test('405', async () => {
    expect.assertions(1);

    try {
      await got.post(BASE + 'app', { json: true, body: { text: 'hello' } });
    } catch (error) {
      expect(error.response.statusCode).toEqual(405);
    }
  });

  test('400', async () => {
    expect.assertions(2);

    try {
      await got.post(BASE + 'body', { json: true, body: { n: '42' } });
    } catch (error) {
      expect(error.response.statusCode).toEqual(400);
      expect(error.response.body).toEqual('Expecting number');
    }
  });
});
