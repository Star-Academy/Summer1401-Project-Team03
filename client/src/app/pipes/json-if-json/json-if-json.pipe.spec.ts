import {JsonIfJsonPipe} from './json-if-json.pipe';

describe('JsonIfJsonPipe', () => {
    it('create an instance', () => {
        const pipe = new JsonIfJsonPipe();
        expect(pipe).toBeTruthy();
    });
});
