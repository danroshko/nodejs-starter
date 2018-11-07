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

  test('postgres route', async () => {
    const r = await got.get(BASE + 'postgres', { json: true });

    expect(r.statusCode).toEqual(200);
    expect(r.body).toEqual({ result: [] });
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

describe('cors', () => {
  const url = BASE + 'app';

  test('requests from unlisted origins are blocked', async () => {
    expect.assertions(2);

    try {
      await got.get(url, { headers: { Origin: 'http://foo.com' } });
    } catch (error) {
      expect(error.response.statusCode).toEqual(403);
      expect(error.response.body).toEqual('Origin is not allowed');
    }
  });

  test('requests from listed origins are allowed', async () => {
    const r = await got.get(url, { headers: { Origin: 'http://localhost:4200' } });

    expect(r.statusCode).toEqual(200);
    expect(r.headers['access-control-allow-origin']).toEqual('http://localhost:4200');
    expect(r.headers['access-control-allow-methods']).toEqual('GET,HEAD,POST,PATCH,PUT,DELETE');
    expect(r.headers['access-control-allow-credentials']).toEqual('true');
  });

  test('responds to a HEAD request', async () => {
    const r = await got.head(url, { headers: { Origin: 'http://localhost:4200' } });

    expect(r.statusCode).toEqual(200);
    expect(r.headers['access-control-allow-origin']).toEqual('http://localhost:4200');
    expect(r.headers['access-control-allow-methods']).toEqual('GET,HEAD,POST,PATCH,PUT,DELETE');
    expect(r.headers['access-control-allow-credentials']).toEqual('true');
  });
});
