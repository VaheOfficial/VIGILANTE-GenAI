import type { government } from "../types/types";

export function governmentFormat(res: string): government[] {
    const response = JSON.parse(res);
    const sectors = response.data.sectors.edges;
    const government: government[] = sectors.map((sector: any) => {
        return {
            id: sector.node.id,
            name: sector.node.name
        }
    });
    return government;
}