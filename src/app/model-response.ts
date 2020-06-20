export class ModelResponse {
    images: {
        importance: string;
        labels: string;
        mean: string
    };
    score: number;
    testedFields: number;
    trainedFields: number;
    mislabeled: string;
}
