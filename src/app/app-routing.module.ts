import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PostsComponent } from './pages/posts/posts.component';
import { SubreddintComponent } from './pages/subreddint/subreddint.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CreateSubredditComponent } from './forms/create-subreddit/create-subreddit.component';
import { PostComponent } from './pages/post/post.component';


const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full'},
  { path: 'posts', component: PostsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'subreddint/:name', component: SubreddintComponent },
  { path: 'create-post/:name', component: CreatePostComponent },
  { path: 'create-subreddint', component:CreateSubredditComponent},
  { path: 'posts/:id', component:PostComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
