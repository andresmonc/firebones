import { animate, animateChild, group, query as q, sequence, state, style, transition, trigger } from '@angular/animations';


// this solves them problem
export function query(s, a) {
    return q(s, a, { optional: true });
}

export const fadeInAnimation =
    trigger('routeAnimations', [
        transition('EpisodePage <=> MainPage', [
            query(
                ':enter',
                [style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' })]
            ),
            query(
                ':leave',
                [style({ opacity: 1, position: 'absolute', width: '100%', height: '100%' }),
                animate('0.3s', style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' }))]
            ),
            query(
                ':enter',
                [style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' }),
                animate('0.3s', style({ opacity: 1, position: 'absolute', width: '100%', height: '100%' }))]
            )
        ]),
        transition('EpisodePage <=> ProfilePage', [
            query(
                ':enter',
                [style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' })]
            ),
            query(
                ':leave',
                [style({ opacity: 1, position: 'absolute', width: '100%', height: '100%' }),
                animate('0.3s', style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' }))]
            ),
            query(
                ':enter',
                [style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' }),
                animate('0.3s', style({ opacity: 1, position: 'absolute', width: '100%', height: '100%' }))]
            )
        ]),
        transition('MainPage <=> ProfilePage', [
            query(
                ':enter',
                [style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' })]
            ),
            query(
                ':leave',
                [style({ opacity: 1, position: 'absolute', width: '100%', height: '100%' }),
                animate('0.15s', style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' }))]
            ),
            query(
                ':enter',
                [style({ opacity: 0, position: 'absolute', width: '100%', height: '100%' }),
                animate('0.15s', style({ opacity: 1, position: 'absolute', width: '100%', height: '100%' }))]
            )
        ])
    ]);