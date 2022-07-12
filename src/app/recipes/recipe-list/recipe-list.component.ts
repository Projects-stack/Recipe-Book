import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  private subscription: Subscription

  public recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
      this.recipes = this.recipeService.getRecipes();
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

  public onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
