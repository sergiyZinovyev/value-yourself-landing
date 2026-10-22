import {
  Component,
  ChangeDetectionStrategy,
  signal,
  HostListener,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [MatIconModule],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css',
})
export class App {
  private navigationScrollTarget: string | null = null;

  protected navigateTo(sectionId: string): void {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    this.navigationScrollTarget = sectionId;

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  protected readonly mobileMenuOpen = signal(false);

  protected readonly activeSection = signal('about');

  private readonly navigationSections = [
    'about',
    'work-process',
    'program',
    'result',
    'author',
    'faq',
  ];

  protected readonly headerScrollProgress = signal(0);

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    const progress = Math.min(window.scrollY / 160, 1);

    this.headerScrollProgress.set(progress);

    const activationPoint = Math.max(120, window.innerHeight * 0.3);

    if (this.navigationScrollTarget) {
      const target = document.getElementById(this.navigationScrollTarget);

      if (target && target.getBoundingClientRect().top <= activationPoint) {
        this.activeSection.set(this.navigationScrollTarget);
        this.navigationScrollTarget = null;
      }

      return;
    }

    let activeSection = this.navigationSections[0];

    for (const sectionId of this.navigationSections) {
      const section = document.getElementById(sectionId);

      if (!section) {
        continue;
      }

      if (section.getBoundingClientRect().top <= activationPoint) {
        activeSection = sectionId;
      }
    }

    this.activeSection.set(activeSection);
  }

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
