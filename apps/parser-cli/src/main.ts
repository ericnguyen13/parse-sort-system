import * as yargs from 'yargs';
import {
  readFileRecord,
  sortByBirthDateAsc,
  sortByEmailDescThenLastNameAsc,
  sortByLastNameDesc,
} from '@parse-sort-system/common-lib';

const options = yargs
  .usage('Usage: -f <filename>')
  .option('f', {
    alias: 'filename',
    describe: 'file contain records of data',
    type: 'string',
    demandOption: true,
  }).argv;

(async () => {
  const records = await readFileRecord(options.f);

  console.log(
    'output 1 - sorted by email (descending), then by last name ascending.'
  );
  const sortedByEmailThenLastNameDescending = sortByEmailDescThenLastNameAsc(
    records
  );
  console.log(sortedByEmailThenLastNameDescending);

  console.log('output 2 - sorted by birth date, ascending.');
  const sortedByBirthDateAscending = sortByBirthDateAsc(records);
  console.log(sortedByBirthDateAscending);

  console.log('output 3 - sorted by last name, descending.');
  const sortedByLastnameDescending = sortByLastNameDesc(records);
  console.log(sortedByLastnameDescending);
})();
