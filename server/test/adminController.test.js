// No Functional, problems with compilation js code
import request from 'supertest';
import app from '../index'; // Importa tu aplicación express

describe('User endpoints', () => {
  it('should fetch all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Aquí puedes agregar más expectativas según la estructura de tu respuesta
  });

  it('should fetch a user by CUI', async () => {
    const response = await request(app).get('/api/users/20210689'); // Cambia el CUI según tus datos de prueba
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Aquí puedes agregar más expectativas según la estructura de tu respuesta
  });
});
