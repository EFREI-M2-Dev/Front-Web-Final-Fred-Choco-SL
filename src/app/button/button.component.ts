import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: false
})
export class ButtonComponent {
  @Input() label: string = 'Bouton'; // Texte du bouton
  @Input() color: 'primary' | 'secondary' = 'primary'; // Couleur
  @Input() text: 'primary' | 'secondary' = 'secondary';
  @Input() type: 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' = 'basic'; // Type de bouton
  @Input() disabled: boolean = false; // Désactiver le bouton

  getTextClass(): string {
    return `text-${this.text}`;
  }
}
