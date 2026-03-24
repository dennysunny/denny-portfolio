import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);

  email    = signal('');
  password = signal('');
  error    = signal('');
  loading  = signal(false);

  onSubmit(): void {
    this.error.set('');
    this.loading.set(true);

    // Simulate async (swap for real HTTP call later)
    setTimeout(() => {
      const result = this.auth.login(this.email(), this.password());
      this.loading.set(false);

      if (result.success) {
        this.router.navigate(['/']);
      } else {
        this.error.set(result.message);
      }
    }, 400);
  }
}
