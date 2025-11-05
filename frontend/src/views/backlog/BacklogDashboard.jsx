import React, { useMemo, useEffect, useState } from 'react'
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
  CContainer,
} from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useQuery } from '@tanstack/react-query'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'

// ============================
// Helper pour colonnes React Table
// ============================
const columnHelper = createColumnHelper()

// ============================
// Styles globaux pour la page
// ============================
const styles = {
  cardHeader: { fontWeight: 'bold', fontSize: '1rem', padding: '0.75rem 1rem' },
  cardBody: { padding: '1rem' },
  tableWrapper: { overflowX: 'auto' },
  table: { minWidth: '600px', marginBottom: 0 },
  cell: { whiteSpace: 'nowrap', padding: '0.5rem 0.75rem', textAlign: 'center' },
  statsWrapper: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    marginBottom: '0.5rem',
    justifyContent: 'space-between',
  },
  statText: { margin: 0, fontSize: '1rem' },
  chartWrapper: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '280px',
  },
  rowChartsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'flex-start',
  },
}

// ============================
// Composant principal
// ============================
export default function BacklogDashboardPage() {
  // ----------------------------
  // STATE pour gérer les couleurs du thème CoreUI
  // ----------------------------
  const [themeColors, setThemeColors] = useState({
    textColor: '#000',
    colors: [],
    borderColor: '#dee2e6',
    backgroundColor: '#fff',
  })

  // ----------------------------
  // Effet pour détecter les changements de thème CoreUI et mettre à jour les couleurs
  // ----------------------------
  useEffect(() => {
    const updateThemeColors = () => {
      const getCssVar = (varName) =>
        getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || null

      // Récupération des couleurs CoreUI
      const bodyColor = getCssVar('--cui-body-color')
      const borderColor = getCssVar('--cui-border-color')
      const bgColor = getCssVar('--cui-body-bg')
      const primary = getCssVar('--cui-primary') || '#0d6efd'
      const success = getCssVar('--cui-success') || '#198754'
      const warning = getCssVar('--cui-warning') || '#ffc107'
      const danger = getCssVar('--cui-danger') || '#dc3545'
      const info = getCssVar('--cui-info') || '#0dcaf0'
      const secondary = getCssVar('--cui-secondary') || '#6c757d'

      setThemeColors({
        textColor: bodyColor || '#000',
        borderColor: borderColor || '#dee2e6',
        backgroundColor: bgColor || '#fff',
        colors: [primary, success, warning, danger, info, secondary],
      })
    }

    updateThemeColors()

    // Observer pour détecter changement de thème en direct
    const observer = new MutationObserver((mutations) => {
      const themeChanged = mutations.some(
        (mutation) =>
          mutation.type === 'attributes' &&
          ['class', 'data-coreui-theme', 'data-theme'].includes(mutation.attributeName),
      )
      if (themeChanged) setTimeout(updateThemeColors, 50)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-coreui-theme', 'data-theme'],
    })
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'data-coreui-theme', 'data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  // ----------------------------
  // Fetch des données du dashboard via React Query
  // ----------------------------
  const { data, isLoading } = useQuery({
    queryKey: ['backlog_dashboard'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/anomalie/backlog_dashboard')
      if (!res.ok) throw new Error('Erreur réseau')
      return res.json()
    },
  })

  // ----------------------------
  // Préparer les données pour les tableaux
  // ----------------------------
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

  // ----------------------------
  // Colonnes pour React Table
  // ----------------------------
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

  // ----------------------------
  // Instanciation des tables React Table
  // ----------------------------
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

  // ----------------------------
  // Préparer les données pour Doughnut Charts
  // ----------------------------
  const makeChartData = (rows) => {
    if (!rows.length) return null
    const labels = rows.map((r) => r.key)
    const totals = rows.map((r) => r.total ?? 0)
    return { labels, datasets: [{ data: totals }] }
  }

  const chartDataByTypePanne = useMemo(() => makeChartData(byTypePanneRows), [byTypePanneRows])
  const chartDataBySite = useMemo(() => makeChartData(bySiteRows), [bySiteRows])
  const chartDataByUrgence = useMemo(() => makeChartData(byUrgenceRows), [byUrgenceRows])
  const chartDataBesoinPdr = useMemo(() => makeChartData(totalBesoinPdrRows), [totalBesoinPdrRows])

  const prepareChartData = (chartData) => {
    if (!chartData) return null
    return {
      labels: chartData.labels,
      datasets: [
        {
          data: chartData.datasets[0].data,
          backgroundColor: themeColors.colors.slice(0, chartData.datasets[0].data.length),
        },
      ],
    }
  }

  const chartDataByTypePanneColored = useMemo(
    () => prepareChartData(chartDataByTypePanne),
    [chartDataByTypePanne, themeColors.colors],
  )
  const chartDataBySiteColored = useMemo(
    () => prepareChartData(chartDataBySite),
    [chartDataBySite, themeColors.colors],
  )
  const chartDataByUrgenceColored = useMemo(
    () => prepareChartData(chartDataByUrgence),
    [chartDataByUrgence, themeColors.colors],
  )
  const chartDataBesoinPdrColored = useMemo(
    () => prepareChartData(chartDataBesoinPdr),
    [chartDataBesoinPdr, themeColors.colors],
  )

  // ----------------------------
  // Plugin Doughnut pour afficher le total au centre
  // ----------------------------
  const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
      const {
        ctx,
        chartArea: { left, right, top, bottom },
        data,
      } = chart
      const dataset = data.datasets[0]
      if (!dataset) return
      const total = dataset.data.reduce((sum, val) => sum + val, 0)
      const centerX = (left + right) / 2
      const centerY = (top + bottom) / 2
      const textColor =
        getComputedStyle(document.documentElement).getPropertyValue('--cui-body-color').trim() ||
        '#000'
      ctx.save()
      ctx.font = 'bold 16px "Segoe UI"'
      ctx.fillStyle = textColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`Total: ${total}`, centerX, centerY)
      ctx.restore()
    },
  }

  const doughnutOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { position: 'right', labels: { color: themeColors.textColor, font: { size: 12 } } },
        tooltip: {
          backgroundColor: themeColors.backgroundColor === '#fff' ? '#000' : '#fff',
          titleColor: themeColors.backgroundColor === '#fff' ? '#fff' : '#000',
          bodyColor: themeColors.backgroundColor === '#fff' ? '#fff' : '#000',
          borderColor: themeColors.borderColor,
          borderWidth: 1,
        },
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 12 },
          anchor: 'center',
          align: 'center',
          formatter: (val) => val,
        },
      },
    }),
    [themeColors],
  )

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, centerTextPlugin)

  // =============================
  // Composants réutilisables
  // =============================

  // Tableau standard
  const DashboardTable = ({ table, title }) => (
    <CCard className="my-0 ps-0">
      <CCardHeader style={{ ...styles.cardHeader, color: themeColors.textColor }}>
        {title}
      </CCardHeader>
      <CCardBody style={styles.cardBody}>
        {table.getRowModel().rows.length === 0 ? (
          <CAlert color="info" className="text-center" style={{ margin: '1rem 0' }}>
            Aucune donnée disponible.
          </CAlert>
        ) : (
          <div style={styles.tableWrapper}>
            <CTable hover bordered responsive style={styles.table}>
              <CTableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <CTableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <CTableHeaderCell
                        key={header.id}
                        style={{
                          ...styles.cell,
                          color: themeColors.textColor,
                          borderColor: themeColors.borderColor,
                        }}
                      >
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
                      <CTableDataCell
                        key={cell.id}
                        style={{
                          ...styles.cell,
                          color: themeColors.textColor,
                          borderColor: themeColors.borderColor,
                        }}
                      >
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

  // Doughnut Chart global
  const DoughnutChartCard = ({ title, data }) => {
    if (!data) return null
    return (
      <CCard className="my-2">
        <CCardHeader style={{ ...styles.cardHeader, color: themeColors.textColor }}>
          {title}
        </CCardHeader>
        <CCardBody style={styles.chartWrapper}>
          <CChartDoughnut
            data={data}
            options={doughnutOptions}
            style={{ height: '280px', maxWidth: '100%' }}
          />
        </CCardBody>
      </CCard>
    )
  }

  // Doughnut Chart pour chaque ligne (mini chart)
  const LineDoughnutChartCard = ({ row, title, showChart }) => {
    if (!showChart) return null
    const rowData = {
      labels: statusKeys,
      datasets: [
        {
          data: statusKeys.map((k) => row.status?.[k] ?? 0),
          backgroundColor: themeColors.colors.slice(0, statusKeys.length),
        },
      ],
    }
    return (
      <CContainer key={title} style={{ flex: '1 1 auto', minWidth: '300px' }}>
        <CCard className="my-2">
          <CCardHeader style={{ ...styles.cardHeader, color: themeColors.textColor }}>
            {title}
          </CCardHeader>
          <CCardBody
            style={{
              height: '180px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CChartDoughnut
              data={rowData}
              options={{ ...doughnutOptions, maintainAspectRatio: true }}
            />
          </CCardBody>
        </CCard>
      </CContainer>
    )
  }

  // Tableau + mini charts par ligne
  const DashboardTableWithRowCharts = ({ table, title }) => {
    const showCharts = table.getAllColumns().length > 2
    return (
      <>
        <DashboardTable table={table} title={title} />
        {/* {showCharts && (
          <div style={styles.rowChartsWrapper}>
            {table.getRowModel().rows.map((row) => (
              <LineDoughnutChartCard
                key={row.id}
                row={row.original}
                title={`Détail ${title} - ${row.original.key}`}
                showChart={showCharts}
              />
            ))}
          </div>
        )} */}
      </>
    )
  }

  // Tableau + graphique global côte à côte
  const TableChartPair = ({ table, tableTitle, chartData, chartTitle }) => {
    const showCharts = table.getAllColumns().length > 2
    return (
      <>
        <CRow className="g-3">
          <CCol xs={12} md={6}>
            <DashboardTableWithRowCharts table={table} title={tableTitle} />
          </CCol>
          <CCol xs={12} md={6}>
            <DoughnutChartCard title={chartTitle} data={chartData} />
          </CCol>
        </CRow>

        {/* DETAILS ANOMALIES */}
        <CContainer className="">
          <CRow sm={{ cols: 1 }} md={{ cols: 2 }} lg={{ cols: 3 }}>
            {showCharts && (
              <>
                {table.getRowModel().rows.map((row, index) => (
                  <CCol key={index}>
                    <LineDoughnutChartCard
                      key={row.id}
                      row={row.original}
                      title={`Détail ${tableTitle} - ${row.original.key}`}
                      showChart={showCharts}
                    />
                  </CCol>
                ))}
              </>
            )}
          </CRow>
        </CContainer>
      </>
    )
  }

  // ============================
  // Rendu principal
  // ============================
  return (
    <CRow className="g-3" style={{ gap: '0.75rem' }}>
      {/* Carte principale Stats */}
      <CCol xs={12}>
        <CCard>
          <CCardHeader
            style={{ ...styles.cardHeader, fontSize: '1.1rem', color: themeColors.textColor }}
          >
            📊 Dashboard Backlog Anomalies
          </CCardHeader>
          <CCardBody style={styles.cardBody}>
            {isLoading ? (
              <div className="text-center p-4">
                <CSpinner color="primary" />
              </div>
            ) : (
              data && (
                <div style={styles.statsWrapper} className="mb-0">
                  <p style={{ ...styles.statText, color: themeColors.textColor }}>
                    Total Anomalies: {data.totalAnomalies}
                  </p>
                  <p style={{ ...styles.statText, color: themeColors.textColor }}>
                    Moyenne Temps Exécution : {data.moyenneTempsExecution.toFixed(0)} jours{' ou '}
                    {(data.moyenneTempsExecution * 24).toFixed(0)} heures
                  </p>
                </div>
              )
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Sections Table + Graphique */}
      {!isLoading && data && (
        <>
          <TableChartPair
            table={tableByTypePanne}
            tableTitle="Anomalies par Type de Panne"
            chartData={chartDataByTypePanneColored}
            chartTitle="Répartition Type de Panne"
          />
          <TableChartPair
            table={tableBySite}
            tableTitle="Anomalies par Site"
            chartData={chartDataBySiteColored}
            chartTitle="Répartition par Site"
          />
          <TableChartPair
            table={tableByUrgence}
            tableTitle="Anomalies par Urgence"
            chartData={chartDataByUrgenceColored}
            chartTitle="Répartition par Urgence"
          />
          <TableChartPair
            table={tableBesoinPdr}
            tableTitle="Besoin PDR par Statut"
            chartData={chartDataBesoinPdrColored}
            chartTitle="Répartition Besoin PDR"
          />
        </>
      )}
    </CRow>
  )
}
