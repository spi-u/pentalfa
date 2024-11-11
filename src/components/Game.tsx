import { Box, Alert, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const GameBoard = styled(Box)({
    width: '600px',
    height: '600px',
    margin: '0 auto',
    position: 'relative',
});

interface Point {
    x: number;
    y: number;
    id: number;
}

const Game = () => {
    const centerX = 300;
    const centerY = 300;
    const outerRadius = 250;
    
    // Состояние для хранения размещенных фишек
    const [placedPieces, setPlacedPieces] = useState<number[]>([]);

    // Вычисляем координаты вершин пятиконечной звезды
    const calculateStarPoints = (): Point[] => {
        const points = [];
        
        for (let i = 0; i < 5; i++) {
            const angle = (i * 72 - 18) * Math.PI / 180;
            const x = centerX + outerRadius * Math.cos(angle);
            const y = centerY + outerRadius * Math.sin(angle);
            points.push({ x, y, id: i });
        }
        
        return points;
    };

    // Вычисляем точки пересечения соседних линий
    const calculateIntersectionPoints = (): Point[] => {
        const points = [];
        const starPoints = calculateStarPoints();
        
        for (let i = 0; i < 5; i++) {
            const p1 = starPoints[i];
            const p2 = starPoints[(i + 2) % 5];
            const p3 = starPoints[(i + 1) % 5];
            const p4 = starPoints[(i + 3) % 5];
            
            const intersection = findIntersection(p1, p2, p3, p4);
            if (intersection) {
                points.push({ ...intersection, id: i + 5 });
            }
        }
        
        return points;
    };

    const findIntersection = (p1: Point, p2: Point, p3: Point, p4: Point) => {
        const x1 = p1.x, y1 = p1.y;
        const x2 = p2.x, y2 = p2.y;
        const x3 = p3.x, y3 = p3.y;
        const x4 = p4.x, y4 = p4.y;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denominator === 0) return null;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        
        return {
            x: x1 + t * (x2 - x1),
            y: y1 + t * (y2 - y1)
        };
    };

    const starPoints = calculateStarPoints();
    const intersectionPoints = calculateIntersectionPoints();
    const allPoints = [...starPoints, ...intersectionPoints];

    // Создаем линии звезды
    const createStarLines = () => {
        const lines = [];
        const pointCount = starPoints.length;
        
        for (let i = 0; i < pointCount; i++) {
            lines.push({
                x1: starPoints[i].x,
                y1: starPoints[i].y,
                x2: starPoints[(i + 2) % pointCount].x,
                y2: starPoints[(i + 2) % pointCount].y
            });
        }
        
        return lines;
    };

    const handlePointClick = (pointId: number) => {
        if (placedPieces.includes(pointId)) return; // Точка уже занята
        if (placedPieces.length >= 9) return; // Все 9 фишек уже размещены
        
        setPlacedPieces([...placedPieces, pointId]);
    };

    const handleReset = () => {
        setPlacedPieces([]);
    };

    const starLines = createStarLines();

    const isGameComplete = placedPieces.length === 9;

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            {isGameComplete && (
                <Alert 
                    severity="success" 
                    sx={{ mb: 2 }}
                >
                    Поздравляем! Вы победили!
                </Alert>
            )}
            <GameBoard>
                <svg width="600" height="600">
                    {/* Рисуем линии звезды */}
                    {starLines.map((line, index) => (
                        <line
                            key={index}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="black"
                            strokeWidth="2"
                        />
                    ))}
                    
                    {/* Рисуем все точки и фишки */}
                    {allPoints.map((point) => (
                        <g key={point.id} onClick={() => handlePointClick(point.id)}>
                            {/* Точка */}
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r="5"
                                fill="black"
                            />
                            {/* Фишка, если она размещена в этой точке */}
                            {placedPieces.includes(point.id) && (
                                <circle
                                    cx={point.x}
                                    cy={point.y}
                                    r="15"
                                    fill="#2196f3"
                                    stroke="white"
                                    strokeWidth="2"
                                />
                            )}
                        </g>
                    ))}
                </svg>
                
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    {!isGameComplete ? (
                        `Осталось фишек: ${9 - placedPieces.length}`
                    ) : (
                        'Игра завершена!'
                    )}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleReset}
                        sx={{ mt: 2, display: 'block', margin: '20px auto' }}
                    >
                        Сбросить игру
                    </Button>
                </Box>
            </GameBoard>
        </Box>
    );
};

export default Game;