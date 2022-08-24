import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PipelineAddButtonComponent} from './pipeline-add-button.component';

describe('PipelineAddButtonComponent', () => {
    let component: PipelineAddButtonComponent;
    let fixture: ComponentFixture<PipelineAddButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PipelineAddButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PipelineAddButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
