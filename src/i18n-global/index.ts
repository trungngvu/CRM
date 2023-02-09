import { LANGUAGES } from '@types';

import { en as enBase, vi as viBase } from './base';
import { en as enDate, vi as viDate } from './date';
import { en as enPriority, vi as viPriority } from './priority';
import { en as enStatus, vi as viStatus } from './status';

export default {
  [LANGUAGES.EN]: { translation: { ...enDate, ...enPriority, ...enStatus, ...enBase } },
  [LANGUAGES.VI]: { translation: { ...viDate, ...viPriority, ...viStatus, ...viBase } },
};
