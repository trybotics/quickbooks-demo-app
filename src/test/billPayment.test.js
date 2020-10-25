var request = require('supertest');
request = request('http://localhost:8080/api');
let id = 0;
let newId = 100
let syncToken = 0
let privateNote = "Update Note"

describe('Bill Payment REST API Test', () => {

    describe('Create', () => {
        test('Create Bill Payment', (done) => {
            request
            .post(`/billPayment`)
            .send({
                "PrivateNote": "Acct. 1JK90",
                "VendorRef": {
                  "name": "Bob's Burger Joint",
                  "value": "56"
                },
                "TotalAmt": 200,
                "PayType": "Check",
                "Line": [
                  {
                    "Amount": 200,
                    "LinkedTxn": [
                      {
                        "TxnId": "145",
                        "TxnType": "Bill"
                      }
                    ]
                  }
                ],
                "CheckPayment": {
                  "BankAccountRef": {
                    "name": "Checking",
                    "value": "35"
                  }
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
            .put(`/billPayment`)
            .send({
                "Id": id,
                "SyncToken": syncToken,
                "PrivateNote": privateNote,
                "VendorRef": {
                  "name": "Bob's Burger Joint",
                  "value": "56"
                },
                "TotalAmt": 200,
                "PayType": "Check",
                "Line": [
                  {
                    "Amount": 200,
                    "LinkedTxn": [
                      {
                        "TxnId": "145",
                        "TxnType": "Bill"
                      }
                    ]
                  }
                ],
                "CheckPayment": {
                  "BankAccountRef": {
                    "name": "Checking",
                    "value": "35"
                  }
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
                expect(res.body.PrivateNote).toBe(privateNote);
                return done();
            });
        });
        test(`If the Id(${newId}) is not present`, (done) => {
            request
            .put(`/billPayment/${newId}`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(String(res.error)).toBe(`Error: cannot PUT /api/billPayment/${newId} (404)`);
                return done();
            });
        });
    });

    describe('Get By Id', () => {
        test(`If the Id(${id}) is present`, (done) => {
            request
            .get(`/billPayment/${id}`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(res.body.Id).toBe(`${id}`);
                expect(res.body.PrivateNote).toBe(privateNote);
                syncToken = res.body.SyncToken
                return done();
            });
        });
        test(`If the Id(${newId}) is not present`, (done) => {
            request
            .get(`/billPayment/${newId}`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(String(res.error)).toBe(`Error: cannot GET /api/billPayment/${newId} (404)`);
                return done();
            });
        });
    });

    describe('Delete', () => {
        test(`If the Id(${id}) is present`, (done) => {
            request
            .delete(`/billPayment/${id}`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                return done(err);
                }
                expect(res.body.BillPayment.Id).toBe(`${id}`);
                return done();
            });
        });
        test(`If the Id(${newId}) is not present`, (done) => {
            request
            .delete(`/billPayment/${newId}`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) {
                return done(err);
                }
                expect(String(res.error)).toBe(`Error: cannot DELETE /api/billPayment/${newId} (404)`);
                return done();
            });
        });
    });

    describe('Get All Bill Payment', () => {
        test('Get All Bill Payment Data', (done) => {
            request
            .get(`/billPayment`)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200)
            .end(done);
        });
    });

});