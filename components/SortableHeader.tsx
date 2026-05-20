import { SortableHeaderProps } from "@/types/types";

export default function SortableHeader({
    label,
    column,
    onSort,
    arrow,
}: SortableHeaderProps) {
    return (
        <th
        onClick={() => onSort && onSort(column)}
        className="cursor-pointer select-none px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-200"
        >
        <div className="flex items-center gap-2">
            {label}
            {arrow && <span className="text-xs text-gray-500">{arrow}</span>}
        </div>
        </th>
    );
}