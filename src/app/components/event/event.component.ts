import { Component, inject } from '@angular/core';
import { EventService, Event } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event.component',
  imports: [CommonModule],
  templateUrl: './event.component.html',
})
export class EventComponent {
  private authService = inject(AuthService);

  events: Event[] = [];
  error = '';

  currentUser = {
    firstName: 'Samuel',
    lastName: 'Michaux',
  };

  private eventService: EventService = inject(EventService);

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
    });
  }

  logout() {
    this.authService.logout();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  deleteEvent(id: number) {}
  joinEvent(id: number) {}
}
