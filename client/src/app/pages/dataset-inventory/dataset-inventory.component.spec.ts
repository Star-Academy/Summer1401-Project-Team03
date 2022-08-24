import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetInventoryComponent} from './dataset-inventory.component';

describe('DatasetInventoryComponent', () => {
    let component: DatasetInventoryComponent;
    let fixture: ComponentFixture<DatasetInventoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatasetInventoryComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DatasetInventoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
