import _mock from './_mock';
import { randomNumberRange, randomInArray } from './funcs';

export const _jobList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  projectName: _mock.company(index),
  referenceNo: 123456,
  revNo: 1,
  rep: _mock.name.fullName(index),
  createdBy: _mock.name.fullName(index),
  revisiedBy: _mock.name.fullName(index),
  dataCreated: "2020-09-23",
  dataRevised: "2020-09-23",
  status: randomInArray(['Pending', 'Complete', 'Open']),
}));