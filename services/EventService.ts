// services/EventService.ts
import { BaseService } from './BaseService';
import { EventDto } from '@/dtos/event/EventDto';

class EventService extends BaseService<EventDto> {
  protected endpoint = 'https://raw.githubusercontent.com/papcorns/test-json/refs/heads/main/events.json';

  async fetchEvents(): Promise<EventDto[]> {
    return this.fetchData();
  }
}

export const eventService = new EventService();
