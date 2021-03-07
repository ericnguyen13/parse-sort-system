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

export enum PersonProperties {
  LAST_NAME = 'lastName',
  FIRST_NAME = 'firstName',
  EMAIL = 'email',
  FAVORITE_COLOR = 'favoriteColor',
  DATE_OF_BIRTH = 'dateOfBirth',
}

export interface Person {
  [PersonProperties.LAST_NAME]: string;
  [PersonProperties.FIRST_NAME]: string;
  [PersonProperties.EMAIL]: string;
  [PersonProperties.FAVORITE_COLOR]: string;
  [PersonProperties.DATE_OF_BIRTH]: string;
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
    [PersonProperties.LAST_NAME]: splitter[0],
    [PersonProperties.FIRST_NAME]: splitter[1],
    [PersonProperties.EMAIL]: splitter[2],
    [PersonProperties.FAVORITE_COLOR]: splitter[3],
    [PersonProperties.DATE_OF_BIRTH]: splitter[4],
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
    if (a[PersonProperties.EMAIL] === b[PersonProperties.EMAIL]) {
      return ascendingCompare(a[PersonProperties.LAST_NAME], b[PersonProperties.LAST_NAME]);
    }

    return descendingCompare(a[PersonProperties.EMAIL], b[PersonProperties.EMAIL]);
  });
}

export function sortByBirthDateAsc(records: Array<Person>): Array<Person> {
  return [...records].sort((a, b) =>
    ascendingCompare(new Date(a[PersonProperties.DATE_OF_BIRTH]), new Date(b[PersonProperties.DATE_OF_BIRTH]))
  );
}

export function sortByLastNameDesc(records: Array<Person>): Array<Person> {
  return [...records].sort((a, b) =>
    descendingCompare(a[PersonProperties.LAST_NAME], b[PersonProperties.LAST_NAME])
  );
}


export async function readFileRecord(fileName: string, delimiter: Delimiter): Promise<Array<Person>> {
  const records: Array<Person> = [];
  return new Promise((resolve, reject) => {
    lineReader.open(fileName, (err, reader) => {

      // assume the file is always valid here.
      // but we can handle the error if being asked.
      if (!err) {
        while (reader.hasNextLine()) {
          reader.nextLine((error, line) => {

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
