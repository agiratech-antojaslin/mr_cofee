import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appBlueBackground]'
})
export class BlueBackgroundDirective {
    constructor(el:ElementRef) {
        el.nativeElement.style.backgroundColor = "blue";
    }
}