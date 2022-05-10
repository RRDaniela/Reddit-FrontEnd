import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  form: FormGroup;
  subreddintName: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      body: ['', [Validators.required, Validators.minLength(24)]]
    });
    this.subreddintName = this.route.snapshot.paramMap.get('name') || '';
  }

  ngOnInit(): void {}

  sendData() {
    console.log(this.form.valid)
    console.log(this.form.value)
    if (this.form.valid) {
      this.postService
        .create({
          title: this.form.value.title,
          body: this.form.value.body,
          subreddint: this.subreddintName,
        })
        .subscribe({
          next: (data) => {
            this.router.navigate([`subreddint/${this.subreddintName}`]);
          },
        });
    }
  }
}
