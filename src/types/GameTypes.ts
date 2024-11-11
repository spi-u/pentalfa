export interface Point {
    x: number;
    y: number;
    id: number;
}

export interface GameState {
    points: Point[];
    pieces: number[]; // массив id точек, где стоят фишки
    isPlayerOneTurn: boolean;
} 