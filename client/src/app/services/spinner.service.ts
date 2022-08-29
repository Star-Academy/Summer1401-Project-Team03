import {Injectable} from '@angular/core';
import {SpinnerComponent} from '../components/spinner/spinner.component';

@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
    public ids = new Set<number>();

    public component!: SpinnerComponent;

    public async wrapAsync<T>(callback: () => Promise<T>): Promise<T | null> {
        const id = this.show();
        try {
            return await callback();
        } catch (e) {
            return null;
        } finally {
            this.hide(id);
        }
    }

    public show(): number {
        const id = (Array.from(this.ids)[this.ids.size - 1] || -1) + 1;
        this.ids.add(id);
        return id;
    }

    public hide(id: number): void {
        this.ids.delete(id);
    }

    public hideAll(): void {
        this.ids = new Set<number>();
    }
}
