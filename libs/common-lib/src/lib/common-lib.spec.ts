import {
  getRecordWithCommaDelimiterLine,
  getRecordWithPipeDelimiterLine,
  getRecordWithSpaceDelimiterLine,
  Person,
  PersonProperty,
  readFileRecord,
  sortByBirthDateAsc,
  sortByEmailDescThenLastNameAsc,
  sortByLastNameDesc,
  sortByProperty,
  SortDirection
} from './common-lib';

describe('parse-sort-system', () => {
  describe('libs', () => {
    describe('common-lib', () => {

      const expectedRecords: Array<Person> = [
        {
          [PersonProperty.LAST_NAME]: 'Jones',
          [PersonProperty.FIRST_NAME]: 'Eric',
          [PersonProperty.EMAIL]: 'ejones@example.com',
          [PersonProperty.FAVORITE_COLOR]: 'blue',
          [PersonProperty.DATE_OF_BIRTH]: '02/01/1991'
        },
        {
          [PersonProperty.LAST_NAME]: 'Lewis',
          [PersonProperty.FIRST_NAME]: 'Damian',
          [PersonProperty.EMAIL]: 'dlewis@example.com',
          [PersonProperty.FAVORITE_COLOR]: 'red',
          [PersonProperty.DATE_OF_BIRTH]: '02/02/1992'
        },
        {
          [PersonProperty.LAST_NAME]: 'West',
          [PersonProperty.FIRST_NAME]: 'Adam',
          [PersonProperty.EMAIL]: 'awest@example.com',
          [PersonProperty.FAVORITE_COLOR]: 'green',
          [PersonProperty.DATE_OF_BIRTH]: '02/03/1993'
        },
        {
          [PersonProperty.LAST_NAME]: 'Robinson',
          [PersonProperty.FIRST_NAME]: 'Nate',
          [PersonProperty.EMAIL]: 'nrobinson@example.com',
          [PersonProperty.FAVORITE_COLOR]: 'yellow',
          [PersonProperty.DATE_OF_BIRTH]: '02/04/1994'
        },
        {
          [PersonProperty.LAST_NAME]: 'Buck',
          [PersonProperty.FIRST_NAME]: 'Ken',
          [PersonProperty.EMAIL]: 'kbuck@example.com',
          [PersonProperty.FAVORITE_COLOR]: 'orange',
          [PersonProperty.DATE_OF_BIRTH]: '02/05/1995'
        }
      ];

      describe('getRecordWithSpaceDelimiterLine', () => {
        let recordWithSpace: Record<string, Person>;

        beforeEach(() => {
          recordWithSpace = {
            'Jones Eric ejones@example.com blue 02/01/1991': expectedRecords[0],
            'Lewis Damian dlewis@example.com red 02/02/1992': expectedRecords[1],
            'West Adam awest@example.com green 02/03/1993': expectedRecords[2],
            'Robinson Nate nrobinson@example.com yellow 02/04/1994': expectedRecords[3],
            'Buck Ken kbuck@example.com orange 02/05/1995': expectedRecords[4],
          };
        });

        it('should parse the line of records separated by space delimiter correctly', () => {
          Object.entries(recordWithSpace).forEach(([line, expected]) => {
            expect(expected).toEqual(getRecordWithSpaceDelimiterLine(line));
          });
        });
      });

      describe('getRecordWithCommaDelimiterLine', () => {
        let recordWithComma: Record<string, Person>;

        beforeEach(() => {
          recordWithComma = {
            'Jones,Eric,ejones@example.com,blue,02/01/1991': expectedRecords[0],
            'Lewis,Damian,dlewis@example.com,red,02/02/1992': expectedRecords[1],
            'West,Adam,awest@example.com,green,02/03/1993': expectedRecords[2],
            'Robinson,Nate,nrobinson@example.com,yellow,02/04/1994': expectedRecords[3],
            'Buck,Ken,kbuck@example.com,orange,02/05/1995': expectedRecords[4],
          };
        });

        it('should parse the line of records separated by comma delimiter correctly', () => {
          Object.entries(recordWithComma).forEach(([line, expected]) => {
            expect(expected).toEqual(getRecordWithCommaDelimiterLine(line));
          });
        });
      });

      describe('getRecordWithPipeDelimiterLine', () => {
        let recordWithPipe: Record<string, Person>;

        beforeEach(() => {
          recordWithPipe = {
            'Jones|Eric|ejones@example.com|blue|02/01/1991': expectedRecords[0],
            'Lewis|Damian|dlewis@example.com|red|02/02/1992': expectedRecords[1],
            'West|Adam|awest@example.com|green|02/03/1993': expectedRecords[2],
            'Robinson|Nate|nrobinson@example.com|yellow|02/04/1994': expectedRecords[3],
            'Buck|Ken|kbuck@example.com|orange|02/05/1995': expectedRecords[4],
          };
        });

        it('should parse the line of records separated by pipe delimiter correctly', () => {
          Object.entries(recordWithPipe).forEach(([line, expected]) => {
            expect(expected).toEqual(getRecordWithPipeDelimiterLine(line));
          });
        });
      });

      describe('sortByEmailDescThenLastNameAsc', () => {
        it('should sort the records by email descending, then by lastname ascending correctly', () => {

          // set the same email for the followings
          // Original order: 1. Nate Robinson, nrobinson@example.com and 2. Ken Buck, kbuck@example.com, ...
          // After make the same email and we sort by the last name ascending and the order now is
          // 1. Ken Buck, kbuck@example.com and then 2. Nate Robinson, nrobinson@example.com, ...
          expectedRecords[3][PersonProperty.EMAIL] = expectedRecords[4][PersonProperty.EMAIL] = 'makethesame@example.com';

          const sortedByEmailDescThenByLastnameAsc =
            sortByEmailDescThenLastNameAsc(expectedRecords);

          expect(sortedByEmailDescThenByLastnameAsc).toEqual([
            {
              "dateOfBirth": "02/05/1995",
              "email": "makethesame@example.com",
              "favoriteColor": "orange",
              "firstName": "Ken",
              "lastName": "Buck"
            },
            {
              "dateOfBirth": "02/04/1994",
              "email": "makethesame@example.com",
              "favoriteColor": "yellow",
              "firstName": "Nate",
              "lastName": "Robinson"
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

      describe('sortByBirthDateAsc', () => {
        it('should sort the records by birth date ascending correctly', () => {
          const ascSortedByBirthDate = sortByBirthDateAsc(expectedRecords);
          expect(ascSortedByBirthDate).toEqual([
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
              "email": "makethesame@example.com",
              "favoriteColor": "yellow",
              "firstName": "Nate",
              "lastName": "Robinson"
            },
            {
              "dateOfBirth": "02/05/1995",
              "email": "makethesame@example.com",
              "favoriteColor": "orange",
              "firstName": "Ken",
              "lastName": "Buck"
            }
          ]);
        });
      });

      describe('sortByLastNameDesc', () => {
        it('should sort the records by lastname descending correctly', () => {
          const ascSortedByBirthDate = sortByLastNameDesc(expectedRecords);
          expect(ascSortedByBirthDate).toEqual([
            {
              "dateOfBirth": "02/03/1993",
              "email": "awest@example.com",
              "favoriteColor": "green",
              "firstName": "Adam",
              "lastName": "West"
            },
            {
              "dateOfBirth": "02/04/1994",
              "email": "makethesame@example.com",
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
              "email": "makethesame@example.com",
              "favoriteColor": "orange",
              "firstName": "Ken",
              "lastName": "Buck"
            }
          ]);
        });
      });

      describe('sortByProperty', () => {
        it('should sort the records by the specified property and direction', () => {
          const ascSortedByFirstName = sortByProperty(expectedRecords, PersonProperty.FIRST_NAME, SortDirection.ASCENDING);
          expect(ascSortedByFirstName).toEqual([
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
              "email": "makethesame@example.com",
              "favoriteColor": "orange",
              "firstName": "Ken",
              "lastName": "Buck"
            },
            {
              "dateOfBirth": "02/04/1994",
              "email": "makethesame@example.com",
              "favoriteColor": "yellow",
              "firstName": "Nate",
              "lastName": "Robinson"
            }
          ]);
        });
      })

      describe('readFileRecord', () => {
        const rootProject = `${__dirname}/../../../../`;
        const spaceDelimiterRecordsFile = `${rootProject}data/records-with-space-delimiter.txt`;
        const commaDelimiterRecordsFile = `${rootProject}data/records-with-comma-delimiter.txt`;
        const pipeDelimiterRecordsFile = `${rootProject}data/records-with-pipe-delimiter.txt`;

        it('should read a file of records that has space delimiter for each field correctly', async () => {
          const records = await readFileRecord(spaceDelimiterRecordsFile);
          expect(expectedRecords).toEqual(records);
        });

        it('should read a file of records that has comma delimiter for each field correctly', async () => {
          const records = await readFileRecord(commaDelimiterRecordsFile);
          expect(expectedRecords).toEqual(records);
        });

        it('should read a file of records that has pipe delimiter for each field correctly', async () => {
          const records = await readFileRecord(pipeDelimiterRecordsFile);
          expect(expectedRecords).toEqual(records);
        });
      });

    });
  });
});
