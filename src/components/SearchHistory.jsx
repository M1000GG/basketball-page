import PropTypes from 'prop-types'

const SearchHistory = ({ history, onSelectSearch, onClearHistory, selectedTerm }) => (
  <div className='search-history'>
    <div className='search-history__header'>
      <p className='search-history__title mb-0'>Historial de búsqueda</p>
      <button
        type='button'
        className='search-history__clear'
        onClick={onClearHistory}
        disabled={history.length === 0}
      >
        Limpiar
      </button>
    </div>
    {history.length === 0 ? (
      <p className='search-history__empty mb-0'>Aún no hay términos guardados.</p>
    ) : (
      <div className='search-history__chips'>
        {history.map(item => (
          <button
            type='button'
            key={item}
            className={`search-history__chip ${selectedTerm === item ? 'search-history__chip--active' : ''}`}
            onClick={() => onSelectSearch(item)}
          >
            {item}
          </button>
        ))}
      </div>
    )}
  </div>
)

SearchHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectSearch: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired,
  selectedTerm: PropTypes.string
}

export default SearchHistory

