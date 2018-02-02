export enum Kind {Ace = 1, King = 2, Queen = 3, Jack = 4, Ten = 5, Nine = 6, Eight = 7, Seven = 8, Six = 9, Five = 10, Four = 11, Three = 12, Two = 13};
export enum Suit {Spade = 1, Club = 2, Diamond = 3, Heart = 4};
export enum Action {Fold = 1, Call = 2, Raise = 3};

// UTG - Under the gun
// MP - Middle position
// CO - Cut off
// BTN - Button
// SB - Small Blind
// BB - Big Blind
export enum Position {UTG = 1, MP = 2, CO = 3, BTN = 4, SB = 5, BB = 6 };

// export enum Hand { Card = 1, Pair = 2, TwoPairs = 3, Set = 4, Straight = 5, Flush = 6, FullHouse = 7, Quad = 8, 
//     StraightFlush = 9, RoyalFlush = 10 };

//export enum Challenge {OpenPosition = 1, FacingRaise = 2, Facing3Bet = 3, Facing4Bet = 4, SqueezeBlinds = 5};

export enum Board {Empty = 0, Flop = 3, Turn = 4, River = 5};