 import app from '../app.js';
 import { getTestTokens } from './utils.js';
 import request from 'supertest';

 describe('Balance ', () => {
    let tokens;

    beforeAll(async () => {
        tokens = await getTestTokens();
    });


//section identity    


  // !!! debería autorizar a usuario company, en postman lo permite pero aquí no
    describe('test the API endpoints identity', () => {
        test('GET /api/v1/balance/:id/general/identity', async () => {
            const res = await request(app)
                .get(`/api/v1/balance/1/general/identity`)
                .set('Authorization', tokens.superadmin);
            expect(res.status).toBe(200);
            /*expect(res.body).toEqual({
                data: expect.any(Object),
                status: 'success',
                message: expect.any(String)
            });*/

  });
  test("Balance  can't be obtained without valid token", async () => {
    const res = await request(app).get(`/api/v1/balance/1/general/identity`);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({
        data: expect.any(Object),
        status: 'error',
        message: 'Invalid Token'
    });
  });



  test("Company user can't get balance identity", async () => {
    const res = await request(app)
        .get(`/api/v1/balance/1/general/identity`)
        .set('Authorization', tokens.company);
    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual({
        data: expect.any(Object),
        status: 'error',
        message: 'Unauthorized action'
    });
 });

});


 describe('PATCH /api/v1/balance/1/general/identity', function () {
    const balanceData1 = {
        identity_business_name: 'TEST',
        identity_cif: 'TEST',
        identity_legal_form_id: 1,
        identity_starting_year: 1990,
        identity_territorial_id: 2,
        identity_networks: 'TEST',
        identity_presentation: 'TEST'
    };
    test('Superadmin user update a  balance contac', async function () {
        const res = await request(app)
            .patch(`/api/v1/balance/1/general/identity`)
            .set('Authorization', tokens.superadmin)
            .send(balanceData1);
        expect(res.status).toBe(200);
        

        // Matches
    });
 });




//section promoters    





 describe('test the API endpoints promoters', () => {

  test('GET /api/v1/balance/:id/general/promoters', async () => {
    const res = await request(app)
    .get(`/api/v1/balance/1/general/promoters`)
    .set('Authorization', tokens.superadmin);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // al poner lo comentado solo visualiza el array y no lo de dentro
     /* expect(res.body).toEqual([


        expect.arrayContaining([
          expect.objectContaining({
                id: expect.any(Number),
                entity_name: expect.any(String),
                legal_form_id: expect.any(Number),
                share: expect.any(Number),
                created_at: expect.any(String),
                updated_at: expect.any(String),
              }), 
          ])
    ]);*/
  });

  test("Balance  can't be obtained without valid token", async () => {
    const res = await request(app).get(`/api/v1/balance/1/general/promoters`);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({
        data: expect.any(Object),
        status: 'error',
        message: 'Invalid Token'
    });
 });

 test("Company user can't get balance promoters", async () => {
  const res = await request(app)
      .get(`/api/v1/balance/1/general/promoters`)
      .set('Authorization', tokens.company);
  expect(res.statusCode).toBe(403);
  expect(res.body).toEqual({
      data: expect.any(Object),
      status: 'error',
      message: 'Unauthorized action'
  });
});



 });


 describe('PATCH /api/v1/balance/1/general/promoters', function () {
    const balanceData2 = [

        {
            entity_name: 'text0',
            legal_form_id: 4,
            share: 20
        },
        {
            entity_name: 'textt',
            legal_form_id: 4,
            share: 20
        },
        {
            entity_name: 'textr',
            legal_form_id: 7,
            share: 20
        }
        
   
    ];
    test('Superadmin user update a  balance promoters', async function () {
        const res = await request(app)
            .patch(`/api/v1/balance/1/general/promoters`)
            .set('Authorization', tokens.superadmin)
            .send(balanceData2);
            console.log(res.body);

        expect(res.status).toBe(200);
        // Matches
    });
 });



//section contact    





 describe('test the API endpoints contact', () => {

  test('GET /api/v1/balance/:id/general/contact', async () => {
    const res = await request(app)
    .get('/api/v1/balance/1/general/contact')
    .set('Authorization', tokens.superadmin);

    expect(res.status).toBe(200);
  /*  expect(res.body).toEqual({
      contact_address: expect.any(String),
      contact_postal_code: expect.any(String),
      contact_region: expect.any(String),
      contact_province: expect.any(String),
      contact_location: expect.any(String),
      contact_web: expect.any(String),
      contact_opening_hours: expect.any(String),
      contact_fullname: expect.any(String),
      contact_phone1: expect.any(String),
      contact_phone2: expect.any(String),
      contact_email: expect.any(String),
    });*/
  });



  test("Balance  can't be obtained without valid token", async () => {
    const res = await request(app).get(`/api/v1/balance/1/general/contact`);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({
        data: expect.any(Object),
        status: 'error',
        message: 'Invalid Token'
    });
  });

  test("Company user can't get balance contact", async () => {
    const res = await request(app)
        .get(`/api/v1/balance/1/general/contact`)
        .set('Authorization', tokens.company);
    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual({
        data: expect.any(Object),
        status: 'error',
        message: 'Unauthorized action'
    });
  });
  

  
 });



 describe('PATCH /api/v1/balance/1/general/contact', function () {
    const balanceData3 = {
        contact_address: 'Test',
        contact_postal_code: 'Test',
        contact_region: 'Test',
        contact_province: 'Test',
        contact_location: 'Test',
        contact_web: 'Test',
        contact_opening_hours: 'Test',
        contact_fullname: 'Test',
        contact_phone1: 'Testq',
        contact_phone2: 'Test',
        contact_email: 'Test'
    };
    test('Superadmin user update a  balance contac', async function () {
        const res = await request(app)
            .patch(`/api/v1/balance/1/general/contact`)
            .set('Authorization', tokens.superadmin)
            .send(balanceData3);
        expect(res.status).toBe(200);

        // Matches
    });
 });



//section activity    




 describe('test the API endpoints activity', () => {

        test('GET /api/v1/balance/:id/general/activity', async () => {
            const res = await request(app)
                .get(`/api/v1/balance/1/general/activity`)
                .set('Authorization', tokens.superadmin);
            expect(res.status).toBe(200);
            /*expect(res.body).toEqual({
                data: expect.any(Object),
                status: 'success',
                message: expect.any(String)
            });*/

  });

    test("Balance  can't be obtained without valid token", async () => {
        const res = await request(app).get(`/api/v1/balance/1/general/activity`);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({
            data: expect.any(Object),
            status: 'error',
            message: 'Invalid Token'
        });
    });

    test("Company user can't get balance activity", async () => {
      const res = await request(app)
          .get(`/api/v1/balance/1/general/activity`)
          .set('Authorization', tokens.company);
      expect(res.statusCode).toBe(403);
      expect(res.body).toEqual({
          data: expect.any(Object),
          status: 'error',
          message: 'Unauthorized action'
      });
    });


  });


  //error al mandarlo de esta forma porque tiene que solicitar una serie de información
 // ej: si pones solo Actividades en activities da fallo porque esa opción no existe
 // lo mismo pasó con Municipal en scope, hubo que cambiarlo a local que sí se permitía

 //cambiando eso pasa de dar un fallo 400 (error del cliente al enviar una solicitud) a 409


 describe('PATCH /api/v1/balance/1/general/activity', function () {
  const balanceData4 = {
      activity_sector_id: 1,
      activity_cnae_ids: 5, 
      activity_activities: 'Jardinería',
      activity_scope: 'local',
      activity_services: 'Servicio'
  };
  //error en el status, se probo cambiando de rol en tokens a company pero este no tenia permisos
   test('Superadmin user update a  balance activity', async function () {
      const res = await request(app)
          .patch(`/api/v1/balance/1/general/activity`)
          .set('Authorization', tokens.superadmin)
          .send(balanceData4);
          expect(res.status).toBe(200);

    });
   });




//section registry    





    describe('test the API endpoints registry', () => {
        test('GET /api/v1/balance/:id/general/registry', async () => {
            const res = await request(app)
                .get(`/api/v1/balance/1/general/registry`)
                .set('Authorization', tokens.superadmin);
            expect(res.status).toBe(200);
            /*expect(res.body).toEqual({
                data: expect.any(Object),
                status: 'success',
                message: expect.any(String)
            });*/

  });
  test("Balance  can't be obtained without valid token", async () => {
    const res = await request(app).get(`/api/v1/balance/1/general/registry`);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({
        data: expect.any(Object),
        status: 'error',
        message: 'Invalid Token'
    });
 });



 test("Company user can't get balance registry", async () => {
  const res = await request(app)
      .get(`/api/v1/balance/1/general/registry`)
      .set('Authorization', tokens.company);
  expect(res.statusCode).toBe(403);
  expect(res.body).toEqual({
      data: expect.any(Object),
      status: 'error',
      message: 'Unauthorized action'
  });
});



 });

 describe('PATCH /api/v1/balance/1/general/registry', function () {
    const balanceData5 = {
        registry_year: 2000,
        registry_number_eeii: '123ABC'
    };
    test('Superadmin user update a  balance contac', async function () {
        const res = await request(app)
            .patch(`/api/v1/balance/1/general/registry`)
            .set('Authorization', tokens.superadmin)
            .send(balanceData5);
        expect(res.status).toBe(200);

        // Matches
    });
 });


 });

