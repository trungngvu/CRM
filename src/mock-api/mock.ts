import MockAdapter from 'axios-mock-adapter';

import { baseInstance } from '../app/store/api/base-query';

const mock = new MockAdapter(baseInstance, { delayResponse: 0 });

export default mock;
