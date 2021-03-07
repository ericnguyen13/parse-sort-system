import {
  Delimiter,
  getRecordWithCommaDelimiterLine,
  getRecordWithPipeDelimiterLine,
  getRecordWithSpaceDelimiterLine,
  Person,
  PersonProperties,
  readFileRecord
} from './common-lib';

describe('parse-sort-system', () => {
  describe('libs', () => {
    describe('common-lib', () => {

      const expectedRecords: Array<Person> = [
        {
          [PersonProperties.LAST_NAME]: 'Jones',
          [PersonProperties.FIRST_NAME]: 'Eric',
          [PersonProperties.EMAIL]: 'ejones@example.com',
          [PersonProperties.FAVORITE_COLOR]: 'blue',
          [PersonProperties.DATE_OF_BIRTH]: '02/01/1991'
        },
        {
          [PersonProperties.LAST_NAME]: 'Lewis',
          [PersonProperties.FIRST_NAME]: 'Damian',
          [PersonProperties.EMAIL]: 'dlewis@example.com',
          [PersonProperties.FAVORITE_COLOR]: 'red',
          [PersonProperties.DATE_OF_BIRTH]: '02/02/1992'
        },
        {
          [PersonProperties.LAST_NAME]: 'West',
          [PersonProperties.FIRST_NAME]: 'Adam',
          [PersonProperties.EMAIL]: 'awest@example.com',
          [PersonProperties.FAVORITE_COLOR]: 'green',
          [PersonProperties.DATE_OF_BIRTH]: '02/03/1993'
        },
        {
          [PersonProperties.LAST_NAME]: 'Robinson',
          [PersonProperties.FIRST_NAME]: 'Nate',
          [PersonProperties.EMAIL]: 'nrobinson@example.com',
          [PersonProperties.FAVORITE_COLOR]: 'yellow',
          [PersonProperties.DATE_OF_BIRTH]: '02/04/1994'
        },
        {
          [PersonProperties.LAST_NAME]: 'Buck',
          [PersonProperties.FIRST_NAME]: 'Ken',
          [PersonProperties.EMAIL]: 'kbuck@example.com',
          [PersonProperties.FAVORITE_COLOR]: 'orange',
          [PersonProperties.DATE_OF_BIRTH]: '02/05/1995'
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

      describe('readFileRecord', () => {
        const spaceDelimiterRecordsFile = `${__dirname}/../data/records-with-space-delimiter.txt`;
        const commaDelimiterRecordsFile = `${__dirname}/../data/records-with-comma-delimiter.txt`;
        const pipeDelimiterRecordsFile = `${__dirname}/../data/records-with-pipe-delimiter.txt`;

        it('should read a file of records that has space delimiter for each field correctly', async () => {
          const records = await readFileRecord(spaceDelimiterRecordsFile, Delimiter.SPACE);
          expect(expectedRecords).toEqual(records);
        });

        it('should read a file of records that has comma delimiter for each field correctly', async () => {
          const records = await readFileRecord(commaDelimiterRecordsFile, Delimiter.COMMA);
          expect(expectedRecords).toEqual(records);
        });

        it('should read a file of records that has pipe delimiter for each field correctly', async () => {
          const records = await readFileRecord(pipeDelimiterRecordsFile, Delimiter.PIPE);
          expect(expectedRecords).toEqual(records);
        });
      });

    });
  });
});
