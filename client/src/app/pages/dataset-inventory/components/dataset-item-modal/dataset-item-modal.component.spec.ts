import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetItemModalComponent} from './dataset-item-modal.component';

describe('ItemModalComponent', () => {
    let component: DatasetItemModalComponent;
    let fixture: ComponentFixture<DatasetItemModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatasetItemModalComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DatasetItemModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
