import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsFavComponent } from './produits-fav.component';

describe('ProduitsFavComponent', () => {
  let component: ProduitsFavComponent;
  let fixture: ComponentFixture<ProduitsFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitsFavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitsFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
