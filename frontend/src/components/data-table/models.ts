import { ReactNode } from 'react'

export interface Order {
  name: string | null,
  order: 'asc' | 'desc'
}

export interface DataTableHead {
  name: string;
  title?: string;
  order?: boolean;
  search: boolean;
  hidden?: boolean;
  align?: 'center' | 'right' | 'left';
}

export interface DataTableActions {
  icon: ReactNode;
  title: string;
  action: Function;
  disabled: boolean;
}

export interface DataTableProps {
  id?: string;
  className?: string;
  loading?: boolean;
  title?: string;
  head: DataTableHead[];
  data: any[];
  onClickAdd?: Function;
  onClickRefresh?: Function;
  onClickRow?: Function;
  downloadCsv?: {
    filename: string;
    data: any[];
  };
}
