import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [MatIconModule],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css',
})
export class App {
  protected readonly mobileMenuOpen = signal(false);

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  openLessons = new Set<number>();

  toggleLesson(lesson: number): void {
    if (this.openLessons.has(lesson)) {
      this.openLessons.delete(lesson);
    } else {
      this.openLessons.add(lesson);
    }
  }

  isLessonOpen(lesson: number): boolean {
    return this.openLessons.has(lesson);
  }
}
