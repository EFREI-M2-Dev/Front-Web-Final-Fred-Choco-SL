import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-svg',
    template: `
    <ng-container *ngIf="src; else defaultSvg">
      <div [innerHTML]="svgContent" [class]="class"></div>
    </ng-container>
    <ng-template #defaultSvg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        [class]="class"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
        />
      </svg>
    </ng-template>
  `,
    styleUrls: ['./svg.component.scss'],
    standalone: false
})
export class SvgComponent {
  @Input() src?: string; // Chemin du fichier SVG
  @Input() class = '';

  svgContent?: string;

  ngOnChanges() {
    if (this.src) {
      this.loadSvg(this.src);
    }
  }

  private async loadSvg(path: string): Promise<void> {
    try {
      const response = await fetch(path); // Charge le fichier SVG depuis le répertoire
      this.svgContent = await response.text(); // Convertit le contenu en texte
    } catch (error) {
      console.error('Error loading SVG:', error);
    }
  }
}
