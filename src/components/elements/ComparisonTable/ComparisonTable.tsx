import React from 'react';
import { Check, Minus, X } from 'lucide-react';
import styles from '@/components/elements/ComparisonTable/ComparisonTable.module.scss';

const classNames = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ');

export type ComparisonCellStatus = 'included' | 'not-included' | 'partial';

export interface ComparisonTableColumn {
  key: string;
  label: string;
  highlight?: boolean;
}

export interface ComparisonTableRow {
  feature: string;
  values: Record<string, ComparisonCellStatus>;
}

export interface ComparisonTableProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  columns: ComparisonTableColumn[];
  rows: ComparisonTableRow[];
}

const statusLabelMap: Record<ComparisonCellStatus, string> = {
  included: 'Included',
  'not-included': 'Not included',
  partial: 'Partially included',
};

const statusIconMap: Record<ComparisonCellStatus, React.ReactNode> = {
  included: <Check aria-hidden="true" />,
  'not-included': <X aria-hidden="true" />,
  partial: <Minus aria-hidden="true" />,
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  columns,
  rows,
  className,
  ...divProps
}) => {
  return (
    <div {...divProps} className={classNames(styles.container, className)}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" className={styles.featureColumn}>
              Feature
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={
                  column.highlight ? styles.highlightHeader : undefined
                }
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature}>
              <th scope="row" className={styles.featureCell}>
                {row.feature}
              </th>
              {columns.map((column) => {
                const status = row.values[column.key] ?? 'not-included';

                return (
                  <td key={`${row.feature}-${column.key}`}>
                    <span
                      className={classNames(styles.statusIcon, styles[status])}
                      role="img"
                      aria-label={statusLabelMap[status]}
                    >
                      {statusIconMap[status]}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
