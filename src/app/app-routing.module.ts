import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombineOperatorsComponent } from './combine-operators/combine-operators.component';
import { ConditionalOperatorsComponent } from './conditional-operators/conditional-operators.component';
import { HigherOrderOperatorsComponent } from './higher-order-operators/higher-order-operators.component';
import { SharingStreamComponent } from './sharing-stream/sharing-stream.component';

const routes: Routes = [
  { path: 'higher-order', component: HigherOrderOperatorsComponent },
  { path: 'conditional', component: ConditionalOperatorsComponent },
  { path: 'combine', component: CombineOperatorsComponent },
  { path: 'share', component: SharingStreamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
