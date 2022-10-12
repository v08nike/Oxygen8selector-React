import _mock from './_mock';
import { randomNumberRange, randomInArray } from './funcs';

export const _jobList = [...Array(3)].map((_, index) => ({
  jobId: index,
  jobName: _mock.company(index),
  referenceNo: 123456,
  revNo: 1,
  rep: _mock.name.fullName(index),
  createdBy: _mock.name.fullName(index),
  revisiedBy: _mock.name.fullName(index),
  createdDate: '2020-09-23',
  revisedDate: '2020-09-23',
  status: randomInArray(['Pending', 'Complete', 'Open']),
}));



export const _unitList = _jobList.map((item) =>
  ({
    jobId: item.jobId,
    data:[...Array(5)].map((_, index) => ({
      unitId: _mock.id(index),
      tag: _mock.company(index),
      qty: randomNumberRange(1, 10),
      type: randomInArray([
        'Energy Recovery Ventilator (ERV)',
        'Energy Recovery Ventilator (DGE)',
        'Energy Recovery Ventilator (ETD)',
      ]),
      modal: randomInArray(['A16IN - (325 - 775 CFM)', 'A16IN - (123 - 456 CFM)', 'A16IN - (544 - 234 CFM)']),
      cfm: randomNumberRange(100, 1000),
    }))
  })
);

export const _modelInfos = [
  {
    jobId: 'nova',
    title: 'Nova1',
    image: '/assets/Images/img_nova_1.png',
    description:
      '1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, jobId bibendum diam malesuada. Nulla facilisi.',
  },
  {
    jobId: 'nova',
    title: 'Nova2',
    image: '/assets/Images/img_nova_1.png',
    description:
      '2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, jobId bibendum diam malesuada. Nulla facilisi.',
  },
  {
    jobId: 'ventum',
    title: 'Ventum',
    image: '/assets/Images/img_nova_1.png',
    description:
      '3Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, jobId bibendum diam malesuada. Nulla facilisi.',
  },
  {
    jobId: 'nova',
    title: 'Nova3',
    image: '/assets/Images/img_nova_1.png',
    description:
      '4Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, jobId bibendum diam malesuada. Nulla facilisi.',
  },
  {
    jobId: 'nova',
    title: 'Nova4',
    image: '/assets/Images/img_nova_1.png',
    description:
      '5Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, jobId bibendum diam malesuada. Nulla facilisi.',
  },
  {
    jobId: 'nova',
    title: 'Nova5',
    image: '/assets/Images/img_nova_1.png',
    description:
      '6Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, jobId bibendum diam malesuada. Nulla facilisi.',
  },
  {
    jobId: 'nova',
    title: 'Nova6',
    image: '/assets/Images/img_nova_1.png',
    description:
      '7Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, jobId bibendum diam malesuada. Nulla facilisi.',
  },
  {
    jobId: 'nova',
    title: 'Nova7',
    image: '/assets/Images/img_nova_1.png',
    description:
      '8Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, jobId bibendum diam malesuada. Nulla facilisi.',
  },
  {
    jobId: 'nova',
    title: 'Nova8',
    image: '/assets/Images/img_nova_1.png',
    description:
      '9Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, jobId bibendum diam malesuada. Nulla facilisi.',
  },
  {
    jobId: 'nova',
    title: 'Nova9',
    image: '/assets/Images/img_nova_1.png',
    description:
      '10Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, jobId bibendum diam malesuada. Nulla facilisi.',
  },
];

export const _productFamilyInfos = [
  { jobId: 'commercial', title: 'Commercial', image: '/assets/Images/img_nova_1.png' },
  { jobId: 'residential', title: 'Residental', image: '/assets/Images/img_nova_2.png' },
];
