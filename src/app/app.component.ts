import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit {
  fecha: number = Date.now();
  hora: any;
  title = 'relojAngular';

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.mostrarHora();
  }

  mostrarHora() {
    this.ngZone.runOutsideAngular(() => {
      interval(1000).pipe(startWith(0)).subscribe(() => {
        this.hora = new Date();
        this.ngZone.run(() => {
          this.cdr.detectChanges();
        });
      });
    });
  }
}


