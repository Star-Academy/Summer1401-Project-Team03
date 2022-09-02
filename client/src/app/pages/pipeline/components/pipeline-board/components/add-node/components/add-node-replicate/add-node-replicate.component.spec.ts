import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNodeReplicateComponent } from './add-node-replicate.component';

describe('AddNodeReplicateComponent', () => {
  let component: AddNodeReplicateComponent;
  let fixture: ComponentFixture<AddNodeReplicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNodeReplicateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNodeReplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
