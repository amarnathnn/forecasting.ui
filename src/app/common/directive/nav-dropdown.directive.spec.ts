import { NavDropdownDirective } from './nav-dropdown.directive';
import { ElementRef } from '@angular/core';

describe('NavDropdownDirective', () => {
  it('should create an instance', () => {
    let er: ElementRef
    const directive = new NavDropdownDirective(er);
    expect(directive).toBeTruthy();
  });
});
