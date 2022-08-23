import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataListComponent} from './data-list.component';

describe('DataListComponent', () => {
    let component: DataListComponent;
    let fixture: ComponentFixture<DataListComponent>;
    let host: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DataListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DataListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        host = fixture.nativeElement as HTMLElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set label', () => {
        const label = 'label test';
        component.label = label;
        fixture.detectChanges();
        const labelValue = host.querySelector('label')?.firstChild?.textContent?.trim();
        expect(labelValue).toEqual(label);
    });

    it('should set options', () => {
        spyOn(component.valueChange, 'emit');

        const options = [
            {
                value: 'one',
                title: '1',
            },
            {
                value: 'two',
                title: '2',
            },
        ];

        const select = host.querySelector('select')!;

        component.options = options;
        fixture.detectChanges();
        expect(select?.children.length).toEqual(options.length);
    });
});
