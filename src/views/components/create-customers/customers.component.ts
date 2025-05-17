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
       console.log('Formulaire soumis');
       if (this.createUserForm.valid) {
         const userData = this.createUserForm.value;
         console.log('Données produits:', userData);
         if (this.isEditing && this.currentUserId) {
           this.customerService.updateProduct(this.currentUserId, userData).subscribe({
             next: (response) => {
               console.log('produit mis à jour avec succès:', response);
               this.toast.showSuccess('produit mis à jour avec succès')

               this.userUpdated.emit();
               this.dialogRef.close();  
             },
             error: (error) => {
              console.error('Erreur lors de la création du produit:', error.error.message);
              // this.toast.showError(error.error.message);

              const errorDetails = error?.error?.message;
              
              if (Array.isArray(errorDetails) && errorDetails.length > 0) {
                const errorMessages = errorDetails.map(err => err.messages).flat();
                this.toast.showError(errorMessages.join(', '));
              } else (error:any) => {
                this.toast.showError(error.message);
              }
            },
           });
         } else {

          const userData = this.createUserForm.value;
          console.log('Données produits:', userData);
          this.customerService.createUser(userData).subscribe({
            next: (response) => {
              console.log('produit créé avec succès:', response);
              this.toast.showSuccess('produit créé avec succès')
              this.userUpdated.emit(); 
              this.dialogRef.close();   
            },
            error: (error) => {
              console.error('Erreur lors de la création du produit:', error.error.message);
              // this.toast.showError(error.error.message);

              const errorDetails = error?.error?.message;
              
              if (Array.isArray(errorDetails) && errorDetails.length > 0) {
                const errorMessages = errorDetails.map(err => err.messages).flat();
                this.toast.showError(errorMessages.join(', '));
              } else (error:any) => {
                this.toast.showError(error.message);
              }
            },
         })
         }
       } else {
         console.error('Le formulaire est invalide', this.createUserForm.value);
         this.toast.showError('Le formulaire est invalide');
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





