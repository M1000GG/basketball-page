import { useEffect, useMemo, useState } from 'react'
import SearchBar from './components/SearchBar'
import SearchHistory from './components/SearchHistory'
import ThemeToggle from './components/ThemeToggle'
import StatsPanel from './components/StatsPanel'
import PlayerTable from './components/PlayerTable'
import Pagination from './components/Pagination'
import PlayerModal from './components/PlayerModal'
import playersData from './data/players'
import './App.css'

const scoreboard = {
  breadcrumb: 'Top Club / Basketball',
  title: 'Central de Rendimiento',
  subtitle: 'Administra convocatorias, analiza métricas clave y mantén la intensidad de juego en cada partido.',
  homeTeam: { code: 'TCB', name: 'Top Club Flames', score: 98 },
  awayTeam: { code: 'RIV', name: 'Rival All-Stars', score: 92 },
  quarter: 'Q4 · 01:12',
  venue: 'Arena Central · 18 NOV'
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [rowColors, setRowColors] = useState('none')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : true
  })
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedHistoryTerm, setSelectedHistoryTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim())
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 2) {
      setSearchHistory(prev => {
        const normalized = debouncedSearch.toLowerCase()
        const filtered = prev.filter(item => item.toLowerCase() !== normalized)
        return [debouncedSearch, ...filtered].slice(0, 5)
      })
    }
    if (debouncedSearch !== selectedHistoryTerm) {
      setSelectedHistoryTerm('')
    }
  }, [debouncedSearch, selectedHistoryTerm])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
  }, [searchHistory])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, itemsPerPage, showOnlyFavorites])

  const filteredPlayers = useMemo(() => {
    const term = debouncedSearch.toLowerCase()
    let result = playersData.filter(player =>
      player.name.toLowerCase().includes(term) ||
      player.team.toLowerCase().includes(term) ||
      player.position.toLowerCase().includes(term)
    )
    if (showOnlyFavorites) {
      result = result.filter(player => favorites.includes(player.id))
    }
    return result
  }, [debouncedSearch, showOnlyFavorites, favorites])

  const sortedPlayers = useMemo(() => {
    if (!sortConfig.key || sortConfig.direction === 'none') {
      return filteredPlayers
    }
    const sorted = [...filteredPlayers].sort((a, b) => {
      let valueA = a[sortConfig.key]
      let valueB = b[sortConfig.key]
      
      if (sortConfig.key === 'jersey') {
        valueA = parseInt(valueA) || 0
        valueB = parseInt(valueB) || 0
      }
      
      if (typeof valueA === 'string') {
        const comparison = valueA.localeCompare(valueB, 'es', { sensitivity: 'base' })
        return sortConfig.direction === 'asc' ? comparison : -comparison
      }
      
      const comparison = valueA - valueB
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
    return sorted
  }, [filteredPlayers, sortConfig])

  const totalItems = sortedPlayers.length
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage) || 1)

  useEffect(() => {
    setCurrentPage(prev => Math.min(prev, totalPages))
  }, [totalPages])

  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * itemsPerPage
  const visiblePlayers = sortedPlayers.slice(startIndex, startIndex + itemsPerPage)

  const stats = useMemo(() => {
    if (filteredPlayers.length === 0) {
      return {
        total: 0,
        avgPoints: '0.0',
        avgRebounds: '0.0',
        topScorer: { name: 'N/A', points: '0.0', team: 'N/A' },
        distribution: []
      }
    }
    const total = filteredPlayers.length
    const sumPoints = filteredPlayers.reduce((acc, player) => acc + player.points, 0)
    const sumRebounds = filteredPlayers.reduce((acc, player) => acc + player.rebounds, 0)
    const topScorer = filteredPlayers.reduce((prev, curr) =>
      curr.points > prev.points ? curr : prev
    )
    const distributionMap = filteredPlayers.reduce((acc, player) => {
      const key = player.position
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
    const distribution = Object.entries(distributionMap).map(([position, count]) => ({
      position,
      count,
      percentage: Math.round((count / total) * 100)
    }))

    return {
      total,
      avgPoints: (sumPoints / total).toFixed(1),
      avgRebounds: (sumRebounds / total).toFixed(1),
      topScorer: {
        name: topScorer.name,
        points: topScorer.points.toFixed(1),
        team: topScorer.team
      },
      distribution
    }
  }, [filteredPlayers])

  const handleSort = key => {
    setSortConfig(prev => {
      if (prev.key !== key) {
        return { key, direction: 'asc' }
      }
      if (prev.direction === 'asc') {
        return { key, direction: 'desc' }
      }
      if (prev.direction === 'desc') {
        return { key: null, direction: 'none' }
      }
      return { key, direction: 'asc' }
    })
  }

  const handleRowClick = player => {
    setSelectedPlayer(player)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPlayer(null)
  }

  const handleToggleFavorite = playerId => {
    setFavorites(prev => {
      if (prev.includes(playerId)) {
        return prev.filter(id => id !== playerId)
      }
      return [...prev, playerId]
    })
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setDebouncedSearch('')
  }

  const handleSelectHistory = term => {
    setSearchTerm(term)
    setSelectedHistoryTerm(term)
  }

  const handleClearHistory = () => {
    setSearchHistory([])
  }

  const dashboardClass = [
    'performance-dashboard',
    darkMode ? 'performance-dashboard--dark' : 'performance-dashboard--light'
  ].join(' ')

  return (
    <div className={dashboardClass}>
      <div className='performance-dashboard__shell py-4 py-lg-5'>
        <header className='performance-dashboard__header d-flex flex-column flex-lg-row align-items-lg-start justify-content-between gap-3'>
          <div>
            <p className='performance-dashboard__breadcrumb mb-1'>{scoreboard.breadcrumb}</p>
            <h1 className='performance-dashboard__title mb-2'>{scoreboard.title}</h1>
            <p className='performance-dashboard__subtitle mb-0'>{scoreboard.subtitle}</p>
          </div>
          <ThemeToggle
            darkMode={darkMode}
            onToggle={() => setDarkMode(prev => !prev)}
          />
        </header>

        <section className='scoreboard mb-4 dashboard-block'>
          <div className='scoreboard__card'>
            <div className='scoreboard__team scoreboard__team--left'>
              <p className='scoreboard__team-code'>{scoreboard.homeTeam.code}</p>
              <p className='scoreboard__team-name'>{scoreboard.homeTeam.name}</p>
            </div>
            <div className='scoreboard__score'>
              <span>{scoreboard.homeTeam.score}</span>
              <span className='scoreboard__divider'>—</span>
              <span>{scoreboard.awayTeam.score}</span>
            </div>
            <div className='scoreboard__team scoreboard__team--right text-end'>
              <p className='scoreboard__team-code'>{scoreboard.awayTeam.code}</p>
              <p className='scoreboard__team-name'>{scoreboard.awayTeam.name}</p>
            </div>
          </div>
          <div className='scoreboard__meta'>
            <p className='scoreboard__details-period'>{scoreboard.quarter}</p>
            <p className='scoreboard__details-venue mb-0'>{scoreboard.venue}</p>
          </div>
        </section>

        <section className='dashboard-panel mb-4 dashboard-block'>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={handleClearSearch}
            resultsCount={filteredPlayers.length}
          />

          <div className='dashboard-panel__buttons'>
            <button
              type='button'
              className={`dashboard-panel__btn ${rowColors === 'even' ? 'dashboard-panel__btn--active' : ''}`}
              onClick={() => setRowColors('even')}
            >
              Filas pares
            </button>
            <button
              type='button'
              className={`dashboard-panel__btn ${rowColors === 'odd' ? 'dashboard-panel__btn--active' : ''}`}
              onClick={() => setRowColors('odd')}
            >
              Filas impares
            </button>
            <button
              type='button'
              className={`dashboard-panel__btn ${rowColors === 'none' ? 'dashboard-panel__btn--active' : ''}`}
              onClick={() => setRowColors('none')}
            >
              Limpiar resaltado
            </button>
            <div className='form-check form-switch dashboard-panel__favorites'>
              <input
                className='form-check-input'
                type='checkbox'
                id='favoritesSwitch'
                checked={showOnlyFavorites}
                onChange={() => setShowOnlyFavorites(prev => !prev)}
              />
              <label className='form-check-label' htmlFor='favoritesSwitch'>
                Mostrar solo favoritos ({favorites.length})
              </label>
            </div>
          </div>

          <SearchHistory
            history={searchHistory}
            onSelectSearch={handleSelectHistory}
            onClearHistory={handleClearHistory}
            selectedTerm={selectedHistoryTerm}
          />
        </section>

        <div className='dashboard-block'>
          <StatsPanel stats={stats} />
        </div>

        <section className='table-section mt-4 dashboard-block'>
          <PlayerTable
            players={visiblePlayers}
            onRowClick={handleRowClick}
            onSort={handleSort}
            sortConfig={sortConfig}
            darkMode={darkMode}
            rowColors={rowColors}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            totalItems={totalItems}
          />
        </section>
      </div>

      <PlayerModal
        isOpen={isModalOpen}
        player={selectedPlayer}
        onClose={handleCloseModal}
        darkMode={darkMode}
      />
    </div>
  )
}

export default App