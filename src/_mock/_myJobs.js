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
  createdDate: "2020-09-23",
  revisedDate: "2020-09-23",
  status: randomInArray(['Pending', 'Complete', 'Open']),
}));


export const _unitList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  tag: _mock.company(index),
  qty: randomNumberRange(1, 10),
  type: randomInArray(['Energy Recovery Ventilator (ERV)', 'Energy Recovery Ventilator (DGE)', 'Energy Recovery Ventilator (ETD)']),
  modal: randomInArray(['A16IN - (325 - 775 CFM)', 'A16IN - (123 - 456 CFM)', 'A16IN - (544 - 234 CFM)']),
  cfm: randomNumberRange(100, 1000),
}));