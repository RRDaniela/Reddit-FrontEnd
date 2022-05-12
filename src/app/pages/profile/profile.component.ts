import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName: string='';

  constructor() { }

  ngOnInit(): void {
  }

}

/*ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['name']);
      this.subreddintName = params['name'];
      this.subreddintNamelow = 'r/' + this.subreddintName.toLowerCase();
    });

    this.getPosts(this.subreddintName);
  }*/ 