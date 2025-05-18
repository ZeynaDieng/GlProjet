import { CustomerService } from '../../../services/customer.service';

import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../../services/toastr.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-customers',
  imports: [CommonModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CreateCustomersComponent {
    isEditing: boolean = false;
   currentUserId: number | null = null;
   // @Input() user: any = null;
   @Output() close = new EventEmitter<void>();
   users: any[] = [];
   @Output() userUpdated = new EventEmitter<void>();
 
 
   createUserForm!: FormGroup;
   constructor(
     @Inject(MAT_DIALOG_DATA) public data: any,
 
     private dialogRef: MatDialogRef<CreateCustomersComponent>,
     private fb: FormBuilder,
     private userService: UserService, 
     private customerService: CustomerService,
     private spinner: NgxSpinnerService,
     private toast: ToastService
   ) 
   {
     this.createUserForm = this.fb.group({
       name: [''],
       price: [''],
       stock: [''],
       image: [''],
       description: [''],
     });
   }
   product: any = {
    image: '',
    name: '',
    price: '',
    stock: '',
    description: '',

  };
   closeDialog() {
     this.dialogRef.close();
   }
   ngOnInit(): void {
     if (this.data) {
       this.isEditing = this.data.isEditing || false;
       this.currentUserId = this.data.currentUserId || null;
   
       if (this.data.user) {
         this.createUserForm.patchValue(this.data.user); 
       }
     }  }
    
    
     onSubmitUser(): void {
      if (this.createUserForm.valid) {
        const userData = this.createUserForm.value;
        
        if (this.isEditing && this.currentUserId) {
          this.customerService.updateProduct(this.currentUserId, userData).subscribe({
            next: (response) => {
              this.toast.showSuccess('Produit mis à jour avec succès');
              this.userUpdated.emit();
              this.dialogRef.close();
            },
            error: (error) => {
              console.error('Erreur:', error);
              
              if (error?.error?.message) {
                if (Array.isArray(error.error.message)) {
                  const errorMessages = error.error.message
                    .map((err: any) => err.messages)
                    .flat()
                    .join(', ');
                  this.toast.showError(errorMessages);
                } else {
                  this.toast.showError(error.error.message);
                }
              } else {
                this.toast.showError('Erreur inconnue lors de la mise à jour');
              }
            }
          });
        } else {
          this.customerService.createProduct(userData).subscribe({
            next: (response) => {
              this.toast.showSuccess('Produit créé avec succès');
              this.userUpdated.emit();
              this.dialogRef.close();
            },
            error: (error) => {
              // Même gestion d'erreur que ci-dessus
            }
          });
        }
      } else {
        this.toast.showError('Formulaire invalide');
      }
    }
     
     selectedFile: File | null = null;

     onFileSelected(event: Event): void {
       const input = event.target as HTMLInputElement;
       if (input.files && input.files.length > 0) {
         this.selectedFile = input.files[0];
       }
     }
     
   // closeDialog() {
   //   this.dialogRef.close();
   // }
 
}





