import { request } from 'graphql-request';
import { startServer } from '../src/app';
import { Http2Server } from 'http2';

const port = 4000;
const testHost = `http://localhost:${port}/graphql`;

describe('Resolver - User', () => {
  let server: Http2Server;
  const name = 'dooboo1';
  const email = `${name}@dooboo.com`;
  const password = 'password';

  const mutation = `
    mutation {
      signup(email: "${email}", password: "${password}", name: "${name}") {
        token,
        user {
          email
        }
      }
    }
  `;

  beforeAll(async () => {
    server = await startServer();
  });

  it('should signup user', async () => {
    const response: any = await request(testHost, mutation);
    console.log('response', JSON.stringify(response));

    expect(response).toHaveProperty('signup');
    expect(response.signup).toHaveProperty('token');
    expect(response.signup).toHaveProperty('user');
    expect(response.signup.user.email).toEqual(email);
  });

  afterAll(() => {
    server.close();
  });
});
