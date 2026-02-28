import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('800ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ])
  ]
})
export class AppComponent implements OnInit , AfterViewInit {
  @ViewChild('heroVideo') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    // ব্রাউজার যদি অটো-প্লে ব্লক করে, তবে প্রোগ্রামাটিক্যালি প্লে করার চেষ্টা
    if (this.videoElement) {
      const video = this.videoElement.nativeElement;
      video.muted = true; // নিশ্চিত করুন ভিডিও মিউটেড আছে
      video.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }
  activeSection: string = 'home';
  isScrolled = false;
  loading = true;

  counters = [
    { title: 'Years Experience', value: 10, current: 0 },
    { title: 'Projects Completed', value: 50, current: 0 },
    { title: 'Skilled Engineers', value: 100, current: 0 }
  ];

  ngOnInit(): void {
    setTimeout(() => this.loading = false, 1500);
    this.startCounter();
  }
menuOpen = false;
toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

closeMenu() {
  this.menuOpen = false;
}
setActive(section: string) {
    this.activeSection = section;
    
    // ভিডিওর সাউন্ড অফ করার লজিক
    if (this.videoElement && this.videoElement.nativeElement) {
      this.videoElement.nativeElement.muted = true;
      // যদি চান ভিডিও পুরোপুরি পজ হয়ে যাক, তবে নিচের লাইনটি আনকমেন্ট করুন:
      // this.videoElement.nativeElement.pause();
    }
  }
  startCounter() {
    this.counters.forEach(counter => {
      let interval = setInterval(() => {
        if (counter.current < counter.value) {
          counter.current++;
        } else {
          clearInterval(interval);
        }
      }, 30);
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}