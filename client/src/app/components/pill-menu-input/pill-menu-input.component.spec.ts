import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PillMenuInputComponent} from './pill-menu-input.component';

describe('PillMenuInputComponent', () => {
    let component: PillMenuInputComponent;
    let fixture: ComponentFixture<PillMenuInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PillMenuInputComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PillMenuInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
