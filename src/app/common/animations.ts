import { trigger, state, transition, style, animate } from '@angular/animations';

export let slide = trigger('slide', [
    state('in', style({ width: '250px', display: 'block'})),
    state('out', style({ width: '0px', display: 'none' })),
    transition('out <=> in', animate(100))
  ]);

  export let fade = trigger('fade', [
    state('in', style({ opacity: 1, display: 'block' })),
    state('out', style({ opacity: 0, display: 'none' })),
    transition('out <=> in', animate(200))
  ]);