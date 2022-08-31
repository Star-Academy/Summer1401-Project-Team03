import {ComponentFixture, TestBed} from '@angular/core/testing';

import {addNodeComponent} from './add-node.component';

describe('ProcessListComponent', () => {
    let component: addNodeComponent;
    let fixture: ComponentFixture<addNodeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [addNodeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(addNodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
