import { animate, animateChild, group, query as q, sequence, state, style, transition, trigger } from '@angular/animations';


// this solves them problem
export function query(s, a) {
    return q(s, a, { optional: true });
}

export const fadeAnimation = trigger('fadeAnimation', [
    // The '* => *' will trigger the animation to change between any two states
    transition('* => *', [
        // The query function has three params.
        // First is the event, so this will apply on entering or when the element is added to the DOM.
        // Second is a list of styles or animations to apply.
        // Third we add a config object with optional set to true, this is to signal
        // angular that the animation may not apply as it may or may not be in the DOM.
        query(
            ':enter',
            [style({ opacity: 0, transform: 'translateX(-100%)', position: 'absolute', width: '100%', height: '100%' })],
            { optional: true }
        ),
        query(
            ':leave',
            // here we apply a style and use the animate function to apply the style over 0.3 seconds
            [style({ opacity: 1 }), animate('1.0s', style({
                opacity: 0, transform: 'translateX(100%)',
                position: 'absolute', width: '100%', height: '100%'
            }))],
            { optional: true }
        ),
        query(
            ':enter',
            [style({ opacity: 0 }), animate('1.0s', style({
                opacity: 1, transform: 'translateX(0%)',
                position: 'absolute', width: '100%', height: '100%'
            }))],
            { optional: true }
        )
    ])
]);

// export const slide = trigger('slide', [
//     state('left', style({ transform: 'translateX(0)' })),
//     state('right', style({ transform: 'translateX(-50%)' })),
//     transition('* => *', animate(300))
// ]);


export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
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
        transition('* <=> *', [
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
        ])
    ]);
