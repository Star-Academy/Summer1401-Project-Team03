import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PipelineInventoryComponent} from './pipeline-inventory.component';

describe('PipelineInventoryComponent', () => {
    let component: PipelineInventoryComponent;
    let fixture: ComponentFixture<PipelineInventoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PipelineInventoryComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PipelineInventoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
