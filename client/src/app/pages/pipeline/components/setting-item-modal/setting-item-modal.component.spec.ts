import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingItemModalComponent } from './setting-item-modal.component';

describe('SettingItemModalComponent', () => {
  let component: SettingItemModalComponent;
  let fixture: ComponentFixture<SettingItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
