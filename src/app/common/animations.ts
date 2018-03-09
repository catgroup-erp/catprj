import { trigger, state, transition, style, animate } from '@angular/animations';

export let slide = trigger('slide', [
    state('in', style({ height: '100%', overflow: 'hidden' })),
    state('out', style({ height: '0px', overflow: 'hidden' })),
    transition('out <=> in', animate(200))
  ]);

  export let fade = trigger('fade', [
    state('in', style({ opacity: 1, display: 'block' })),
    state('out', style({ opacity: 0, display: 'none' })),
    transition('out <=> in', animate(200))
  ]);