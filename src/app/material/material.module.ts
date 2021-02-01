import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule} from '@angular/material/sidenav';


const Material = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule
  
]

@NgModule({
  declarations: [],
  imports: [
    Material
  ],
  exports: [
    Material
  ]
})
export class MaterialModule { }
