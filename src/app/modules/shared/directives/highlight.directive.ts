//********************************************************************************** */
//********************************************************************************** */
//********************************************************************************** */
// Imports
// Host Listener allows to have event listener methods to be applied globally in every html element it is putted
// Element Ref is a service that allows get the native html reference

import { Directive, ElementRef, HostListener } from '@angular/core';

//********************************************************************************** */
//********************************************************************************** */
//********************************************************************************** */
// Decorator

@Directive({
  selector: '[appHighlight]'
})

//********************************************************************************** */
//********************************************************************************** */
//********************************************************************************** */
// Directive definition

export class HighlightDirective {

  //**************************************** */
  //**************************************** */

  constructor(private element: ElementRef) { }

  //**************************************** */
  //**************************************** */

  @HostListener('mouseenter') onMouseEnter(){
    this.element.nativeElement.style.position = 'relative';
    this.element.nativeElement.style.top = '10px';
  }

  //******************************* */

  @HostListener('mouseleave') onMouseLeave(){
    this.element.nativeElement.style.position = '';
    this.element.nativeElement.style.top = '';
  }

}
