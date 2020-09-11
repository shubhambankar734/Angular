import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { Dish } from '../Shared/dish';
import {DishService} from '../services/dish.service';
import {Params , ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Comment } from '../Shared/comment';
import { baseURL } from '../Shared/baseurl';
import { visibility , flyInOut ,expand} from '../animation/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  
})
export class DishdetailComponent implements OnInit {
 
  @ViewChild('fform') commentFormDirective;
  dish : Dish;
  dishIds: string[];
  prev: string;
  next : string;
  commentForm : FormGroup;
  comments : Comment;
  errMess : string;
  dishcopy : Dish;
  visibility = 'shown';
 
  constructor(private dishservice: DishService , private location: Location , private route: ActivatedRoute , private fb:FormBuilder,@Inject('BaseURL') private BaseURL) {
    this.createform();
   }
   formErrors = {
    'author': '',
    'comment' :''
  };
  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      
    },
    'comment': {
      'required':      'Feedback is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      
    }, 
  };
  temp ={
    author : '',
    rating : '',
    comment : '',
  };
  createform()
  {
    this.commentForm = this.fb.group({
        author : ['' , [Validators.required , Validators.minLength(2) ]],
        rating :['5'],
        comment : ['',[Validators.required , Validators.minLength(2)]]
    });
    this.commentForm.valueChanges.
    subscribe((data) =>this.onValueChanged(data));
    this.onValueChanged();
  } 
  onValueChanged(data ?: any){
    this.temp = this.commentForm.value;
    if(!this.commentForm){
      return;
    }
    const form = this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] ='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid && control.touched){
          const message = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += message[key] +'';
            }
          }
        }
      }
    }
  }
  onSubmit(){
   this.comments = this.commentForm.value;
    this.comments.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comments);
    this.dishservice.putDish(this.dishcopy).subscribe(dish => {this.dish = dish ; this.dishcopy = dish}, errmess =>{this.dish = null ; this.dishcopy= null ; this.errMess = <any>errmess;});
    console.log(this.commentForm.value);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: '5',
      comment: '',
    });
    
  }
  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
 this.route.params.pipe(switchMap((params :Params) =>{ return this.dishservice.getDish(params['id']);}))
    .subscribe(dish => { this.dish = dish; this.dishcopy= dish; this.setPrevNext(dish.id); } , errMess => this.errMess = <any>errMess  );
  }
goBack(): void{
  this.location.back();
}
setPrevNext(dishId : string){
  const index = this.dishIds.indexOf(dishId);
  this.prev = this.dishIds[(this.dishIds.length + index - 1)% this.dishIds.length];
  this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
}
}
