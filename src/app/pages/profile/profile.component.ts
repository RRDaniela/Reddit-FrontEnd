import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

interface IUserData {
  username: string;
  avatar: string;
  karma: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: string = '';
  fileToUpload: File | null = null;
  user: IUserData | null = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.userService.getUserById(id).subscribe(user => {
        console.log(user);
        this.user = {
          username: user.username,
          avatar: user.avatar.url,
          karma: user.karma,
        };
      });
    });
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  uploadFile() {

    if(this.fileToUpload){
      this.userService.uploadAvatar(this.fileToUpload, this.id).subscribe(() => {
        this.userService.getUserById(this.id).subscribe(user => {
          this.user = {
            username: user.username,
            avatar: user.avatar.url,
            karma: user.karma,
          };
        }
        );
      })
    }
  }

}