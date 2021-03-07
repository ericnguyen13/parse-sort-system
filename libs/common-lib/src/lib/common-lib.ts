import * as lineReader from 'line-reader';

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
              records.push(parseLineOfRecords(line, delimiter));
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
