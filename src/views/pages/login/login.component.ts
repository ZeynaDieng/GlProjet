import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../../services/toastr.service';
import { setLocalData } from '../../../utils/local-storage-service';
import { AuthService } from '../../../services/auth.service';
import { log } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toast: ToastService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
 this.onSubmitLogin();
    console.log('Login component initialized');
  }
  onSubmitLogin() {
    console.log('Form values', this.loginForm.value);
  console.log('Form valid ?', this.loginForm.valid);
    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          let message = response.message;
          console.log('response', response);

          let reponses = response.data;
          console.log('reponses', reponses);

          let accessToken = response.token;

          const redirectUrl = '/partners';
          console.log('redirectUrl', redirectUrl);
          this.router.navigate([redirectUrl], {
            replaceUrl: true,
          });

          this.toast.showSuccess(message);


          setLocalData('accessToken', accessToken);
        },
        error: (error) => {
          console.error('Erreur API:', error); // 👈 ajoute ça
          let errorMessage = error.error?.message;
          this.spinner.hide();
          this.toast.showError(
            errorMessage ?? 'Une Erreur est survenue. Réessayez plus tard!'
          );
        },
        
        complete: () => {
          this.spinner.hide();
          console.log('COMPLETE');
        },
      });
    }
  }
}
