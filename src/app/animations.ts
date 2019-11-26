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


export const slideInAnimation =
    trigger('routeAnimations', [
        transition('disable <=> disable', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ left: '100%' }))
                ]),
                query(':enter', [
                    animate('300ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('disable <=> disable', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('200ms ease-out', style({ left: '100%' }))
                ]),
                query(':enter', [
                    animate('300ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ]), transition('* <=> *', [
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
