import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {UsersService} from '../../../shared/services/users.service';
import {User} from '../../../shared/models/user.model';
import {Message} from '../../../shared/models/message.model';
import {AuthService} from '../../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: Message;

  validationMessages = {
    email: {
      error: 'Email is not valid!',
      success: 'Email is valid'
    },
    password: {
      error: 'Password is not correct!',
      success: 'Custom success message'
    }
  };

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: ToastrService) {
    this.loginForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    });
  }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams.subscribe((params: Params) => {
      if (params['canLogin']) {
        setTimeout( (() => {
          this.notification.success('Now you can login!');
        }).bind(this));
      }
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;

    this.usersService.getUserByEmail(email).subscribe((user: User) => {
      if (user && user.password === this.loginForm.value.password) {
        this.authService.login(user);
        // this.router.navigate([]);
      } else {
        this.showMessage({
          type: 'danger',
          text: 'Email or password is not correct!'
        });
      }
    });
  }


}
