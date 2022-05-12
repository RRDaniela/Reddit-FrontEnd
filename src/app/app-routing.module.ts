import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PostsComponent } from './pages/posts/posts.component';
import { SubreddintComponent } from './pages/subreddint/subreddint.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CreateSubredditComponent } from './forms/create-subreddit/create-subreddit.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full'},
  { path: 'posts', component: PostsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'subreddint/:name', component: SubreddintComponent },
  { path: 'create-post/:name', component: CreatePostComponent },
  { path: 'create-subreddint', component:CreateSubredditComponent},
  { path: 'posts/:id', component: PostComponent},
  { path: 'comments/:id', component: PostComponent},
  { path: 'profile/:id', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
