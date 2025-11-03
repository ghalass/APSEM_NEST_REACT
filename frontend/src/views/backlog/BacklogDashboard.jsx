import React, { useMemo } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner,
  CAlert,
  CRow,
  CCol,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { useQuery } from '@tanstack/react-query'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const styles = {
  card: { marginBottom: '1.5rem' },
  cardHeader: { fontWeight: 'bold', fontSize: '1rem', padding: '0.75rem 1rem' },
  cardBody: { padding: '1rem' },
  tableWrapper: { overflowX: 'auto' },
  table: { minWidth: '600px', marginBottom: 0 },
  cell: { whiteSpace: 'nowrap', padding: '0.5rem 0.75rem', textAlign: 'center' },
  statsWrapper: { display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '0.5rem' },
  statText: { margin: 0 },
  chartWrapper: { marginTop: '1rem' },
}

export default function BacklogDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['backlog_dashboard'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/anomalie/backlog_dashboard')
      if (!res.ok) throw new Error('Erreur réseau')
      return res.json()
    },
  })

  const statusKeys = ['NON_PROGRAMMEE', 'PROGRAMMEE', 'PDR_PRET', 'ATTENTE_PDR', 'EXECUTE']

  const byTypePanneRows = useMemo(
    () => (data ? Object.entries(data.byTypePanne).map(([key, val]) => ({ key, ...val })) : []),
    [data],
  )
  const bySiteRows = useMemo(
    () => (data ? Object.entries(data.bySite).map(([key, val]) => ({ key, ...val })) : []),
    [data],
  )
  const byUrgenceRows = useMemo(
    () =>
      data
        ? Object.entries(data.byUrgence).map(([key, val]) => ({ key, total: val, status: {} }))
        : [],
    [data],
  )
  const totalBesoinPdrRows = useMemo(
    () =>
      data
        ? Object.entries(data.totalBesoinPdrByStatus).map(([key, val]) => ({
            key,
            total: val,
            status: {},
          }))
        : [],
    [data],
  )

  const columnsByStatus = useMemo(
    () => [
      columnHelper.accessor('key', { header: 'Nom' }),
      columnHelper.accessor('total', { header: 'Total' }),
      ...statusKeys.map((s) =>
        columnHelper.accessor((row) => row.status?.[s] ?? 0, { id: s, header: s }),
      ),
    ],
    [],
  )

  const tableByTypePanne = useReactTable({
    data: byTypePanneRows,
    columns: columnsByStatus,
    getCoreRowModel: getCoreRowModel(),
  })
  const tableBySite = useReactTable({
    data: bySiteRows,
    columns: columnsByStatus,
    getCoreRowModel: getCoreRowModel(),
  })
  const tableByUrgence = useReactTable({
    data: byUrgenceRows,
    columns: [
      columnHelper.accessor('key', { header: 'Urgence' }),
      columnHelper.accessor('total', { header: 'Total' }),
    ],
    getCoreRowModel: getCoreRowModel(),
  })
  const tableBesoinPdr = useReactTable({
    data: totalBesoinPdrRows,
    columns: [
      columnHelper.accessor('key', { header: 'Statut BS' }),
      columnHelper.accessor('total', { header: 'Total' }),
    ],
    getCoreRowModel: getCoreRowModel(),
  })

  const DashboardTable = ({ table, title }) => (
    <CCard style={styles.card}>
      <CCardHeader style={styles.cardHeader}>{title}</CCardHeader>
      <CCardBody style={styles.cardBody}>
        {table.getRowModel().rows.length === 0 ? (
          <CAlert color="info" className="text-center" style={{ margin: '1rem 0' }}>
            Aucune donnée disponible.
          </CAlert>
        ) : (
          <div style={styles.tableWrapper}>
            <CTable hover bordered responsive style={styles.table}>
              <CTableHead color="dark">
                {table.getHeaderGroups().map((headerGroup) => (
                  <CTableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <CTableHeaderCell key={header.id} style={styles.cell}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </CTableHeaderCell>
                    ))}
                  </CTableRow>
                ))}
              </CTableHead>
              <CTableBody>
                {table.getRowModel().rows.map((row) => (
                  <CTableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <CTableDataCell key={cell.id} style={styles.cell}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </CTableDataCell>
                    ))}
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        )}
      </CCardBody>
    </CCard>
  )

  // --- Graphique d'évolution mensuelle ---
  const evolutionData = useMemo(() => {
    if (!data || !data.evolutionByMonth) return null
    const labels = data.evolutionByMonth.map((m) => m.month)
    return {
      labels,
      datasets: [
        {
          label: 'Anomalies',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: data.evolutionByMonth.map((m) => m.anomalies),
          fill: true,
          tension: 0.3,
        },
        {
          label: 'Besoin PDR',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: data.evolutionByMonth.map((m) => m.pdr),
          fill: true,
          tension: 0.3,
        },
      ],
    }
  }, [data])

  return (
    <CRow className="g-3" style={{ gap: '1rem' }}>
      <CCol xs={12}>
        <CCard style={styles.card}>
          <CCardHeader style={{ ...styles.cardHeader, fontSize: '1.1rem' }}>
            📊 Dashboard Backlog Anomalies
          </CCardHeader>
          <CCardBody style={styles.cardBody}>
            {isLoading ? (
              <div className="text-center p-4">
                <CSpinner color="primary" />
              </div>
            ) : data ? (
              <div style={styles.statsWrapper}>
                <p style={styles.statText}>Total Anomalies: {data.totalAnomalies}</p>
                <p style={styles.statText}>
                  Moyenne Temps Exécution (jours): {data.moyenneTempsExecution.toFixed(2)}
                </p>
              </div>
            ) : null}
            {evolutionData && (
              <div style={styles.chartWrapper}>
                <CChartLine
                  data={evolutionData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                      tooltip: { mode: 'index', intersect: false },
                    },
                    interaction: { mode: 'nearest', axis: 'x', intersect: false },
                  }}
                />
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {!isLoading && data && (
        <DashboardTable table={tableByTypePanne} title="Anomalies par Type de Panne" />
      )}
      {!isLoading && data && <DashboardTable table={tableBySite} title="Anomalies par Site" />}
      {!isLoading && data && (
        <DashboardTable table={tableByUrgence} title="Anomalies par Urgence" />
      )}
      {!isLoading && data && (
        <DashboardTable table={tableBesoinPdr} title="Besoin PDR par Statut" />
      )}
    </CRow>
  )
}
