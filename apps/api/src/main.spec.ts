import { app, server } from './main';
import * as supertest from 'supertest';
import {Person} from "@parse-sort-system/common-lib";

import { initRecords } from './controllers/records';

const request = supertest(app);

describe('parse-sort-system', () => {
  describe('apps', () => {
    describe('api', () => {
      const records: Array<Person> = [];
      beforeEach(() => {
        initRecords(records);
      });

      afterAll((done) => {
        server.close(done);
      });

      describe('POST', () => {
        it('should parse and create record correctly from any lines with any supported delimiters (space, comma, pipe)', async () => {
          await request.post('/records')
            .send([
              "Jones Eric ejones@example.com blue 02/01/1991",
              "Lewis Damian dlewis@example.com red 02/02/1992",
              "West Adam awest@example.com green 02/03/1993",
              "Robinson Nate nrobinson@example.com yellow 02/04/1994",
              "Buck Ken kbuck@example.com orange 02/05/1995"
            ])
          .then(async (res) => {
            expect(res.status).toEqual(201);``
            const records: Array<Person> = res.body;
            expect(records).toEqual({
              "message": "parse line successfully",
              "records": [
                {
                  "dateOfBirth": "02/01/1991",
                  "email": "ejones@example.com",
                  "favoriteColor": "blue",
                  "firstName": "Eric",
                  "lastName": "Jones"
                },
                {
                  "dateOfBirth": "02/02/1992",
                  "email": "dlewis@example.com",
                  "favoriteColor": "red",
                  "firstName": "Damian",
                  "lastName": "Lewis"
                },
                {
                  "dateOfBirth": "02/03/1993",
                  "email": "awest@example.com",
                  "favoriteColor": "green",
                  "firstName": "Adam",
                  "lastName": "West"
                },
                {
                  "dateOfBirth": "02/04/1994",
                  "email": "nrobinson@example.com",
                  "favoriteColor": "yellow",
                  "firstName": "Nate",
                  "lastName": "Robinson"
                },
                {
                  "dateOfBirth": "02/05/1995",
                  "email": "kbuck@example.com",
                  "favoriteColor": "orange",
                  "firstName": "Ken",
                  "lastName": "Buck"
                }
              ]
            });
          });
        });
      });

      describe('GET', () => {

        beforeEach(async () => {
          // set up data records without sorting yet.
          await request.post('/records')
            .send([
              "Jones Eric ejones@example.com blue 02/01/1991",
              "Lewis Damian dlewis@example.com red 02/02/1992",
              "West Adam awest@example.com green 02/03/1993",
              "Robinson Nate nrobinson@example.com yellow 02/04/1994",
              "Buck Ken kbuck@example.com orange 02/05/1995"
            ]);
        });

        it('getRecordsSortedByEmail should return the correct order of the records sorting by email ascending correctly', async () => {
          await request.get('/records/email?direction=asc')
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body).toEqual([
                {
                  "dateOfBirth": "02/03/1993",
                  "email": "awest@example.com",
                  "favoriteColor": "green",
                  "firstName": "Adam",
                  "lastName": "West"
                },
                {
                  "dateOfBirth": "02/02/1992",
                  "email": "dlewis@example.com",
                  "favoriteColor": "red",
                  "firstName": "Damian",
                  "lastName": "Lewis"
                },
                {
                  "dateOfBirth": "02/01/1991",
                  "email": "ejones@example.com",
                  "favoriteColor": "blue",
                  "firstName": "Eric",
                  "lastName": "Jones"
                },
                {
                  "dateOfBirth": "02/05/1995",
                  "email": "kbuck@example.com",
                  "favoriteColor": "orange",
                  "firstName": "Ken",
                  "lastName": "Buck"
                },
                {
                  "dateOfBirth": "02/04/1994",
                  "email": "nrobinson@example.com",
                  "favoriteColor": "yellow",
                  "firstName": "Nate",
                  "lastName": "Robinson"
                }
              ]);
            });
        });

        it('getRecordsSortedByEmail should return the correct order of the records sorting by email descending correctly', async () => {
          await request.get('/records/email?direction=desc')
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body).toEqual([
                {
                  "dateOfBirth": "02/04/1994",
                  "email": "nrobinson@example.com",
                  "favoriteColor": "yellow",
                  "firstName": "Nate",
                  "lastName": "Robinson"
                },
                {
                  "dateOfBirth": "02/05/1995",
                  "email": "kbuck@example.com",
                  "favoriteColor": "orange",
                  "firstName": "Ken",
                  "lastName": "Buck"
                },
                {
                  "dateOfBirth": "02/01/1991",
                  "email": "ejones@example.com",
                  "favoriteColor": "blue",
                  "firstName": "Eric",
                  "lastName": "Jones"
                },
                {
                  "dateOfBirth": "02/02/1992",
                  "email": "dlewis@example.com",
                  "favoriteColor": "red",
                  "firstName": "Damian",
                  "lastName": "Lewis"
                },
                {
                  "dateOfBirth": "02/03/1993",
                  "email": "awest@example.com",
                  "favoriteColor": "green",
                  "firstName": "Adam",
                  "lastName": "West"
                }
              ]);
            });
        });

        it('getRecordsSortedByBirthdate should return the correct order of the records sorting by birth date ascending correctly', async () => {
          await request.get('/records/birthdate?direction=asc')
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body).toEqual([
                {
                  "dateOfBirth": "02/01/1991",
                  "email": "ejones@example.com",
                  "favoriteColor": "blue",
                  "firstName": "Eric",
                  "lastName": "Jones"
                },
                {
                  "dateOfBirth": "02/02/1992",
                  "email": "dlewis@example.com",
                  "favoriteColor": "red",
                  "firstName": "Damian",
                  "lastName": "Lewis"
                },
                {
                  "dateOfBirth": "02/03/1993",
                  "email": "awest@example.com",
                  "favoriteColor": "green",
                  "firstName": "Adam",
                  "lastName": "West"
                },
                {
                  "dateOfBirth": "02/04/1994",
                  "email": "nrobinson@example.com",
                  "favoriteColor": "yellow",
                  "firstName": "Nate",
                  "lastName": "Robinson"
                },
                {
                  "dateOfBirth": "02/05/1995",
                  "email": "kbuck@example.com",
                  "favoriteColor": "orange",
                  "firstName": "Ken",
                  "lastName": "Buck"
                }
              ]);
            });
        });

        it('getRecordsSortedByBirthdate should return the correct order of the records sorting by birth date descending correctly', async () => {
          await request.get('/records/birthdate?direction=desc')
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body).toEqual([
                {
                  "dateOfBirth": "02/05/1995",
                  "email": "kbuck@example.com",
                  "favoriteColor": "orange",
                  "firstName": "Ken",
                  "lastName": "Buck"
                },
                {
                  "dateOfBirth": "02/04/1994",
                  "email": "nrobinson@example.com",
                  "favoriteColor": "yellow",
                  "firstName": "Nate",
                  "lastName": "Robinson"
                },
                {
                  "dateOfBirth": "02/03/1993",
                  "email": "awest@example.com",
                  "favoriteColor": "green",
                  "firstName": "Adam",
                  "lastName": "West"
                },
                {
                  "dateOfBirth": "02/02/1992",
                  "email": "dlewis@example.com",
                  "favoriteColor": "red",
                  "firstName": "Damian",
                  "lastName": "Lewis"
                },
                {
                  "dateOfBirth": "02/01/1991",
                  "email": "ejones@example.com",
                  "favoriteColor": "blue",
                  "firstName": "Eric",
                  "lastName": "Jones"
                }
              ]);
            });
        });

        it('getRecordsSortedByName should return the correct order of the records sorting by lastName ascending correctly', async () => {
          await request.get('/records/name?field=lastName&direction=asc')
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body).toEqual([
                {
                  "dateOfBirth": "02/05/1995",
                  "email": "kbuck@example.com",
                  "favoriteColor": "orange",
                  "firstName": "Ken",
                  "lastName": "Buck"
                },
                {
                  "dateOfBirth": "02/01/1991",
                  "email": "ejones@example.com",
                  "favoriteColor": "blue",
                  "firstName": "Eric",
                  "lastName": "Jones"
                },
                {
                  "dateOfBirth": "02/02/1992",
                  "email": "dlewis@example.com",
                  "favoriteColor": "red",
                  "firstName": "Damian",
                  "lastName": "Lewis"
                },
                {
                  "dateOfBirth": "02/04/1994",
                  "email": "nrobinson@example.com",
                  "favoriteColor": "yellow",
                  "firstName": "Nate",
                  "lastName": "Robinson"
                },
                {
                  "dateOfBirth": "02/03/1993",
                  "email": "awest@example.com",
                  "favoriteColor": "green",
                  "firstName": "Adam",
                  "lastName": "West"
                }
              ]);
            });
        });

        it('getRecordsSortedByName should return the correct order of the records sorting by lastName descending correctly', async () => {
          await request.get('/records/name?field=lastName&direction=desc')
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body).toEqual([
                {
                  "dateOfBirth": "02/03/1993",
                  "email": "awest@example.com",
                  "favoriteColor": "green",
                  "firstName": "Adam",
                  "lastName": "West"
                },
                {
                  "dateOfBirth": "02/04/1994",
                  "email": "nrobinson@example.com",
                  "favoriteColor": "yellow",
                  "firstName": "Nate",
                  "lastName": "Robinson"
                },
                {
                  "dateOfBirth": "02/02/1992",
                  "email": "dlewis@example.com",
                  "favoriteColor": "red",
                  "firstName": "Damian",
                  "lastName": "Lewis"
                },
                {
                  "dateOfBirth": "02/01/1991",
                  "email": "ejones@example.com",
                  "favoriteColor": "blue",
                  "firstName": "Eric",
                  "lastName": "Jones"
                },
                {
                  "dateOfBirth": "02/05/1995",
                  "email": "kbuck@example.com",
                  "favoriteColor": "orange",
                  "firstName": "Ken",
                  "lastName": "Buck"
                }
              ]);
            });
        });

        it('getRecordsSortedByName should return the correct order of the records sorting by firstName ascending correctly', async () => {
          await request.get('/records/name?field=firstName&direction=asc')
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body).toEqual([
                {
                  "dateOfBirth": "02/03/1993",
                  "email": "awest@example.com",
                  "favoriteColor": "green",
                  "firstName": "Adam",
                  "lastName": "West"
                },
                {
                  "dateOfBirth": "02/02/1992",
                  "email": "dlewis@example.com",
                  "favoriteColor": "red",
                  "firstName": "Damian",
                  "lastName": "Lewis"
                },
                {
                  "dateOfBirth": "02/01/1991",
                  "email": "ejones@example.com",
                  "favoriteColor": "blue",
                  "firstName": "Eric",
                  "lastName": "Jones"
                },
                {
                  "dateOfBirth": "02/05/1995",
                  "email": "kbuck@example.com",
                  "favoriteColor": "orange",
                  "firstName": "Ken",
                  "lastName": "Buck"
                },
                {
                  "dateOfBirth": "02/04/1994",
                  "email": "nrobinson@example.com",
                  "favoriteColor": "yellow",
                  "firstName": "Nate",
                  "lastName": "Robinson"
                }
              ]);
            });
        });

        it('getRecordsSortedByName should return the correct order of the records sorting by firstName descending correctly', async () => {
          await request.get('/records/name?field=firstName&direction=desc')
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body).toEqual([
                {
                  "dateOfBirth": "02/04/1994",
                  "email": "nrobinson@example.com",
                  "favoriteColor": "yellow",
                  "firstName": "Nate",
                  "lastName": "Robinson"
                },
                {
                  "dateOfBirth": "02/05/1995",
                  "email": "kbuck@example.com",
                  "favoriteColor": "orange",
                  "firstName": "Ken",
                  "lastName": "Buck"
                },
                {
                  "dateOfBirth": "02/01/1991",
                  "email": "ejones@example.com",
                  "favoriteColor": "blue",
                  "firstName": "Eric",
                  "lastName": "Jones"
                },
                {
                  "dateOfBirth": "02/02/1992",
                  "email": "dlewis@example.com",
                  "favoriteColor": "red",
                  "firstName": "Damian",
                  "lastName": "Lewis"
                },
                {
                  "dateOfBirth": "02/03/1993",
                  "email": "awest@example.com",
                  "favoriteColor": "green",
                  "firstName": "Adam",
                  "lastName": "West"
                }
              ]);
            });
        });
      });

    });
  });
});
