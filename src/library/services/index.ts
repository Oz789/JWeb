import { USE_MOCKS } from '../environments/env';

import type { AssistantService } from './assistant';
import type { ThreadOptionsService } from './threadOptions';

import { mockAssistantService } from '../../mocks/assistant.mock';
import { mockThreadOptionsService } from '../../mocks/threadOptions.mock';



export const assistantService: AssistantService = USE_MOCKS
  ? mockAssistantService
  : mockAssistantService; // replace with apiAssistantService later

export const threadOptionsService: ThreadOptionsService = USE_MOCKS
  ? mockThreadOptionsService
  : mockThreadOptionsService; // replace with apiThreadOptionsService later 