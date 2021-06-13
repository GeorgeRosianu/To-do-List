import { Time } from "@angular/common";
import { Status } from "./status";

export interface Task {
    position: number;
    title: string;
    description: string;
    estimatedTime: string;
    category: string;
    date: string;
    status: string;
}