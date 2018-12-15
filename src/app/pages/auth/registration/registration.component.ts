import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

import {Message} from '../../../shared/models/message.model';
import {User} from '../../../shared/models/user.model';
import {UsersService} from '../../../shared/services/users.service';
import {reject} from 'q';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  message: Message;

  validationMessages = {
    field: {
      error: 'This field is required!',
      success: ''
    },
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
    private router: Router ) {
    this.registerForm = fb.group({
      firstName: [null, Validators.required],
      lastName: [null],
      email: [null, [Validators.required, Validators.email], this.userExist.bind(this)],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      passwordConfirm: [null, [Validators.required], this.checkPasswords.bind(this)]
    });

  }

  checkPasswords(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      const pass = this.registerForm.get('password').value;
      const confirmPass = control.value;
      if (pass !== confirmPass) {
        resolve ({notSame: true});
      } else {
        resolve(null);
      }
    });
  }

  userExist(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value).subscribe((user: User) => {
        if (user) {
          resolve({userExist: true});
        } else {
          resolve(null);
        }
      });
    });
  }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(type: string = 'danger', text: string) {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const {firstName, lastName, email, password} = this.registerForm.value;
    const user = new User(firstName, lastName, email, password);

    this.usersService.createNewUser(user)
      .subscribe(() => {
        this.router.navigate(['/account/login'], {
          queryParams: {
            canLogin: true
          }
        });
      });
  }

  get isEmailInvalid() {
    const errors = this.registerForm.get('email')['errors'];
    return this.registerForm.get('email').dirty && errors &&
      (errors['email'] || errors['required']);
  }
  get isEmailExist(){
    const errors = this.registerForm.get('email')['errors'];
    return this.registerForm.get('email').dirty && errors && errors['userExist'];
  }
  get isPasswordDifferent(){
    const errors = this.registerForm.get('passwordConfirm')['errors'];
    return this.registerForm.get('passwordConfirm').dirty && errors && errors['notSame'];
  }
}
