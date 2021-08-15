import { ChangeEvent, Fragment, ReactNode, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiChevronUp, FiChevronDown, FiPlus, FiRefreshCw, FiDownload } from 'react-icons/fi'
import CsvDownloader from 'react-csv-downloader'
import TextInput from '@components/input-text'
import Button from '@components/button'
import { H1 } from '@components/typography'
import { DataTableHead, DataTableActions, DataTableProps, Order } from './models'
import { TableContainer, Table } from './styles'

export type { DataTableHead, DataTableActions } from './models'

const DataTable = ({ id, className, title, head, data, onClickAdd, onClickRefresh, onClickRow, downloadCsv = undefined, loading = false }: DataTableProps): JSX.Element => {
  const colSpan: number = head.filter(({ hidden }: DataTableHead): boolean => !hidden).length
  const [dataShow, setDataShow] = useState<any[]>([])
  const [itemsPage, setItemsPage] = useState<number>(15)
  const [totalPages, setTotalPages] = useState<number>(Math.ceil((data.length / itemsPage)))
  const [page, setPage] = useState<number>(1)
  const [orderData, setOrderData] = useState<Order>({ name: null, order: 'desc' })
  const [searchFilter, setSearchFilter] = useState<string>('')

  useEffect(() => {
    setTotalPages(Math.ceil((data.length / itemsPage)))
  }, [itemsPage, data])

  useEffect(() => {
    setPage(1)
  }, [itemsPage, searchFilter])

  useEffect(() => {
    const sort = (a: any, b: any): number => {
      if (orderData.name && a[orderData.name] < b[orderData.name]) {
        return orderData.order === 'asc' ? 1 : -1
      }
      if (orderData.name && a[orderData.name] > b[orderData.name]) {
        return orderData.order === 'asc' ? -1 : 1
      }
      return 0;
    }
    const filter = (dataToFilter: any[]): any[] => {
      if (!searchFilter.length) {
        setTotalPages(Math.ceil((data.length / itemsPage)))
        return dataToFilter
      }
      const newDataShow: any[] = dataToFilter.filter((dataItem: any) => {
        const haveSearchValue: boolean[] = []
        const regex = new RegExp(`\\b${searchFilter}.*\\b`, 'gi')
        const columnsToFilter: string[] = head
          .filter((item: DataTableHead): boolean => item.search)
          .map((item: DataTableHead): string => item.name)
        columnsToFilter.forEach((column: string): void => {
          const value: string = dataItem[column]
          const haveValue: boolean = String(value).match(regex) ? true : false
          haveSearchValue.push(haveValue)
        })
        return haveSearchValue.includes(true) ? true : false
      })
      setTotalPages(Math.ceil((newDataShow.length / itemsPage)))
      return newDataShow
    }
    const initial: number = page === 1 ? 0 : (page - 1) * itemsPage
    const newDataShow: any[] = filter(data).sort(sort).slice(initial, (itemsPage * page))
    setDataShow(newDataShow)
  }, [page, orderData, searchFilter, itemsPage, head, data])

  const rowClickHandler = (rowData: any): void => {
    onClickRow!(rowData)
  }

  const addClickHandler = (): void => {
    onClickAdd!()
  }

  const refreshClickHandler = (): void => {
    onClickRefresh!()
  }

  const renderBlankLines = (): JSX.Element => {
    const blankRows: any[] = []
    for (let index = dataShow.length; index < itemsPage; index++) {
      blankRows.push(null)
    }
    return (
      <Fragment>
        {blankRows.map((item: any, index: number) => (
          <tr className="no-data" key={index}><td colSpan={head.length}>&nbsp;</td></tr>
        ))}
      </Fragment>
    )
  }

  const removeActionFromData = (data: any): any => {
    const newData: any = { ...data }
    delete newData['actions']
    return newData
  }

  return (
    <TableContainer id={id} className={className} >
      <Table>
        <thead>
          <tr>
            <td colSpan={colSpan}>
              <div>
                {title && <H1>{title}</H1>}
                <TextInput
                  setValue={searchFilter}
                  placeholder="digite para buscar"
                  getValue={(name, value): void => setSearchFilter(String(value))}
                />
                {downloadCsv && (
                  <CsvDownloader className="download" datas={downloadCsv.data} filename={downloadCsv.filename}>
                    <Button title="Baixar dados"><FiDownload /></Button>
                  </CsvDownloader>
                )}
                {onClickRefresh && (<Button className="refresh" title="Atualizar" onClick={refreshClickHandler}><FiRefreshCw /></Button>)}
                {onClickAdd && (<Button className="add" title="Adicionar novo" onClick={addClickHandler}><FiPlus /></Button>)}
              </div>
            </td>
          </tr>
          <tr>
            {head.filter(({ hidden }: DataTableHead): boolean => !hidden).map(({ name, title, order }: DataTableHead): ReactNode => (
              <th key={name}>
                <div>
                  {title}
                  {order && (
                    <button onClick={() => setOrderData({ name, order: orderData.order === 'asc' ? 'desc' : 'asc' })} >
                      {orderData.name === name && orderData.order === 'asc' ? <FiChevronDown /> : <FiChevronUp />}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan={colSpan}>
              <div>
                {dataShow.length ? (
                  <span>{`${page > 1 ? ((page - 1) * itemsPage) + 1 : 1}-${page > 1 ? ((page - 1) * itemsPage) + dataShow.length : dataShow.length}`}</span>
                ) : <span />}
                <span className="pagination">
                  <button
                    onClick={() => setPage(1)}
                    disabled={page === 1 ? true : false}
                  ><FiChevronsLeft /></button>
                  <button
                    onClick={() => setPage((old: number) => old - 1)}
                    disabled={page === 1 ? true : false}
                  ><FiChevronLeft /></button>
                  <button
                    onClick={() => setPage((old: number) => old + 1)}
                    disabled={!dataShow.length || (page === totalPages) ? true : false}
                  ><FiChevronRight /></button>
                  <button
                    onClick={() => setPage(totalPages)}
                    disabled={!dataShow.length || (page === totalPages) ? true : false}
                  ><FiChevronsRight /></button>
                </span>
                <select
                  disabled={!dataShow.length}
                  value={itemsPage}
                  onChange={({ target }: ChangeEvent<HTMLSelectElement>): void => setItemsPage(parseInt(target.value))}
                >
                  <option>15</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                  <option>150</option>
                </select>
              </div>
            </td>
          </tr>
        </tfoot>
        <tbody>
          {loading ? (
            <tr className="loading">
              <td colSpan={colSpan}>
                <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  viewBox="-22 0 100 100" enableBackground="new 0 0 0 0">
                  <circle stroke="none" cx="6" cy="50" r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
                  </circle>
                  <circle stroke="none" cx="26" cy="50" r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
                  </circle>
                  <circle stroke="none" cx="46" cy="50" r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
                  </circle>
                </svg>
              </td>
            </tr>
          ) : dataShow.length ? dataShow.map((item, index): ReactNode => (
            <tr key={index}>
              {head.filter(({ hidden }: DataTableHead): boolean => !hidden).map(({ name, align = 'left' }: DataTableHead): ReactNode => {
                if (name === 'actions') {
                  return (
                    <td
                      key={name}
                      className="actions"
                      align="center"
                      width="1%">
                      {item.actions.map(({ title, icon, action, disabled = false }: DataTableActions): ReactNode => (
                        <button
                          key={title}
                          title={title}
                          onClick={() => action(removeActionFromData(item))}
                          disabled={disabled}
                        >{icon}</button>)
                      )}</td>)
                }
                return (<td
                  key={name}
                  align={align}
                  onClick={() => rowClickHandler(removeActionFromData(item))} style={{ cursor: onClickRow ? 'pointer' : 'default' }}
                >{item[name] || '-'}</td>)
              })}
            </tr>
          )) : (
            <tr>
              <td align="center" rowSpan={3} colSpan={head.length}><br /><br />Não há dados para exibição<br /><br /><br /></td>
            </tr>
          )}
          {!loading && dataShow.length && (dataShow.length < itemsPage) && (dataShow.length > 15) ? renderBlankLines() : null}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
