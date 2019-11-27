import { animate, animateChild, group, query as q, sequence, state, style, transition, trigger } from '@angular/animations';


// this solves them problem
export function query(s, a) {
    return q(s, a, { optional: true });
}


// export const slide = trigger('slide', [
//     state('left', style({ transform: 'translateX(0)' })),
//     state('right', style({ transform: 'translateX(-50%)' })),
//     transition('* => *', animate(300))
// ]);


export const fadeInAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            query(
                ':enter',
                [style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' })]
            ),
            query(
                ':leave',
                [style({ opacity: 1, position: 'absolute', width: '100%', height: '100%' }),
                animate('0.9s', style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' }))]
            ),
            query(
                ':enter',
                [style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' }),
                animate('0.9s', style({ opacity: 1, position: 'absolute', width: '100%', height: '100%' }))]
            )
        ])
    ]);
