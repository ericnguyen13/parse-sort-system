import {Router} from 'express';
import {
  createRecord,
  getRecordsSortedByBirthdate,
  getRecordsSortedByEmail,
  getRecordsSortedByName
} from "../controllers/records";

const router = Router();

router.post('/', createRecord);

router.get('/email', getRecordsSortedByEmail);

router.get('/birthdate', getRecordsSortedByBirthdate);

router.get('/name', getRecordsSortedByName);

export default router;
