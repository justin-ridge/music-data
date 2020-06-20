export class ModelResponse {
    images: {
        importance: string;
        labels: string;
        mean: string
    };
    score: number;
    testedField: number;
    trainedFields: number;
    mislabeled: string;
}
