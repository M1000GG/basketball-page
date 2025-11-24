import PropTypes from 'prop-types'
import PlayerRow from './PlayerRow'

const tableColumns = [
  { key: 'jersey', label: '#', sortable: true },
  { key: 'name', label: 'Jugador', sortable: true },
  { key: 'team', label: 'Equipo', sortable: true },
  { key: 'position', label: 'Posición', sortable: true },
  { key: 'points', label: 'PTS', sortable: true },
  { key: 'rebounds', label: 'REB', sortable: true },
  { key: 'assists', label: 'AST', sortable: true },
  { key: 'efficiency', label: 'Eficiencia', sortable: true },
  { key: 'age', label: 'Edad', sortable: true }
]

const PlayerTable = ({
  players,
  onRowClick,
  onSort,
  sortConfig,
  darkMode,
  rowColors,
  favorites,
  onToggleFavorite
}) => {
  const getSortIcon = key => {
    if (sortConfig.key !== key) return ''
    if (sortConfig.direction === 'asc') return '↑'
    if (sortConfig.direction === 'desc') return '↓'
    return ''
  }

  const colorForIndex = index => {
    if (rowColors === 'even' && (index + 1) % 2 === 0) return 'even'
    if (rowColors === 'odd' && (index + 1) % 2 !== 0) return 'odd'
    return ''
  }

  return (
    <div className='player-table table-responsive'>
      <table className='table mb-0'>
        <thead>
          <tr>
            <th className='player-table__head'>Fav</th>
            {tableColumns.map(column => (
              <th
                key={column.key}
                className={`player-table__head ${column.sortable ? 'player-table__head--sortable' : ''}`}
                onClick={column.sortable ? () => onSort(column.key) : undefined}
                role={column.sortable ? 'button' : undefined}
              >
                {column.label}
                <span className='player-table__info-icon'>ⓘ</span>
                <span className='player-table__sort-icon'>{getSortIcon(column.key)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <PlayerRow
              key={player.id}
              player={player}
              onClick={onRowClick}
              isFavorite={favorites.includes(player.id)}
              onToggleFavorite={onToggleFavorite}
              darkMode={darkMode}
              colorClass={colorForIndex(index)}
            />
          ))}
        </tbody>
      </table>
      {players.length === 0 && (
        <p className='player-table__empty'>No hay jugadores que coincidan con tu búsqueda.</p>
      )}
    </div>
  )
}

PlayerTable.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.string
  }).isRequired,
  darkMode: PropTypes.bool.isRequired,
  rowColors: PropTypes.string.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleFavorite: PropTypes.func.isRequired
}

export default PlayerTable

