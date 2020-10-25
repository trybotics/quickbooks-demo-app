var request = require('supertest');
request = request('http://localhost:8080/api');
let id = 0;
let newId = 100
let syncToken = 0
let amount = 2000

describe('Bill REST API Test', () => {

    describe('Create', () => {
        test('Create Bill', (done) => {
            request
            .post(`/bill`)
            .send({
                "Line": [
                  {
                    "DetailType": "AccountBasedExpenseLineDetail",
                    "Amount": 200,
                    "Id": "1",
                    "AccountBasedExpenseLineDetail": {
                      "AccountRef": {
                        "value": "7"
                      }
                    }
                  }
                ],
                "VendorRef": {
                  "value": "56"
                }
            })
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect.objectContaining(res.body);
                id = res.body.Id
                return done();
            });
        });
    });

    describe('Update', () => {
        test(`If the Id(${id}) is present`, (done) => {
            request
            .put(`/bill`)
            .send({
                "Id": String(id),
                "SyncToken": String(syncToken),
                "Line": [
                  {
                    "DetailType": "AccountBasedExpenseLineDetail",
                    "Amount": amount,
                    "Id": "1",
                    "AccountBasedExpenseLineDetail": {
                      "AccountRef": {
                        "value": "7"
                      }
                    }
                  }
                ],
                "VendorRef": {
                  "value": "56"
                }
            })
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(res.body.Id).toBe(`${id}`);
                expect(res.body.Line[0].Amount).toBe(amount);
                return done();
            });
        });
        test(`If the Id(${newId}) is not present`, (done) => {
            request
            .put(`/bill/${newId}`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(String(res.error)).toBe(`Error: cannot PUT /api/bill/${newId} (404)`);
                return done();
            });
        });
    });

    describe('Get By Id', () => {
        test(`If the Id(${id}) is present`, (done) => {
            request
            .get(`/bill/${id}`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(res.body.Id).toBe(`${id}`);
                expect(res.body.Line[0].Amount).toBe(amount);
                syncToken = res.body.SyncToken
                return done();
            });
        });
        test(`If the Id(${newId}) is not present`, (done) => {
            request
            .get(`/bill/${newId}`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(String(res.error)).toBe(`Error: cannot GET /api/bill/${newId} (404)`);
                return done();
            });
        });
    });

    describe('Delete', () => {
        test(`If the Id(${id}) is present`, (done) => {
            request
            .delete(`/bill/${id}`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                return done(err);
                }
                expect(res.body.Bill.Id).toBe(`${id}`);
                return done();
            });
        });
        test(`If the Id(${newId}) is not present`, (done) => {
            request
            .delete(`/bill/${newId}`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) {
                return done(err);
                }
                expect(String(res.error)).toBe(`Error: cannot DELETE /api/bill/${newId} (404)`);
                return done();
            });
        });
    });

    describe('Get All Bill', () => {
        test('Get All Bill Data', (done) => {
            request
            .get(`/bill`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200)
            .end(done);
        });
    });

});