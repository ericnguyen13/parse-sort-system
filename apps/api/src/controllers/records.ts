import {RequestHandler} from "express";
import {
  getDelimiter, getSortDirection,
  parseLineOfRecords,
  Person,
  PersonProperty,
  sortByProperty, SortDirection
} from '@parse-sort-system/common-lib';

let inMemoryRecords: Array<Person> = [];
// just for testing.
export const initRecords = (records: Array<Person>) => inMemoryRecords = [...records];

export const createRecord: RequestHandler = (req, res) => {
  const lines = req.body as Array<string>;
  const delimiter = getDelimiter(lines[0], 5);
  const records = lines.map(line => parseLineOfRecords(line, delimiter));
  inMemoryRecords.push(...records)
  res.status(201).json({ message: 'parse line successfully', records: records });
};

export const getRecordsSortedByEmail: RequestHandler = ((req, res) => {
  const direction = req.query.direction || SortDirection.ASCENDING;
  const sortedByEmails = sortByProperty(inMemoryRecords, PersonProperty.EMAIL, getSortDirection(direction as string));
  res.status(200).json(sortedByEmails);
});

export const getRecordsSortedByBirthdate: RequestHandler = ((req, res) => {
  const direction = req.query.direction || SortDirection.ASCENDING;
  const sortedByBirthData = sortByProperty(inMemoryRecords, PersonProperty.DATE_OF_BIRTH, getSortDirection(direction as string));
  res.status(200).json(sortedByBirthData);
});

export const getRecordsSortedByName: RequestHandler = ((req, res) => {
  const field = req.query.field || PersonProperty.LAST_NAME;
  const direction = req.query.direction || SortDirection.ASCENDING;
  const sortedByProperty = sortByProperty(inMemoryRecords, field as PersonProperty, getSortDirection(direction as string));
  res.status(200).json(sortedByProperty);
});
