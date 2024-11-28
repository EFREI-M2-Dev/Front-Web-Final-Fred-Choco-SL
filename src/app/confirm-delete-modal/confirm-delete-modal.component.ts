import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss'],
  standalone: false
})
export class ConfirmDeleteModalComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDeleteModalComponent>) {
  }

  confirm() {
    this.dialogRef.close(true); // Retourne `true` pour confirmer la suppression
  }

  cancel() {
    this.dialogRef.close(false); // Retourne `false` pour annuler
  }
}
