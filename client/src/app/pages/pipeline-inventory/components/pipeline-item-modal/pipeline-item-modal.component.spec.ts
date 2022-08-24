import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PipelineItemModalComponent} from './pipeline-item-modal.component';

describe('ItemModalComponent', () => {
    let component: PipelineItemModalComponent;
    let fixture: ComponentFixture<PipelineItemModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PipelineItemModalComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PipelineItemModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
