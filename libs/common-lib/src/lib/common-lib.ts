import * as lineReader from 'line-reader';

export enum SortDirection {
  DESCENDING = 'descending',
  ASCENDING = 'ascending',
}

export enum Delimiter {
  COMMA = 'comma',
  PIPE = 'pipe',
  SPACE = 'space',
}

export const DELIMITER_MAP = {
  [Delimiter.COMMA]: ',',
  [Delimiter.PIPE]: '|',
  [Delimiter.SPACE]: ' ',
}

export enum PersonProperty {
  LAST_NAME = 'lastName',
  FIRST_NAME = 'firstName',
  EMAIL = 'email',
  FAVORITE_COLOR = 'favoriteColor',
  DATE_OF_BIRTH = 'dateOfBirth',
}

export interface Person {
  [PersonProperty.LAST_NAME]: string;
  [PersonProperty.FIRST_NAME]: string;
  [PersonProperty.EMAIL]: string;
  [PersonProperty.FAVORITE_COLOR]: string;
  [PersonProperty.DATE_OF_BIRTH]: string;
}

export function getRecordWithSpaceDelimiterLine(line: string): Person {
  return parseLineOfRecords(line, Delimiter.SPACE);
}

export function getRecordWithCommaDelimiterLine(line: string): Person {
  return parseLineOfRecords(line, Delimiter.COMMA);
}

export function getRecordWithPipeDelimiterLine(line: string): Person {
  return parseLineOfRecords(line, Delimiter.PIPE);
}

export function parseLineOfRecords(line: string, delimiter: Delimiter): Person {
  // assume that every line will contain correct record format which can be any of the followings:
  // LastName | FirstName | Email | FavoriteColor | DateOfBirth
  // LastName FirstName Email FavoriteColor DateOfBirth
  // LastName, FirstName, Email, FavoriteColor, DateOfBirth
  const splitter = line.split(DELIMITER_MAP[delimiter]);
  return {
    [PersonProperty.LAST_NAME]: splitter[0],
    [PersonProperty.FIRST_NAME]: splitter[1],
    [PersonProperty.EMAIL]: splitter[2],
    [PersonProperty.FAVORITE_COLOR]: splitter[3],
    [PersonProperty.DATE_OF_BIRTH]: splitter[4],
  };
}

function descendingCompare<T>(first: T, second: T): number {
  return second > first ? 1 : -1;
}

function ascendingCompare<T>(first: T, second: T): number {
  return first > second ? 1 : -1;
}

export function sortByEmailDescThenLastNameAsc(records: Array<Person>): Array<Person> {
  return [...records].sort((a, b) => {
    if (a[PersonProperty.EMAIL] === b[PersonProperty.EMAIL]) {
      return ascendingCompare(a[PersonProperty.LAST_NAME], b[PersonProperty.LAST_NAME]);
    }

    return descendingCompare(a[PersonProperty.EMAIL], b[PersonProperty.EMAIL]);
  });
}

export function sortByBirthDateAsc(records: Array<Person>): Array<Person> {
  return [...records].sort((a, b) =>
    ascendingCompare(new Date(a[PersonProperty.DATE_OF_BIRTH]), new Date(b[PersonProperty.DATE_OF_BIRTH]))
  );
}

export function sortByLastNameDesc(records: Array<Person>): Array<Person> {
  return [...records].sort((a, b) =>
    descendingCompare(a[PersonProperty.LAST_NAME], b[PersonProperty.LAST_NAME])
  );
}

export function sortByProperty(records: Array<Person>, property: PersonProperty, sortDirection: SortDirection): Array<Person> {
  const sortCompare = sortDirection === SortDirection.ASCENDING ? ascendingCompare : descendingCompare;
  return [...records]
    .sort((a, b) => sortCompare(a[property], b[property]));
}


export async function readFileRecord(fileName: string): Promise<Array<Person>> {
  const records: Array<Person> = [];
  return new Promise((resolve, reject) => {
    lineReader.open(fileName, (err, reader) => {

      // assume the file is always valid here.
      // but we can handle the error if being asked.
      if (!err) {
        let delimiter;
        while (reader.hasNextLine()) {
          reader.nextLine((error, line) => {
            if (!delimiter) {
              delimiter = getDelimiter(line, 5);
            }

            // assume the line is always valid here.
            // but we can handle the error if being asked.
            if (!error) {
              records.push(parseLineOfRecords(line as string, delimiter));
            } else {
              reject(error);
            }
          });
        }

        resolve(records);
      } else {
        reject(err);
      }
    });
  });
}

export function getDelimiter(line: string, numberOfFields: number): Delimiter {
  let splitter = line.split(DELIMITER_MAP[Delimiter.SPACE]);
  if (splitter.length === numberOfFields) {
    return Delimiter.SPACE;
  }

  splitter = line.split(DELIMITER_MAP[Delimiter.COMMA]);
  if (splitter.length === numberOfFields) {
    return Delimiter.COMMA;
  }

  splitter = line.split(DELIMITER_MAP[Delimiter.PIPE]);
  if (splitter.length === numberOfFields) {
    return Delimiter.PIPE;
  }

  throw new Error('Line of fields is delimited with the character that does not support by the parse system');
}

export function getSortDirection(direction: string): SortDirection {
  const lowerCase = direction.toLowerCase();
  if (lowerCase === 'desc' || lowerCase === 'descending') {
    return SortDirection.DESCENDING;
  }

  return SortDirection.ASCENDING;
}
