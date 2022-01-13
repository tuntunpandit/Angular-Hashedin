export interface Course {
    tags: string[];
    details: string;
    description: string;
    discounted_price: number | null;
    actual_price: number | null;
    author: string;
    title: string;
    id: number
}