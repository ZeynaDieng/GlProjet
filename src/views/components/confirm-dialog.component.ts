import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="dialog-container">
      <p>{{ data.message }}</p>
      <div class="actions">
        <button mat-button  class="bg-red-500 py-2 px-3 text-white rounded-full" (click)="onCancel()">Annuler</button>
        <button mat-button color="warn" class="bg-yellow-500 py-2 px-3 text-white rounded-full" (click)="onConfirm()">Supprimer</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      background: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    .actions {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 15px;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(    private router: Router, private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}




  
  onCancel(): void {
    this.dialogRef.close(false);
  }

  goToStaffListt() {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/staff-list']);
  });
}
 onConfirm(): void {
    this.dialogRef.close(true);
    this.goToStaffListt();
    this.cdr.detectChanges();

  }
}
